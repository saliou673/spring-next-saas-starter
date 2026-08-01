<!--
SYNC IMPACT REPORT
==================
Version change: (initial template fill) → 1.0.0
Modified principles: None renamed (initial fill — all principles are new)
Added principles:
  - I. API-First Design (new)
  - II. Cross-Platform Consistency (new)
  - III. Security and Compliance (new)
  - IV. Reliability and Idempotency (new)
  - V. Latest Stable Versions (new)
  - VI. Hexagonal Architecture (new)
  - VII. French-Language UI (new)
  - VIII. Frontend Monorepo (pnpm Workspace) (new)
  - IX. Shared API Client — Kubb + TanStack Query (new)
  - X. Design-Driven Frontend (new)
Adapted from reference constitution v1.3.0:
  - Removed: "Duffel API as the Flight Data Layer" principle — not applicable;
    Saasapp uses its own Spring Boot backend, no external flight data API
  - Removed: All flight/booking/Duffel-domain references
  - Adapted: Folder structure to actual repo layout (frontend/ is the pnpm workspace root)
  - Adapted: Package names to saasapp-web, saasapp-mobile, saasapp-apiclient
  - Adapted: Project domain — electronic stamp management and sales, not flight booking
  - Confirmed: PostgreSQL as the database (from README)
Modified sections:
  - Technology Stack: all rows adapted to Saasapp project; PostgreSQL row de-TODOed
  - Development Workflow: step 7 removed (no external data-provider restriction)
Added sections: None
Removed sections: None
Templates updated:
  - .specify/templates/plan-template.md ✅ reviewed — Constitution Check is dynamic;
    generic placeholders only; no structural changes needed
  - .specify/templates/spec-template.md ✅ reviewed — generic placeholders; no changes needed
  - .specify/templates/tasks-template.md ✅ reviewed — path conventions are advisory;
    concrete paths set per plan.md; no changes needed
Deferred TODOs: None
-->

# Saasapp Constitution

## Core Principles

### I. API-First Design

The Spring Boot backend is the single source of truth for all business logic and
data. Web (Next.js) and mobile (React Native + Expo) clients MUST communicate
exclusively through the backend REST API. API contracts (request/response schemas,
error formats, pagination) MUST be defined before implementation begins and
documented in the feature's `contracts/` directory. No client MAY bypass the REST
API to access the database or any internal service directly.

### II. Cross-Platform Consistency

The web app (`apps/saasapp-web`) and mobile app (`apps/saasapp-mobile`) MUST deliver
functionally equivalent core user journeys: stamp browsing, purchase, management,
and account operations. UI patterns and validation rules MUST be consistent across
platforms. Platform-specific optimisations (e.g., native pickers, haptic feedback)
are permitted only where native UX conventions demand them and MUST NOT diverge
from core business logic.

### III. Security and Compliance

User authentication MUST use JWT with refresh-token rotation. Payment data MUST NOT
be stored or logged server-side beyond what is strictly required by law. All
Personally Identifiable Information (PII) MUST be encrypted in transit (TLS 1.2+)
and at rest. Every API endpoint MUST require authentication except explicitly public
routes (stamp catalogue browsing, health check). Secrets and credentials MUST be
managed via environment variables and MUST NOT be committed to version control.

### IV. Reliability and Idempotency

All stamp purchase and payment-related operations MUST be idempotent to prevent
duplicate transactions. The system MUST degrade gracefully: non-critical features
MUST NOT block core stamp purchase and account management flows. Every backend error
MUST be logged with a correlation ID traceable back to the originating client
request. API responses MUST include structured error objects; raw stack traces MUST
NOT be exposed to clients.

### V. Latest Stable Versions

All technologies MUST use their latest stable (GA) release at the time of
implementation:

- **Backend**: Spring Boot 4+ (latest GA release)
- **Web**: Next.js (latest stable)
- **Mobile**: React Native + Expo SDK (latest stable)
- **Monorepo tooling**: pnpm (latest stable), Kubb (latest stable)
- **Data-fetching**: TanStack Query / React Query (latest stable)

The project MUST NOT pin to deprecated or End-of-Life versions. Dependency upgrades
are a first-class engineering concern and MUST be included in the project backlog.

### VI. Hexagonal Architecture

The Spring Boot backend MUST be structured following the Hexagonal Architecture
pattern (Ports and Adapters). The three mandatory layers are:

- **Domain** (`domain/`): entities, value objects, domain services, and port
  interfaces. This layer MUST have zero dependencies on Spring or any infrastructure
  framework.
- **Application** (`application/`): use-case orchestrators (interactors) that
  depend only on domain ports. No infrastructure imports allowed here.
- **Infrastructure** (`infrastructure/`): adapters that implement domain ports —
  database repositories, REST controllers, message producers, external service
  clients. Infrastructure MUST depend inward on the application/domain layers,
  never the reverse.

The domain layer MUST be testable in complete isolation without a database or HTTP
framework. Every feature `plan.md` MUST identify which ports and adapters are
introduced or modified. Adding a direct infrastructure dependency to the domain or
application layers is a Constitution violation and MUST be justified in the plan's
**Complexity Tracking** table.

### VII. French-Language UI

All user-facing text in the web app and mobile app MUST be displayed in French.
The rules are:

- Hardcoded strings in UI components are **prohibited**. All text MUST be managed
  through an i18n layer:
  - Web: `next-intl` (or equivalent Next.js-compatible i18n library)
  - Mobile: `expo-localization` combined with `i18next` (or equivalent)
- French (`fr`) MUST be the primary and default locale.
- Translation files MUST be the single source of truth for all UI copy; UI
  components MUST reference translation keys, not raw strings.
- Future addition of other locales MUST require changes only to translation files —
  never to UI component code.

### VIII. Frontend Monorepo (pnpm Workspace)

The web app and mobile app MUST be co-located in a pnpm workspace under the
`frontend/` directory. The canonical workspace layout is:

```
saasapp/                              ← repository root
├── backend/
│   └── saasapp-restapi/             ← Spring Boot project (outside pnpm workspace)
├── frontend/                        ← pnpm workspace root
│   ├── apps/
│   │   ├── saasapp-web/             ← Next.js web application
│   │   └── saasapp-mobile/          ← React Native + Expo application
│   ├── packages/
│   │   └── saasapp-apiclient/       ← Kubb-generated TanStack Query hooks (shared)
│   └── pnpm-workspace.yaml
└── docs/
```

The rules are:

- All inter-package dependencies within the workspace MUST be declared as workspace
  references (`"workspace:*"`).
- Lint, type-check, and build scripts MUST be runnable from `frontend/` via `pnpm`
  filter commands (e.g., `pnpm --filter saasapp-webapp build`).
- No app package (`apps/saasapp-web`, `apps/saasapp-mobile`) MAY contain manually
  written HTTP client code for the Saasapp backend; all such calls MUST come from
  `packages/saasapp-apiclient`.
- Adding a new shared package to the workspace requires a feature spec and plan;
  ad-hoc packages are prohibited.

### IX. Shared API Client — Kubb + TanStack Query

`packages/saasapp-apiclient` is the single source of truth for all HTTP calls from
`apps/saasapp-web` and `apps/saasapp-mobile` to the Saasapp backend. It MUST be
generated by Kubb from the Spring Boot backend's OpenAPI specification. The rules are:

- The Spring Boot backend MUST expose a machine-readable OpenAPI spec via Springdoc
  OpenAPI at `http://localhost:8080/api/docs`.
- Kubb MUST be configured to generate TanStack Query (React Query) hooks as its
  primary output for all backend endpoints.
- `apps/saasapp-web` and `apps/saasapp-mobile` MUST declare `saasapp-apiclient` as a
  workspace dependency; they MUST NOT write fetch/axios calls to the backend
  directly.
- Kubb generation MUST be re-run — and the generated output committed — whenever
  the backend OpenAPI spec changes, before any consuming code in `apps/` is
  updated.
- The generated output MUST be committed to the repository so that app packages can
  build without a running backend available.
- Kubb configuration (`kubb.config.ts`) lives in
  `frontend/packages/saasapp-apiclient/` and is the authoritative generation config;
  per-app overrides are prohibited.

## Technology Stack

| Layer | Technology | Rationale |
|---|---|---|
| Backend API | Java 21 + Spring Boot 3+ (latest GA) | Robust REST framework, enterprise-grade security, Springdoc OpenAPI integration |
| Backend Architecture | Hexagonal (Ports & Adapters) | Isolates domain from DB/HTTP; enables independent testability |
| OpenAPI spec | Springdoc OpenAPI (latest stable) | Auto-generates spec from Spring annotations; Kubb source of truth |
| Database | PostgreSQL | Relational DB for stamp records, orders, and user data |
| Frontend monorepo | pnpm workspace under `frontend/` | Unified dependency management and cross-package scripts for web + mobile |
| API client codegen | Kubb (latest stable) | Generates TanStack Query hooks from OpenAPI spec; single HTTP layer |
| Data fetching | TanStack Query / React Query (latest stable) | Shared hooks consumed by both web and mobile with zero duplication |
| Web App | Next.js (latest stable) | SSR/SSG for SEO-relevant pages, React ecosystem alignment |
| Web i18n | next-intl (latest stable) | First-class Next.js i18n with RSC support; French as default locale |
| Mobile App | React Native + Expo SDK (latest stable) | Single codebase for iOS and Android, fast iteration with Expo Go |
| Mobile i18n | expo-localization + i18next (latest stable) | Locale detection + translation key management; French as default |
| Auth | JWT + refresh token rotation | Stateless, cross-platform compatible |
| Design assets | `design/` folder + `design.md` | HTML prototypes and screenshots as authoritative visual spec for web and mobile |

All technology choices and version pins MUST be documented in the relevant feature
`plan.md` under **Technical Context**.

## Development Workflow

1. **Spec first** — every feature begins with `spec.md` defining user stories,
   acceptance criteria, and functional requirements.
2. **Plan second** — architecture decisions, API contracts, data models, and
   hex-arch port/adapter assignments are captured in `plan.md` before any code is
   written. If the feature adds or changes backend endpoints, the plan MUST include
   a Kubb re-generation step before any frontend task begins.
3. **Design review before frontend tasks** — before implementing any screen or
   component, `design.md` and the relevant `design/web/` or `design/mobile/`
   prototype MUST be consulted. The feature's `tasks.md` MUST include a design
   compliance review task for each user story with frontend work.
4. **Tasks third** — atomic, dependency-ordered tasks are generated in `tasks.md`
   from the plan. Backend endpoint tasks MUST precede Kubb re-generation tasks,
   which MUST precede frontend consumption tasks.
5. **Implement last** — code is written task-by-task; each user story MUST be
   independently testable before the next begins.
6. **Branch-per-feature** — all work MUST happen on a named feature branch; direct
   commits to `main` or `master` are prohibited.
7. **No manual HTTP client code** — `apps/saasapp-web` and `apps/saasapp-mobile` MUST
   consume `packages/saasapp-apiclient` hooks exclusively; manual fetch or axios
   calls to the backend are a Constitution violation.

## Governance

This constitution supersedes all other development practices and conventions.
Amendments require:

1. A documented rationale explaining what changed and why.
2. A version bump following semantic versioning:
   - **MAJOR**: backward-incompatible removal or redefinition of a principle.
   - **MINOR**: new principle or section added, or materially expanded guidance.
   - **PATCH**: clarifications, wording fixes, non-semantic refinements.
3. A migration plan for any amendment that affects work already in progress.

All pull requests MUST include a **Constitution Check** verifying compliance with
the principles above. Complexity violations (e.g., an infrastructure import inside
the domain layer, a manually written HTTP call bypassing `packages/saasapp-apiclient`,
a UI screen that deviates from `design/` prototypes without justification) MUST be
justified in the plan's **Complexity Tracking** table before the PR is approved.

**Version**: 1.0.0 | **Ratified**: 2026-05-29 | **Last Amended**: 2026-05-29
