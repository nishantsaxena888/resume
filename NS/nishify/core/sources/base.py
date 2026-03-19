from typing import Any, Dict, List, Optional
from pydantic import BaseModel

class Filter(BaseModel):
    field: str
    op: str  # e.g., 'eq', 'gt', 'lt', 'in', 'contains'
    value: Any

class Sort(BaseModel):
    field: str
    direction: str = "asc"  # 'asc' or 'desc'

class Query(BaseModel):
    filters: Optional[List[Filter]] = None
    sorts: Optional[List[Sort]] = None
    page: int = 1
    size: int = 20
    q: Optional[str] = None  # Full-text search string

class ResultPage(BaseModel):
    items: List[Dict[str, Any]]
    total: int
    page: int
    size: int

class Source:
    """
    Abstract base class defining the 'Everything is a Source' contract.
    Any data provider (Postgres, Elastic, Amazon API, Redis, Firebase, etc.)
    must implement this interface for consistent CRUD.
    """

    def get(self, entity: str, doc_id: str) -> Optional[Dict[str, Any]]:
        raise NotImplementedError

    def list(self, entity: str, query: Query) -> ResultPage:
        raise NotImplementedError

    def create(self, entity: str, data: Dict[str, Any]) -> Dict[str, Any]:
        raise NotImplementedError

    def update(self, entity: str, doc_id: str, data: Dict[str, Any]) -> Dict[str, Any]:
        raise NotImplementedError

    def delete(self, entity: str, doc_id: str) -> None:
        raise NotImplementedError

    def options(self, entity: str) -> Dict[str, Any]:
        """Return the schema or metadata for building a UI form/table."""
        raise NotImplementedError
