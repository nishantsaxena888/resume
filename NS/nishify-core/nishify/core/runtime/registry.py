class EntityRegistry:
    def __init__(self):
        self._entities = {}

    def add(self, name: str, config: dict):
        if name in self._entities:
            raise ValueError(f"Entity '{name}' already registered")
        self._entities[name] = config

    def get(self, name: str) -> dict:
        if name not in self._entities:
            raise KeyError(f"Entity '{name}' not found")
        return self._entities[name]

    def all(self) -> dict:
        return self._entities

