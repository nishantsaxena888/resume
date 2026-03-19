import json
from typing import Any, Dict, Optional
from nishify.core.sources.base import Source, Query, ResultPage

from sqlalchemy import create_engine, MetaData, Table, Column, String, JSON, select, insert, update, delete
from sqlalchemy.engine import Engine

class PostgresSource(Source):
    """
    Generic Postgres Adapter for schema-less / dynamic JSON data.
    Under 'Everything is a Source', all entities store their data into 
    generic JSONB / JSON tables automatically handled by this Source.
    """

    def __init__(self, dsn: str):
        self._engine: Engine = create_engine(dsn)
        self._metadata = MetaData()
        self._tables: Dict[str, Table] = {}

    def _ensure_table(self, entity: str) -> Table:
        if entity not in self._tables:
            # We use a simple 2-column table for dynamic generic CRUD: 
            # (id: String(PK), data: JSON)
            table = Table(
                entity,
                self._metadata,
                Column("id", String, primary_key=True),
                Column("data", JSON, nullable=False)
            )
            # Create if it doesn't exist
            self._metadata.create_all(self._engine, tables=[table])
            self._tables[entity] = table
        return self._tables[entity]

    def get(self, entity: str, doc_id: str) -> Dict[str, Any]:
        table = self._ensure_table(entity)
        with self._engine.connect() as conn:
            stmt = select(table.c.data).where(table.c.id == doc_id)
            row = conn.execute(stmt).first()
            if not row:
                raise KeyError(f"{entity} with id {doc_id} not found")
            return row[0]

    def list(self, entity: str, query: Query) -> ResultPage:
        table = self._ensure_table(entity)
        with self._engine.connect() as conn:
            # Count total
            total = conn.execute(select(table)).rowcount  # Naive total for generic testing
            
            # Simple list query without advanced JSON filters for now
            stmt = select(table.c.data).limit(query.size).offset((query.page - 1) * query.size)
            rows = conn.execute(stmt).fetchall()
            
            return ResultPage(
                items=[row[0] for row in rows],
                total=total,
                page=query.page,
                size=query.size
            )

    def create(self, entity: str, data: Dict[str, Any]) -> Dict[str, Any]:
        table = self._ensure_table(entity)
        doc_id = data.get("id")
        if not doc_id:
            raise ValueError("Entity ID is required")
            
        with self._engine.begin() as conn:
            stmt = insert(table).values(id=doc_id, data=data)
            conn.execute(stmt)
        return data

    def update(self, entity: str, doc_id: str, data: Dict[str, Any]) -> Dict[str, Any]:
        table = self._ensure_table(entity)
        # Fetch current to merge natively
        current = self.get(entity, doc_id)
        current.update(data)
        current["id"] = doc_id
        
        with self._engine.begin() as conn:
            stmt = update(table).where(table.c.id == doc_id).values(data=current)
            conn.execute(stmt)
        return current

    def delete(self, entity: str, doc_id: str) -> None:
        table = self._ensure_table(entity)
        with self._engine.begin() as conn:
            stmt = delete(table).where(table.c.id == doc_id)
            res = conn.execute(stmt)
            if res.rowcount == 0:
                raise KeyError(f"{entity} with id {doc_id} not found")

    def options(self, entity: str) -> Dict[str, Any]:
        return {"entity": entity, "adapter": "postgres"}
