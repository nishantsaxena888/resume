# Implementation Plan: Advanced "Everything is a Source" Architecture

## 1. Goal Description

The objective is to combine the best of both worlds:
1. The **Advanced Configuration payload mechanism** from the existing `nishify.io` (where clients, entities, relationships like 1:N or M:N, S3 storage mappings, and real-time elastic indexing are purely defined in configurations within a `clients/` directory).
2. The massive flexibility of our new **"Everything is a Source" pattern** (combining PostgreSQL, Memory, and Elasticsearch dynamically through `SourceRouter`).

Simultaneously, we want the current Admin Dashboard (`http://localhost:8000`) to evolve into a command center. It will render `prompt.md` to cleanly display our real-time progress roadmap (what is done, what is active, what is next) directly in the UI. Furthermore, the dashboard will expand to support multiple users logging in securely, allowing testing of strict role-based access control (RBAC) across these dynamic entities.

**There are no immediate User Review Required blockers.** This is a direct alignment with the unified vision.

---

## 2. Proposed Changes

We will tackle this incredibly powerful system in modular steps.

### Phase A: Architecture Restructuring (The `clients/` Folder)

We need to introduce the configuration-first folder structure into `nishify-studio`.

#### [NEW] `nishify/clients/pioneer/entities.py`
This file will be the pure Python dictionary source of truth for the Pioneer client.
- It will define the schemas for (`warehouse`, `retailer`, `smoke_company`, `user`).
- Crucially, it will define **where** each field belongs: 
  - e.g., "The `image` field uses `source: s3`".
  - e.g., "The `retailer` entity is fully indexed in Elasticsearch (real-time)".
  - e.g., "Many-to-Many configurations (e.g. users to groups)".

#### [MODIFY] `nishify/core/sources/router.py`
- We will upgrade the `SourceRouter.options()` method to ingest the new `entities.py` dictionaries and dynamically serialize them into the exact JSON schema payload expected by your low-code React frontend.
- `router.py` will also be taught how to read the `source: ...` configuration of a field or entity to natively route data to Postgres, S3, or Elastic individually.

---

### Phase B: The Command Center Dashboard

We will transform our current simple Python template UI into a beautiful central hub tracking our own progress.

#### [MODIFY] `nishify/api/ui_routes.py`
- We will update the HTML template to explicitly read and format `prompt.md` using marked.js. This will create a stunning "Project Roadmap & Active Status" section right on the homepage of the dashboard.
- As we complete parts of Phase A, the Vue frontend will cleanly reflect those changes in its own table dynamically.

---

### Phase C: React Frontend Initialization & User Auth

#### [NEW] `nishify-studio/frontend/`
- As requested, I will initialize a brand new, clean React (Vite/Tailwind) project that will specifically serve as the end-user login and dashboard.
- This dedicated React app will start with a simple Login gate.
- Once authenticated, it will use the `/options` endpoint from our FastAPI backend to dynamically generate the Role-Based UI for that specific user.

## 3. Verification Plan

### Automated Tests
- The existing `test_api.py` will expand to ensure that creating a record successfully respects the rules set in `clients/pioneer/entities.py`. If we say a field goes to S3, the test will verify it doesn't accidentally hit Postgres.

### Manual Verification
- The Web Dashboard (`http://localhost:8000`) will visually confirm that the `prompt.md` roadmap is rendering perfectly.
- You will be able to log into the new React Frontend and test adding a user, seeing the RBAC system block unauthorized entities.
