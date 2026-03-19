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
      "name": "name",
      "kind": "string",
      "ui": {
        "label": "Customer name"
      }
    },
    {
      "name": "phone",
      "kind": "string",
      "ui": {
        "label": "Phone"
      }
    },
    {
      "name": "email",
      "kind": "string",
      "ui": {
        "label": "Email"
      }
    },
    {
      "name": "fax",
      "kind": "string",
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
      "name": "user_id",
      "kind": "fk",
      "required": true,
      "ui": {
        "label": "User"
      },
      "ref": {
        "entity": "user",
        "valueKey": "id",
        "labelKey": "name"
      }
    },
    {
      "name": "is_msa_include",
      "kind": "bool",
      "required": false,
      "ui": {
        "label": "Is Msa Include"
      }
    },
    {
      "name": "is_sales_tax_applicable",
      "kind": "bool",
      "required": false,
      "ui": {
        "label": "Is Sales Tax Applicable"
      }
    },
    {
      "name": "calculate_interest",
      "kind": "bool",
      "required": false,
      "ui": {
        "label": "Calculate Interest"
      }
    },
    {
      "name": "send_email_on_invoice_creation",
      "kind": "bool",
      "required": false,
      "ui": {
        "label": "Send Email On Invoice Creation"
      }
    },
    {
      "name": "self_checkout_tax",
      "kind": "bool",
      "required": false,
      "ui": {
        "label": "Self Checkout Tax"
      }
    },
    {
      "name": "cash_and_carry_customer_code",
      "kind": "bool",
      "required": false,
      "ui": {
        "label": "Cash And Carry Customer Code"
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
      "name": "payment_terms_id",
      "kind": "fk",
      "required": false,
      "ui": {
        "label": "Payment Terms"
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
        "label": "Price Group"
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
        "label": "Cash Discount Group"
      },
      "ref": {
        "entity": "cash_discount_group",
        "valueKey": "id",
        "labelKey": "name"
      }
    },
    {
      "name": "default_address",
      "kind": "enum",
      "required": false,
      "ui": {
        "label": "Default Address"
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
        "label": "Shipping Street Address"
      }
    },
    {
      "name": "shipping_city",
      "kind": "string",
      "required": false,
      "ui": {
        "label": "Shipping City"
      }
    },
    {
      "name": "shipping_zip_code",
      "kind": "string",
      "required": false,
      "ui": {
        "label": "Shipping Zip Code"
      }
    },
    {
      "name": "shipping_state_id",
      "kind": "fk",
      "required": false,
      "ui": {
        "label": "Shipping State"
      },
      "ref": {
        "entity": "state",
        "valueKey": "id",
        "labelKey": "name"
      }
    },
    {
      "name": "billing_street_address",
      "kind": "string",
      "required": false,
      "ui": {
        "label": "Billing Street Address"
      }
    },
    {
      "name": "billing_city",
      "kind": "string",
      "required": false,
      "ui": {
        "label": "Billing City"
      }
    },
    {
      "name": "billing_zip_code",
      "kind": "string",
      "required": false,
      "ui": {
        "label": "Billing Zip Code"
      }
    },
    {
      "name": "billing_state_id",
      "kind": "fk",
      "required": false,
      "ui": {
        "label": "Billing State"
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
      "status",
      "credit_limit",
      "state",
      "sales_person"
    ],
    "columnResolvers": {
      "state": "name",
      "sales_person": "name"
    }
  }
};
export async function options() { return optionsBase; }
