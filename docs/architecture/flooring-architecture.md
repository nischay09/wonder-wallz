# Wonder Wallz Flooring Architecture

> Developer documentation for the flooring module.

------------------------------------------------------------------------

# Philosophy

The flooring module is **data-driven**.

Components, pages, routing and search consume structured data. Adding a
new collection should require creating data files only, not changing UI
logic.

------------------------------------------------------------------------

# Hierarchy

    Category
    └── Collection
        └── (Optional Series)
            └── Variant

Examples:

    Sports Flooring
    └── Malaga
        └── Uni 4.5
            └── 6711 Silver Grey

    Carpet Tiles
    └── Bern
        └── 6000 Beige

------------------------------------------------------------------------

# Folder Structure

    src/lib/flooring/
    ├── types.ts
    ├── constants.ts
    ├── helpers.ts
    ├── registry.ts
    ├── products/
    │   ├── sports/
    │   ├── vinyl/
    │   ├── laminate/
    │   └── carpet/
    └── specs/
        ├── sports/
        ├── vinyl/
        ├── laminate/
        └── carpet/

------------------------------------------------------------------------

# Responsibilities

## types.ts

Contains only interfaces and types.

No runtime logic.

## constants.ts

Shared constants:

-   Flooring categories
-   Slugs
-   Readonly values

## registry.ts

Single source of truth for all flooring collections.

Every page, search feature and helper should discover collections from
the registry rather than hardcoding them.

## helpers.ts

Lookup utilities:

-   getFlooringCategory()
-   getCollectionsByCategory()
-   getCollection()
-   getSeries()
-   getVariant()
-   getSpecification()
-   lookupByReferenceCode()

Helpers should not know about UI.

------------------------------------------------------------------------

# Data Model

## Category

Owns collections.

## Collection

Contains:

-   metadata
-   hero
-   gallery
-   description
-   applications
-   specificationId (optional)
-   series (optional)
-   variants (optional)

Collections either:

-   own variants directly, or
-   own one or more series.

Never both.

## Series

Optional abstraction.

Used only when specifications differ inside a collection.

Examples:

-   Malaga
-   Valencia

Not used for:

-   Bern
-   Berlin
-   Tego
-   Trento
-   Venice

## Variant

Represents a purchasable finish/colour.

Contains:

-   referenceCode
-   displayName
-   slug
-   preview image
-   lifestyle image

Variants inherit specifications from their parent collection or series.

------------------------------------------------------------------------

# Specification Strategy

Specifications are never duplicated.

    Specification
          ↑
     Collection or Series
          ↑
        Variants

If every variant shares one specification, attach it to the collection.

If different groups require different specifications, attach them to
series.

------------------------------------------------------------------------

# Registry Workflow

Adding a collection:

1.  Create specification(s).
2.  Create collection data file.
3.  Export through category index.ts.
4.  Register in registry.ts.
5.  Add images.

No helper or UI changes should be necessary.

------------------------------------------------------------------------

# Design Principles

-   Strong TypeScript typing
-   Data first
-   UI consumes data
-   No duplicated specifications
-   Optional Series support
-   Predictable slugs
-   Stable public APIs via category index.ts files

------------------------------------------------------------------------

# Future Roadmap

Phase 2 - Populate catalogue data

Phase 3 - Routing

Phase 4 - Reusable flooring UI

Phase 5 - Customer actions integration

Phase 6 - Polish

Phase 7 - Final image integration
