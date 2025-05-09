import N3 from 'n3';
import httpService from "@/services/http.service";
import bblockService from "@/services/bblock.service";

const {namedNode} = N3.DataFactory;

const namespace = (prefix) => new Proxy({_entries: {}}, {
  get(target, key) {
    if (key === 'getNamespace') {
      return () => prefix;
    }
    let n = target._entries[key];
    if (!n) {
      n = namedNode(prefix + key);
      target._entries[key] = n;
    }
    return n;
  },
});

const parser = new N3.Parser();

export const RDF = namespace('http://www.w3.org/1999/02/22-rdf-syntax-ns#');
export const RDFS = namespace('http://www.w3.org/2000/01/rdf-schema#');
export const SKOS = namespace('http://www.w3.org/2004/02/skos/core#');
export const OWL = namespace('http://www.w3.org/2002/07/owl#');

const LABEL_PROPS = [RDFS.label, SKOS.prefLabel];

const setDefault = (d, k, v) => {
  if (!(k in d)) {
    d[k] = v;
  }
  return d[k];
};

export const readOntology = async (bblock, url) => {
  const responseData = await bblockService.fetchDocumentByUrl(bblock, url);
  const result = {
    content: responseData,
    prefixes: {},
    byClass: {},
    resources: {},
  };
  parser.parse(responseData, (err, quad, prefixes) => {
    if (err) {
      throw err;
    }
    if (quad) {
      const { subject, predicate, object } = quad;
      if (quad.subject.termType !== 'NamedNode') {
        // ignore blank nodes
        return;
      }
      const resource = setDefault(result.resources, subject.id, {
        uri: subject.id,
        classes: [],
        labels: {},
        getLabel(prefLang, fallback='en', def) {
          let label;
          if (prefLang) {
            label = this.labels[prefLang];
          }
          if (fallback) {
            label = this.labels[prefLang];
          }
          if (!label) {
            label = this.labels[''];
          }
          if (!label) {
            label = Object.values(this.labels)[0];
          }
          if (!label) {
            label = def;
          }
          return label;
        }
      });
      if (RDF.type.equals(predicate) && object.termType === 'NamedNode') {
        resource.classes.push(object.id);
        setDefault(result.byClass, object.id, []).push(subject.id);
      } else if (LABEL_PROPS.some(p => p.equals(predicate)) && object.termType === 'Literal') {
        resource.labels[object.language] = object.value;
      }
    } else if (prefixes) {
      result.prefixes = prefixes;
    }
  });
  return result;
};
