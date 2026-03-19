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
