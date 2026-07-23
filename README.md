# bblocks-viewer

A Vue 3 single-page app for browsing and exploring **OGC Blocks** (formerly "OGC Building Blocks") —
reusable, machine-readable specification components organized into *registers*. Point it at a
register's `register.json` and it presents every block through a multi-tab detail view: JSON
Schema, examples (with map/3D/web/plugin visualizations), OpenAPI docs, JSON-LD contexts, RDF
ontologies, semantic uplift, transforms, validation results, and dependency graphs.

A live instance tracking the main OGC Blocks register is deployed at
https://ogcincubator.github.io/bblocks-viewer/.

## Pointing the viewer at a register

The register URL is resolved in this order:

1. `window.bblocksRegister` / `window.bblocksRegisters` (set via a `<script>` on the hosting page)
2. the `?register=` query parameter
3. the `VITE_BBLOCK_REGISTER` environment variable (set in `.env` for local dev)
4. a hardcoded default (`https://opengeospatial.github.io/bblocks/register.json`)

Other runtime options (page title, `showImported` depth, Rainbow fallback instances, etc.) are set
via `window.bblocksViewer = { ... }` — see `src/services/config.service.js`.

## Project setup

```bash
yarn install
```

### Compile and hot-reload for development

```bash
yarn dev
```

Runs on http://localhost:3000. Edit `.env` (or set `VITE_BBLOCK_REGISTER`) to pick which register to
browse; a handful of commented-out examples are listed there.

### Compile and minify for production

```bash
yarn build
```

### Preview a production build

```bash
yarn preview
```

### Lint (with auto-fix)

```bash
yarn lint
```

There are no automated tests.

## Extending the viewer: view plugins

Registers can declare their own visualizations for example snippets and transform outputs — a
custom viewer for some content type without patching this repo — via `viewer.view-plugins` in
`bblocks-config.yaml`. The viewer's own built-in map, 3D, and web views are implemented the same
way, as ordinary plugins shipped in the separate
[bblocks-viewer-base-plugins](https://github.com/ogcincubator/bblocks-viewer-base-plugins) package.

See the OGC Blocks authoring documentation (`view-plugins.md` in the bblocks authoring skill/docs,
or [bblocks-view-plugin-starter](https://github.com/ogcincubator/bblocks-view-plugin-starter) for a
ready-to-clone template) for the full plugin interface and how to declare one in a register.

## Documentation for Claude Code

See [CLAUDE.md](CLAUDE.md) for an architecture overview of this codebase (services, routing,
component structure, the register/bblock data model).

## License

Apache License 2.0 — see [LICENSE](LICENSE).