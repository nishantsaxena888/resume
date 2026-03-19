# Nishify Studio

**Nishify Studio** is a **configuration‑first, schema‑driven platform** that turns JSON/YAML definitions into a fully‑featured business operating system.  It provides a reusable Python runtime, a versioned Options API, real‑time indexing, event‑driven architecture, and a premium React UI.

---

## Table of Contents
1. [Overview](#overview)
2. [Project Structure](#project-structure)
3. [Getting Started](#getting-started)
4. [Running the Core & API](#running-the-core--api)
5. [Running the UI](#running-the-ui)
6. [Running the Studio Editor (future)](#running-the-studio-editor-future)
7. [Testing](#testing)
8. [Architecture Highlights](#architecture-highlights)
9. [Contributing](#contributing)
10. [License](#license)

---

## Overview

Nishify Studio follows an **"Everything is a Source"** and **configuration‑first** philosophy. The ultimate goal is to provide a single, consistent entry point to run inventory and operations for the **Liquor, Restaurant, and Warehouse industries** (spanning from E‑Commerce to Warehouse to POS).

- **Everything is a Source:** Whether calling Postgres, an Amazon Commerce API, Elasticsearch, Redis, or S3, every system implements a consistent `Source` interface.
- **Unified CRUD:** The API contract is always identical, whether hitting a local database or remote microservice.
- **Deep Authorization:** An extensible, hierarchical permission system (ready for penetration-testing) handles exactly who can modify what entities.
- **Built-In Accounting & Auditing:** Real-time dual-entry accounting and comprehensive audit monitoring are embedded into the mutation process.
- **Schema Validation:** JSON Schemas in `schemas/` validate every configuration at **studio‑time**, **load‑time**, **compose‑time**, and **runtime**.
- **Real-Time Indexing:** Event-driven worker architecture instantly synchronizes relational writes directly to Elasticsearch.

---

## Project Structure
```
.
├── README.md                # This file
├── clients/                 # Client‑specific configuration (JSON/YAML)
│   └── <client>/            # e.g. example_client, skillom
├── docs/                    # Architecture & foundational docs
├── nishify-core/            # Python runtime package
│   └── nishify/            # Core modules (api, core/runtime)
├── nishify-ui/              # Vite + React frontend (premium UI scaffold)
├── schemas/                 # JSON‑Schema contracts for all domains
├── studio/                  # Future visual config editor (Studio)
├── tests/                   # Pytest suite (100 % coverage enforced)
├── requirements.txt         # Python dev dependencies
└── pytest.ini               # Test runner configuration
```

---

## Getting Started
### Prerequisites
- **Python 3.11+**
- **Node 20+** and **npm**
- **Docker** (optional, for Elasticsearch, Kafka, etc.)

### Install Python dependencies
```bash
cd /Users/nishantsaxena/workspace/nishify-studio
pip install -r requirements.txt
# Install the core package in editable mode
pip install -e nishify-core
```

### Environment Variable Setup (.env)
Before running any services, you must create a local `.env` file to hold your database passwords and superadmin credentials.

1.  Copy the provided backup template to initialize your local environment vars:
    ```bash
    cp bak.env .env
    ```
2.  Open the `.env` file and observe the following configurations:
    -   `POSTGRES_PASSWORD`: The password for your local Postgres database.
    -   `SUPERADMIN_USER`: Configured as `superadmin` by default.
    -   `SUPERADMIN_PASSWORD`: Configured as `studio_admin_token_2026_xyz` by default.

> ⚠️ **CRITICAL DEPLOYMENT WARNING**: 
> The `SUPERADMIN_USER` and `SUPERADMIN_PASSWORD` in `bak.env` are purely boilerplate configurations for local testing. **You MUST change these values in your `.env` file before deploying to a live server**, otherwise your infrastructure will be completely compromised.

> **Note:** The `.env` file is heavily `.gitignore`'d and should never be committed to version control.

### Start Backend Services (Postgres & Elasticsearch)
To use the fully featured "Everything is a Source" architecture with real databases, start the Docker containers:
```bash
docker compose up -d
```
This will start:
- **Postgres** on port `5433` (Data persists in `./pg_data`)
- **Elasticsearch** on port `9201` (Data persists in `./es_data`)

### Install UI dependencies
```bash
cd nishify-ui
npm install
```

---

## Running the Core & API
To start the FastAPI server running the core runtime:
```bash
uvicorn nishify.api.app:app --reload --port 8000
```
This serves the generic Options CRUD APIs mapping to your data sources.

### Accessing the Studio Admin Dashboard
Once the server is running, the **Nishify Studio Admin Dashboard** is served at the root URL:
👉 **[http://localhost:8000/](http://localhost:8000/)**

To log into the dashboard:
1. Open the file `token.md` in the root directory.
2. Copy the token inside securely.
3. Paste it into the Login modal.

From the Dashboard, you can change your active `SourceRouter` backend (InMemory, Postgres, Elasticsearch) and directly execute generic CRUD mutations.
The pure API documentation is also available at `http://localhost:8000/docs` (OpenAPI UI).

---

## Running the Control Center UI (React)
The frontend connects the React UI to the FastAPI backend backend.  
There are currently *two* UI folders in the project repository due to a migration: `nishify-frontend` (Vite) and `nishify.io` (Next.js multi-tenant platform).

To run the primary Next.js multi-tenant dashboard:
```bash
cd nishify.io
npm run dev -- -p 4001
```
This boots the Next.js server on **Port `4001`**: 👉 **[http://localhost:4001/admin/login](http://localhost:4001/admin/login)**

### Infrastructure Ports Summary
When the entire stack (Docker + API + UI) is running locally, your host machine will have exactly **four** network ports exposed: 
1.  **`4001`** - Next.js UI Dashboard.
2.  **`8000`** - FastAPI Backend.
3.  **`5433`** - PostgreSQL Database (useful for connecting DBeaver/PgAdmin). 
4.  **`9201`** - Elasticsearch Cluster.

- **SuperAdmin Access:** Log in using the `SUPERADMIN_PASSWORD` defined in your `.env` file to unlock the multi-tenant `Advanced Settings` page and view infrastructure schemas.
- **Client Admin Access:** Log in with any standard client credential combination (like `demo/demo`) to view sandbox testing environments.

## Running the Studio Editor (future)
`studio/` is a placeholder for the upcoming web‑based configuration editor. When implemented, it will provide:
- Schema‑driven JSON editing with live validation.
- Real‑time preview of Options API responses.
- Promotion workflow (draft → staging → production) with audit diffs.

---

## Testing
All tests live under `tests/` and must pass with **100 % coverage**.
```bash
pytest -q
# Generate an HTML coverage report
pytest --cov=nishify-core --cov-report=html
```
Open `htmlcov/index.html` in a browser to explore coverage details.

---

## Architecture Highlights
- **"Everything is a Source"**: the system is completely oblivious to underneath storage, whether it’s PostgreSQL, Elasticsearch, Amazon API, or Firebase. It all implements `sources.base`.
- **Advanced Auth System**: Fine-grained, declarative permissions determining "who can do what on what entities" logic.
- **Audit & Accounting Core**: Integrated seamlessly across all endpoints.
- **Configuration‑first**: business logic lives in JSON/YAML, not hard‑coded code.
- **Validation Wall**: six layers of schema validation (studio, load, compose, runtime, event, index).
- **Event‑Driven**: entity mutations emit events to an abstract bus; async workers handle indexing, audit, and integrations.
- **Cloud‑Agnostic**: no vendor‑specific SDKs in core; providers are selected via configuration.
- **Premium UI**: Vite + React with glass‑morphism, dark mode, and micro‑animations per design policy.
- **Dynamic Frontend Schemas**: Fully resolved Next.js SSR `fetch` caching and validation coercion issues across 35+ dynamic Entity Mock configurations inside client pipelines.

---

## Contributing
1. Fork the repository.
2. Create a feature branch (`git checkout -b feat/awesome-feature`).
3. Write tests for any new functionality.
4. Ensure `pytest` passes with 100 % coverage.
5. Open a Pull Request with a clear description of the change.

Please follow the code style enforced by `ruff` and keep documentation up‑to‑date.

---

## License
This project is licensed under the **MIT License** – see the `LICENSE` file for details.

---

*Happy hacking!*
