import json
from jsonschema import Draft202012Validator
from referencing import Registry, Resource


def load(path):
    with open(path) as f:
        return json.load(f)


# Load schemas
entity_schema = load("schemas/entity.schema.json")
relation_schema = load("schemas/relation.schema.json")

# Build registry CORRECTLY (tuple iterable)
registry = Registry().with_resources([
    ("nishify/entity.schema.json", Resource.from_contents(entity_schema)),
    ("nishify/relation.schema.json", Resource.from_contents(relation_schema)),
])

# Create validator
validator = Draft202012Validator(
    schema=entity_schema,
    registry=registry,
)


def test_flip_book_entity_valid():
    entity = load("clients/skillom/entities/flip_book.json")
    validator.validate(entity)

