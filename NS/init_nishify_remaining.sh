#!/usr/bin/env bash
set -e

echo "🚀 Initializing remaining Nishify structure (backend, schemas, tests, docs)"

########################################
# Backend: nishify-core (Platform Engine)
########################################

mkdir -p nishify-core/nishify

# Core platform layers (DDD)
mkdir -p nishify-core/nishify/core/{domain,runtime,options,iam,accounting,audit,search,events,auth,registry}

# Cloud-agnostic adapters
mkdir -p nishify-core/nishify/core/adapters/{events,search,auth,storage}

# API layer (FastAPI routers)
mkdir -p nishify-core/nishify/api/{options,entities,auth,search,audit}

# Init files
touch nishify-core/nishify/__init__.py
touch nishify-core/nishify/core/__init__.py
touch nishify-core/nishify/api/__init__.py

# Backend README
cat <<'EOF' > nishify-core/README.md
# Nishify Core (Backend)

This is the **platform runtime** of Nishify.

Responsibilities:
- Load & validate client configuration (CDD)
- Enforce domain rules (DDD)
- Serve Options API (UI contract)
- Execute accounting, IAM, audit, search, events
- Remain cloud-agnostic via adapters

⚠️ No UI logic lives here.
⚠️ No client-specific behavior is hardcoded.
EOF

########################################
# Schemas (CDD Constitution)
########################################

mkdir -p schemas

for schema in entity relation iam auth accounting options view search events pagination
do
cat <<EOF > schemas/${schema}.schema.json
{
  "\$schema": "https://json-schema.org/draft/2020-12/schema",
  "\$id": "nishify/${schema}.schema.json",
  "title": "Nishify ${schema} schema",
  "type": "object",
  "description": "Base schema for ${schema}. This file defines the contract and must be versioned carefully.",
  "additionalProperties": true
}
EOF
done

cat <<'EOF' > schemas/README.md
# Nishify Schemas (Configuration Constitution)

These JSON Schemas define the **law of the platform**.

Everything configurable in Nishify must:
1. Conform to a schema
2. Be validated before runtime
3. Be consumable by Studio & runtime

Changing schemas = changing platform contracts.
EOF

########################################
# Clients (Configuration Only)
########################################

mkdir -p clients/example_client/{entities,relations,iam,auth,accounting,search,events,views,schemas}

cat <<'EOF' > clients/example_client/README.md
# Example Client

This folder represents a **pure configuration client**.

Rules:
- Only JSON / declarative config
- No business logic
- No infrastructure code

Used for:
- Local development
- Schema evolution
- Studio testing
EOF

########################################
# Tests (TDD Enforcement)
########################################

mkdir -p tests/{schemas,options,domain,runtime,adapters}

cat <<'EOF' > tests/README.md
# Nishify Tests (TDD)

Tests are mandatory.

Order of importance:
1. Schema validation tests
2. Options API contract tests
3. Domain rule tests (IAM, accounting)
4. Runtime behavior tests
5. Adapter isolation tests

No feature is complete without tests.
EOF

########################################
# Studio (Future UI Editor)
########################################

mkdir -p studio/{frontend,backend}

cat <<'EOF' > studio/README.md
# Nishify Studio

Studio is the **configuration editor** for Nishify.

It:
- Edits validated JSON config
- Uses the same Options API as production UI
- Never bypasses schemas
- Never embeds business logic

Studio evolves alongside the platform.
EOF

########################################
# Docs
########################################

mkdir -p docs

cat <<'EOF' > docs/FOUNDATION.md
# Nishify Foundation

This document freezes:
- DDD (Domain Driven Design)
- CDD (Configuration Driven Development)
- TDD (Test Driven Development)
- Cloud-agnostic architecture
- Validation wall

This file should be treated as immutable.
EOF

cat <<'EOF' > docs/ARCHITECTURE.md
# Nishify Architecture

High-level system design:
- Platform core
- Clients as config
- Options API as UI contract
- Adapters for cloud providers
- Studio as config IDE
EOF

########################################
# Root README (append safely)
########################################

cat <<'EOF' >> README.md

## Repository Structure

- `nishify-ui/` → React UI + Studio frontend (renderer only)
- `nishify-core/` → Backend platform runtime
- `schemas/` → JSON Schema constitution (CDD)
- `clients/` → Client-specific configuration
- `tests/` → TDD enforcement
- `studio/` → Configuration editor (future)
- `docs/` → Architecture & foundation docs
EOF

echo "✅ Nishify remaining structure created successfully."
echo "📌 Existing nishify-ui untouched."

