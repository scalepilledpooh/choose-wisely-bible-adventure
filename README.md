# Choose Wisely 2

Choose your own faith adventure.

The current prototype drops you onto a **Time of Jesus** era map where each location links to an interactive story. You can explore multiple sites across Galilee and Judea, then flip into a lightweight 3D Sea of Galilee demo to walk on water and chat with NPCs.

## Getting Started

This repository now includes a lightweight React + Vite prototype that lets you browse an era map, pick a location, and play through branching narratives. To run it locally:

```bash
npm install
npm run dev
```

The dev server starts on [http://localhost:5173](http://localhost:5173) and will automatically open in your browser. Build artifacts can be produced with `npm run build`.

## Project Structure

- `src/world/` – Era definitions, map metadata, and base locations that feed the map UI.
- `src/story/` – Story graph content for each map location.
- `src/components/` – Presentation components for scenes and the journey log.
- `src/App.tsx` – Era selection, map view, and story routing, plus the toggle that launches the 3D Sea of Galilee demo.
- `vite.config.ts`, `tsconfig.json` – Tooling configuration for the Vite + TypeScript stack.

## Time of Jesus map content

The map currently centers on one playable era with more eras staged for later:

- **Time of Jesus** (`jesus`, c. AD 26–33) – Fully playable, using `public/maps/jesus-era.png`.
- **Time of David** (`david`, c. 1010–970 BC) – Marked as coming soon.
- **Babylonian Exile** (`exile`, c. 586–538 BC) – Marked as coming soon.

Five story entries are available on the Time of Jesus map:

1. **Boats on the Shore** (`call-of-disciples`) – Capernaum.
2. **Storm on the Lake** (`storm-on-sea`) – Sea of Galilee.
3. **Hometown Tension** (`nazareth-rejection`) – Nazareth.
4. **Courtyard Firelight** (`peters-denial`) – Jerusalem (Judea).
5. **The Road to Jericho** (`good-samaritan`) – Road to Jericho.

Use the "Launch 3D Sea demo" button in the header of the map view (defined in `src/App.tsx`) to switch to a prototype 3D scene. The button reappears as "Back to era map" while in the demo so you can return to the stories.

## Phase 0 Planning Artifacts
- [Narrative Design Framework](docs/phase-0/narrative-design-framework.md)
- [Technical Architecture Plan](docs/phase-0/technical-architecture.md)
- [AI Integration Plan](docs/phase-0/ai-integration-plan.md)

Refer to [product-roadmap.md](product-roadmap.md) for the full project vision.
