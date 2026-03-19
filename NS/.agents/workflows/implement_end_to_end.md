# Workflow – Implement End‑to‑End Product for Nishify

---

## Description
Create a fully functional end‑to‑end system consisting of:
1. Real‑time Elasticsearch indexing.
2. FastAPI Options API with CRUD routes.
3. Premium React UI consuming the API.
4. Studio visual editor for client configs.

Each step is tracked in the **Task Table** (see `prompt.md`). The workflow marks progress, requests your approval before moving to the next major milestone, and finally marks the whole product as *Tested*.

---

## Steps

1. **Add Search Adapter**
   - Create `nishify/search/__init__.py` with `SearchAdapter` protocol.
   - Create `nishify/search/elastic.py` implementing the protocol using the `elasticsearch` Python client.
   // turbo
   - Update `requirements.txt` to include `elasticsearch`.

2. **Implement Event Bus**
   - Add lightweight in‑memory queue in `nishify/core/runtime/event_bus.py`.
   - Provide `publish(event: dict)` and `subscribe(callback)` helpers.

3. **Create Async Worker**
   - Add `nishify/search/worker.py` that consumes events from the bus and calls the appropriate `SearchAdapter` methods.
   - Register the worker to start on package import (for dev mode).

4. **Expand FastAPI Layer**
   - Add routers in `nishify/api/entity.py` for CRUD operations.
   - On each mutation, publish an `entity_updated` event.
   - Optionally perform inline indexing based on client config.
   // turbo
   - Install FastAPI and Uvicorn (`pip install fastapi uvicorn`).

5. **Build Premium UI**
   - Add React components in `nishify-ui/src/`:
     * `EntityList.tsx`, `EntityForm.tsx`, `SearchBar.tsx`.
   - Apply glass‑morphism styling, dark mode, and micro‑animations.
   - Connect to the API endpoints.

6. **Develop Studio Editor**
   - Scaffold a minimal React/Electron (or web) app under `studio/` that loads client JSON/YAML, validates against schemas, and writes back changes.
   - Use the same `SearchAdapter` config UI for search settings.

7. **Testing**
   - Unit tests for adapter (`tests/search/test_elastic.py`).
   - Integration test that creates an entity via API, checks Elasticsearch for the document, and verifies UI reflects it.
   - Cypress end‑to‑end tests for the UI.

8. **Documentation & Approval**
   - Update `README.md` with end‑to‑end run instructions.
   - Ask for your approval before marking the product as *Tested*.

---

## Progress Markers

- **In‑Progress**: Steps 1‑4 (core backend).
- **Ready for Review**: After completing step 4, request your review.
- **Tested**: After steps 5‑8 pass.

---

*When a step is completed, the corresponding status in `prompt.md` will be updated automatically.*
