import json
import pytest
from pathlib import Path

from nishify.core.runtime.loader import load_entities
from nishify.core.runtime.exceptions import InvalidEntityConfig


def test_valid_client_loads():
    registry = load_entities("skillom")
    assert "flip_book" in registry.all()


def test_missing_client_raises():
    with pytest.raises(InvalidEntityConfig):
        load_entities("no_such_client")


def test_invalid_entity_schema(monkeypatch, tmp_path):
    # fake repo root
    fake_root = tmp_path
    (fake_root / "schemas").mkdir()
    (fake_root / "clients" / "bad" / "entities").mkdir(parents=True)

    # copy real schemas
    for f in Path("schemas").glob("*.json"):
        (fake_root / "schemas" / f.name).write_text(f.read_text())

    # invalid entity (fails schema)
    bad_entity = {"name": "broken"}
    (fake_root / "clients" / "bad" / "entities" / "bad.json").write_text(
        json.dumps(bad_entity)
    )

    monkeypatch.chdir(fake_root)

    with pytest.raises(InvalidEntityConfig):
        load_entities("bad")

