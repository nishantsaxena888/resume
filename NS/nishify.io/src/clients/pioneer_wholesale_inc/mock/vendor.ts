/* auto-generated: mock /options for vendor */
export const optionsBase = {
  "schema": [
    {
      "name": "Vendor Information",
      "kind": "heading",
      "ui": {
        "label": "Billing address",
        "none_input": true
      },
      "className": "md:col-span-12"
    },
    {
      "name": "name",
      "kind": "string",
      "required": true,
      "ui": {
        "label": "Vendor name"
      }
    },
    {
      "name": "contact_person_first_name",
      "kind": "string",
      "required": true,
      "ui": {
        "label": "Contact person first name"
      }
    },
    {
      "name": "contact_person_last_name",
      "kind": "string",
      "required": true,
      "ui": {
        "label": "Contact person last name"
      }
    },
    {
      "name": "phone",
      "kind": "string",
      "required": false,
      "ui": {
        "label": "Phone number"
      },
      "validate": {
        "regex": "^\\+?[0-9\\- ]{7,15}$",
        "message": "Invalid phone"
      }
    },
    {
      "name": "sec_information",
      "kind": "heading",
      "ui": {
        "label": "Secondary Information",
        "none_input": true
      },
      "className": "md:col-span-12"
    },
    {
      "name": "minimum_order",
      "kind": "number",
      "required": false,
      "ui": {
        "label": "Minimum order"
      }
    },
    {
      "name": "terms",
      "kind": "string",
      "required": true,
      "ui": {
        "label": "Terms"
      }
    },
    {
      "name": "website",
      "kind": "string",
      "required": true,
      "ui": {
        "label": "Website"
      },
      "validate": {
        "regex": "^(https?:\\/\\/)?([a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,}(\\/[^\\s]*)?$",
        "message": "Invalid Website url"
      }
    },
    {
      "name": "account_number",
      "kind": "number",
      "required": true,
      "ui": {
        "label": "Account number"
      }
    },
    {
      "name": "payment_discount",
      "kind": "string",
      "required": true,
      "ui": {
        "label": "Payment discount"
      }
    },
    {
      "name": "minimum_order_quantity",
      "kind": "number",
      "required": true,
      "ui": {
        "label": "Minimum order quantity"
      }
    },
    {
      "name": "minimum_order_amount",
      "kind": "number",
      "required": true,
      "ui": {
        "label": "Minimum order amount"
      }
    },
    {
      "name": "status",
      "kind": "enum",
      "required": false,
      "ui": {
        "label": "Status"
      },
      "options": [
        {
          "value": "active",
          "label": "Active"
        },
        {
          "value": "inactive",
          "label": "Inactive"
        }
      ]
    },
    {
      "name": "eft_customer",
      "kind": "bool",
      "required": false,
      "ui": {
        "label": "Eft customer"
      }
    },
    {
      "name": "address",
      "kind": "heading",
      "ui": {
        "label": "Shipping & Billing Address",
        "none_input": true
      },
      "className": "md:col-span-12"
    },
    {
      "name": "address",
      "kind": "string",
      "required": false,
      "ui": {
        "label": "Address",
        "input": "google_address",
        "autoPopulate": {
          "state": "state",
          "city": "city",
          "zip_code": "zip_code",
          "country": "country"
        }
      }
    },
    {
      "name": "city",
      "kind": "string",
      "required": false,
      "ui": {
        "label": "City"
      }
    },
    {
      "name": "country",
      "kind": "string",
      "required": false,
      "ui": {
        "label": "Country"
      }
    },
    {
      "name": "state_id",
      "kind": "fk",
      "required": false,
      "ui": {
        "label": "State"
      },
      "ref": {
        "entity": "state",
        "valueKey": "id",
        "labelKey": "name"
      }
    },
    {
      "name": "zip_code",
      "kind": "string",
      "required": false,
      "ui": {
        "label": "Zip code"
      }
    },
    {
      "name": "mobile_no",
      "kind": "string",
      "required": false,
      "ui": {
        "label": "Mobile no"
      }
    },
    {
      "name": "pager",
      "kind": "string",
      "required": false,
      "ui": {
        "label": "Pager"
      }
    },
    {
      "name": "fax_no",
      "kind": "string",
      "required": false,
      "ui": {
        "label": "Fax no"
      }
    },
    {
      "name": "mailing_address",
      "kind": "bool",
      "required": false,
      "ui": {
        "label": "Mailing address"
      }
    },
    {
      "name": "vendor_state",
      "kind": "string",
      "required": false,
      "ui": {
        "label": "Vendor state (text)"
      }
    }
  ],
  "table": {
    "columns": [
      "id",
      "name",
      "phone",
      "contact_person_first_name",
      "contact_person_last_name",
      "minimum_order",
      "terms",
      "website",
      "account_number",
      "payment_discount",
      "minimum_order_quantity",
      "minimum_order_amount",
      "status",
      "eft_customer",
      "address",
      "city",
      "country",
      "vendor_state",
      "zip_code",
      "mobile_no",
      "pager",
      "fax_no",
      "mailing_address",
      "state"
    ],
    "columnResolvers": {
      "state": "name"
    }
  }
};
export async function options() { return optionsBase; }
