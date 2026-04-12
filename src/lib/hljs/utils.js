import languageLoaders from './languageLoaders';

const customLanguages = {
  turtle: () => import('./turtle'),
  sparql: () => import('./sparql'),
  jq:     () => import('./jq'),
};

const allLoaders = { ...languageLoaders, ...customLanguages };

export async function loadLanguage(hljs, lang) {
  if (!lang || hljs.getLanguage(lang)) return;
  const loader = allLoaders[lang];
  if (!loader) return;
  try {
    const mod = await loader();
    const def = mod.default ?? mod;
    hljs.registerLanguage(lang, def);
  } catch {
    // unknown or unsupported language — highlight.js will render as plain text
  }
}

export function autolink(html, language) {
  if (!['json', 'turtle', 'yaml'].includes(language)) {
    return html;
  }
  const parsed = new DOMParser().parseFromString(html, 'text/html');

  if (language === 'turtle') {
    const prefixes = {};
    let base = null;
    let status = 'start';
    let prefix = null;
    const uriClasses = ['hljs-literal', 'hljs-string'];
    for (let elem of parsed.getElementsByTagName('span')) {
      if (elem.className === 'hljs-type') {
        if (elem.textContent === '@prefix') {
          status = 'prefix';
          continue;
        }
        if (elem.textContent === '@base') {
          status = 'base';
        }
      }
      if (status === 'prefix') {
        if (elem.className === 'hljs-symbol') {
          prefix = elem.textContent.replace(/:$/, '');
        } else if (prefix && elem.className === 'hljs-literal') {
          prefixes[prefix] = elem.textContent.replace(/^<|>$/g, '');
          elem.innerHTML = `&lt;<span href="${prefixes[prefix]}" title="${prefixes[prefix]}">${prefixes[prefix]}</span>&gt;`;
          prefix = null;
          status = null;
        }
        continue;
      }

      if (status === 'base') {
        if (elem.className === 'hljs-literal') {
          base = elem.textContent.replace(/^<|>$/g, '');
          if (base) {
            elem.innerHTML = `&lt;<span href="${base}" title="${base}">${base}</span>&gt;`;
          }
          status = null;
          continue;
        }
      }

      if (elem.className === 'hljs-symbol') {
        const colon = elem.textContent.indexOf(':');
        if (colon === elem.textContent.length - 1) {
          continue;
        }
        let localPart = elem.textContent.substring(colon + 1),
          url;
        if (colon === 0 && base) {
          url = base + localPart;
        } else if (colon > -1) {
          const prefix = elem.textContent.substring(0, colon);
          if (prefixes[prefix]) {
            url = prefixes[prefix] + localPart;
          }
        }
        if (url) {
          elem.setAttribute('href', url);
          elem.setAttribute('title', url);
        }
        continue;
      }

      if (uriClasses.includes(elem.className)) {
        let match = elem.textContent.match(/^[<"](https?:\/\/.*)[>"]$/);
        if (match) {
          const prev = match[0][0].replace('<', '&lt'),
            post = match[0][match[0].length - 1].replace('>', '&gt');
          elem.innerHTML = `${prev}<span href="${match[1]}" title="${match[1]}">${match[1]}</span>${post}`;
        }
      }
    }

  } else {
    // JSON or YAML
    for (let elem of parsed.getElementsByClassName('hljs-string')) {
      const m = elem.textContent.match('^"?((https?|bblocks)://[^"]+)"?$');
      if (m) {
        if (m[0] === m[1]) {
          elem.setAttribute('href', m[1]);
          elem.setAttribute('title', m[1]);
        } else {
          elem.innerHTML = `"<span href="${m[1]}" title="${m[1]}">${m[1]}</span>"`
        }
      }
    }
  }

  return parsed.body.innerHTML;
}