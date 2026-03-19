# nishify/clients/pioneer_fresh/entities.py

ENTITIES = {   'users': {   'source': 'postgres',
                 'options': {   'tenant': {'column': 'warehouse_id'},
                                'schema': {   'fields': {   'id': {   'type': 'string',
                                                                      'readOnly': True},
                                                            'email': {   'type': 'string',
                                                                         'required': True},
                                                            'password_hash': {   'type': 'string',
                                                                                 'hidden': True},
                                                            'role': {   'type': 'string',
                                                                        'enum': [   'super_admin',
                                                                                    'manager',
                                                                                    'staff']},
                                                            'warehouse_id': {   'type': 'string'}}}}},
    'warehouse': {   'source': 'postgres',
                     'options': {   'schema': {   'fields': {   'id': {   'type': 'string',
                                                                          'readOnly': True},
                                                                'name': {   'type': 'string',
                                                                            'required': True},
                                                                'location': {   'type': 'string',
                                                                                'required': True},
                                                                'capacity_sqft': {   'type': 'number',
                                                                                     'required': True},
                                                                'manager_id': {   'type': 'string'}}}}},
    'liquor_inventory': {   'source': 'elasticsearch',
                            'options': {   'tenant': {'column': 'warehouse_id'},
                                           'schema': {   'fields': {   'id': {   'type': 'string',
                                                                                 'readOnly': True},
                                                                       'sku': {   'type': 'string',
                                                                                  'required': True},
                                                                       'brand': {   'type': 'string',
                                                                                    'required': True},
                                                                       'type': {   'type': 'string',
                                                                                   'enum': [   'whiskey',
                                                                                               'vodka',
                                                                                               'rum',
                                                                                               'tequila',
                                                                                               'gin',
                                                                                               'wine',
                                                                                               'beer']},
                                                                       'abv_percentage': {   'type': 'number'},
                                                                       'stock_quantity': {   'type': 'number',
                                                                                             'required': True},
                                                                       'warehouse_id': {   'type': 'string',
                                                                                           'required': True,
                                                                                           'ref': {   'entity': 'warehouse',
                                                                                                      'label': 'name',
                                                                                                      'value': 'id'}}}}}},
    'smoke_inventory': {   'source': 'elasticsearch',
                           'options': {   'tenant': {'column': 'warehouse_id'},
                                          'schema': {   'fields': {   'id': {   'type': 'string',
                                                                                'readOnly': True},
                                                                      'sku': {   'type': 'string',
                                                                                 'required': True},
                                                                      'brand': {   'type': 'string',
                                                                                   'required': True},
                                                                      'category': {   'type': 'string',
                                                                                      'enum': [   'cigars',
                                                                                                  'cigarettes',
                                                                                                  'vapes',
                                                                                                  'accessories']},
                                                                      'tax_stamp_required': {   'type': 'boolean'},
                                                                      'stock_quantity': {   'type': 'number',
                                                                                            'required': True},
                                                                      'warehouse_id': {   'type': 'string',
                                                                                          'required': True,
                                                                                          'ref': {   'entity': 'warehouse',
                                                                                                     'label': 'name',
                                                                                                     'value': 'id'}}}}}},
    'importer': {   'source': 'postgres',
                    'options': {   'schema': {   'fields': {   'id': {   'type': 'string',
                                                                         'readOnly': True},
                                                               'company_name': {   'type': 'string',
                                                                                   'required': True},
                                                               'origin_country': {   'type': 'string',
                                                                                     'required': True},
                                                               'import_license_number': {   'type': 'string'}}}}},
    'retailer': {   'source': 'postgres',
                    'options': {   'tenant': {'column': 'warehouse_id'},
                                   'schema': {   'fields': {   'id': {   'type': 'string',
                                                                         'readOnly': True},
                                                               'store_name': {   'type': 'string',
                                                                                 'required': True},
                                                               'state_license': {   'type': 'string',
                                                                                    'required': True},
                                                               'warehouse_id': {   'type': 'string',
                                                                                   'required': True,
                                                                                   'ref': {   'entity': 'warehouse',
                                                                                              'label': 'name',
                                                                                              'value': 'id'}}}}}},
    'cash_discount_group': {   'source': 'postgres',
                               'options': {   'schema': {   'fields': {   'id': {   'type': 'string',
                                                                                    'readOnly': True},
                                                                          'name': {   'type': 'string',
                                                                                      'required': True},
                                                                          'discount_percent': {   'type': 'number',
                                                                                                  'required': True}}}}},
    'avendor': {   'source': 'postgres',
                   'options': {   'schema': {   'fields': {   'id': {   'type': 'string',
                                                                        'readOnly': True},
                                                              'name': {   'type': 'string',
                                                                          'required': True},
                                                              'phone': {   'type': 'string',
                                                                           'required': False}}}}},
    'brand': {   'source': 'postgres',
                 'options': {   'schema': {   'fields': {   'id': {   'type': 'string',
                                                                      'readOnly': True},
                                                            'name': {   'type': 'string',
                                                                        'required': False},
                                                            'description': {   'type': 'string',
                                                                               'required': False},
                                                            'image': {   'type': 'image',
                                                                         'required': False}}}}},
    'category': {   'source': 'postgres',
                    'options': {   'schema': {   'fields': {   'id': {   'type': 'int',
                                                                         'required': False},
                                                               'name': {   'type': 'string',
                                                                           'required': True}}}}},
    'customer': {   'source': 'postgres',
                    'options': {   'schema': {   'fields': {   'id': {   'type': 'string',
                                                                         'readOnly': True},
                                                               'account_information': {   'type': 'heading',
                                                                                          'required': False},
                                                               'name': {   'type': 'string',
                                                                           'required': True},
                                                               'phone': {   'type': 'string',
                                                                            'required': False},
                                                               'email': {   'type': 'string',
                                                                            'required': False},
                                                               'fax': {   'type': 'string',
                                                                          'required': False},
                                                               'boro': {   'type': 'string',
                                                                           'required': False},
                                                               'credit_limit': {   'type': 'number',
                                                                                   'required': False},
                                                               'customer_note': {   'type': 'string',
                                                                                    'required': False},
                                                               'product_promotion': {   'type': 'enum',
                                                                                        'required': False},
                                                               'status': {   'type': 'enum',
                                                                             'required': False},
                                                               'is_msa_include': {   'type': 'boolean',
                                                                                     'required': False},
                                                               'pricing_and_tax': {   'type': 'heading',
                                                                                      'required': False},
                                                               'is_sales_tax_applicable': {   'type': 'boolean',
                                                                                              'required': False},
                                                               'send_email_on_invoice_creation': {   'type': 'boolean',
                                                                                                     'required': False},
                                                               'calculate_interest': {   'type': 'boolean',
                                                                                         'required': False},
                                                               'self_checkout_tax': {   'type': 'boolean',
                                                                                        'required': False},
                                                               'cash_and_carry_customer_code': {   'type': 'boolean',
                                                                                                   'required': False},
                                                               'sales_person_id': {   'type': 'fk',
                                                                                      'required': False,
                                                                                      'ref': {   'entity': 'salesperson',
                                                                                                 'valueKey': 'id',
                                                                                                 'labelKey': 'name'}},
                                                               'payment_terms_id': {   'type': 'fk',
                                                                                       'required': False,
                                                                                       'ref': {   'entity': 'payment_terms',
                                                                                                  'valueKey': 'id',
                                                                                                  'labelKey': 'name'}},
                                                               'price_group_id': {   'type': 'fk',
                                                                                     'required': False,
                                                                                     'ref': {   'entity': 'price_group',
                                                                                                'valueKey': 'id',
                                                                                                'labelKey': 'name'}},
                                                               'cash_discount_group_id': {   'type': 'fk',
                                                                                             'required': False,
                                                                                             'ref': {   'entity': 'cash_discount_group',
                                                                                                        'valueKey': 'id',
                                                                                                        'labelKey': 'name'}},
                                                               'state_id': {   'type': 'fk',
                                                                               'required': False,
                                                                               'ref': {   'entity': 'state',
                                                                                          'valueKey': 'id',
                                                                                          'labelKey': 'name'}},
                                                               'shipping_address': {   'type': 'heading',
                                                                                       'required': False},
                                                               'default_address': {   'type': 'enum',
                                                                                      'required': False},
                                                               'shipping_street_address': {   'type': 'string',
                                                                                              'required': False},
                                                               'shipping_city': {   'type': 'string',
                                                                                    'required': False},
                                                               'shipping_zip_code': {   'type': 'string',
                                                                                        'required': False},
                                                               'shipping_state_id': {   'type': 'fk',
                                                                                        'required': False,
                                                                                        'ref': {   'entity': 'state',
                                                                                                   'valueKey': 'id',
                                                                                                   'labelKey': 'name'}},
                                                               'billing_address': {   'type': 'heading',
                                                                                      'required': False},
                                                               'billing_street_address': {   'type': 'string',
                                                                                             'required': False},
                                                               'billing_city': {   'type': 'string',
                                                                                   'required': False},
                                                               'billing_zip_code': {   'type': 'string',
                                                                                       'required': False},
                                                               'billing_state_id': {   'type': 'fk',
                                                                                       'required': False,
                                                                                       'ref': {   'entity': 'state',
                                                                                                  'valueKey': 'id',
                                                                                                  'labelKey': 'name'}}}}}},
    'default_pricing': {   'source': 'postgres',
                           'options': {   'schema': {   'fields': {   'id': {   'type': 'int',
                                                                                'required': False},
                                                                      'item_id': {   'type': 'fk',
                                                                                     'required': False,
                                                                                     'ref': {   'entity': 'item',
                                                                                                'valueKey': 'id',
                                                                                                'labelKey': 'name'}},
                                                                      'price': {   'type': 'number',
                                                                                   'required': False}}}}},
    'goods_inward': {   'source': 'postgres',
                        'options': {   'schema': {   'fields': {   'id': {   'type': 'int',
                                                                             'required': False},
                                                                   'purchase_order_id': {   'type': 'fk',
                                                                                            'required': False,
                                                                                            'ref': {   'entity': 'purchase_order',
                                                                                                       'valueKey': 'id',
                                                                                                       'labelKey': 'id'}},
                                                                   'item_id': {   'type': 'fk',
                                                                                  'required': False,
                                                                                  'ref': {   'entity': 'item',
                                                                                             'valueKey': 'id',
                                                                                             'labelKey': 'name'}},
                                                                   'vendor_id': {   'type': 'fk',
                                                                                    'required': False,
                                                                                    'ref': {   'entity': 'vendor',
                                                                                               'valueKey': 'id',
                                                                                               'labelKey': 'name'}},
                                                                   'date': {   'type': 'date',
                                                                               'required': False},
                                                                   'price': {   'type': 'number',
                                                                                'required': False}}}}},
    'inventory': {   'source': 'postgres',
                     'options': {   'schema': {   'fields': {   'id': {   'type': 'string',
                                                                          'readOnly': True},
                                                                'item_id': {   'type': 'fk',
                                                                               'required': False,
                                                                               'ref': {   'entity': 'item',
                                                                                          'valueKey': 'id',
                                                                                          'labelKey': 'name'}},
                                                                'default_pricing_id': {   'type': 'fk',
                                                                                          'required': False,
                                                                                          'ref': {   'entity': 'pricing',
                                                                                                     'valueKey': 'id',
                                                                                                     'labelKey': 'id'}},
                                                                'quantity': {   'type': 'number',
                                                                                'required': False},
                                                                'order_qty': {   'type': 'number',
                                                                                 'required': False},
                                                                'goods_receipt_date': {   'type': 'date',
                                                                                          'required': False},
                                                                'image': {   'type': 'image',
                                                                             'required': False},
                                                                'spec_sheet': {   'type': 'string',
                                                                                  'required': False},
                                                                'compliance_cert': {   'type': 'string',
                                                                                       'required': False},
                                                                'gallery': {   'type': 'image_gallery',
                                                                               'required': False},
                                                                'stock_qty': {   'type': 'number',
                                                                                 'required': False}}}}},
    'inventory_filter': {   'source': 'postgres',
                            'options': {   'schema': {   'fields': {   'id': {   'type': 'string',
                                                                                 'readOnly': True},
                                                                       'item_id': {   'type': 'fk',
                                                                                      'required': False,
                                                                                      'ref': {   'entity': 'item',
                                                                                                 'valueKey': 'id',
                                                                                                 'labelKey': 'name'}},
                                                                       'weight': {   'type': 'options',
                                                                                     'required': False},
                                                                       'color': {   'type': 'options',
                                                                                    'required': False},
                                                                       'price_range': {   'type': 'price_range',
                                                                                          'required': False},
                                                                       'tags': {   'type': 'options',
                                                                                   'required': False}}}}},
    'inventory_location': {   'source': 'postgres',
                              'options': {   'schema': {   'fields': {   'id': {   'type': 'string',
                                                                                   'readOnly': True},
                                                                         'name': {   'type': 'string',
                                                                                     'required': True}}}}},
    'invoice': {   'source': 'postgres',
                   'options': {   'schema': {   'fields': {   'id': {   'type': 'string',
                                                                        'readOnly': True},
                                                              'customer_id': {   'type': 'fk',
                                                                                 'required': False,
                                                                                 'ref': {   'entity': 'customer',
                                                                                            'valueKey': 'id',
                                                                                            'labelKey': 'name'}},
                                                              'invoice_date': {   'type': 'date',
                                                                                  'required': False},
                                                              'invoice_no': {   'type': 'string',
                                                                                'required': False},
                                                              'po_no': {   'type': 'string',
                                                                           'required': False},
                                                              'customer_type': {   'type': 'enum',
                                                                                   'required': False,
                                                                                   'enum': [   'liquor',
                                                                                               'commercial_customers',
                                                                                               'wholesalers_and_distributors',
                                                                                               'manufacturers',
                                                                                               'retailers']},
                                                              'shipping_delivery_type': {   'type': 'enum',
                                                                                            'required': False,
                                                                                            'enum': [   'pickup',
                                                                                                        'delivery']},
                                                              'delivery_date': {   'type': 'date',
                                                                                   'required': False},
                                                              'billing_address': {   'type': 'string',
                                                                                     'required': False},
                                                              'customer_notes': {   'type': 'string',
                                                                                    'required': False},
                                                              'total_amount': {   'type': 'number',
                                                                                  'required': False},
                                                              'item_ids': {   'type': 'string',
                                                                              'required': False,
                                                                              'ref': {   'entity': 'item_invoice_map'}}}}}},
    'invoice_basic': {   'source': 'postgres',
                         'options': {   'schema': {   'fields': {   'id': {   'type': 'string',
                                                                              'readOnly': True},
                                                                    'invoice_id': {   'type': 'fk',
                                                                                      'required': False,
                                                                                      'ref': {   'entity': 'invoice',
                                                                                                 'valueKey': 'id',
                                                                                                 'labelKey': 'id'}},
                                                                    'item_id': {   'type': 'fk',
                                                                                   'required': False,
                                                                                   'ref': {   'entity': 'item',
                                                                                              'valueKey': 'id',
                                                                                              'labelKey': 'name'}},
                                                                    'price': {   'type': 'number',
                                                                                 'required': True},
                                                                    'qty': {   'type': 'number',
                                                                               'required': True},
                                                                    'qty_measure': {   'type': 'number',
                                                                                       'required': False}}}}},
    'invoice_item': {   'source': 'postgres',
                        'options': {   'schema': {   'fields': {   'id': {   'type': 'string',
                                                                             'readOnly': True},
                                                                   'invoice_id': {   'type': 'fk',
                                                                                     'required': False,
                                                                                     'ref': {   'entity': 'invoice',
                                                                                                'valueKey': 'id',
                                                                                                'labelKey': 'id'}},
                                                                   'item_id': {   'type': 'fk',
                                                                                  'required': False,
                                                                                  'ref': {   'entity': 'item',
                                                                                             'valueKey': 'id',
                                                                                             'labelKey': 'name'}},
                                                                   'quantity': {   'type': 'number',
                                                                                   'required': False},
                                                                   'price': {   'type': 'number',
                                                                                'required': False}}}}},
    'item': {   'source': 'postgres',
                'options': {   'schema': {   'fields': {   'id': {   'type': 'string',
                                                                     'readOnly': True},
                                                           'item_information': {   'type': 'heading',
                                                                                   'required': False},
                                                           'item_code': {   'type': 'string',
                                                                            'required': True},
                                                           'name': {   'type': 'string',
                                                                       'required': True},
                                                           'manufacturer_item_no': {   'type': 'string',
                                                                                       'required': False},
                                                           'item_category_ids': {   'type': 'string',
                                                                                    'required': False,
                                                                                    'ref': {   'entity': 'item_category'}},
                                                           'items_to_be_sold_by_units': {   'type': 'boolean',
                                                                                            'required': False},
                                                           'unit': {   'type': 'string',
                                                                       'required': False},
                                                           'locations': {   'type': 'enum',
                                                                            'required': False},
                                                           'active': {   'type': 'boolean',
                                                                         'required': False},
                                                           'image': {   'type': 'string',
                                                                        'required': False},
                                                           'gallery': {   'type': 'string',
                                                                          'required': False},
                                                           'upc_information': {   'type': 'heading',
                                                                                  'required': False},
                                                           'upc_code': {   'type': 'string',
                                                                           'required': False},
                                                           'box_upc': {   'type': 'string',
                                                                          'required': False},
                                                           'inner_pack_upc': {   'type': 'string',
                                                                                 'required': False},
                                                           'alternative_upc_1': {   'type': 'string',
                                                                                    'required': False},
                                                           'alternative_upc_2': {   'type': 'string',
                                                                                    'required': False},
                                                           'alternative_upc_3': {   'type': 'string',
                                                                                    'required': False},
                                                           'sec_information': {   'type': 'heading',
                                                                                  'required': False},
                                                           'size': {   'type': 'string',
                                                                       'required': False},
                                                           'expire_date': {   'type': 'date',
                                                                              'required': False},
                                                           'secondary_category_ids': {   'type': 'string',
                                                                                         'required': False,
                                                                                         'ref': {   'entity': 'secondary_category'}},
                                                           'brand_id': {   'type': 'fk',
                                                                           'required': False,
                                                                           'ref': {   'entity': 'brand',
                                                                                      'valueKey': 'id',
                                                                                      'labelKey': 'name'}},
                                                           'tax_group_id': {   'type': 'fk',
                                                                               'required': False,
                                                                               'ref': {   'entity': 'tax_group',
                                                                                          'valueKey': 'id',
                                                                                          'labelKey': 'name'}},
                                                           'is_cash_and_carry': {   'type': 'boolean',
                                                                                    'required': False},
                                                           'cash_and_carry_item_code': {   'type': 'string',
                                                                                           'required': False},
                                                           'price': {   'type': 'number',
                                                                        'required': False},
                                                           'price_group_id': {   'type': 'fk',
                                                                                 'required': False,
                                                                                 'ref': {   'entity': 'price_group',
                                                                                            'valueKey': 'id',
                                                                                            'labelKey': 'name'}},
                                                           'cash_discount_group_id': {   'type': 'fk',
                                                                                         'required': False,
                                                                                         'ref': {   'entity': 'cash_discount_group',
                                                                                                    'valueKey': 'id',
                                                                                                    'labelKey': 'name'}},
                                                           'vendor_id': {   'type': 'fk',
                                                                            'required': False,
                                                                            'ref': {   'entity': 'vendor',
                                                                                       'valueKey': 'id',
                                                                                       'labelKey': 'name'}},
                                                           'msa_information': {   'type': 'heading',
                                                                                  'required': False},
                                                           'include_in_msa': {   'type': 'boolean',
                                                                                 'required': False},
                                                           'identification_symbol': {   'type': 'string',
                                                                                        'required': False},
                                                           'distribution_sku': {   'type': 'string',
                                                                                   'required': False},
                                                           'item_per_selling_unit': {   'type': 'string',
                                                                                        'required': False},
                                                           'promotion_indicator': {   'type': 'enum',
                                                                                      'required': False},
                                                           'product_unit_size_description': {   'type': 'string',
                                                                                                'required': False},
                                                           'msa_category_code': {   'type': 'string',
                                                                                    'required': False},
                                                           'distributor_product_unit_size': {   'type': 'string',
                                                                                                'required': False},
                                                           'other_information_heading': {   'type': 'heading',
                                                                                            'required': False},
                                                           'short_description': {   'type': 'string',
                                                                                    'required': False},
                                                           'description': {   'type': 'string',
                                                                              'required': False},
                                                           'other_information': {   'type': 'string',
                                                                                    'required': False},
                                                           'qtyss': {   'type': 'number',
                                                                        'required': False},
                                                           'default_price': {   'type': 'number',
                                                                                'required': False}}}}},
    'item_category': {   'source': 'postgres',
                         'options': {   'schema': {   'fields': {   'id': {   'type': 'string',
                                                                              'readOnly': True},
                                                                    'name': {   'type': 'string',
                                                                                'required': True},
                                                                    'description': {   'type': 'string',
                                                                                       'required': False},
                                                                    'code': {   'type': 'string',
                                                                                'required': False},
                                                                    'type': {   'type': 'string',
                                                                                'required': False},
                                                                    'is_cigarette_category': {   'type': 'boolean',
                                                                                                 'required': False},
                                                                    'is_electronics_cigarette': {   'type': 'boolean',
                                                                                                    'required': False},
                                                                    'is_none_sales_category': {   'type': 'boolean',
                                                                                                  'required': False},
                                                                    'is_beverage': {   'type': 'boolean',
                                                                                       'required': False}}}}},
    'item_category_map': {   'source': 'postgres',
                             'options': {   'schema': {   'fields': {   'id': {   'type': 'string',
                                                                                  'readOnly': True},
                                                                        'item_id': {   'type': 'fk',
                                                                                       'required': False,
                                                                                       'ref': {   'entity': 'item',
                                                                                                  'valueKey': 'id',
                                                                                                  'labelKey': 'name'}},
                                                                        'item_category_id': {   'type': 'fk',
                                                                                                'required': False,
                                                                                                'ref': {   'entity': 'item_category',
                                                                                                           'valueKey': 'id',
                                                                                                           'labelKey': 'name'}}}}}},
    'item_invoice_map': {   'source': 'postgres',
                            'options': {   'schema': {   'fields': {   'id': {   'type': 'string',
                                                                                 'readOnly': True},
                                                                       'item_id': {   'type': 'fk',
                                                                                      'required': False,
                                                                                      'ref': {   'entity': 'item',
                                                                                                 'valueKey': 'id',
                                                                                                 'labelKey': 'name'}},
                                                                       'invoice_id': {   'type': 'fk',
                                                                                         'required': False,
                                                                                         'ref': {   'entity': 'invoice',
                                                                                                    'valueKey': 'id',
                                                                                                    'labelKey': 'invoice_no'}},
                                                                       'quantity': {   'type': 'number',
                                                                                       'required': False},
                                                                       'price': {   'type': 'number',
                                                                                    'required': False}}}}},
    'login': {   'source': 'postgres',
                 'options': {   'schema': {   'fields': {   'id': {   'type': 'string',
                                                                      'readOnly': True},
                                                            'username': {   'type': 'string',
                                                                            'required': True},
                                                            'password': {   'type': 'string',
                                                                            'required': True},
                                                            'login_button': {   'type': 'button',
                                                                                'required': False}}}}},
    'materials': {   'source': 'postgres',
                     'options': {   'schema': {   'fields': {   'id': {   'type': 'int',
                                                                          'required': False},
                                                                'name': {   'type': 'string',
                                                                            'required': True}}}}},
    'payment_terms': {   'source': 'postgres',
                         'options': {   'schema': {   'fields': {   'id': {   'type': 'string',
                                                                              'readOnly': True},
                                                                    'name': {   'type': 'string',
                                                                                'required': True}}}}},
    'price_group': {   'source': 'postgres',
                       'options': {   'schema': {   'fields': {   'id': {   'type': 'string',
                                                                            'readOnly': True},
                                                                  'name': {   'type': 'string',
                                                                              'required': False},
                                                                  'description': {   'type': 'string',
                                                                                     'required': False}}}}},
    'pricing': {   'source': 'postgres',
                   'options': {   'schema': {   'fields': {   'id': {   'type': 'int',
                                                                        'required': False},
                                                              'item_id': {   'type': 'fk',
                                                                             'required': False,
                                                                             'ref': {   'entity': 'item',
                                                                                        'valueKey': 'id',
                                                                                        'labelKey': 'name'}},
                                                              'state_id': {   'type': 'fk',
                                                                              'required': False,
                                                                              'ref': {   'entity': 'state',
                                                                                         'valueKey': 'id',
                                                                                         'labelKey': 'name'}},
                                                              'price': {   'type': 'number',
                                                                           'required': False},
                                                              'start_date': {   'type': 'date',
                                                                                'required': False},
                                                              'end_date': {   'type': 'date',
                                                                              'required': False}}}}},
    'project': {   'source': 'postgres',
                   'options': {   'schema': {   'fields': {   'id': {   'type': 'string',
                                                                        'readOnly': True},
                                                              'project_context': {   'type': 'string',
                                                                                     'required': False},
                                                              'name': {   'type': 'string',
                                                                          'required': True},
                                                              'project_requirements': {   'type': 'string',
                                                                                          'required': True},
                                                              'project_type': {   'type': 'string',
                                                                                  'required': True},
                                                              'quality_level': {   'type': 'string',
                                                                                   'required': True},
                                                              'upload_design': {   'type': 'string',
                                                                                   'required': False},
                                                              'file_path': {   'type': 'string',
                                                                               'required': True},
                                                              'heading_3': {   'type': 'string',
                                                                               'required': False},
                                                              'heading_4': {   'type': 'string',
                                                                               'required': False},
                                                              'login_button': {   'type': 'button',
                                                                                  'required': False},
                                                              'total_cost': {   'type': 'number',
                                                                                'required': True},
                                                              'total_effort': {   'type': 'number',
                                                                                  'required': True},
                                                              'total_tasks': {   'type': 'number',
                                                                                 'required': True},
                                                              'tasks': {   'type': 'string',
                                                                           'required': True},
                                                              'created_at': {   'type': 'string',
                                                                                'required': False}}}}},
    'purchase_order': {   'source': 'postgres',
                          'options': {   'schema': {   'fields': {   'id': {   'type': 'string',
                                                                               'readOnly': True},
                                                                     'vendor_id': {   'type': 'fk',
                                                                                      'required': False,
                                                                                      'ref': {   'entity': 'vendor',
                                                                                                 'valueKey': 'id',
                                                                                                 'labelKey': 'name'}},
                                                                     'order_date': {   'type': 'date',
                                                                                       'required': False},
                                                                     'status': {   'type': 'enum',
                                                                                   'required': False},
                                                                     'vendor_pi': {   'type': 'string',
                                                                                      'required': False},
                                                                     'etd_date': {   'type': 'date',
                                                                                     'required': False},
                                                                     'eta': {   'type': 'date',
                                                                                'required': False}}}}},
    'purchase_order_item': {   'source': 'postgres',
                               'options': {   'schema': {   'fields': {   'id': {   'type': 'string',
                                                                                    'readOnly': True},
                                                                          'purchase_order_id': {   'type': 'fk',
                                                                                                   'required': False,
                                                                                                   'ref': {   'entity': 'purchase_order',
                                                                                                              'valueKey': 'id',
                                                                                                              'labelKey': 'id'}},
                                                                          'item_id': {   'type': 'fk',
                                                                                         'required': False,
                                                                                         'ref': {   'entity': 'item',
                                                                                                    'valueKey': 'id',
                                                                                                    'labelKey': 'name'}},
                                                                          'quantity': {   'type': 'number',
                                                                                          'required': False},
                                                                          'price': {   'type': 'number',
                                                                                       'required': False}}}}},
    'salesperson': {   'source': 'postgres',
                       'options': {   'schema': {   'fields': {   'id': {   'type': 'string',
                                                                            'readOnly': True},
                                                                  'name': {   'type': 'string',
                                                                              'required': True}}}}},
    'secondary_category': {   'source': 'postgres',
                              'options': {   'schema': {   'fields': {   'id': {   'type': 'string',
                                                                                   'readOnly': True},
                                                                         'name': {   'type': 'string',
                                                                                     'required': True},
                                                                         'description': {   'type': 'string',
                                                                                            'required': False},
                                                                         'code': {   'type': 'string',
                                                                                     'required': False},
                                                                         'type': {   'type': 'string',
                                                                                     'required': False},
                                                                         'is_cigarette_category': {   'type': 'boolean',
                                                                                                      'required': False},
                                                                         'is_electronics_cigarette': {   'type': 'boolean',
                                                                                                         'required': False},
                                                                         'is_none_sales_category': {   'type': 'boolean',
                                                                                                       'required': False},
                                                                         'is_beverage': {   'type': 'boolean',
                                                                                            'required': False},
                                                                         'item_category_id': {   'type': 'fk',
                                                                                                 'required': False,
                                                                                                 'ref': {   'entity': 'item_category',
                                                                                                            'valueKey': 'id',
                                                                                                            'labelKey': 'name'}}}}}},
    'secondary_category_map': {   'source': 'postgres',
                                  'options': {   'schema': {   'fields': {   'id': {   'type': 'string',
                                                                                       'readOnly': True},
                                                                             'item_id': {   'type': 'fk',
                                                                                            'required': False,
                                                                                            'ref': {   'entity': 'item',
                                                                                                       'valueKey': 'id',
                                                                                                       'labelKey': 'name'}},
                                                                             'secondary_category_id': {   'type': 'fk',
                                                                                                          'required': False,
                                                                                                          'ref': {   'entity': 'secondary_category',
                                                                                                                     'valueKey': 'id',
                                                                                                                     'labelKey': 'name'}}}}}},
    'special_price_group': {   'source': 'postgres',
                               'options': {   'schema': {   'fields': {   'id': {   'type': 'string',
                                                                                    'readOnly': True},
                                                                          'name': {   'type': 'string',
                                                                                      'required': False},
                                                                          'description': {   'type': 'string',
                                                                                             'required': False}}}}},
    'state': {   'source': 'postgres',
                 'options': {   'schema': {   'fields': {   'id': {   'type': 'string',
                                                                      'readOnly': True},
                                                            'name': {   'type': 'string',
                                                                        'required': True}}}}},
    'task': {   'source': 'postgres',
                'options': {   'schema': {   'fields': {   'id': {   'type': 'int',
                                                                     'required': False},
                                                           'name': {   'type': 'string',
                                                                       'required': True},
                                                           'total_cost': {   'type': 'number',
                                                                             'required': True},
                                                           'total_effort': {   'type': 'number',
                                                                               'required': True},
                                                           'project_type': {   'type': 'string',
                                                                               'required': True},
                                                           'quality_level': {   'type': 'string',
                                                                                'required': True},
                                                           'project_requirment': {   'type': 'string',
                                                                                     'required': True},
                                                           'generated': {   'type': 'string',
                                                                            'required': True},
                                                           'total_tasks': {   'type': 'number',
                                                                              'required': True},
                                                           'tasks': {   'type': 'string',
                                                                        'required': True}}}}},
    'tax': {   'source': 'postgres',
               'options': {   'schema': {   'fields': {   'id': {   'type': 'string',
                                                                    'readOnly': True},
                                                          'name': {   'type': 'string',
                                                                      'required': False},
                                                          'tax_percent': {   'type': 'number',
                                                                             'required': False},
                                                          'state_id': {   'type': 'fk',
                                                                          'required': False,
                                                                          'ref': {   'entity': 'state',
                                                                                     'valueKey': 'id',
                                                                                     'labelKey': 'name'}},
                                                          'vendor_id': {   'type': 'fk',
                                                                           'required': False,
                                                                           'ref': {   'entity': 'vendor',
                                                                                      'valueKey': 'id',
                                                                                      'labelKey': 'name'}}}}}},
    'tax_group': {   'source': 'postgres',
                     'options': {   'schema': {   'fields': {   'id': {   'type': 'string',
                                                                          'readOnly': True},
                                                                'name': {   'type': 'string',
                                                                            'required': False},
                                                                'tax_percent': {   'type': 'number',
                                                                                   'required': False}}}}},
    'user': {   'source': 'postgres',
                'options': {   'schema': {   'fields': {   'id': {   'type': 'int',
                                                                     'required': False},
                                                           'name': {   'type': 'string',
                                                                       'required': True},
                                                           'email': {   'type': 'string',
                                                                        'required': True},
                                                           'username': {   'type': 'string',
                                                                           'required': True},
                                                           'password': {   'type': 'string',
                                                                           'required': True}}}}},
    'vendor': {   'source': 'postgres',
                  'options': {   'schema': {   'fields': {   'id': {   'type': 'string',
                                                                       'readOnly': True},
                                                             'Vendor Information': {   'type': 'heading',
                                                                                       'required': False},
                                                             'name': {   'type': 'string',
                                                                         'required': True},
                                                             'contact_person_first_name': {   'type': 'string',
                                                                                              'required': True},
                                                             'contact_person_last_name': {   'type': 'string',
                                                                                             'required': True},
                                                             'phone': {   'type': 'string',
                                                                          'required': False},
                                                             'sec_information': {   'type': 'heading',
                                                                                    'required': False},
                                                             'minimum_order': {   'type': 'number',
                                                                                  'required': False},
                                                             'terms': {   'type': 'string',
                                                                          'required': True},
                                                             'website': {   'type': 'string',
                                                                            'required': True},
                                                             'account_number': {   'type': 'number',
                                                                                   'required': True},
                                                             'payment_discount': {   'type': 'string',
                                                                                     'required': True},
                                                             'minimum_order_quantity': {   'type': 'number',
                                                                                           'required': True},
                                                             'minimum_order_amount': {   'type': 'number',
                                                                                         'required': True},
                                                             'status': {   'type': 'enum',
                                                                           'required': False},
                                                             'eft_customer': {   'type': 'boolean',
                                                                                 'required': False},
                                                             'address': {   'type': 'string',
                                                                            'required': False},
                                                             'city': {   'type': 'string',
                                                                         'required': False},
                                                             'country': {   'type': 'string',
                                                                            'required': False},
                                                             'state_id': {   'type': 'fk',
                                                                             'required': False,
                                                                             'ref': {   'entity': 'state',
                                                                                        'valueKey': 'id',
                                                                                        'labelKey': 'name'}},
                                                             'zip_code': {   'type': 'string',
                                                                             'required': False},
                                                             'mobile_no': {   'type': 'string',
                                                                              'required': False},
                                                             'pager': {   'type': 'string',
                                                                          'required': False},
                                                             'fax_no': {   'type': 'string',
                                                                           'required': False},
                                                             'mailing_address': {   'type': 'boolean',
                                                                                    'required': False},
                                                             'vendor_state': {   'type': 'string',
                                                                                 'required': False}}}}}}

# Auto-generated scaffold
ENTITIES['tags'] = {
    'source': 'postgres',
    'options': {
        'schema': {
            'fields': {
                'id': {'type': 'string', 'readOnly': True},
                'name': {'type': 'string', 'required': True}
            }
        }
    }
}

# Auto-generated scaffold
ENTITIES['vendor_user_map'] = {
    'source': 'postgres',
    'options': {
        'schema': {
            'fields': {
                'id': {'type': 'string', 'readOnly': True},
                'name': {'type': 'string', 'required': True}
            }
        }
    }
}

# Auto-generated scaffold
ENTITIES['goods_receipt_item'] = {
    'source': 'postgres',
    'options': {
        'schema': {
            'fields': {
                'id': {'type': 'string', 'readOnly': True},
                'name': {'type': 'string', 'required': True}
            }
        }
    }
}

# Auto-generated scaffold
ENTITIES['colors'] = {
    'source': 'postgres',
    'options': {
        'schema': {
            'fields': {
                'id': {'type': 'string', 'readOnly': True},
                'name': {'type': 'string', 'required': True}
            }
        }
    }
}

# Auto-generated scaffold
ENTITIES['classification'] = {
    'source': 'postgres',
    'options': {
        'schema': {
            'fields': {
                'id': {'type': 'string', 'readOnly': True},
                'name': {'type': 'string', 'required': True}
            }
        }
    }
}

# Auto-generated scaffold
ENTITIES['inventory_ledger'] = {
    'source': 'postgres',
    'options': {
        'schema': {
            'fields': {
                'id': {'type': 'string', 'readOnly': True},
                'name': {'type': 'string', 'required': True}
            }
        }
    }
}

# Auto-generated scaffold
ENTITIES['item_tester'] = {
    'source': 'postgres',
    'options': {
        'schema': {
            'fields': {
                'id': {'type': 'string', 'readOnly': True},
                'name': {'type': 'string', 'required': True}
            }
        }
    }
}

# Auto-generated scaffold
ENTITIES['item_classification_map'] = {
    'source': 'postgres',
    'options': {
        'schema': {
            'fields': {
                'id': {'type': 'string', 'readOnly': True},
                'name': {'type': 'string', 'required': True}
            }
        }
    }
}

# Auto-generated scaffold
ENTITIES['item_pricing'] = {
    'source': 'postgres',
    'options': {
        'schema': {
            'fields': {
                'id': {'type': 'string', 'readOnly': True},
                'name': {'type': 'string', 'required': True}
            }
        }
    }
}

# Auto-generated scaffold
ENTITIES['item_image'] = {
    'source': 'postgres',
    'options': {
        'schema': {
            'fields': {
                'id': {'type': 'string', 'readOnly': True},
                'name': {'type': 'string', 'required': True}
            }
        }
    }
}

# Auto-generated scaffold
ENTITIES['sales_invoice'] = {
    'source': 'postgres',
    'options': {
        'schema': {
            'fields': {
                'id': {'type': 'string', 'readOnly': True},
                'name': {'type': 'string', 'required': True}
            }
        }
    }
}

# Auto-generated scaffold
ENTITIES['weights'] = {
    'source': 'postgres',
    'options': {
        'schema': {
            'fields': {
                'id': {'type': 'string', 'readOnly': True},
                'name': {'type': 'string', 'required': True}
            }
        }
    }
}

# Auto-generated scaffold
ENTITIES['address_type'] = {
    'source': 'postgres',
    'options': {
        'schema': {
            'fields': {
                'id': {'type': 'string', 'readOnly': True},
                'name': {'type': 'string', 'required': True}
            }
        }
    }
}

# Auto-generated scaffold
ENTITIES['user_role_map'] = {
    'source': 'postgres',
    'options': {
        'schema': {
            'fields': {
                'id': {'type': 'string', 'readOnly': True},
                'name': {'type': 'string', 'required': True}
            }
        }
    }
}

# Auto-generated scaffold
ENTITIES['address'] = {
    'source': 'postgres',
    'options': {
        'schema': {
            'fields': {
                'id': {'type': 'string', 'readOnly': True},
                'name': {'type': 'string', 'required': True}
            }
        }
    }
}

# Auto-generated scaffold
ENTITIES['invoice_item_map'] = {
    'source': 'postgres',
    'options': {
        'schema': {
            'fields': {
                'id': {'type': 'string', 'readOnly': True},
                'name': {'type': 'string', 'required': True}
            }
        }
    }
}

# Auto-generated scaffold
ENTITIES['goods_receipt'] = {
    'source': 'postgres',
    'options': {
        'schema': {
            'fields': {
                'id': {'type': 'string', 'readOnly': True},
                'name': {'type': 'string', 'required': True}
            }
        }
    }
}

# Auto-generated scaffold
ENTITIES['user_group'] = {
    'source': 'postgres',
    'options': {
        'schema': {
            'fields': {
                'id': {'type': 'string', 'readOnly': True},
                'name': {'type': 'string', 'required': True}
            }
        }
    }
}

# Auto-generated scaffold
ENTITIES['item_tags_map'] = {
    'source': 'postgres',
    'options': {
        'schema': {
            'fields': {
                'id': {'type': 'string', 'readOnly': True},
                'name': {'type': 'string', 'required': True}
            }
        }
    }
}

# Auto-generated scaffold
ENTITIES['classification_type'] = {
    'source': 'postgres',
    'options': {
        'schema': {
            'fields': {
                'id': {'type': 'string', 'readOnly': True},
                'name': {'type': 'string', 'required': True}
            }
        }
    }
}
