import json
from pathlib import Path
from jsonschema import Draft202012Validator
from referencing import Registry, Resource

from .registry import EntityRegistry
from .exceptions import InvalidEntityConfig


def load_schema_registry():
    """Load platform schemas into registry"""
    schemas_path = Path("schemas")

    entity_schema = json.loads((schemas_path / "entity.schema.json").read_text())
    relation_schema = json.loads((schemas_path / "relation.schema.json").read_text())

    registry = Registry().with_resources([
        ("nishify/entity.schema.json", Resource.from_contents(entity_schema)),
        ("nishify/relation.schema.json", Resource.from_contents(relation_schema)),
    ])

    validator = Draft202012Validator(
        schema=entity_schema,
        registry=registry
    )

    return validator


def load_entities(client: str) -> EntityRegistry:
    """
    Load & validate all entities for a client
    """
    client_entities_path = Path("clients") / client / "entities"

    if not client_entities_path.exists():
        raise InvalidEntityConfig(f"No entities folder for client '{client}'")

    validator = load_schema_registry()
    registry = EntityRegistry()

    for file in client_entities_path.glob("*.json"):
        entity = json.loads(file.read_text())

        try:
            validator.validate(entity)
        except Exception as e:
            raise InvalidEntityConfig(
                f"Invalid entity config: {file.name} → {e}"
            )

        registry.add(entity["name"], entity)

    return registry

