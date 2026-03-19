# nishify/clients/demo/entities.py

ENTITIES = {
    'user': {
        'source': 'postgres',
        'options': {
            'schema': {
                'fields': {
                    'id': {'type': 'string', 'readOnly': True},
                    'email': {'type': 'string', 'required': True},
                    'username': {'type': 'string', 'required': True},
                    'role': {'type': 'string', 'enum': ['admin', 'manager', 'customer']},
                    'is_active': {'type': 'boolean', 'default': True},
                    'created_at': {'type': 'date', 'readOnly': True}
                }
            }
        }
    },
    'user_profile': {
        'source': 'postgres',
        'options': {
            'schema': {
                'fields': {
                    'id': {'type': 'string', 'readOnly': True},
                    'user_id': {'type': 'string', 'required': True, 'ref': {'entity': 'user', 'value': 'id', 'label': 'username'}},
                    'first_name': {'type': 'string', 'required': True},
                    'last_name': {'type': 'string', 'required': True},
                    'phone_number': {'type': 'string'},
                    'avatar_url': {'type': 'image'},
                    'address': {'type': 'string'}
                }
            }
        }
    },
    'vendor': {
        'source': 'postgres',
        'options': {
            'schema': {
                'fields': {
                    'id': {'type': 'string', 'readOnly': True},
                    'company_name': {'type': 'string', 'required': True},
                    'contact_name': {'type': 'string', 'required': True},
                    'email': {'type': 'string', 'required': True},
                    'phone': {'type': 'string'},
                    'website': {'type': 'string'},
                    'rating': {'type': 'number', 'default': 5.0}
                }
            }
        }
    },
    'tag': {
        'source': 'elasticsearch',
        'options': {
            'schema': {
                'fields': {
                    'id': {'type': 'string', 'readOnly': True},
                    'name': {'type': 'string', 'required': True},
                    'color_hex': {'type': 'string', 'default': '#000000'},
                    'is_featured': {'type': 'boolean', 'default': False}
                }
            }
        }
    },
    'product': {
        'source': 'elasticsearch',
        'options': {
            'schema': {
                'fields': {
                    'id': {'type': 'string', 'readOnly': True},
                    'name': {'type': 'string', 'required': True},
                    'sku': {'type': 'string', 'required': True},
                    'description': {'type': 'string'},
                    'price': {'type': 'number', 'required': True},
                    'stock_quantity': {'type': 'number', 'required': True},
                    'vendor_id': {'type': 'string', 'required': True, 'ref': {'entity': 'vendor', 'value': 'id', 'label': 'company_name'}},
                    'active': {'type': 'boolean', 'default': True},
                    'image_url': {'type': 'image'},
                    'created_at': {'type': 'date', 'readOnly': True}
                }
            }
        }
    },
    'product_tag': {
        'source': 'postgres',
        'options': {
            'schema': {
                'fields': {
                    'id': {'type': 'string', 'readOnly': True},
                    'product_id': {'type': 'string', 'required': True, 'ref': {'entity': 'product', 'value': 'id', 'label': 'name'}},
                    'tag_id': {'type': 'string', 'required': True, 'ref': {'entity': 'tag', 'value': 'id', 'label': 'name'}}
                }
            }
        }
    },
    'customer': {
        'source': 'postgres',
        'options': {
            'schema': {
                'fields': {
                    'id': {'type': 'string', 'readOnly': True},
                    'name': {'type': 'string', 'required': True},
                    'email': {'type': 'string', 'required': True},
                    'phone': {'type': 'string'},
                    'loyalty_points': {'type': 'number', 'default': 0}
                }
            }
        }
    },
    'order': {
        'source': 'postgres',
        'options': {
            'schema': {
                'fields': {
                    'id': {'type': 'string', 'readOnly': True},
                    'customer_id': {'type': 'string', 'required': True, 'ref': {'entity': 'customer', 'value': 'id', 'label': 'name'}},
                    'total_amount': {'type': 'number', 'required': True},
                    'status': {'type': 'string', 'enum': ['pending', 'processing', 'shipped', 'completed', 'cancelled']},
                    'shipping_address': {'type': 'string', 'required': True},
                    'created_at': {'type': 'date', 'readOnly': True}
                }
            }
        }
    },
    'order_item': {
        'source': 'postgres',
        'options': {
            'schema': {
                'fields': {
                    'id': {'type': 'string', 'readOnly': True},
                    'order_id': {'type': 'string', 'required': True, 'ref': {'entity': 'order', 'value': 'id', 'label': 'id'}},
                    'product_id': {'type': 'string', 'required': True, 'ref': {'entity': 'product', 'value': 'id', 'label': 'name'}},
                    'quantity': {'type': 'number', 'required': True},
                    'unit_price': {'type': 'number', 'required': True},
                    'subtotal': {'type': 'number', 'required': True}
                }
            }
        }
    }
}
