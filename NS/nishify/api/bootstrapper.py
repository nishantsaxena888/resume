import os
import sys
import json
import importlib.util
import logging
from typing import Dict, Any

logger = logging.getLogger("bootstrapper")
logger.setLevel(logging.INFO)

# In-memory global cache for all schemas
# Structure: GLOBAL_SCHEMA_CACHE[client_name] = { "entities": {...}, "elastic_entities": {...}, "config": {...} }
GLOBAL_SCHEMA_CACHE: Dict[str, Dict[str, Any]] = {}

def load_module_from_path(module_name: str, file_path: str):
    spec = importlib.util.spec_from_file_location(module_name, file_path)
    if not spec or not spec.loader:
        return None
    module = importlib.util.module_from_spec(spec)
    sys.modules[module_name] = module
    try:
        spec.loader.exec_module(module)
        return module
    except Exception as e:
        logger.error(f"Failed to load python module {file_path}: {e}")
        return None

def run_bootstrapper(clients_dir: str = "nishify/clients"):
    """
    Scans the clients directory, reads entities.py / elastic_entities.py / frontend.admin.config.json
    and caches them in GLOBAL_SCHEMA_CACHE.
    """
    logger.info("Initializing Nishify Bootstrapper...")
    
    if not os.path.exists(clients_dir):
        logger.warning(f"Clients directory {clients_dir} not found!")
        return

    client_folders = [f for f in os.listdir(clients_dir) if os.path.isdir(os.path.join(clients_dir, f)) and f != "__pycache__"]

    for client_name in client_folders:
        client_path = os.path.join(clients_dir, client_name)
        
        # Parse entities and configs once per folder
        entities = {}
        entities_path = os.path.join(client_path, "entities.py")
        if os.path.exists(entities_path):
            mod = load_module_from_path(f"clients.{client_name}.entities", entities_path)
            if mod and hasattr(mod, "ENTITIES"):
                entities = mod.ENTITIES
                
        elastic_entities = {}
        elastic_path = os.path.join(client_path, "elastic_entities.py")
        if os.path.exists(elastic_path):
            mod = load_module_from_path(f"clients.{client_name}.elastic_entities", elastic_path)
            if mod and hasattr(mod, "ELASTIC_ENTITIES"):
                elastic_entities = mod.ELASTIC_ENTITIES
                
        config = {}
        config_path = os.path.join(client_path, "frontend.admin.config.json")
        if os.path.exists(config_path):
            try:
                with open(config_path, "r", encoding="utf-8") as f:
                    config = json.load(f)
            except Exception as e:
                logger.error(f"Failed to load json config for {client_name}: {e}")

        # Load environment-specific configurations
        environments_config = {}
        env_path = os.path.join(client_path, "environments.json")
        if os.path.exists(env_path):
            try:
                with open(env_path, "r", encoding="utf-8") as f:
                    environments_config = json.load(f)
            except Exception as e:
                logger.error(f"Failed to load environments.json for {client_name}: {e}")
                
        # Multiply by 4 standard environments
        env_suffixes = ["dev", "test", "stage", "prod"]
        
        global_config_path = "config.json"
        global_client_config = {}
        if os.path.exists(global_config_path):
            try:
                with open(global_config_path, "r", encoding="utf-8") as f:
                    global_cfg = json.load(f)
                    global_client_config = global_cfg.get("clients", {}).get(client_name, {})
            except Exception as e:
                logger.error(f"Failed to load global config.json: {e}")
                
        for env_suffix in env_suffixes:
            env_client_name = f"{client_name}_{env_suffix}"
            
            local_credentials = environments_config.get(env_suffix, {})
            global_env_credentials = global_client_config.get(env_suffix, {})
            
            credentials = {
                "db_name": env_client_name,
                "db_host": "postgres:5432",
                "db_user": "nishify",
                "db_pass": "nishify_password",
                "es_host": "elasticsearch:9200"
            }
            credentials.update(local_credentials)
            credentials.update(global_env_credentials)
            
            GLOBAL_SCHEMA_CACHE[env_client_name] = {
                "entities": entities,
                "elastic_entities": elastic_entities,
                "config": config,
                "credentials": credentials
            }
            logger.info(f"[{env_client_name}] Loaded {len(entities)} entities, {len(elastic_entities)} elastic entities")

    logger.info(f"Bootstrapper finished catching schemas. Active environments: {list(GLOBAL_SCHEMA_CACHE.keys())}")

def get_client_schema(client_name: str) -> Dict[str, Any]:
    """Returns the unified cached schema map (both sql and elastic) for a given client"""
    client_data = GLOBAL_SCHEMA_CACHE.get(client_name, {})
    unified_entities = {}
    unified_entities.update(client_data.get("entities", {}))
    unified_entities.update(client_data.get("elastic_entities", {}))
    return unified_entities
