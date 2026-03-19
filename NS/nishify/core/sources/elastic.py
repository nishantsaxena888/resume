from typing import Any, Dict, Optional
from nishify.core.sources.base import Source, Query, ResultPage
from elasticsearch import Elasticsearch

class ElasticSource(Source):
    """
    Elasticsearch Adapter. 
    Implements generic 'Everything is a Source' for Elasticsearch indexing and querying.
    """

    def __init__(self, dsn: str):
        self._es = Elasticsearch([dsn])

    def _ensure_index(self, entity: str):
        if not self._es.indices.exists(index=entity):
            self._es.indices.create(index=entity)

    def get(self, entity: str, doc_id: str) -> Dict[str, Any]:
        self._ensure_index(entity)
        try:
            res = self._es.get(index=entity, id=doc_id)
            return res["_source"]
        except Exception:
            raise KeyError(f"{entity} with id {doc_id} not found")

    def list(self, entity: str, query: Query) -> ResultPage:
        self._ensure_index(entity)
        
        # Simple match_all or query_string search
        es_query = {"query": {"match_all": {}}}
        if query.q:
            es_query = {"query": {"query_string": {"query": query.q}}}

        from_record = (query.page - 1) * query.size
        
        res = self._es.search(index=entity, body=es_query, from_=from_record, size=query.size)
        
        total = res["hits"]["total"]["value"]
        items = [hit["_source"] for hit in res["hits"]["hits"]]
        
        return ResultPage(
            items=items,
            total=total,
            page=query.page,
            size=query.size
        )

    def create(self, entity: str, data: Dict[str, Any]) -> Dict[str, Any]:
        self._ensure_index(entity)
        doc_id = data.get("id")
        if not doc_id:
            raise ValueError("Entity ID is required")
            
        self._es.index(index=entity, id=doc_id, document=data, refresh="wait_for")
        return data

    def update(self, entity: str, doc_id: str, data: Dict[str, Any]) -> Dict[str, Any]:
        self._ensure_index(entity)
        # Update using partial doc to handle merges
        self._es.update(index=entity, id=doc_id, body={"doc": data}, refresh="wait_for")
        return self.get(entity, doc_id)

    def delete(self, entity: str, doc_id: str) -> None:
        self._ensure_index(entity)
        try:
            self._es.delete(index=entity, id=doc_id, refresh="wait_for")
        except Exception:
            raise KeyError(f"{entity} with id {doc_id} not found")

    def options(self, entity: str) -> Dict[str, Any]:
        return {"entity": entity, "adapter": "elasticsearch"}
