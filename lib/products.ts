export type Product = {
    id: string;
    slug: string;
    name: string;
    priceCents: number;
    currency: "ZAR";
    description: string;
    active: boolean;
    stock: number | null;
}

export const products: Product[] = [
    {
        id: "prod_001",
        slug: "silk-scrunchies",
        name: "Silk Scrunchies",
        priceCents: 100,
        currency: "ZAR",
        description: "Luxuriously smooth hair ties made from silk; gentle on hair and helps reduce breakage and frizz.",
        active: true,
        stock: null,
    },
    {
        id: "prod_002",
        slug: "cotton-scrunchies",
        name: "Cotton Scrunchies",
        priceCents: 1799,
        currency: "ZAR",
        description: "Classic, breathable scrunchies crafted from soft cotton fabric; everyday comfort and casual style.",
        active: true,
        stock: null,
    },
    {
        id: "prod_003",
        slug: "polycotton-scrunchies",
        name: "Polycotton Scrunchies",
        priceCents: 1799,
        currency: "ZAR",
        description: "Durable and easy-care scrunchies made from a polycotton blend; balanced softness with resilience.",
        active: true,
        stock: null,
    },
    {
        id: "prod_004",
        slug: "minimatt-scrunchies",
        name: "Minimatt Scrunchies",
        priceCents: 2199,
        currency: "ZAR",
        description: "Matte-finish scrunchies with a minimalist aesthetic; smooth, understated look and feel.",
        active: true,
        stock: null,
    },
    {
        id: "prod_005",
        slug: "satin-scrunchies",
        name: "Satin Scrunchies",
        priceCents: 1999,
        currency: "ZAR",
        description: "Shiny, smooth satin fabric for a sleek look that helps prevent hair creases.",
        active: true,
        stock: null,
    },
    {
        id: "prod_006",
        slug: "organsa-scrunchies",
        name: "Organsa Scrunchies",
        priceCents: 2199,
        currency: "ZAR",
        description: "Lightweight, slightly sheer scrunchies made from organza; adds a delicate, dressy flair.",
        active: true,
        stock: null,
    },
    {
        id: "prod_007",
        slug: "asemrowend-linte",
        name: "Asemrowend Linte",
        priceCents: 1999,
        currency: "ZAR",
        description: "Stretch knit hair ties wrapped with satin ribbon.",
        active: true,
        stock: null,
    },
    {
        id: "prod_008",
        slug: "asemrowend-mini-linte",
        name: "Asemrowend Mini Linte",
        priceCents: 999,
        currency: "ZAR",
        description: "Smaller version of the “Asemrowend Linte,” ideal for finer hair or more subtle styling.",
        active: true,
        stock: null,
    },
];