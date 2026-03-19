/* auto-generated: mock /options for item */
export const optionsBase = {
  "schema": [
    {
      "name": "item_information",
      "kind": "heading",
      "ui": {
        "label": "Item Information",
        "none_input": true
      },
      "className": "md:col-span-12"
    },
    {
      "name": "item_code",
      "kind": "string",
      "required": true,
      "ui": {
        "label": "Item code"
      },
      "validate": {
        "regex": "^[A-Za-z0-9_\\-]{3,30}$",
        "message": "3-30 chars, A-Z/0-9/_-"
      }
    },
    {
      "name": "name",
      "kind": "string",
      "required": true,
      "ui": {
        "label": "Item name"
      }
    },
    {
      "name": "manufacturer_item_no",
      "kind": "string",
      "required": false,
      "ui": {
        "label": "Manufacturer item no"
      }
    },
    {
      "name": "item_category_ids",
      "ref": {
        "entity": "item_category"
      },
      "ui": {
        "label": "Item categories",
        "input": "multi_select"
      }
    },
    {
      "name": "items_to_be_sold_by_units",
      "kind": "bool",
      "required": false,
      "ui": {
        "label": "Items to be sold by units"
      }
    },
    {
      "name": "unit",
      "kind": "string",
      "required": false,
      "ui": {
        "label": "Unit"
      }
    },
    {
      "name": "locations",
      "kind": "enum",
      "required": false,
      "ui": {
        "label": "Locations"
      },
      "options": [
        {
          "value": "outsides",
          "label": "Outsides"
        },
        {
          "value": "inside",
          "label": "Inside"
        }
      ]
    },
    {
      "name": "active",
      "kind": "bool",
      "required": false,
      "ui": {
        "label": "Active"
      }
    },
    {
      "name": "weights_id",
      "kind": "fk",
      "required": false,
      "ui": {
        "label": "Weight"
      },
      "ref": {
        "entity": "weights",
        "valueKey": "id",
        "labelKey": "name"
      }
    },
    {
      "name": "colors_id",
      "kind": "fk",
      "required": false,
      "ui": {
        "label": "Color"
      },
      "ref": {
        "entity": "colors",
        "valueKey": "id",
        "labelKey": "name"
      }
    },
    {
      "name": "item_tags_ids",
      "kind": "string",
      "required": false,
      "ui": {
        "label": "Item tags",
        "input": "multi_select"
      },
      "ref": {
        "entity": "tags"
      }
    },
    {
      "name": "image",
      "kind": "string",
      "required": false,
      "ui": {
        "label": "Primary Image",
        "input": "image"
      }
    },
    {
      "name": "gallery",
      "kind": "string",
      "required": false,
      "ui": {
        "label": "Gallery (JSON list of paths)",
        "input": "image_gallery",
        "className": "!col-span-full"
      }
    },
    {
      "name": "upc_information",
      "kind": "heading",
      "ui": {
        "label": "UPC Information ",
        "none_input": true
      },
      "className": "md:col-span-12"
    },
    {
      "name": "upc_code",
      "kind": "string",
      "required": false,
      "ui": {
        "label": "Upc no"
      },
      "validate": {
        "regex": "^\\d{8,14}$",
        "message": "8-14 digit code"
      }
    },
    {
      "name": "box_upc",
      "kind": "string",
      "required": false,
      "ui": {
        "label": "Box upc"
      },
      "validate": {
        "regex": "^\\d{8,14}$",
        "message": "8-14 digit code"
      }
    },
    {
      "name": "inner_pack_upc",
      "kind": "string",
      "required": false,
      "ui": {
        "label": "Inner Pack upc"
      },
      "validate": {
        "regex": "^\\d{8,14}$",
        "message": "8-14 digit code"
      }
    },
    {
      "name": "alternative_upc_1",
      "kind": "string",
      "required": false,
      "ui": {
        "label": "Alternative upc 1"
      },
      "validate": {
        "regex": "^\\d{8,14}$",
        "message": "8-14 digit code"
      }
    },
    {
      "name": "alternative_upc_2",
      "kind": "string",
      "required": false,
      "ui": {
        "label": "Alternative upc 2"
      },
      "validate": {
        "regex": "^\\d{8,14}$",
        "message": "8-14 digit code"
      }
    },
    {
      "name": "alternative_upc_3",
      "kind": "string",
      "required": false,
      "ui": {
        "label": "Alternative upc 3"
      },
      "validate": {
        "regex": "^\\d{8,14}$",
        "message": "8-14 digit code"
      }
    },
    {
      "name": "sec_information",
      "kind": "heading",
      "ui": {
        "label": "Sec Information",
        "none_input": true
      },
      "className": "md:col-span-12"
    },
    {
      "name": "size",
      "kind": "string",
      "required": false,
      "ui": {
        "label": "Size"
      },
      "validate": {
        "regex": "^\\d{8,14}$",
        "message": "8-14 digit code"
      }
    },
    {
      "name": "expire_date",
      "kind": "date",
      "required": false,
      "ui": {
        "label": "Expire date"
      }
    },
    {
      "name": "secondary_category_ids",
      "ref": {
        "entity": "secondary_category"
      },
      "ui": {
        "label": "Secondary categories",
        "input": "multi_select"
      }
    },
    {
      "name": "brand_id",
      "kind": "fk",
      "required": false,
      "ui": {
        "label": "Brand"
      },
      "ref": {
        "entity": "brand",
        "valueKey": "id",
        "labelKey": "name"
      }
    },
    {
      "name": "tax_group_id",
      "kind": "fk",
      "required": false,
      "ui": {
        "label": "Tax group"
      },
      "ref": {
        "entity": "tax_group",
        "valueKey": "id",
        "labelKey": "name"
      }
    },
    {
      "name": "is_cash_and_carry",
      "kind": "bool",
      "required": false,
      "ui": {
        "label": "Is cash and carry"
      }
    },
    {
      "name": "cash_and_carry_item_code",
      "kind": "string",
      "required": false,
      "ui": {
        "label": "Cash and carry item code"
      }
    },
    {
      "name": "price",
      "kind": "number",
      "required": false,
      "ui": {
        "label": "Price"
      },
      "validate": {
        "min": 0
      }
    },
    {
      "name": "price_group_id",
      "kind": "fk",
      "required": false,
      "ui": {
        "label": "Price group"
      },
      "ref": {
        "entity": "price_group",
        "valueKey": "id",
        "labelKey": "name"
      }
    },
    {
      "name": "cash_discount_group_id",
      "kind": "fk",
      "required": false,
      "ui": {
        "label": "Cash discount group"
      },
      "ref": {
        "entity": "cash_discount_group",
        "valueKey": "id",
        "labelKey": "name"
      }
    },
    {
      "name": "vendor_id",
      "kind": "fk",
      "required": false,
      "ui": {
        "label": "Vendor"
      },
      "ref": {
        "entity": "vendor",
        "valueKey": "id",
        "labelKey": "name"
      }
    },
    {
      "name": "msa_information",
      "kind": "heading",
      "ui": {
        "label": "MSA Information",
        "none_input": true
      },
      "className": "md:col-span-12"
    },
    {
      "name": "include_in_msa",
      "kind": "bool",
      "required": false,
      "ui": {
        "label": "Include in msa"
      }
    },
    {
      "name": "identification_symbol",
      "kind": "string",
      "required": false,
      "ui": {
        "label": "Identification symbol"
      }
    },
    {
      "name": "distribution_sku",
      "kind": "string",
      "required": false,
      "ui": {
        "label": "Distribution sku"
      }
    },
    {
      "name": "item_per_selling_unit",
      "kind": "string",
      "required": false,
      "ui": {
        "label": "Item per selling unit"
      }
    },
    {
      "name": "promotion_indicator",
      "kind": "enum",
      "required": false,
      "ui": {
        "label": "Promotion indicator"
      },
      "options": [
        {
          "value": "yes",
          "label": "Yes"
        },
        {
          "value": "no",
          "label": "No"
        }
      ]
    },
    {
      "name": "product_unit_size_description",
      "kind": "string",
      "required": false,
      "ui": {
        "label": "Product unit size description"
      }
    },
    {
      "name": "msa_category_code",
      "kind": "string",
      "required": false,
      "ui": {
        "label": "Msa category code"
      }
    },
    {
      "name": "distributor_product_unit_size",
      "kind": "string",
      "required": false,
      "ui": {
        "label": "Distributor product unit size"
      }
    },
    {
      "name": "other_information_heading",
      "kind": "heading",
      "ui": {
        "label": "Other  Information",
        "none_input": true
      },
      "className": "md:col-span-12"
    },
    {
      "name": "short_description",
      "kind": "string",
      "required": false,
      "ui": {
        "label": "Short description",
        "input": "editor",
        "default": ""
      }
    },
    {
      "name": "description",
      "kind": "string",
      "required": false,
      "ui": {
        "label": "Product description",
        "input": "editor",
        "default": ""
      }
    },
    {
      "name": "other_information",
      "kind": "string",
      "required": false,
      "ui": {
        "label": "Product Information",
        "input": "array",
        "default": ""
      },
      "className": "md:col-span-12"
    },
    {
      "name": "qtyss",
      "kind": "number",
      "required": false,
      "ui": {
        "label": "Qtyss"
      },
      "validate": {
        "min": 0
      }
    },
    {
      "name": "default_price",
      "kind": "number",
      "required": false,
      "ui": {
        "label": "Default Price"
      }
    }
  ],
  "table": {
    "columns": [
      "id",
      "item_code",
      "name",
      "upc_code",
      "box_upc",
      "inner_pack_upc",
      "alternative_upc_1",
      "alternative_upc_2",
      "alternative_upc_3",
      "size",
      "unit",
      "price",
      "description",
      "expire_date",
      "locations",
      "manufacturer_item_no",
      "items_to_be_sold_by_units",
      "include_in_msa",
      "identification_symbol",
      "distribution_sku",
      "item_per_selling_unit",
      "promotion_indicator",
      "product_unit_size_description",
      "msa_category_code",
      "distributor_product_unit_size",
      "is_cash_and_carry",
      "cash_and_carry_item_code",
      "active",
      "image",
      "gallery"
    ],
    "columnResolvers": {
      "secondary_category": "name",
      "vendor": "name",
      "tax_group": "name",
      "price_group": "name",
      "cash_discount_group": "name",
      "brand": "name"
    }
  }
};
export async function options() { return optionsBase; }
