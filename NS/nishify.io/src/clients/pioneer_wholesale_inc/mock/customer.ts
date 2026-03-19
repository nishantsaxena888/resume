/* auto-generated: mock /options for customer */
export const optionsBase = {
  "schema": [
    {
      "name": "account_information",
      "kind": "heading",
      "ui": {
        "label": "Account Information",
        "none_input": true
      },
      "className": "md:col-span-12"
    },
    {
      "name": "account_information",
      "kind": "heading",
      "ui": {
        "label": "Account Information"
      }
    },
    {
      "name": "name",
      "kind": "string",
      "required": true,
      "ui": {
        "label": "Customer name"
      }
    },
    {
      "name": "phone",
      "kind": "string",
      "required": false,
      "ui": {
        "label": "Phone"
      },
      "validate": {
        "regex": "^\\+?[0-9\\- ]{7,15}$",
        "message": "Invalid phone"
      }
    },
    {
      "name": "email",
      "kind": "string",
      "required": false,
      "ui": {
        "label": "Email"
      }
    },
    {
      "name": "fax",
      "kind": "string",
      "required": false,
      "ui": {
        "label": "Fax"
      }
    },
    {
      "name": "boro",
      "kind": "string",
      "required": false,
      "ui": {
        "label": "Boro"
      }
    },
    {
      "name": "credit_limit",
      "kind": "number",
      "required": false,
      "ui": {
        "label": "Credit limit"
      }
    },
    {
      "name": "customer_note",
      "kind": "string",
      "required": false,
      "ui": {
        "label": "Customer note"
      }
    },
    {
      "name": "product_promotion",
      "kind": "enum",
      "required": false,
      "ui": {
        "label": "Product promotion"
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
      "name": "status",
      "kind": "enum",
      "required": false,
      "ui": {
        "label": "Is inactive"
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
      "name": "is_msa_include",
      "kind": "bool",
      "required": false,
      "ui": {
        "label": "Is MSA include"
      }
    },
    {
      "name": "pricing_and_tax",
      "kind": "heading",
      "ui": {
        "label": "Pricing & Tax",
        "none_input": true
      },
      "className": "md:col-span-12"
    },
    {
      "name": "is_sales_tax_applicable",
      "kind": "bool",
      "required": false,
      "ui": {
        "label": "Is sales tax applicable"
      }
    },
    {
      "name": "send_email_on_invoice_creation",
      "kind": "bool",
      "required": false,
      "ui": {
        "label": "Send email on invoice creation"
      }
    },
    {
      "name": "calculate_interest",
      "kind": "bool",
      "required": false,
      "ui": {
        "label": "Calculate interest"
      }
    },
    {
      "name": "self_checkout_tax",
      "kind": "bool",
      "required": false,
      "ui": {
        "label": "Self checkout tax"
      }
    },
    {
      "name": "cash_and_carry_customer_code",
      "kind": "bool",
      "required": false,
      "ui": {
        "label": "Cash and carry customer code"
      }
    },
    {
      "name": "sales_person_id",
      "kind": "fk",
      "required": false,
      "ui": {
        "label": "Salesman"
      },
      "ref": {
        "entity": "salesperson",
        "valueKey": "id",
        "labelKey": "name"
      }
    },
    {
      "name": "payment_terms_id",
      "kind": "fk",
      "required": false,
      "ui": {
        "label": "Payment terms"
      },
      "ref": {
        "entity": "payment_terms",
        "valueKey": "id",
        "labelKey": "name"
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
      "name": "shipping_address",
      "kind": "heading",
      "ui": {
        "label": "Shipping address",
        "none_input": true
      },
      "className": "md:col-span-12"
    },
    {
      "name": "default_address",
      "kind": "enum",
      "required": false,
      "ui": {
        "label": "Default address"
      },
      "options": [
        {
          "value": "shipping",
          "label": "Shipping"
        },
        {
          "value": "billing",
          "label": "Billing"
        }
      ]
    },
    {
      "name": "shipping_street_address",
      "kind": "string",
      "required": false,
      "ui": {
        "label": "Street address",
        "input": "google_address",
        "autoPopulate": {
          "state": "shipping_state",
          "city": "shipping_city",
          "zip_code": "shipping_zip_code",
          "country": "shipping_country"
        }
      }
    },
    {
      "name": "shipping_city",
      "kind": "string",
      "required": false,
      "ui": {
        "label": "City"
      }
    },
    {
      "name": "shipping_zip_code",
      "kind": "string",
      "required": false,
      "ui": {
        "label": "Zip code"
      }
    },
    {
      "name": "shipping_state_id",
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
      "name": "billing_address",
      "kind": "heading",
      "ui": {
        "label": "Billing address",
        "none_input": true
      },
      "className": "md:col-span-12"
    },
    {
      "name": "billing_street_address",
      "kind": "string",
      "required": false,
      "ui": {
        "label": "Street address",
        "input": "google_address",
        "autoPopulate": {
          "state": "billing_state",
          "city": "billing_city",
          "zip_code": "billing_zip_code",
          "country": "billing_country"
        }
      }
    },
    {
      "name": "billing_city",
      "kind": "string",
      "required": false,
      "ui": {
        "label": "City"
      }
    },
    {
      "name": "billing_zip_code",
      "kind": "string",
      "required": false,
      "ui": {
        "label": "Zip code"
      }
    },
    {
      "name": "billing_state_id",
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
    }
  ],
  "table": {
    "columns": [
      "id",
      "name",
      "phone",
      "email",
      "fax",
      "status",
      "boro",
      "credit_limit",
      "customer_note",
      "product_promotion",
      "is_msa_include",
      "is_sales_tax_applicable",
      "calculate_interest",
      "send_email_on_invoice_creation",
      "self_checkout_tax",
      "cash_and_carry_customer_code",
      "default_address",
      "shipping_street_address",
      "shipping_city",
      "shipping_zip_code",
      "billing_street_address",
      "billing_city",
      "billing_zip_code",
      "state",
      "sales_person",
      "payment_terms",
      "price_group",
      "cash_discount_group",
      "shipping_state",
      "billing_state"
    ],
    "columnResolvers": {
      "billing_state": "name",
      "cash_discount_group": "name",
      "payment_terms": "name",
      "price_group": "name",
      "sales_person": "name",
      "shipping_state": "name",
      "state": "name"
    }
  }
};
export async function options() { return optionsBase; }
