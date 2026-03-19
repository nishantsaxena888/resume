import os
import json
import ast

def find_missing_entities():
    clients_dir = "nishify/clients"
    for client in os.listdir(clients_dir):
        client_path = os.path.join(clients_dir, client)
        if not os.path.isdir(client_path): continue

        config_path = os.path.join(client_path, "frontend.admin.config.json")
        entities_path = os.path.join(client_path, "entities.py")

        expected_keys = set()
        if os.path.exists(config_path):
            with open(config_path, 'r') as f:
                try:
                    config = json.load(f)
                    expected_keys = set(config.get("routing", {}).keys())
                except json.JSONDecodeError:
                    pass
        
        found_keys = set()
        if os.path.exists(entities_path):
            with open(entities_path, 'r') as f:
                content = f.read()
            try:
                tree = ast.parse(content)
                for node in sorted(ast.walk(tree), key=lambda x: getattr(x, 'lineno', 0)):
                    if isinstance(node, ast.Assign):
                        for target in node.targets:
                            if isinstance(target, ast.Name) and target.id == "ENTITIES":
                                if isinstance(node.value, ast.Dict):
                                    for key in node.value.keys:
                                        if isinstance(key, ast.Constant):
                                            found_keys.add(key.value)
            except Exception as e:
                print(f"Error parsing {entities_path}: {e}")

        missing = expected_keys - found_keys
        if missing:
            print(f"[{client}] Missing entities: {missing}")

            # Let's auto append them as dummy entities below the ENTITIES dict
            with open(entities_path, 'a') as f:
                for m in missing:
                    dummy = f"\n# Auto-generated scaffold\nENTITIES['{m}'] = {{\n    'source': 'postgres',\n    'options': {{\n        'schema': {{\n            'fields': {{\n                'id': {{'type': 'string', 'readOnly': True}},\n                'name': {{'type': 'string', 'required': True}}\n            }}\n        }}\n    }}\n}}\n"
                    f.write(dummy)
            print(f"  -> Appended {len(missing)} entities to {entities_path}")

find_missing_entities()
