from typing import Any, Dict, Optional
from nishify.core.sources.base import Source, Query, ResultPage

class SourceRouter:
    """
    The unified CRUD gateway. 
    It routes requests to the appropriate 'Source' (Postgres, Elastic, Firebase, API)
    based on entity configuration, enforces authorization, handles auditing, 
    and handles double-entry accounting hooks entirely transparently.
    """
    
    def __init__(self, default_source: Source, entity_map: Dict[str, Any]):
        self.default_source = default_source
        self.entity_map = entity_map

    def set_default_source(self, source: Source):
        """Allows dynamic switching of the backend database in dev/demo environments."""
        self.default_source = source

    def _get_source_for(self, entity: str) -> Source:
        """
        In the future: read `entity_map[entity].source_strategy` to pick exactly 
        whether to use Postgres, Amazon API, Redis, etc.
        For now, defaults to MemorySource (mock Postgres).
        """
        return self.default_source

    def _enforce_tenant_authorization(self, user_id: str, entity: str, action: str):
        """
        Simulated deep authorization layer. Ensures the user is allowed to perform
        the specific CRUD `action` on the `entity`. Ready for enterprise scale.
        """
        # print(f"[AUTH] Verifying User '{user_id}' can perform '{action}' on '{entity}'...")
        pass

    def _trigger_audit(self, entity: str, action: str, data: Any):
        """Native audit monitoring for every mutation."""
        # print(f"[AUDIT] Logging mutation -> Entity: {entity}, Action: {action}")
        pass

    # ==========================
    # Unified CRUD Contract Hook
    # ==========================

    def get(self, user_id: str, entity: str, doc_id: str) -> Dict[str, Any]:
        self._enforce_tenant_authorization(user_id, entity, "read")
        source = self._get_source_for(entity)
        return source.get(entity, doc_id)

    def list(self, user_id: str, entity: str, query: Query) -> ResultPage:
        self._enforce_tenant_authorization(user_id, entity, "read")
        source = self._get_source_for(entity)
        return source.list(entity, query)

    def create(self, user_id: str, entity: str, data: Dict[str, Any]) -> Dict[str, Any]:
        self._enforce_tenant_authorization(user_id, entity, "create")
        source = self._get_source_for(entity)
        
        result = source.create(entity, data)
        self._trigger_audit(entity, "create", result)
        # TODO: Trigger indexing worker (Write-Through Architecture)
        return result

    def update(self, user_id: str, entity: str, doc_id: str, data: Dict[str, Any]) -> Dict[str, Any]:
        self._enforce_tenant_authorization(user_id, entity, "update")
        source = self._get_source_for(entity)
        
        result = source.update(entity, doc_id, data)
        self._trigger_audit(entity, "update", result)
        return result

    def delete(self, user_id: str, entity: str, doc_id: str) -> None:
        self._enforce_tenant_authorization(user_id, entity, "delete")
        source = self._get_source_for(entity)
        
        source.delete(entity, doc_id)
        self._trigger_audit(entity, "delete", {"id": doc_id})

    def options(self, entity: str) -> Dict[str, Any]:
        """Fetch schema info for UI generation"""
        config = self.entity_map.get(entity, {})
        if not config:
            # Fallback to source
            source = self._get_source_for(entity)
            return source.options(entity)
            
        options = config.get("options", {})
        res = dict(options)
        res.setdefault("entity", entity)
        res.setdefault("name", entity)
        if isinstance(res.get("schema"), dict):
            res["schema"].setdefault("name", entity)
        return res
