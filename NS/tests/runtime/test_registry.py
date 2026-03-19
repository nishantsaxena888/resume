import pytest
from nishify.core.runtime.registry import EntityRegistry


def test_registry_add_and_get():
    r = EntityRegistry()
    r.add("a", {"x": 1})
    assert r.get("a") == {"x": 1}


def test_registry_duplicate_add():
    r = EntityRegistry()
    r.add("a", {})
    with pytest.raises(ValueError):
        r.add("a", {})


def test_registry_missing_get():
    r = EntityRegistry()
    with pytest.raises(KeyError):
        r.get("missing")


def test_registry_all_empty():
    r = EntityRegistry()
    assert r.all() == {}

