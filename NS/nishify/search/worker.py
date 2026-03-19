"""Search worker that consumes entity events and updates the search index.

The worker runs an infinite async loop subscribing to the in‑memory event bus
(`nishify.core.runtime.event_bus`). For each ``entity_updated`` event it
instantiates the appropriate ``SearchAdapter`` (currently only Elasticsearch)
and calls ``upsert`` or ``delete`` based on the ``operation`` field.
"""

import asyncio
from typing import Dict, Any

from ..core.runtime.event_bus import subscribe
from ..search.elastic import ElasticAdapter
from ..core.runtime.registry import EntityRegistry

# Simple global registry of adapters per client configuration.
# In a real system this would be built from the loaded client config.
_adapter_cache: Dict[str, ElasticAdapter] = {}


def get_adapter(config: Dict[str, Any]):
    """Return a cached adapter for the given config or create a new one."""
    key = str(config)
    if key not in _adapter_cache:
        _adapter_cache[key] = ElasticAdapter(config)
    return _adapter_cache[key]


async def _process_event(event: Dict[str, Any]):
    """Handle a single event.

    Expected event format::
        {
            "type": "entity_updated",
            "entity_name": "product",
            "doc_id": "123",
            "operation": "upsert" | "delete",
            "payload": { ... }  # only for upsert
            "search_config": { ... }  # elastic config dict
        }
    """
    if event.get("type") != "entity_updated":
        return
    adapter = get_adapter(event["search_config"])
    if event["operation"] == "upsert":
        await adapter.upsert(event["entity_name"], event["doc_id"], event["payload"])
    elif event["operation"] == "delete":
        await adapter.delete(event["entity_name"], event["doc_id"])
    else:
        raise ValueError(f"Unsupported operation {event['operation']}")


async def start_worker():
    """Entry point to start the background worker.

    Call this from the FastAPI startup event or from a manual script.
    """
    await subscribe(_process_event)

# For convenience when running this module directly.
if __name__ == "__main__":
    asyncio.run(start_worker())
