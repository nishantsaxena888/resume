# Nishify Studio: Architecture & Implementation Tracking

This prompt file strictly tracks the *actual* implementation state of the Nishify platform to prevent hallucination across LLM sessions.

## 🌟 Core Product Vision
The ultimate goal of Nishify is to provide a single point of inventory management and operations for the **Liquor, Restaurant, and Warehouse industries** (spanning E-Commerce → Warehouse → POS).

**Architectural Principle:** "Everything is a Source"
The system must be completely oblivious to its storage mechanism. Every database (Postgres, Elastic, Firebase, Amazon API, etc.) implements a unified `Source` interface, and the API contract remains identical.

---

## ✅ Phase 1: Completed Integrations (Current State)

We have successfully overhauled the backend to support the enterprise-grade "Everything is a Source" architecture.

1. **Unified Interface (`core/sources/base.py`)**
   - Implemented `Source` abstract base class defining `get`, `list`, `create`, `update`, `delete`, and `options`.

2. **Source Adapters Created**
   - `MemorySource`: For instant dev prototyping.
   - `PostgresSource`: Persists schema-less JSONB records dynamically via SQLAlchemy.
   - `ElasticSource`: Manages Elasticsearch indices and handles full-text queries.

3. **Orchestrator Pattern (`core/sources/router.py`)**
   - Implemented `SourceRouter` as the centralized gateway. 
   - Dynamically resolves API calls to the correct underlying source.
   - Built-in stubs for `_enforce_tenant_authorization()` and `_trigger_audit()`.

4. **Dynamic FastAPI Endpoints (`api/entity.py`)**
   - Completely deleted hardcoded API endpoints. All CRUD actions now hit `/{entity}/{doc_id}` natively, drastically reducing boilerplate code.

5. **Pioneer Client Initialization**
   - Simulated `warehouse`, `importer`, `retailer`, and `smoke_company` tables natively operating under this generic routing schema.

6. **Automated Admin Dashboard (`api/ui_routes.py`)**
   - Created a low-code Vue3/Tailwind Admin UI internally served by FastAPI.
   - Includes real-time dropdowns to shift the active REST API backend source between InMemory, Postgres, or Elasticsearch.
   - Includes a secure token-gate reading exclusively from `token.md`.

7. **Docker Database Infrastructure**
   - Added `docker-compose.yml` defining isolated PostgreSQL (`5433`) and Elasticsearch (`9201`) clusters.
   - Successfully spun up and connected the `SourceRouter` to these live docker instances.

---

## ✅ Phase 2: Completed SuperAdmin Control Center

We completely restructured the React frontend (`nishify-frontend` on port `5173`) into a master **Control Center** mimicking the exact out-of-the-box UI generation found in the legacy `nishify.io` codebase (`AdminShell.tsx`).

1. **Dual Scopes (SuperAdmin vs Client):**
   - Implemented a global SuperAdmin login using `studio_admin_token_2026_xyz`.
   - SuperAdmins see global routing metrics ("Everything is a Source" badges showing Elasticsearch vs Postgres), while regular clients see out-of-the-box data entry forms.
2. **Dynamic Client Selection:** 
   - SuperAdmin can swap out active clients ("Pioneer") natively in the UI header.
3. **Implicit Authorization & Auditing:** 
   - UI and Backend inherently block access unless the token matches the needed roles.
4. **Live JSON Schema Editor:** 
   - The React UI provides a direct textarea to edit the Python `entities.py` dictionary. Hitting save writes to the actual Python file and hot-reloads the Uvicorn application on the fly.

---

## 🚀 Phase 3: In-Progress (What We Are Doing Now)

1. **Schema Dynamic Caching & Overrides**
   - **COMPLETED:** Solved Next.js SSR Cache Poisoning where `options` API would memoize empty array 404s. `api.ts` now enforces `no-store`.
   - **COMPLETED:** Extracted 35+ legacy mock JSON schemas into fully typed native Python Postgres options inside `nishify/clients/pioneer_wholesale_inc/entities.py`.
   
2. **React Form Normalization Updates**
   - **COMPLETED:** Repaired `GenericForm.tsx` aggressive validation coersion that was unintentionally stripping out alphanumeric backend KSUIDs (`17723194645240nlz2rf`) into strict numbers, leading to false-positive `Required` errors on valid dropdown payloads.

3. **Deep Authorization Pipeline (RBAC)**
   - Fully implement the logic inside `_enforce_tenant_authorization()` to apply the hierarchical role logic stored in configs. Test this by logging into the React UI as different `User` roles.

4. **Double-Entry Accounting Built-ins**
   - Introduce accounting validation directly into `SourceRouter.create()` and `SourceRouter.update()` based on entity options.

5. **Event Bus & Search Sync**
   - Finalizing the `event_bus.py` `publish()` hook to directly write-through from Postgres into the Elasticsearch worker indexing system.
