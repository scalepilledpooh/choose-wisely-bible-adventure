# Technical Architecture Plan

## Front-End
- **Framework**: React 18 + TypeScript, bootstrapped with Vite for fast HMR and production builds.
- **State Management**: Zustand for story state, Redux Toolkit Query for async data fetching and caching.
- **Routing**: React Router v6 to support nested routes for story selection, gameplay, journal, and admin tools.
- **Styling**: Tailwind CSS with custom theme tokens (scroll parchment palette, serif headings, sans-serif body text).
- **UI Components**: Headless UI for accessible primitives, Framer Motion for subtle transitions between scenes.
- **Internationalization**: React-i18next configured from the outset to support future localization.

## Back-End
- **Runtime**: Node.js 20 with TypeScript.
- **Framework**: NestJS for modular architecture, dependency injection, and validation.
- **API Layer**: REST endpoints with OpenAPI spec; consider GraphQL gateway in later phases.
- **Authentication**: JWT-based stateless auth with refresh tokens; supports anonymous guest sessions via signed tokens.
- **Services**:
  - Story Service: CRUD for stories, scenes, decisions, and metrics.
  - Progression Engine: Validates moves, enforces canonical checks, returns next scene payload.
  - Media Service: Manages OpenAI image jobs, caching, and CDN links.
  - Analytics Service: Captures events and aggregates statistics.
- **Background Processing**: BullMQ with Redis for queued image generation, analytics batch jobs, and email notifications.

## Persistence Layer
- **Primary Database**: PostgreSQL (managed via Prisma ORM) storing normalized story data, user profiles, sessions.
- **Document Storage**: S3-compatible bucket (e.g., Supabase storage) for generated imagery and story bible artifacts.
- **Caching**: Redis for session tokens, hot story nodes, and rate limiting.
- **Migrations**: Prisma migrate with preview environments for schema validation.

## Infrastructure & DevOps
- **Hosting**: Front-end on Vercel; back-end on Render with autoscaling. Use Supabase for Postgres/Storage/Functions.
- **CI/CD**: GitHub Actions running lint, type check, tests, and deployment previews per PR.
- **Environment Management**: `.env` with Doppler integration; secrets stored in platform-specific vaults.
- **Observability**: Log aggregation with Logtail, metrics via Prometheus-compatible exporter, alerts through PagerDuty.

## Development Workflow
1. Monorepo managed with PNPM workspaces; packages for `web`, `api`, `shared`.
2. Commit hooks via Husky: lint-staged to run ESLint, Prettier, and unit tests on touched files.
3. Storybook instance for UI component development.
4. Integration tests using Playwright; API tests with Pact for contract verification.
5. Feature flags managed through LaunchDarkly for gradual rollout of new narratives.

## Security & Compliance
- Enforce TypeScript strict mode, ESLint security plugins, and OWASP dependency checks.
- Apply rate limiting and abuse detection on choice submission endpoints.
- Implement content moderation pipeline before persisting AI-generated assets.
- Support data export/delete for privacy compliance (GDPR/CCPA readiness).

## Risks & Mitigations
| Risk | Impact | Mitigation |
|------|--------|------------|
| Complex branching logic causing performance bottlenecks | High | Precompute canonical paths, use memoized graph traversal, load scenes lazily | 
| AI image generation delays | Medium | Queue with retries, display loading states, offer cached variants | 
| Theological accuracy concerns | High | Review board sign-off, integrate scripture cross-check automation | 
| Multiplayer feature creep | Medium | Strict roadmap scope, backlog gating | 
