"""In‑memory event bus for Nishify.

A very small publish/subscribe implementation based on ``asyncio.Queue``.
It is used by the API layer to emit ``entity_updated`` events and by the
search worker to consume them.
"""

import asyncio
from typing import Callable, Awaitable, Dict, Any

# Global queue – in a real system this could be replaced by Kafka, SQS, etc.
_event_queue: asyncio.Queue[Dict[str, Any]] = asyncio.Queue()


def publish(event: Dict[str, Any]) -> None:
    """Publish an event to the bus.

    The function is synchronous because putting an item onto an ``asyncio.Queue``
    is thread‑safe and non‑blocking.
    """
    _event_queue.put_nowait(event)


async def subscribe(callback: Callable[[Dict[str, Any]], Awaitable[None]]) -> None:
    """Consume events forever, invoking ``callback`` for each one.

    This helper is convenient for the worker implementation – it simply loops
    over the queue and awaits the user‑provided coroutine.
    """
    while True:
        event = await _event_queue.get()
        try:
            await callback(event)
        finally:
            _event_queue.task_done()


def get_queue() -> asyncio.Queue[Dict[str, Any]]:
    """Expose the raw queue for advanced use‑cases (e.g., testing)."""
    return _event_queue
