from typing import Dict, Any, List
from .base import Source, Query, ResultPage

class MemorySource(Source):
    """
    A simple in-memory data store using dictionaries for development and testing.
    Proves the abstraction of 'Everything is a Source'.
    """

    def __init__(self, store: Dict[str, Dict[str, Any]]):
        self._store = store
        
    def _ensure_entity_exists(self, entity: str):
        if entity not in self._store:
            self._store[entity] = {}
            
    def get(self, entity: str, doc_id: str) -> Dict[str, Any]:
        self._ensure_entity_exists(entity)
        item = self._store[entity].get(doc_id)
        if not item:
            raise KeyError(f"{entity} with id {doc_id} not found")
        return item

    def list(self, entity: str, query: Query) -> ResultPage:
        self._ensure_entity_exists(entity)
        items = list(self._store[entity].values())
        
        # Naive filtering (simulating Postgres where/Elasticsearch filter)
        if hasattr(query, 'filters') and query.filters:
            for f in query.filters:
                if f.op == 'eq':
                    items = [i for i in items if i.get(f.field) == f.value]
                elif f.op == 'in':
                    items = [i for i in items if i.get(f.field) in f.value]
        
        # Example naive full-text search simulation
        if query.q:
            items = [i for i in items if query.q.lower() in str(i).lower()]

        # Pagination
        start = (query.page - 1) * query.size
        end = start + query.size
        
        return ResultPage(
            items=items[start:end],
            total=len(items),
            page=query.page,
            size=query.size
        )

    def create(self, entity: str, data: Dict[str, Any]) -> Dict[str, Any]:
        self._ensure_entity_exists(entity)
        doc_id = data.get("id")
        if not doc_id:
            raise ValueError("Entity creation requires an 'id' field in this implementation")
        
        if doc_id in self._store[entity]:
            raise ValueError(f"Entity with id {doc_id} already exists")
            
        self._store[entity][doc_id] = data
        return data

    def update(self, entity: str, doc_id: str, data: Dict[str, Any]) -> Dict[str, Any]:
        self._ensure_entity_exists(entity)
        if doc_id not in self._store[entity]:
            raise KeyError(f"{entity} with id {doc_id} not found")
            
        # Merge properties
        self._store[entity][doc_id].update(data)
        
        # Ensure id didn't get overwritten incorrectly (naive safety)
        self._store[entity][doc_id]["id"] = doc_id
        return self._store[entity][doc_id]

    def delete(self, entity: str, doc_id: str) -> None:
        self._ensure_entity_exists(entity)
        if doc_id not in self._store[entity]:
            raise KeyError(f"{entity} with id {doc_id} not found")
        del self._store[entity][doc_id]
        
    def options(self, entity: str) -> Dict[str, Any]:
        """Provides schema dynamically for the UI. (Mocked for now)."""
        return {"entity": entity, "schema": []}
