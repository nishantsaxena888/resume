ENTITIES = {
    "tenant": {
        "source": "postgres",
        "options": {
            "schema": {
                "fields": {
                    "id": {"type": "string", "readOnly": True},
                    "name": {"type": "string", "required": True},
                    "slug": {"type": "string", "required": True},
                    "local_db_url": {"type": "string", "ui": {"label": "Local Database URL (postgresql://)"}},
                    "prod_db_url": {"type": "string", "ui": {"label": "Production Database URL"}},
                    "heroku_app_name": {"type": "string", "ui": {"label": "Heroku App Name"}},
                    "config": {"type": "string", "ui": {"input": "editor", "label": "Advanced JSON Configuration"}},
                    "status": {"type": "string", "enum": ["active", "inactive", "pending"], "required": True}
                }
            }
        }
    },
    "superadmin": {
        "source": "postgres",
        "options": {
            "schema": {
                "fields": {
                    "id": {"type": "string", "readOnly": True},
                    "username": {"type": "string", "required": True},
                    "password_hash": {"type": "string", "required": True}
                }
            }
        }
    },
    "environment": {
        "source": "postgres",
        "options": {
            "schema": {
                "fields": {
                    "id": {"type": "string", "readOnly": True},
                    "tenant_id": {"type": "string", "ref": "tenant", "required": True},
                    "name": {"type": "string", "enum": ["dev", "test", "stage", "prod"], "required": True},
                    "database_id": {"type": "string", "ref": "database_connection"}
                }
            }
        }
    },
    "database_connection": {
        "source": "postgres",
        "options": {
            "schema": {
                "fields": {
                    "id": {"type": "string", "readOnly": True},
                    "name": {"type": "string", "required": True},
                    "type": {"type": "string", "enum": ["postgres", "elasticsearch", "redis"], "required": True},
                    "uri": {"type": "string", "required": True},
                    "is_shared": {"type": "boolean", "required": True}
                }
            }
        }
    },
    "deployment_target": {
        "source": "postgres",
        "options": {
            "schema": {
                "fields": {
                    "id": {"type": "string", "readOnly": True},
                    "name": {"type": "string", "required": True},
                    "provider": {"type": "string", "enum": ["heroku", "aws", "docker"], "required": True},
                    "status": {"type": "string", "enum": ["provisioning", "running", "failed"], "required": False},
                    "environment_id": {"type": "string", "ref": "environment", "required": True}
                }
            }
        }
    }
}
