"""Elasticsearch adapter implementation for Nishify.

This module provides a concrete ``SearchAdapter`` that talks to an Elasticsearch
cluster using the official ``elasticsearch`` Python client. It reads the client
configuration from the ``Registry`` (which stores the loaded JSON/YAML config
under ``search.elastic``) and creates an ``Elasticsearch`` instance.
"""

import os
from typing import Dict, Any
from elasticsearch import Elasticsearch, ElasticsearchException
from . import SearchAdapter


class ElasticAdapter:
    """Concrete implementation of :class:`SearchAdapter` for Elasticsearch.

    The adapter expects the following configuration structure in the registry:

    ```json
    {
        "provider": "elastic",
        "hosts": ["http://localhost:9200"],
        "auth": {"username": "user", "password": "pass"},
        "index_prefix": "nishify"
    }
    ```
    """

    def __init__(self, config: Dict[str, Any]):
        hosts = config.get("hosts", ["http://localhost:9200"])
        auth = config.get("auth", {})
        self.index_prefix = config.get("index_prefix", "nishify")
        self.client = Elasticsearch(hosts=hosts, basic_auth=(auth.get("username"), auth.get("password")) if auth else Elasticsearch(hosts=hosts)

    def _index_name(self, entity_name: str) -> str:
        return f"{self.index_prefix}_{entity_name}".lower()

    async def upsert(self, entity_name: str, doc_id: str, payload: Dict[str, Any]) -> None:
        index = self._index_name(entity_name)
        try:
            # ``index`` will create the index if it does not exist.
            self.client.index(index=index, id=doc_id, document=payload, refresh="wait_for")
        except ElasticsearchException as exc:
            raise RuntimeError(f"Failed to upsert document {doc_id} in {index}: {exc}")

    async def delete(self, entity_name: str, doc_id: str) -> None:
        index = self._index_name(entity_name)
        try:
            self.client.delete(index=index, id=doc_id, refresh="wait_for")
        except ElasticsearchException as exc:
            # If the document does not exist, ignore the error.
            if getattr(exc, "status_code", None) != 404:
                raise RuntimeError(f"Failed to delete document {doc_id} from {index}: {exc}")
