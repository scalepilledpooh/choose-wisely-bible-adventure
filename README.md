# Choose Wisely 2

Choose your own faith adventure.

## Getting Started

This repository now includes a lightweight React + Vite prototype that lets you play through a single narrated path (Daniel in the Lions' Den) and see how narrative choices impact the outcome. To run it locally:

```bash
npm install
npm run dev
```

The dev server starts on [http://localhost:5173](http://localhost:5173) and will automatically open in your browser. Build artifacts can be produced with `npm run build`.

## Project Structure

- `src/data/daniel.ts` – Story graph used by the MVP.
- `src/components/` – Presentation components for scenes and the journey log.
- `src/App.tsx` – Story state machine and layout.
- `vite.config.ts`, `tsconfig.json` – Tooling configuration for the Vite + TypeScript stack.

## Phase 0 Planning Artifacts
- [Narrative Design Framework](docs/phase-0/narrative-design-framework.md)
- [Technical Architecture Plan](docs/phase-0/technical-architecture.md)
- [AI Integration Plan](docs/phase-0/ai-integration-plan.md)

Refer to [product-roadmap.md](product-roadmap.md) for the full project vision.
