"""FastAPI application entry point for Nishify.

Provides CRUD endpoints for entities and publishes ``entity_updated`` events
to the in‑memory event bus. The worker defined in ``nishify/search/worker.py``
consumes these events and updates the Elasticsearch index.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from contextlib import asynccontextmanager

from .entity import router as entity_router
from .ui_routes import ui_router
from .auth import router as auth_router
from .bootstrapper import run_bootstrapper, GLOBAL_SCHEMA_CACHE

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Run bootstrapper before the server starts accepting requests
    run_bootstrapper()
    yield

app = FastAPI(title="Nishify Options API", version="0.1.0", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origin_regex=".*",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(ui_router, tags=["ui"])
app.include_router(auth_router, prefix="/auth", tags=["auth"])
app.include_router(entity_router, prefix="/api", tags=["entities"])

@app.get("/health", tags=["health"])
async def health_check():
    return {"status": "ok"}

@app.get("/client-config", tags=["config"])
async def get_client_config(client: str):
    """Dynamically serve the React frontend configuration for a given client."""
    from fastapi import HTTPException
    client_data = GLOBAL_SCHEMA_CACHE.get(client)
    if not client_data:
        raise HTTPException(status_code=404, detail="Client not found")
        
    config = client_data.get("config", {})
    return config

@app.get("/clients", tags=["config"])
async def get_clients():
    """Return a list of all dynamically loaded clients."""
    return list(GLOBAL_SCHEMA_CACHE.keys())
