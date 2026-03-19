from typing import Dict, Any

from nishify.core.sources.memory import MemorySource
from nishify.core.sources.router import SourceRouter

# Initial seed data
_seed_data: Dict[str, Dict[str, Any]] = {}

# The default relational source for the system (mocked in memory for now)
_default_source = MemorySource(_seed_data)

from nishify.clients.demo.entities import ENTITIES

# The unified gateway router replacing standard manual endpoint wiring
source_router = SourceRouter(default_source=_default_source, entity_map=ENTITIES)
