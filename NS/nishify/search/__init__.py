"""Search adapter abstraction for Nishify.

The concrete implementations (e.g., Elasticsearch) should implement the ``SearchAdapter`` protocol.
"""

from typing import Protocol, Dict, Any


class SearchAdapter(Protocol):
    """Protocol that all search adapters must follow.

    Methods are async because the underlying client may be async (e.g., ``elasticsearch-async``).
    """

    async def upsert(self, entity_name: str, doc_id: str, payload: Dict[str, Any]) -> None:
        """Create or update a document in the search index.

        Args:
            entity_name: Logical name of the entity (used to pick the index).
            doc_id: Unique identifier for the document.
            payload: JSON‑serialisable document body.
        """
        ...

    async def delete(self, entity_name: str, doc_id: str) -> None:
        """Delete a document from the search index.

        Args:
            entity_name: Logical name of the entity.
            doc_id: Identifier of the document to delete.
        """
        ...
