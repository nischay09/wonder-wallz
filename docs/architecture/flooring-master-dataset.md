# Wonder Wallz Flooring Master Dataset

> **Purpose:** Single source of truth for the Wonder Wallz flooring
> catalogue. This document contains catalogue structure, naming
> conventions, extracted product data, and implementation guidance.

------------------------------------------------------------------------

# Architecture

    Category
    └── Collection
        └── (Optional Series)
            └── Variant

-   **Category**: Luxury Vinyl Tiles, Laminate Flooring, Sports
    Flooring, Carpet Tiles
-   **Collection**: e.g. Malaga, Valencia, Vigo, Venice, Bern
-   **Series**: Optional. Used only where required (e.g. Malaga → Uni
    4.5)
-   **Variant**: Individual colour/reference.

------------------------------------------------------------------------

# Naming Rules

-   Wallpapers use **Design IDs**
-   Flooring uses **Reference Codes**
-   Never use "Design ID" for flooring.

------------------------------------------------------------------------

# Image Convention

## Collection

-   hero.webp
-   technical.webp
-   gallery/\*

## Variant

-   preview.webp
-   lifestyle.webp
-   thumbnail.webp (optional)

------------------------------------------------------------------------

# Sports Flooring

## Collection: Malaga

Applications

-   Badminton
-   Basketball
-   Table Tennis
-   Volleyball
-   Gymnasium
-   Educational Facilities

### Series: Uni 4.5

Specification

-   Thickness: 4.5 mm
-   Wear Layer: 1.4 mm
-   Roll Width: 1.8 m
-   Roll Length: 20 m
-   Weight: 2900 g/m²
-   Warranty: 8 Years

Variants

  Reference   Name
  ----------- -------------
  6711        Silver Grey
  6402        Sky Blue
  6154        Red
  6563        Mint Green
  6450        Bright Blue

### Series: Wood 4.5

-   Thickness: 4.5 mm
-   Wear Layer: 1.4 mm
-   Roll Width: 1.8 m
-   Roll Length: 20 m
-   Weight: 2900 g/m²
-   Warranty: 8 Years

Variants

  Reference   Name
  ----------- ----------------
  6058        American Oak
  6375        Oak
  6068        Wood Chocolate

### Series: Wood 6.0

-   Thickness: 6.0 mm
-   Wear Layer: 1.5 mm
-   Roll Width: 1.8 m
-   Roll Length: 15 m
-   Weight: 4200 g/m²
-   Warranty: 8 Years

Variants

  Reference   Name
  ----------- -------
  6381        Maple

------------------------------------------------------------------------

# Luxury Vinyl Tiles

## Valencia (2.0 mm)

Shared Specification

-   Thickness: 2.0 mm
-   Wear Layer: 0.15 mm
-   UV Coating
-   Matt Finish
-   Line Embossed
-   Fire Rating: NFPA Class B1-S1
-   Slip Rating: R9
-   Performance Class: 34/43
-   10 Year Wear Warranty

Series

### 6×36 Plank

Variants: VAL-201 ... VAL-212

### 12×24 Tile

Variants: VAL-213, VAL-214

------------------------------------------------------------------------

## Vigo (1.5 mm)

Shared Specification

-   Thickness: 1.5 mm
-   Wear Layer: 0.10 mm
-   UV Coating
-   Matt Finish
-   Line Embossed
-   Weight: 2.95 kg/m²
-   36 pcs/carton
-   Coverage: 54 sqft/carton
-   7 Year Warranty

Variants

VIG-151 through VIG-162

------------------------------------------------------------------------

# Laminate Flooring

## Venice

Specification

-   1217×196×8 mm
-   8 mm
-   Crystal Finish
-   Brown HDF Core
-   Unilin Click
-   HDF AC4
-   Residential Warranty: 15 Years
-   Commercial Warranty: 10 Years

Variants

445 African Walnut

446 Sand Oak

447 Grey Oak

448 Cherry Oak

449 American Cherry

450 Natural Oak

451 Solar Oak

452 Castle Oak

453 Grey Wood

454 Mountain Walnut

455 Spanish Cedar

456 Golden Oak

------------------------------------------------------------------------

# Carpet Tiles

## Trento

Commercial carpet tile collection.

Variants

2000 Grey

2001 Carbon

2002 Ocean Blue

2003 Charcoal

2004 Navy

2005 Chestnut

------------------------------------------------------------------------

## Bern

Variants

6000 Beige

6001 Beige Yellow

6002 Yellow

6003 Beige Rust

6004 Rust

6005 Grey Teal

6006 Teal

6007 Grey Blue

6008 Blue

6010 Grey

------------------------------------------------------------------------

## Berlin

Variants

7001 Beige

7002 Brown

7004 Light Grey

7005 Medium Grey

7006 Dark Grey

------------------------------------------------------------------------

## Tego

Variants

1000 Light Grey

1001 Medium Grey

1002 Charcoal

1003 Blue

1004 Beige

------------------------------------------------------------------------

# Folder Structure

    src/lib/flooring/
        types.ts
        helpers.ts
        constants.ts
        registry.ts

        products/
            sports/
            vinyl/
            laminate/
            carpet/

        specs/
            sports/
            vinyl/
            laminate/
            carpet/

------------------------------------------------------------------------

# Future Collections

To add a collection:

1.  Create specification(s)
2.  Create collection data file
3.  Add variants
4.  Export through category index.ts
5.  Register in registry
6.  Add images

No architecture changes should be required.
