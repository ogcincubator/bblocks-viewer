# bblocks-viewer (smrgeoinfo fork)

Fork of [ogcincubator/bblocks-viewer](https://github.com/ogcincubator/bblocks-viewer) — a Vue 3 + Vuetify SPA for browsing OGC Building Block registers.

## Fork changes

- **Resolved (JSON) button** in the JSON Schema tab — displays the fully resolved schema (all `$ref` inlined, `allOf` flattened) for profile building blocks. Conditionally shown when the bblock has a `resolvedSchema` URL in `register.json`.
- **COPY_PROPERTIES** updated to include `resolvedSchema` so the URL persists through `fetchBBlock()`.

See [agents.md](agents.md) for architecture details and the full data flow.

## Project setup

```
# yarn
yarn

# npm
npm install

# pnpm
pnpm install
```

### Compiles and hot-reloads for development

```
# yarn
yarn dev

# npm
npm run dev

# pnpm
pnpm dev
```

### Compiles and minifies for production

```
# yarn
yarn build

# npm
npm run build

# pnpm
pnpm build
```

### Lints and fixes files

```
# yarn
yarn lint

# npm
npm run lint

# pnpm
pnpm lint
```

### Customize configuration

See [Configuration Reference](https://vitejs.dev/config/).
