# Admin Framework Architecture Overview

The admin system is **fully dynamic**: every entity gets

- a **Form** (create/update)  
- a **Listing** (table/cards/accordion etc. for browse/search)  

Both are driven by backend `/options` + CRUD endpoints, so **no entity-specific UI code** is needed.

---

## Directory Structure


```
src/components/
  core/
    EntityPageHOC.tsx       // orchestrates form <-> list flow
    ListingHOC.tsx          // generic listing (data, filters, tabs, pagination)
    FormHOC.tsx             // generic form (create/update/clone)
    types.ts                // shared contracts (FieldKind, SchemaField, etc.)
    utils.ts                // normalize options, build queries, formatters
    constants.ts            // defaults (page size, debounce, tab keys)
    hooks/
      useEntityOptions.ts   // fetch + normalize /options
      useEntityQuery.ts     // manages page/size/q/tab/sort
      useEntityActions.ts   // CRUD + callbacks

  admin/
    shell/
      AdminShell.tsx        // thin entrypoint for admin
      Sidebar.tsx           // sidebar navigation (entities)
      Header.tsx            // top bar actions (new, filters, template switch)
    templates/
      list/
        TableTemplate.tsx   // wraps GenericTable
        CardTemplate.tsx    // optional
        AccordionTemplate.tsx // optional
      form/
        DefaultForm.tsx     // wraps GenericForm
        WizardForm.tsx      // optional (multi-step)
    context/
      dashboard-provider.tsx
    legacy/
      GenericForm.tsx
      GenericTable.tsx

  ui/ …                     // shared Shadcn components
  ThemeSwitcher.tsx
  theme-provider.tsx
  theme-registry.tsx
```


---

## Core Concepts

### EntityPageHOC
**Input**: `{ entity, template, options }`  

**State machine**:
- `list` → shows ListingHOC (table/cards/etc.)  
- `create` → shows FormHOC(mode=create)  
- `update` → shows FormHOC(mode=update, id)  

**Orchestration**:
- Fetches `/options` once → passes schema to ListingHOC + FormHOC  
- Handles transitions: New → Form, Edit → Form, Save → back to List + refresh  

---

### ListingHOC
**Handles**:
- Data load (`GET /api/{entity}`)  
- Tabs (`?tab=draft` etc.)  
- Filters, search, sort, pagination  
- Row/bulk actions (edit, delete, custom)  
- Delegates **UI rendering** to a template (`TableTemplate`, `CardTemplate`, etc.)  

---

### FormHOC
**Handles**:
- Create/update/clone  
- Loads schema from `/options`, and data for update/clone  
- Renders dynamic fields (string, number, bool, date, enum, fk)  
- Validation (required, type, min/max, regex, custom rules from backend)  
- Submits via `POST` (create/clone) or `PUT` (update)  
- Delegates **UI rendering** to form templates (`DefaultForm`, `WizardForm`)  

---

## Extensibility

- **Templates**:
  - Add new listing templates (`Kanban`, `Timeline`, `Tree`) under `admin/templates/list/`  
  - Add new form templates (`Wizard`, `Stepper`) under `admin/templates/form/`  

- **Client-specific overrides**:
  - Each client can register their own template.  
  - Example: `clients/pioneer/templates/list/PioneerTable.tsx`  
  - Config chooses template: `template: "pioneerTable"`  
  - HOC resolves dynamically.  

---

## Golden Rules

1. **EntityPage = Listing + Form.**  
   - Listing → browse/search/filter  
   - Form → create/update  

2. **Core defines contracts, not UI.**  
   - `EntityPageHOC`, `ListingHOC`, `FormHOC` live in `core/`  
   - UI is in templates (`admin/` or client-specific)  

3. **Backend drives UI.**  
   - `/options` provides schema, enums, fk, validators  
   - CRUD endpoints provide data  

4. **Only needed components load.**  
   - Next.js tree-shaking ensures unused templates/components are dropped  
   - Client-specific templates imported only if configured  


```mermaid 
sequenceDiagram
  participant User
  participant EntityPageHOC as EntityPageHOC
  participant ListingHOC as ListingHOC
  participant FormHOC as FormHOC
  participant API as Backend API

  User->>ListingHOC: Click "Edit" on row (id)
  ListingHOC->>EntityPageHOC: onEdit(id)
  EntityPageHOC->>FormHOC: mode=update, id
  FormHOC->>API: GET /api/{entity}/{id}
  API-->>FormHOC: entity data
  User->>FormHOC: Update fields + Submit
  FormHOC->>API: PUT /api/{entity}/{id}
  API-->>FormHOC: 200 OK
  FormHOC->>EntityPageHOC: onSuccess()
  EntityPageHOC->>ListingHOC: refresh()
  ListingHOC->>API: GET /api/{entity}?page&size&q&tab&sort
  API-->>ListingHOC: { items, total }
  ListingHOC-->>User: Updated list rendered
```


```mermaid 
flowchart LR
  subgraph UI["Frontend UI"]
    direction TB
    EP["EntityPageHOC · entity template options"]
    L["ListingHOC · page size q tab sort filters"]
    F["FormHOC · create | update | clone"]
  end

  subgraph CORE["Core Contracts"]
    OPTS["useEntityOptions · /options → schema"]
    QRY["useEntityQuery · page size q tab sort"]
    ACT["useEntityActions · CRUD + callbacks"]
    TYPES["types.ts · FieldKind SchemaField …"]
  end

  subgraph BE["Backend"]
    OPTSAPI["GET /api/{entity}/options"]
    LISTAPI["GET /api/{entity}?page&size&q&tab&sort"]
    ONEAPI["GET /api/{entity}/{id}"]
    POSTAPI["POST /api/{entity}"]
    PUTAPI["PUT /api/{entity}/{id}"]
    DELAPI["DELETE /api/{entity}/{id}"]
  end

  EP -->|uses| OPTS
  EP -->|injects| QRY
  EP -->|injects| ACT

  EP --> L
  L -->|render via| OPTS
  L -->|query state| QRY
  L -->|list fetch| LISTAPI
  L -->|row actions| ACT

  EP --> F
  F -->|load schema| OPTS
  F -->|load one| ONEAPI
  F -->|create| POSTAPI
  F -->|update| PUTAPI
  F -- onSuccess --> EP
  L -->|delete| DELAPI

  TYPES -. used by .-> EP
  TYPES -. used by .-> L
  TYPES -. used by .-> F
  TYPES -. used by .-> OPTS
  TYPES -. used by .-> ACT


```
