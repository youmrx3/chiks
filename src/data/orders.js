const orders = [
  {
    id: "CMD-2024-001",
    customer: {
      name: "Nour Benali",
      email: "nour.benali@gmail.com",
      phone: "+213 0558 12 34 56"
    },
    shippingAddress: {
      fullName: "Nour Benali",
      address: "12 Rue des Jasmins, Cité Ain Naâdja",
      city: "Bir Mourad Raïs",
      wilaya: "Alger",
      wilayaCode: "16",
      postalCode: "16012"
    },
    items: [
      {
        productId: "PRD-001",
        name: "Combinaison Tricot Ours",
        image: "https://picsum.photos/seed/prd001-1/80/80",
        size: "3-6m",
        color: "Miel",
        qty: 1,
        unitPrice: 3200,
        totalPrice: 3200
      }
    ],
    subtotal: 3200,
    shippingCost: 0,
    discountCode: null,
    discountAmount: 0,
    total: 3200,
    paymentMethod: "cash_on_delivery",
    paymentStatus: "paid",
    status: "delivered",
    deliveryMethod: "standard",
    trackingNumber: null,
    notes: "Sonner deux fois svp",
    timeline: [
      { status: "pending", date: "2024-11-01T09:22:00Z", note: "Commande reçue" },
      { status: "confirmed", date: "2024-11-01T10:05:00Z", note: "Commande confirmée" },
      { status: "shipped", date: "2024-11-02T14:30:00Z", note: "Expédiée" },
      { status: "delivered", date: "2024-11-05T11:00:00Z", note: "Livrée" }
    ],
    createdAt: "2024-11-01T09:22:00Z",
    updatedAt: "2024-11-05T11:00:00Z"
  },
  {
    id: "CMD-2024-002",
    customer: {
      name: "Ines Zaidi",
      email: "ines.zaidi@yahoo.fr",
      phone: "+213 0555 98 76 54"
    },
    shippingAddress: {
      fullName: "Ines Zaidi",
      address: "Cité 500 Logements, Bloc B, N°7",
      city: "Annaba",
      wilaya: "Annaba",
      wilayaCode: "23",
      postalCode: "23000"
    },
    items: [
      {
        productId: "PRD-003",
        name: "Robe Florale Volants",
        image: "https://picsum.photos/seed/prd003-1/80/80",
        size: "12-18m",
        color: "Rose Poudré",
        qty: 2,
        unitPrice: 2800,
        totalPrice: 5600
      },
      {
        productId: "PRD-005",
        name: "Barboteuse Rayée",
        image: "https://picsum.photos/seed/prd005-1/80/80",
        size: "12-18m",
        color: "Blanc",
        qty: 1,
        unitPrice: 2400,
        totalPrice: 2400
      }
    ],
    subtotal: 8000,
    shippingCost: 400,
    discountCode: "BIENVENUE10",
    discountAmount: 800,
    total: 7600,
    paymentMethod: "cash_on_delivery",
    paymentStatus: "paid",
    status: "delivered",
    deliveryMethod: "standard",
    trackingNumber: null,
    notes: null,
    timeline: [
      { status: "pending", date: "2024-11-05T14:10:00Z", note: "Commande reçue" },
      { status: "confirmed", date: "2024-11-05T15:00:00Z", note: "Commande confirmée" },
      { status: "shipped", date: "2024-11-06T10:00:00Z", note: "Expédiée" },
      { status: "delivered", date: "2024-11-09T16:30:00Z", note: "Livrée" }
    ],
    createdAt: "2024-11-05T14:10:00Z",
    updatedAt: "2024-11-09T16:30:00Z"
  },
  {
    id: "CMD-2024-003",
    customer: {
      name: "Mehdi Toumi",
      email: "mehdi.toumi@live.com",
      phone: "+213 0671 23 45 67"
    },
    shippingAddress: {
      fullName: "Mehdi Toumi",
      address: "Villa N°23, Route de Sidi Bel Abbès",
      city: "Oran",
      wilaya: "Oran",
      wilayaCode: "31",
      postalCode: "31000"
    },
    items: [
      {
        productId: "PRD-010",
        name: "Ensemble Sport Bébé",
        image: "https://picsum.photos/seed/prd010-1/80/80",
        size: "18-24m",
        color: "Bleu Ciel",
        qty: 1,
        unitPrice: 3500,
        totalPrice: 3500
      }
    ],
    subtotal: 3500,
    shippingCost: 400,
    discountCode: null,
    discountAmount: 0,
    total: 3900,
    paymentMethod: "cash_on_delivery",
    paymentStatus: "paid",
    status: "delivered",
    deliveryMethod: "standard",
    trackingNumber: null,
    notes: "Appeler avant livraison",
    timeline: [
      { status: "pending", date: "2024-10-15T08:30:00Z", note: "Commande reçue" },
      { status: "confirmed", date: "2024-10-15T09:00:00Z", note: "Commande confirmée" },
      { status: "shipped", date: "2024-10-16T11:00:00Z", note: "Expédiée" },
      { status: "delivered", date: "2024-10-18T10:30:00Z", note: "Livrée avec succès" }
    ],
    createdAt: "2024-10-15T08:30:00Z",
    updatedAt: "2024-10-18T10:30:00Z"
  },
  {
    id: "CMD-2024-004",
    customer: {
      name: "Yasmine Boudiaf",
      email: "yasmine.boudiaf@gmail.com",
      phone: "+213 0542 10 98 76"
    },
    shippingAddress: {
      fullName: "Yasmine Boudiaf",
      address: "Rue Khemisti, N°15",
      city: "Sétif",
      wilaya: "Sétif",
      wilayaCode: "19",
      postalCode: "19000"
    },
    items: [
      {
        productId: "PRD-007",
        name: "Gilet Cardigan Motifs",
        image: "https://picsum.photos/seed/prd007-1/80/80",
        size: "6-9m",
        color: "Gris Chiné",
        qty: 1,
        unitPrice: 2900,
        totalPrice: 2900
      },
      {
        productId: "PRD-008",
        name: "Legging Bébé Fille",
        image: "https://picsum.photos/seed/prd008-1/80/80",
        size: "6-9m",
        color: "Lavande",
        qty: 2,
        unitPrice: 1500,
        totalPrice: 3000
      },
      {
        productId: "PRD-012",
        name: "Bonnet à Pompon",
        image: "https://picsum.photos/seed/prd012-1/80/80",
        size: "0-3m",
        color: "Blanc Cassé",
        qty: 1,
        unitPrice: 1200,
        totalPrice: 1200
      }
    ],
    subtotal: 7100,
    shippingCost: 0,
    discountCode: null,
    discountAmount: 0,
    total: 7100,
    paymentMethod: "cash_on_delivery",
    paymentStatus: "paid",
    status: "delivered",
    deliveryMethod: "express",
    trackingNumber: "CHK-EXP-004",
    notes: null,
    timeline: [
      { status: "pending", date: "2024-09-20T11:15:00Z", note: "Commande reçue" },
      { status: "confirmed", date: "2024-09-20T11:45:00Z", note: "Commande confirmée" },
      { status: "shipped", date: "2024-09-21T09:00:00Z", note: "Expédiée en express" },
      { status: "delivered", date: "2024-09-22T14:20:00Z", note: "Livrée en express" }
    ],
    createdAt: "2024-09-20T11:15:00Z",
    updatedAt: "2024-09-22T14:20:00Z"
  },
  {
    id: "CMD-2024-005",
    customer: {
      name: "Mounia Kerrouche",
      email: "mounia.k@outlook.com",
      phone: "+213 0559 87 65 43"
    },
    shippingAddress: {
      fullName: "Mounia Kerrouche",
      address: "Rue Didouche Mourad, Résidence El Djazair",
      city: "Constantine",
      wilaya: "Constantine",
      wilayaCode: "25",
      postalCode: "25000"
    },
    items: [
      {
        productId: "PRD-015",
        name: "Salopette Jean Bébé",
        image: "https://picsum.photos/seed/prd015-1/80/80",
        size: "12-18m",
        color: "Bleu Denim",
        qty: 1,
        unitPrice: 3800,
        totalPrice: 3800
      },
      {
        productId: "PRD-018",
        name: "Body Manches Longues",
        image: "https://picsum.photos/seed/prd018-1/80/80",
        size: "12-18m",
        color: "Écru",
        qty: 3,
        unitPrice: 1100,
        totalPrice: 3300
      }
    ],
    subtotal: 7100,
    shippingCost: 500,
    discountCode: "LIVRAISONOFF",
    discountAmount: 500,
    total: 7100,
    paymentMethod: "cib",
    paymentStatus: "paid",
    status: "delivered",
    deliveryMethod: "standard",
    trackingNumber: null,
    notes: "Laisser au voisin N°12 si absente",
    timeline: [
      { status: "pending", date: "2024-12-01T16:00:00Z", note: "Commande reçue" },
      { status: "confirmed", date: "2024-12-01T16:30:00Z", note: "Paiement CIB vérifié" },
      { status: "shipped", date: "2024-12-02T10:15:00Z", note: "Expédiée" },
      { status: "delivered", date: "2024-12-05T12:00:00Z", note: "Livrée" }
    ],
    createdAt: "2024-12-01T16:00:00Z",
    updatedAt: "2024-12-05T12:00:00Z"
  },
  {
    id: "CMD-2024-006",
    customer: {
      name: "Karim Belkacem",
      email: "karim.belkacem@gmail.com",
      phone: "+213 0660 11 22 33"
    },
    shippingAddress: {
      fullName: "Karim Belkacem",
      address: "Cité des Frères Arfi, Bâtiment C, N°5",
      city: "Blida",
      wilaya: "Blida",
      wilayaCode: "9",
      postalCode: "09000"
    },
    items: [
      {
        productId: "PRD-002",
        name: "Pyjama Pilote 2 Pièces",
        image: "https://picsum.photos/seed/prd002-1/80/80",
        size: "3-6m",
        color: "Avion",
        qty: 2,
        unitPrice: 2600,
        totalPrice: 5200
      }
    ],
    subtotal: 5200,
    shippingCost: 0,
    discountCode: null,
    discountAmount: 0,
    total: 5200,
    paymentMethod: "cash_on_delivery",
    paymentStatus: "paid",
    status: "delivered",
    deliveryMethod: "pickup",
    trackingNumber: null,
    notes: "Je passerai au magasin samedi",
    timeline: [
      { status: "pending", date: "2024-11-12T10:00:00Z", note: "Commande reçue" },
      { status: "confirmed", date: "2024-11-12T10:30:00Z", note: "Confirmée - retrait magasin" },
      { status: "delivered", date: "2024-11-16T15:00:00Z", note: "Colis retiré en magasin" }
    ],
    createdAt: "2024-11-12T10:00:00Z",
    updatedAt: "2024-11-16T15:00:00Z"
  },
  {
    id: "CMD-2024-007",
    customer: {
      name: "Samira Haddad",
      email: "samira.haddad@yahoo.fr",
      phone: "+213 0771 33 44 55"
    },
    shippingAddress: {
      fullName: "Samira Haddad",
      address: "Lotissement El Manar, Villa N°8",
      city: "Tlemcen",
      wilaya: "Tlemcen",
      wilayaCode: "13",
      postalCode: "13000"
    },
    items: [
      {
        productId: "PRD-009",
        name: "Ensemble Naissance Cadeau",
        image: "https://picsum.photos/seed/prd009-1/80/80",
        size: "0-3m",
        color: "Mixte",
        qty: 1,
        unitPrice: 4500,
        totalPrice: 4500
      },
      {
        productId: "PRD-011",
        name: "Chaussons Bébé Laine",
        image: "https://picsum.photos/seed/prd011-1/80/80",
        size: "0-3m",
        color: "Beige",
        qty: 1,
        unitPrice: 1800,
        totalPrice: 1800
      }
    ],
    subtotal: 6300,
    shippingCost: 0,
    discountCode: null,
    discountAmount: 0,
    total: 6300,
    paymentMethod: "cash_on_delivery",
    paymentStatus: "paid",
    status: "delivered",
    deliveryMethod: "standard",
    trackingNumber: null,
    notes: "C'est pour un cadeau de naissance, joli emballage svp",
    timeline: [
      { status: "pending", date: "2024-11-25T13:00:00Z", note: "Commande reçue" },
      { status: "confirmed", date: "2024-11-25T13:30:00Z", note: "Commande confirmée" },
      { status: "shipped", date: "2024-11-26T09:00:00Z", note: "Expédiée" },
      { status: "delivered", date: "2024-11-29T11:30:00Z", note: "Livrée" }
    ],
    createdAt: "2024-11-25T13:00:00Z",
    updatedAt: "2024-11-29T11:30:00Z"
  },
  {
    id: "CMD-2024-008",
    customer: {
      name: "Lamia Bouchareb",
      email: "lamia.bouchareb@gmail.com",
      phone: "+213 0556 44 55 66"
    },
    shippingAddress: {
      fullName: "Lamia Bouchareb",
      address: "Haï Badr, Rue A, N°44",
      city: "Chlef",
      wilaya: "Chlef",
      wilayaCode: "2",
      postalCode: "02000"
    },
    items: [
      {
        productId: "PRD-004",
        name: "Ensemble Short Bébé Été",
        image: "https://picsum.photos/seed/prd004-1/80/80",
        size: "6-9m",
        color: "Jaune Soleil",
        qty: 1,
        unitPrice: 2700,
        totalPrice: 2700
      }
    ],
    subtotal: 2700,
    shippingCost: 400,
    discountCode: null,
    discountAmount: 0,
    total: 3100,
    paymentMethod: "cash_on_delivery",
    paymentStatus: "paid",
    status: "delivered",
    deliveryMethod: "standard",
    trackingNumber: null,
    notes: null,
    timeline: [
      { status: "pending", date: "2024-08-10T09:00:00Z", note: "Commande reçue" },
      { status: "confirmed", date: "2024-08-10T09:30:00Z", note: "Commande confirmée" },
      { status: "shipped", date: "2024-08-11T10:00:00Z", note: "Expédiée" },
      { status: "delivered", date: "2024-08-14T14:00:00Z", note: "Livrée" }
    ],
    createdAt: "2024-08-10T09:00:00Z",
    updatedAt: "2024-08-14T14:00:00Z"
  },
  {
    id: "CMD-2024-009",
    customer: {
      name: "Walid Henni",
      email: "walid.henni@live.fr",
      phone: "+213 0677 55 66 77"
    },
    shippingAddress: {
      fullName: "Walid Henni",
      address: "Cité M'Sila, Rue Ibn Rochd, N°12",
      city: "M'Sila",
      wilaya: "M'Sila",
      wilayaCode: "28",
      postalCode: "28000"
    },
    items: [
      {
        productId: "PRD-006",
        name: "T-shirt Bébé Girafe",
        image: "https://picsum.photos/seed/prd006-1/80/80",
        size: "18-24m",
        color: "Vert Sauge",
        qty: 2,
        unitPrice: 1800,
        totalPrice: 3600
      },
      {
        productId: "PRD-013",
        name: "Short Bébé Tendance",
        image: "https://picsum.photos/seed/prd013-1/80/80",
        size: "18-24m",
        color: "Kaki",
        qty: 1,
        unitPrice: 2000,
        totalPrice: 2000
      },
      {
        productId: "PRD-020",
        name: "Chaussettes Lot 3 Paires",
        image: "https://picsum.photos/seed/prd020-1/80/80",
        size: "12-18m",
        color: "Assorties",
        qty: 2,
        unitPrice: 900,
        totalPrice: 1800
      },
      {
        productId: "PRD-016",
        name: "Veste polaire zippée",
        image: "https://picsum.photos/seed/prd016-1/80/80",
        size: "18-24m",
        color: "Orange",
        qty: 1,
        unitPrice: 3200,
        totalPrice: 3200
      }
    ],
    subtotal: 10600,
    shippingCost: 0,
    discountCode: "FIDELITE15",
    discountAmount: 1590,
    total: 9010,
    paymentMethod: "edahabia",
    paymentStatus: "paid",
    status: "delivered",
    deliveryMethod: "standard",
    trackingNumber: null,
    notes: null,
    timeline: [
      { status: "pending", date: "2024-11-08T15:20:00Z", note: "Commande reçue" },
      { status: "confirmed", date: "2024-11-08T15:50:00Z", note: "Paiement Edahabia confirmé" },
      { status: "shipped", date: "2024-11-09T11:00:00Z", note: "Expédiée" },
      { status: "delivered", date: "2024-11-13T10:00:00Z", note: "Livrée" }
    ],
    createdAt: "2024-11-08T15:20:00Z",
    updatedAt: "2024-11-13T10:00:00Z"
  },
  {
    id: "CMD-2024-010",
    customer: {
      name: "Assia Merabet",
      email: "assia.merabet@gmail.com",
      phone: "+213 0553 66 77 88"
    },
    shippingAddress: {
      fullName: "Assia Merabet",
      address: "Cité Belle Vue, Rue des Oliviers",
      city: "Béjaïa",
      wilaya: "Béjaïa",
      wilayaCode: "6",
      postalCode: "06000"
    },
    items: [
      {
        productId: "PRD-019",
        name: "Doudoune Bébé Hiver",
        image: "https://picsum.photos/seed/prd019-1/80/80",
        size: "6-9m",
        color: "Rouge Cerise",
        qty: 1,
        unitPrice: 4200,
        totalPrice: 4200
      }
    ],
    subtotal: 4200,
    shippingCost: 0,
    discountCode: null,
    discountAmount: 0,
    total: 4200,
    paymentMethod: "cash_on_delivery",
    paymentStatus: "paid",
    status: "delivered",
    deliveryMethod: "express",
    trackingNumber: "CHK-EXP-010",
    notes: "Urgent, j'ai besoin avant le weekend",
    timeline: [
      { status: "pending", date: "2024-12-10T07:30:00Z", note: "Commande reçue" },
      { status: "confirmed", date: "2024-12-10T08:00:00Z", note: "Commande confirmée" },
      { status: "shipped", date: "2024-12-10T14:00:00Z", note: "Expédiée en express" },
      { status: "delivered", date: "2024-12-11T10:15:00Z", note: "Livrée en express" }
    ],
    createdAt: "2024-12-10T07:30:00Z",
    updatedAt: "2024-12-11T10:15:00Z"
  },
  {
    id: "CMD-2024-011",
    customer: {
      name: "Sofiane Amrani",
      email: "sofiane.amrani@outlook.com",
      phone: "+213 0668 77 88 99"
    },
    shippingAddress: {
      fullName: "Sofiane Amrani",
      address: "Lotissement El Wiam, Villa N°14",
      city: "Batna",
      wilaya: "Batna",
      wilayaCode: "5",
      postalCode: "05000"
    },
    items: [
      {
        productId: "PRD-014",
        name: "Gilet Sans Manches Polaire",
        image: "https://picsum.photos/seed/prd014-1/80/80",
        size: "3-6m",
        color: "Marine",
        qty: 1,
        unitPrice: 2500,
        totalPrice: 2500
      },
      {
        productId: "PRD-021",
        name: "Pantalon Bébé Cargo",
        image: "https://picsum.photos/seed/prd021-1/80/80",
        size: "3-6m",
        color: "Gris",
        qty: 1,
        unitPrice: 2200,
        totalPrice: 2200
      }
    ],
    subtotal: 4700,
    shippingCost: 500,
    discountCode: null,
    discountAmount: 0,
    total: 5200,
    paymentMethod: "cash_on_delivery",
    paymentStatus: "paid",
    status: "delivered",
    deliveryMethod: "standard",
    trackingNumber: null,
    notes: null,
    timeline: [
      { status: "pending", date: "2024-10-22T12:00:00Z", note: "Commande reçue" },
      { status: "confirmed", date: "2024-10-22T12:30:00Z", note: "Commande confirmée" },
      { status: "shipped", date: "2024-10-23T09:30:00Z", note: "Expédiée" },
      { status: "delivered", date: "2024-10-26T15:00:00Z", note: "Livrée" }
    ],
    createdAt: "2024-10-22T12:00:00Z",
    updatedAt: "2024-10-26T15:00:00Z"
  },
  {
    id: "CMD-2024-012",
    customer: {
      name: "Farida Makhloufi",
      email: "farida.makhloufi@yahoo.fr",
      phone: "+213 0772 88 99 00"
    },
    shippingAddress: {
      fullName: "Farida Makhloufi",
      address: "Rue de l'Indépendance, N°33",
      city: "Biskra",
      wilaya: "Biskra",
      wilayaCode: "7",
      postalCode: "07000"
    },
    items: [
      {
        productId: "PRD-017",
        name: "Robe de Cérémonie Bébé",
        image: "https://picsum.photos/seed/prd017-1/80/80",
        size: "6-9m",
        color: "Blanc Perle",
        qty: 1,
        unitPrice: 4800,
        totalPrice: 4800
      }
    ],
    subtotal: 4800,
    shippingCost: 0,
    discountCode: null,
    discountAmount: 0,
    total: 4800,
    paymentMethod: "cash_on_delivery",
    paymentStatus: "paid",
    status: "delivered",
    deliveryMethod: "pickup",
    trackingNumber: null,
    notes: null,
    timeline: [
      { status: "pending", date: "2024-07-20T10:00:00Z", note: "Commande reçue" },
      { status: "confirmed", date: "2024-07-20T10:30:00Z", note: "Confirmée - retrait magasin" },
      { status: "delivered", date: "2024-07-22T14:00:00Z", note: "Colis retiré en magasin" }
    ],
    createdAt: "2024-07-20T10:00:00Z",
    updatedAt: "2024-07-22T14:00:00Z"
  },
  {
    id: "CMD-2024-013",
    customer: {
      name: "Hichem Guendouz",
      email: "hichem.guendouz@gmail.com",
      phone: "+213 0661 99 00 11"
    },
    shippingAddress: {
      fullName: "Hichem Guendouz",
      address: "Cité des Sportifs, Bâtiment A",
      city: "Tizi Ouzou",
      wilaya: "Tizi Ouzou",
      wilayaCode: "15",
      postalCode: "15000"
    },
    items: [
      {
        productId: "PRD-023",
        name: "Cache-Cœur Naissance",
        image: "https://picsum.photos/seed/prd023-1/80/80",
        size: "0-3m",
        color: "Rose",
        qty: 1,
        unitPrice: 3100,
        totalPrice: 3100
      },
      {
        productId: "PRD-025",
        name: "Bandeau Tête Bébé",
        image: "https://picsum.photos/seed/prd025-1/80/80",
        size: "0-3m",
        color: "Blanc",
        qty: 2,
        unitPrice: 800,
        totalPrice: 1600
      }
    ],
    subtotal: 4700,
    shippingCost: 0,
    discountCode: null,
    discountAmount: 0,
    total: 4700,
    paymentMethod: "cib",
    paymentStatus: "paid",
    status: "delivered",
    deliveryMethod: "express",
    trackingNumber: "CHK-EXP-013",
    notes: null,
    timeline: [
      { status: "pending", date: "2024-12-05T18:00:00Z", note: "Commande reçue" },
      { status: "confirmed", date: "2024-12-05T18:20:00Z", note: "Paiement CIB vérifié" },
      { status: "shipped", date: "2024-12-06T09:00:00Z", note: "Expédiée en express" },
      { status: "delivered", date: "2024-12-07T11:00:00Z", note: "Livrée en express" }
    ],
    createdAt: "2024-12-05T18:00:00Z",
    updatedAt: "2024-12-07T11:00:00Z"
  },
  {
    id: "CMD-2024-014",
    customer: {
      name: "Zineb Aït Ali",
      email: "zineb.aitali@gmail.com",
      phone: "+213 0554 00 11 22"
    },
    shippingAddress: {
      fullName: "Zineb Aït Ali",
      address: "Rue Mustapha Ben Boulaïd, Résidence Warda",
      city: "Boumerdès",
      wilaya: "Boumerdès",
      wilayaCode: "35",
      postalCode: "35000"
    },
    items: [
      {
        productId: "PRD-022",
        name: "Tunique Bébé Fille",
        image: "https://picsum.photos/seed/prd022-1/80/80",
        size: "9-12m",
        color: "Corail",
        qty: 1,
        unitPrice: 2900,
        totalPrice: 2900
      },
      {
        productId: "PRD-026",
        name: "Chaussettes Antidérapantes",
        image: "https://picsum.photos/seed/prd026-1/80/80",
        size: "9-12m",
        color: "Multicolore",
        qty: 2,
        unitPrice: 700,
        totalPrice: 1400
      }
    ],
    subtotal: 4300,
    shippingCost: 0,
    discountCode: "LIVRAISONOFF",
    discountAmount: 0,
    total: 4300,
    paymentMethod: "cash_on_delivery",
    paymentStatus: "paid",
    status: "delivered",
    deliveryMethod: "standard",
    trackingNumber: null,
    notes: null,
    timeline: [
      { status: "pending", date: "2024-09-05T14:00:00Z", note: "Commande reçue" },
      { status: "confirmed", date: "2024-09-05T14:30:00Z", note: "Commande confirmée" },
      { status: "shipped", date: "2024-09-06T10:00:00Z", note: "Expédiée" },
      { status: "delivered", date: "2024-09-09T16:00:00Z", note: "Livrée" }
    ],
    createdAt: "2024-09-05T14:00:00Z",
    updatedAt: "2024-09-09T16:00:00Z"
  },
  {
    id: "CMD-2024-015",
    customer: {
      name: "Rachid Ould Khelifa",
      email: "rachid.ould@hotmail.com",
      phone: "+213 0673 11 22 33"
    },
    shippingAddress: {
      fullName: "Rachid Ould Khelifa",
      address: "Lotissement El Hidhab, Rue C, Villa N°6",
      city: "Guelma",
      wilaya: "Guelma",
      wilayaCode: "24",
      postalCode: "24000"
    },
    items: [
      {
        productId: "PRD-024",
        name: "Ensemble Bébé Garçon",
        image: "https://picsum.photos/seed/prd024-1/80/80",
        size: "12-18m",
        color: "Bleu",
        qty: 1,
        unitPrice: 3400,
        totalPrice: 3400
      }
    ],
    subtotal: 3400,
    shippingCost: 500,
    discountCode: null,
    discountAmount: 0,
    total: 3900,
    paymentMethod: "cash_on_delivery",
    paymentStatus: "paid",
    status: "delivered",
    deliveryMethod: "standard",
    trackingNumber: null,
    notes: "Je suis au travail jusqu'à 17h, livrer après",
    timeline: [
      { status: "pending", date: "2024-07-28T08:00:00Z", note: "Commande reçue" },
      { status: "confirmed", date: "2024-07-28T08:30:00Z", note: "Commande confirmée" },
      { status: "shipped", date: "2024-07-29T11:00:00Z", note: "Expédiée" },
      { status: "delivered", date: "2024-08-01T17:30:00Z", note: "Livrée après 17h" }
    ],
    createdAt: "2024-07-28T08:00:00Z",
    updatedAt: "2024-08-01T17:30:00Z"
  },
  {
    id: "CMD-2024-016",
    customer: {
      name: "Karima Seddiki",
      email: "karima.seddiki@yahoo.fr",
      phone: "+213 0552 22 33 44"
    },
    shippingAddress: {
      fullName: "Karima Seddiki",
      address: "Rue des Frères Boukharouba, N°21",
      city: "Skikda",
      wilaya: "Skikda",
      wilayaCode: "21",
      postalCode: "21000"
    },
    items: [
      {
        productId: "PRD-027",
        name: "Maillot de Bain Bébé",
        image: "https://picsum.photos/seed/prd027-1/80/80",
        size: "6-9m",
        color: "Bleu Ciel",
        qty: 1,
        unitPrice: 2600,
        totalPrice: 2600
      }
    ],
    subtotal: 2600,
    shippingCost: 400,
    discountCode: null,
    discountAmount: 0,
    total: 3000,
    paymentMethod: "cash_on_delivery",
    paymentStatus: "unpaid",
    status: "shipped",
    deliveryMethod: "standard",
    trackingNumber: null,
    notes: null,
    timeline: [
      { status: "pending", date: "2024-12-18T09:00:00Z", note: "Commande reçue" },
      { status: "confirmed", date: "2024-12-18T09:30:00Z", note: "Commande confirmée" },
      { status: "shipped", date: "2024-12-19T10:00:00Z", note: "Expédiée" }
    ],
    createdAt: "2024-12-18T09:00:00Z",
    updatedAt: "2024-12-19T10:00:00Z"
  },
  {
    id: "CMD-2024-017",
    customer: {
      name: "Ali Bensalem",
      email: "ali.bensalem@gmail.com",
      phone: "+213 0665 33 44 55"
    },
    shippingAddress: {
      fullName: "Ali Bensalem",
      address: "Cité 20 Août, Bâtiment B, N°3",
      city: "Souk Ahras",
      wilaya: "Souk Ahras",
      wilayaCode: "41",
      postalCode: "41000"
    },
    items: [
      {
        productId: "PRD-028",
        name: "Gilet Cardigan Écossais",
        image: "https://picsum.photos/seed/prd028-1/80/80",
        size: "18-24m",
        color: "Rouge et Noir",
        qty: 1,
        unitPrice: 3000,
        totalPrice: 3000
      },
      {
        productId: "PRD-029",
        name: "Pantalon Jean Bébé",
        image: "https://picsum.photos/seed/prd029-1/80/80",
        size: "18-24m",
        color: "Bleu Clair",
        qty: 1,
        unitPrice: 2300,
        totalPrice: 2300
      },
      {
        productId: "PRD-030",
        name: "Casquette Bébé",
        image: "https://picsum.photos/seed/prd030-1/80/80",
        size: "18-24m",
        color: "Bleu",
        qty: 1,
        unitPrice: 1300,
        totalPrice: 1300
      }
    ],
    subtotal: 6600,
    shippingCost: 500,
    discountCode: null,
    discountAmount: 0,
    total: 7100,
    paymentMethod: "cash_on_delivery",
    paymentStatus: "unpaid",
    status: "shipped",
    deliveryMethod: "standard",
    trackingNumber: null,
    notes: "Numéro de téléphone du livreur: 0550 11 22 33",
    timeline: [
      { status: "pending", date: "2024-12-15T11:00:00Z", note: "Commande reçue" },
      { status: "confirmed", date: "2024-12-15T11:30:00Z", note: "Commande confirmée" },
      { status: "shipped", date: "2024-12-16T09:00:00Z", note: "Expédiée" }
    ],
    createdAt: "2024-12-15T11:00:00Z",
    updatedAt: "2024-12-16T09:00:00Z"
  },
  {
    id: "CMD-2024-018",
    customer: {
      name: "Fatima Zohra Hadjadj",
      email: "fatima.hadjadj@live.com",
      phone: "+213 0776 44 55 66"
    },
    shippingAddress: {
      fullName: "Fatima Zohra Hadjadj",
      address: "Rue Ahmed Zabana, N°55",
      city: "Mostaganem",
      wilaya: "Mostaganem",
      wilayaCode: "27",
      postalCode: "27000"
    },
    items: [
      {
        productId: "PRD-001",
        name: "Combinaison Tricot Ours",
        image: "https://picsum.photos/seed/prd001-1/80/80",
        size: "0-3m",
        color: "Miel",
        qty: 1,
        unitPrice: 3200,
        totalPrice: 3200
      },
      {
        productId: "PRD-012",
        name: "Bonnet à Pompon",
        image: "https://picsum.photos/seed/prd012-1/80/80",
        size: "0-3m",
        color: "Miel",
        qty: 1,
        unitPrice: 1200,
        totalPrice: 1200
      }
    ],
    subtotal: 4400,
    shippingCost: 0,
    discountCode: null,
    discountAmount: 0,
    total: 4400,
    paymentMethod: "cash_on_delivery",
    paymentStatus: "unpaid",
    status: "shipped",
    deliveryMethod: "express",
    trackingNumber: "CHK-EXP-018",
    notes: "Livrer avant samedi svp",
    timeline: [
      { status: "pending", date: "2024-12-19T14:00:00Z", note: "Commande reçue" },
      { status: "confirmed", date: "2024-12-19T14:30:00Z", note: "Commande confirmée" },
      { status: "shipped", date: "2024-12-19T16:00:00Z", note: "Expédiée en express" }
    ],
    createdAt: "2024-12-19T14:00:00Z",
    updatedAt: "2024-12-19T16:00:00Z"
  },
  {
    id: "CMD-2024-019",
    customer: {
      name: "Mourad Chekkal",
      email: "mourad.chekkal@yahoo.fr",
      phone: "+213 0557 55 66 77"
    },
    shippingAddress: {
      fullName: "Mourad Chekkal",
      address: "Lotissement El Bassatine, Rue D, N°10",
      city: "Médéa",
      wilaya: "Médéa",
      wilayaCode: "26",
      postalCode: "26000"
    },
    items: [
      {
        productId: "PRD-005",
        name: "Barboteuse Rayée",
        image: "https://picsum.photos/seed/prd005-1/80/80",
        size: "3-6m",
        color: "Blanc et Bleu",
        qty: 2,
        unitPrice: 2400,
        totalPrice: 4800
      }
    ],
    subtotal: 4800,
    shippingCost: 0,
    discountCode: null,
    discountAmount: 0,
    total: 4800,
    paymentMethod: "cash_on_delivery",
    paymentStatus: "unpaid",
    status: "shipped",
    deliveryMethod: "standard",
    trackingNumber: null,
    notes: null,
    timeline: [
      { status: "pending", date: "2024-12-20T08:15:00Z", note: "Commande reçue" },
      { status: "confirmed", date: "2024-12-20T08:45:00Z", note: "Commande confirmée" },
      { status: "shipped", date: "2024-12-21T10:30:00Z", note: "Expédiée" }
    ],
    createdAt: "2024-12-20T08:15:00Z",
    updatedAt: "2024-12-21T10:30:00Z"
  },
  {
    id: "CMD-2024-020",
    customer: {
      name: "Lydia Kaci",
      email: "lydia.kaci@gmail.com",
      phone: "+213 0551 66 77 88"
    },
    shippingAddress: {
      fullName: "Lydia Kaci",
      address: "Rue Ben M'hidi, Résidence El Manar",
      city: "Ouargla",
      wilaya: "Ouargla",
      wilayaCode: "30",
      postalCode: "30000"
    },
    items: [
      {
        productId: "PRD-009",
        name: "Ensemble Naissance Cadeau",
        image: "https://picsum.photos/seed/prd009-1/80/80",
        size: "0-3m",
        color: "Mixte",
        qty: 2,
        unitPrice: 4500,
        totalPrice: 9000
      }
    ],
    subtotal: 9000,
    shippingCost: 0,
    discountCode: "BIENVENUE10",
    discountAmount: 900,
    total: 8100,
    paymentMethod: "cib",
    paymentStatus: "paid",
    status: "shipped",
    deliveryMethod: "express",
    trackingNumber: "CHK-EXP-020",
    notes: "C'est pour des jumeaux !",
    timeline: [
      { status: "pending", date: "2024-12-21T16:30:00Z", note: "Commande reçue" },
      { status: "confirmed", date: "2024-12-21T17:00:00Z", note: "Paiement CIB vérifié" },
      { status: "shipped", date: "2024-12-22T10:00:00Z", note: "Expédiée en express" }
    ],
    createdAt: "2024-12-21T16:30:00Z",
    updatedAt: "2024-12-22T10:00:00Z"
  },
  {
    id: "CMD-2024-021",
    customer: {
      name: "Slimane Benyahia",
      email: "slimane.benyahia@live.fr",
      phone: "+213 0670 77 88 99"
    },
    shippingAddress: {
      fullName: "Slimane Benyahia",
      address: "Cité AADL, Bloc C, N°15",
      city: "Djelfa",
      wilaya: "Djelfa",
      wilayaCode: "17",
      postalCode: "17000"
    },
    items: [
      {
        productId: "PRD-003",
        name: "Robe Florale Volants",
        image: "https://picsum.photos/seed/prd003-1/80/80",
        size: "9-12m",
        color: "Rose Poudré",
        qty: 1,
        unitPrice: 2800,
        totalPrice: 2800
      }
    ],
    subtotal: 2800,
    shippingCost: 500,
    discountCode: null,
    discountAmount: 0,
    total: 3300,
    paymentMethod: "cash_on_delivery",
    paymentStatus: "unpaid",
    status: "shipped",
    deliveryMethod: "standard",
    trackingNumber: null,
    notes: null,
    timeline: [
      { status: "pending", date: "2024-12-14T10:00:00Z", note: "Commande reçue" },
      { status: "confirmed", date: "2024-12-14T10:30:00Z", note: "Commande confirmée" },
      { status: "shipped", date: "2024-12-15T09:00:00Z", note: "Expédiée" }
    ],
    createdAt: "2024-12-14T10:00:00Z",
    updatedAt: "2024-12-15T09:00:00Z"
  },
  {
    id: "CMD-2024-022",
    customer: {
      name: "Malika Drissi",
      email: "malika.drissi@yahoo.com",
      phone: "+213 0778 88 99 00"
    },
    shippingAddress: {
      fullName: "Malika Drissi",
      address: "Route Nationale N°3, Village El Karma",
      city: "Bordj Bou Arreridj",
      wilaya: "Bordj Bou Arreridj",
      wilayaCode: "34",
      postalCode: "34000"
    },
    items: [
      {
        productId: "PRD-007",
        name: "Gilet Cardigan Motifs",
        image: "https://picsum.photos/seed/prd007-1/80/80",
        size: "12-18m",
        color: "Gris Chiné",
        qty: 1,
        unitPrice: 2900,
        totalPrice: 2900
      },
      {
        productId: "PRD-016",
        name: "Veste polaire zippée",
        image: "https://picsum.photos/seed/prd016-1/80/80",
        size: "12-18m",
        color: "Vert",
        qty: 1,
        unitPrice: 3200,
        totalPrice: 3200
      }
    ],
    subtotal: 6100,
    shippingCost: 0,
    discountCode: null,
    discountAmount: 0,
    total: 6100,
    paymentMethod: "cash_on_delivery",
    paymentStatus: "unpaid",
    status: "shipped",
    deliveryMethod: "express",
    trackingNumber: "CHK-EXP-022",
    notes: "Appeler 30 min avant",
    timeline: [
      { status: "pending", date: "2024-12-16T13:00:00Z", note: "Commande reçue" },
      { status: "confirmed", date: "2024-12-16T13:30:00Z", note: "Commande confirmée" },
      { status: "shipped", date: "2024-12-16T15:00:00Z", note: "Expédiée en express" }
    ],
    createdAt: "2024-12-16T13:00:00Z",
    updatedAt: "2024-12-16T15:00:00Z"
  },
  {
    id: "CMD-2024-023",
    customer: {
      name: "Nadia Hammadi",
      email: "nadia.hammadi@gmail.com",
      phone: "+213 0553 99 00 11"
    },
    shippingAddress: {
      fullName: "Nadia Hammadi",
      address: "Cité 1er Novembre, Bâtiment D, N°8",
      city: "El Eulma",
      wilaya: "Sétif",
      wilayaCode: "19",
      postalCode: "19600"
    },
    items: [
      {
        productId: "PRD-010",
        name: "Ensemble Sport Bébé",
        image: "https://picsum.photos/seed/prd010-1/80/80",
        size: "6-9m",
        color: "Bleu Ciel",
        qty: 1,
        unitPrice: 3500,
        totalPrice: 3500
      }
    ],
    subtotal: 3500,
    shippingCost: 0,
    discountCode: null,
    discountAmount: 0,
    total: 3500,
    paymentMethod: "edahabia",
    paymentStatus: "paid",
    status: "shipped",
    deliveryMethod: "standard",
    trackingNumber: null,
    notes: null,
    timeline: [
      { status: "pending", date: "2024-12-17T08:00:00Z", note: "Commande reçue" },
      { status: "confirmed", date: "2024-12-17T08:20:00Z", note: "Paiement Edahabia vérifié" },
      { status: "shipped", date: "2024-12-17T14:00:00Z", note: "Expédiée" }
    ],
    createdAt: "2024-12-17T08:00:00Z",
    updatedAt: "2024-12-17T14:00:00Z"
  },
  {
    id: "CMD-2024-024",
    customer: {
      name: "Rafik Bouzid",
      email: "rafik.bouzid@outlook.com",
      phone: "+213 0662 00 11 22"
    },
    shippingAddress: {
      fullName: "Rafik Bouzid",
      address: "Lotissement El Feth, Rue des Palmiers",
      city: "Laghouat",
      wilaya: "Laghouat",
      wilayaCode: "3",
      postalCode: "03000"
    },
    items: [
      {
        productId: "PRD-015",
        name: "Salopette Jean Bébé",
        image: "https://picsum.photos/seed/prd015-1/80/80",
        size: "9-12m",
        color: "Bleu Denim",
        qty: 1,
        unitPrice: 3800,
        totalPrice: 3800
      },
      {
        productId: "PRD-020",
        name: "Chaussettes Lot 3 Paires",
        image: "https://picsum.photos/seed/prd020-1/80/80",
        size: "9-12m",
        color: "Assorties",
        qty: 1,
        unitPrice: 900,
        totalPrice: 900
      },
      {
        productId: "PRD-026",
        name: "Chaussettes Antidérapantes",
        image: "https://picsum.photos/seed/prd026-1/80/80",
        size: "9-12m",
        color: "Multicolore",
        qty: 1,
        unitPrice: 700,
        totalPrice: 700
      }
    ],
    subtotal: 5400,
    shippingCost: 500,
    discountCode: null,
    discountAmount: 0,
    total: 5900,
    paymentMethod: "cash_on_delivery",
    paymentStatus: "unpaid",
    status: "shipped",
    deliveryMethod: "standard",
    trackingNumber: null,
    notes: "Numéro de téléphone secondaire: 0555 00 11 22",
    timeline: [
      { status: "pending", date: "2024-12-20T15:30:00Z", note: "Commande reçue" },
      { status: "confirmed", date: "2024-12-20T16:00:00Z", note: "Commande confirmée" },
      { status: "shipped", date: "2024-12-21T11:00:00Z", note: "Expédiée" }
    ],
    createdAt: "2024-12-20T15:30:00Z",
    updatedAt: "2024-12-21T11:00:00Z"
  },
  {
    id: "CMD-2024-025",
    customer: {
      name: "Salima Allal",
      email: "salima.allal@gmail.com",
      phone: "+213 0559 11 22 33"
    },
    shippingAddress: {
      fullName: "Salima Allal",
      address: "Rue Colonel Amirouche, N°67",
      city: "Tébessa",
      wilaya: "Tébessa",
      wilayaCode: "12",
      postalCode: "12000"
    },
    items: [
      {
        productId: "PRD-018",
        name: "Body Manches Longues",
        image: "https://picsum.photos/seed/prd018-1/80/80",
        size: "3-6m",
        color: "Écru",
        qty: 4,
        unitPrice: 1100,
        totalPrice: 4400
      }
    ],
    subtotal: 4400,
    shippingCost: 500,
    discountCode: null,
    discountAmount: 0,
    total: 4900,
    paymentMethod: "cash_on_delivery",
    paymentStatus: "unpaid",
    status: "shipped",
    deliveryMethod: "standard",
    trackingNumber: null,
    notes: null,
    timeline: [
      { status: "pending", date: "2024-12-22T09:00:00Z", note: "Commande reçue" },
      { status: "confirmed", date: "2024-12-22T09:30:00Z", note: "Commande confirmée" },
      { status: "shipped", date: "2024-12-23T10:00:00Z", note: "Expédiée" }
    ],
    createdAt: "2024-12-22T09:00:00Z",
    updatedAt: "2024-12-23T10:00:00Z"
  },
  {
    id: "CMD-2024-026",
    customer: {
      name: "Sonia Belaid",
      email: "sonia.belaid@yahoo.fr",
      phone: "+213 0774 22 33 44"
    },
    shippingAddress: {
      fullName: "Sonia Belaid",
      address: "Cité Bel Air, Rue B, N°19",
      city: "Bejaïa",
      wilaya: "Bejaïa",
      wilayaCode: "6",
      postalCode: "06000"
    },
    items: [
      {
        productId: "PRD-002",
        name: "Pyjama Pilote 2 Pièces",
        image: "https://picsum.photos/seed/prd002-1/80/80",
        size: "6-9m",
        color: "Avion",
        qty: 2,
        unitPrice: 2600,
        totalPrice: 5200
      }
    ],
    subtotal: 5200,
    shippingCost: 0,
    discountCode: null,
    discountAmount: 0,
    total: 5200,
    paymentMethod: "cash_on_delivery",
    paymentStatus: "unpaid",
    status: "processing",
    deliveryMethod: "standard",
    trackingNumber: null,
    notes: null,
    timeline: [
      { status: "pending", date: "2024-12-26T09:00:00Z", note: "Commande reçue" },
      { status: "confirmed", date: "2024-12-26T09:30:00Z", note: "Commande confirmée" },
      { status: "processing", date: "2024-12-26T14:00:00Z", note: "En cours de préparation" }
    ],
    createdAt: "2024-12-26T09:00:00Z",
    updatedAt: "2024-12-26T14:00:00Z"
  },
  {
    id: "CMD-2024-027",
    customer: {
      name: "Toufik Aïssaoui",
      email: "toufik.aissaoui@live.com",
      phone: "+213 0666 33 44 55"
    },
    shippingAddress: {
      fullName: "Toufik Aïssaoui",
      address: "Rue Emir Abdelkader, Résidence El Wiam",
      city: "Khenchela",
      wilaya: "Khenchela",
      wilayaCode: "40",
      postalCode: "40000"
    },
    items: [
      {
        productId: "PRD-004",
        name: "Ensemble Short Bébé Été",
        image: "https://picsum.photos/seed/prd004-1/80/80",
        size: "12-18m",
        color: "Jaune Soleil",
        qty: 1,
        unitPrice: 2700,
        totalPrice: 2700
      },
      {
        productId: "PRD-006",
        name: "T-shirt Bébé Girafe",
        image: "https://picsum.photos/seed/prd006-1/80/80",
        size: "12-18m",
        color: "Vert Sauge",
        qty: 1,
        unitPrice: 1800,
        totalPrice: 1800
      }
    ],
    subtotal: 4500,
    shippingCost: 0,
    discountCode: null,
    discountAmount: 0,
    total: 4500,
    paymentMethod: "cib",
    paymentStatus: "paid",
    status: "processing",
    deliveryMethod: "standard",
    trackingNumber: null,
    notes: null,
    timeline: [
      { status: "pending", date: "2024-12-26T10:00:00Z", note: "Commande reçue" },
      { status: "confirmed", date: "2024-12-26T10:20:00Z", note: "Paiement CIB vérifié" },
      { status: "processing", date: "2024-12-26T15:00:00Z", note: "En cours de préparation" }
    ],
    createdAt: "2024-12-26T10:00:00Z",
    updatedAt: "2024-12-26T15:00:00Z"
  },
  {
    id: "CMD-2024-028",
    customer: {
      name: "Hanane Rahmani",
      email: "hanane.rahmani@gmail.com",
      phone: "+213 0558 44 55 66"
    },
    shippingAddress: {
      fullName: "Hanane Rahmani",
      address: "Lotissement El Izdihar, Villa N°3",
      city: "Jijel",
      wilaya: "Jijel",
      wilayaCode: "18",
      postalCode: "18000"
    },
    items: [
      {
        productId: "PRD-022",
        name: "Tunique Bébé Fille",
        image: "https://picsum.photos/seed/prd022-1/80/80",
        size: "6-9m",
        color: "Corail",
        qty: 1,
        unitPrice: 2900,
        totalPrice: 2900
      }
    ],
    subtotal: 2900,
    shippingCost: 0,
    discountCode: null,
    discountAmount: 0,
    total: 2900,
    paymentMethod: "cash_on_delivery",
    paymentStatus: "unpaid",
    status: "processing",
    deliveryMethod: "pickup",
    trackingNumber: null,
    notes: "Je passerai en fin de semaine",
    timeline: [
      { status: "pending", date: "2024-12-24T11:00:00Z", note: "Commande reçue" },
      { status: "confirmed", date: "2024-12-24T11:30:00Z", note: "Confirmée - retrait magasin" },
      { status: "processing", date: "2024-12-24T16:00:00Z", note: "En cours de préparation pour retrait" }
    ],
    createdAt: "2024-12-24T11:00:00Z",
    updatedAt: "2024-12-24T16:00:00Z"
  },
  {
    id: "CMD-2024-029",
    customer: {
      name: "Abdelkader Ghoul",
      email: "abdelkader.ghoul@hotmail.com",
      phone: "+213 0669 55 66 77"
    },
    shippingAddress: {
      fullName: "Abdelkader Ghoul",
      address: "Cité des Enseignants, Bloc A, N°12",
      city: "Aïn Oussara",
      wilaya: "Djelfa",
      wilayaCode: "17",
      postalCode: "17200"
    },
    items: [
      {
        productId: "PRD-011",
        name: "Chaussons Bébé Laine",
        image: "https://picsum.photos/seed/prd011-1/80/80",
        size: "6-9m",
        color: "Beige",
        qty: 2,
        unitPrice: 1800,
        totalPrice: 3600
      },
      {
        productId: "PRD-013",
        name: "Short Bébé Tendance",
        image: "https://picsum.photos/seed/prd013-1/80/80",
        size: "12-18m",
        color: "Kaki",
        qty: 1,
        unitPrice: 2000,
        totalPrice: 2000
      }
    ],
    subtotal: 5600,
    shippingCost: 500,
    discountCode: "FIDELITE15",
    discountAmount: 840,
    total: 5260,
    paymentMethod: "edahabia",
    paymentStatus: "paid",
    status: "processing",
    deliveryMethod: "standard",
    trackingNumber: null,
    notes: null,
    timeline: [
      { status: "pending", date: "2024-12-25T15:00:00Z", note: "Commande reçue" },
      { status: "confirmed", date: "2024-12-25T15:20:00Z", note: "Paiement Edahabia vérifié" },
      { status: "processing", date: "2024-12-26T09:00:00Z", note: "En cours de préparation" }
    ],
    createdAt: "2024-12-25T15:00:00Z",
    updatedAt: "2024-12-26T09:00:00Z"
  },
  {
    id: "CMD-2024-030",
    customer: {
      name: "Rym Hachemi",
      email: "rym.hachemi@yahoo.fr",
      phone: "+213 0555 66 77 88"
    },
    shippingAddress: {
      fullName: "Rym Hachemi",
      address: "Rue Boussouf, Résidence El Manar, Appt 6",
      city: "Mila",
      wilaya: "Mila",
      wilayaCode: "43",
      postalCode: "43000"
    },
    items: [
      {
        productId: "PRD-019",
        name: "Doudoune Bébé Hiver",
        image: "https://picsum.photos/seed/prd019-1/80/80",
        size: "9-12m",
        color: "Rouge Cerise",
        qty: 1,
        unitPrice: 4200,
        totalPrice: 4200
      },
      {
        productId: "PRD-025",
        name: "Bandeau Tête Bébé",
        image: "https://picsum.photos/seed/prd025-1/80/80",
        size: "6-9m",
        color: "Rouge",
        qty: 1,
        unitPrice: 800,
        totalPrice: 800
      }
    ],
    subtotal: 5000,
    shippingCost: 0,
    discountCode: null,
    discountAmount: 0,
    total: 5000,
    paymentMethod: "cash_on_delivery",
    paymentStatus: "unpaid",
    status: "processing",
    deliveryMethod: "express",
    trackingNumber: null,
    notes: "Urgent - cadeau d'anniversaire",
    timeline: [
      { status: "pending", date: "2024-12-26T08:00:00Z", note: "Commande reçue" },
      { status: "confirmed", date: "2024-12-26T08:30:00Z", note: "Commande confirmée" },
      { status: "processing", date: "2024-12-26T11:00:00Z", note: "En cours de préparation" }
    ],
    createdAt: "2024-12-26T08:00:00Z",
    updatedAt: "2024-12-26T11:00:00Z"
  },
  {
    id: "CMD-2024-031",
    customer: {
      name: "Kamel Djerroud",
      email: "kamel.djerroud@gmail.com",
      phone: "+213 0663 77 88 99"
    },
    shippingAddress: {
      fullName: "Kamel Djerroud",
      address: "Rue des Frères Belhadj, N°5",
      city: "Oum El Bouaghi",
      wilaya: "Oum El Bouaghi",
      wilayaCode: "4",
      postalCode: "04000"
    },
    items: [
      {
        productId: "PRD-008",
        name: "Legging Bébé Fille",
        image: "https://picsum.photos/seed/prd008-1/80/80",
        size: "6-9m",
        color: "Lavande",
        qty: 3,
        unitPrice: 1500,
        totalPrice: 4500
      }
    ],
    subtotal: 4500,
    shippingCost: 0,
    discountCode: null,
    discountAmount: 0,
    total: 4500,
    paymentMethod: "cash_on_delivery",
    paymentStatus: "unpaid",
    status: "processing",
    deliveryMethod: "standard",
    trackingNumber: null,
    notes: "Laisser au gardien si absent",
    timeline: [
      { status: "pending", date: "2024-12-23T14:00:00Z", note: "Commande reçue" },
      { status: "confirmed", date: "2024-12-23T14:30:00Z", note: "Commande confirmée" },
      { status: "processing", date: "2024-12-24T09:00:00Z", note: "En cours de préparation" }
    ],
    createdAt: "2024-12-23T14:00:00Z",
    updatedAt: "2024-12-24T09:00:00Z"
  },
  {
    id: "CMD-2024-032",
    customer: {
      name: "Nabila Guedjati",
      email: "nabila.guedjati@live.fr",
      phone: "+213 0771 88 99 00"
    },
    shippingAddress: {
      fullName: "Nabila Guedjati",
      address: "Lotissement El Hob, N°45",
      city: "Relizane",
      wilaya: "Relizane",
      wilayaCode: "48",
      postalCode: "48000"
    },
    items: [
      {
        productId: "PRD-014",
        name: "Gilet Sans Manches Polaire",
        image: "https://picsum.photos/seed/prd014-1/80/80",
        size: "9-12m",
        color: "Marine",
        qty: 1,
        unitPrice: 2500,
        totalPrice: 2500
      },
      {
        productId: "PRD-021",
        name: "Pantalon Bébé Cargo",
        image: "https://picsum.photos/seed/prd021-1/80/80",
        size: "9-12m",
        color: "Gris",
        qty: 1,
        unitPrice: 2200,
        totalPrice: 2200
      },
      {
        productId: "PRD-017",
        name: "Robe de Cérémonie Bébé",
        image: "https://picsum.photos/seed/prd017-1/80/80",
        size: "9-12m",
        color: "Blanc Perle",
        qty: 1,
        unitPrice: 4800,
        totalPrice: 4800
      }
    ],
    subtotal: 9500,
    shippingCost: 0,
    discountCode: null,
    discountAmount: 0,
    total: 9500,
    paymentMethod: "cash_on_delivery",
    paymentStatus: "unpaid",
    status: "processing",
    deliveryMethod: "standard",
    trackingNumber: null,
    notes: null,
    timeline: [
      { status: "pending", date: "2024-12-27T10:00:00Z", note: "Commande reçue" },
      { status: "confirmed", date: "2024-12-27T10:30:00Z", note: "Commande confirmée" },
      { status: "processing", date: "2024-12-27T14:00:00Z", note: "En cours de préparation" }
    ],
    createdAt: "2024-12-27T10:00:00Z",
    updatedAt: "2024-12-27T14:00:00Z"
  },
  {
    id: "CMD-2024-033",
    customer: {
      name: "Billel Saidi",
      email: "billel.saidi@outlook.com",
      phone: "+213 0667 99 00 11"
    },
    shippingAddress: {
      fullName: "Billel Saidi",
      address: "Cité Universitaire, Rue A, N°33",
      city: "Tiaret",
      wilaya: "Tiaret",
      wilayaCode: "14",
      postalCode: "14000"
    },
    items: [
      {
        productId: "PRD-023",
        name: "Cache-Cœur Naissance",
        image: "https://picsum.photos/seed/prd023-1/80/80",
        size: "0-3m",
        color: "Rose",
        qty: 1,
        unitPrice: 3100,
        totalPrice: 3100
      }
    ],
    subtotal: 3100,
    shippingCost: 400,
    discountCode: null,
    discountAmount: 0,
    total: 3500,
    paymentMethod: "cib",
    paymentStatus: "paid",
    status: "processing",
    deliveryMethod: "standard",
    trackingNumber: null,
    notes: null,
    timeline: [
      { status: "pending", date: "2024-12-27T08:30:00Z", note: "Commande reçue" },
      { status: "confirmed", date: "2024-12-27T08:50:00Z", note: "Paiement CIB vérifié" },
      { status: "processing", date: "2024-12-27T13:00:00Z", note: "En cours de préparation" }
    ],
    createdAt: "2024-12-27T08:30:00Z",
    updatedAt: "2024-12-27T13:00:00Z"
  },
  {
    id: "CMD-2024-034",
    customer: {
      name: "Djamila Feraoun",
      email: "djamila.feraoun@gmail.com",
      phone: "+213 0551 00 11 22"
    },
    shippingAddress: {
      fullName: "Djamila Feraoun",
      address: "Rue Larbi Ben M'hidi, N°21",
      city: "Saïda",
      wilaya: "Saïda",
      wilayaCode: "20",
      postalCode: "20000"
    },
    items: [
      {
        productId: "PRD-001",
        name: "Combinaison Tricot Ours",
        image: "https://picsum.photos/seed/prd001-1/80/80",
        size: "6-9m",
        color: "Miel",
        qty: 1,
        unitPrice: 3200,
        totalPrice: 3200
      }
    ],
    subtotal: 3200,
    shippingCost: 500,
    discountCode: null,
    discountAmount: 0,
    total: 3700,
    paymentMethod: "cash_on_delivery",
    paymentStatus: "unpaid",
    status: "confirmed",
    deliveryMethod: "standard",
    trackingNumber: null,
    notes: null,
    timeline: [
      { status: "pending", date: "2024-12-28T09:00:00Z", note: "Commande reçue" },
      { status: "confirmed", date: "2024-12-28T09:30:00Z", note: "Commande confirmée" }
    ],
    createdAt: "2024-12-28T09:00:00Z",
    updatedAt: "2024-12-28T09:30:00Z"
  },
  {
    id: "CMD-2024-035",
    customer: {
      name: "Abdelmoumene Khelifi",
      email: "abdelmoumene.khelifi@yahoo.com",
      phone: "+213 0664 00 11 22"
    },
    shippingAddress: {
      fullName: "Abdelmoumene Khelifi",
      address: "Lotissement El Moustakbel, Villa N°7",
      city: "Sidi Bel Abbès",
      wilaya: "Sidi Bel Abbès",
      wilayaCode: "22",
      postalCode: "22000"
    },
    items: [
      {
        productId: "PRD-005",
        name: "Barboteuse Rayée",
        image: "https://picsum.photos/seed/prd005-1/80/80",
        size: "6-9m",
        color: "Blanc et Bleu",
        qty: 2,
        unitPrice: 2400,
        totalPrice: 4800
      },
      {
        productId: "PRD-009",
        name: "Ensemble Naissance Cadeau",
        image: "https://picsum.photos/seed/prd009-1/80/80",
        size: "0-3m",
        color: "Mixte",
        qty: 1,
        unitPrice: 4500,
        totalPrice: 4500
      }
    ],
    subtotal: 9300,
    shippingCost: 0,
    discountCode: "BIENVENUE10",
    discountAmount: 930,
    total: 8370,
    paymentMethod: "edahabia",
    paymentStatus: "paid",
    status: "confirmed",
    deliveryMethod: "pickup",
    trackingNumber: null,
    notes: "Je viendrai chercher en magasin",
    timeline: [
      { status: "pending", date: "2024-12-28T11:00:00Z", note: "Commande reçue" },
      { status: "confirmed", date: "2024-12-28T11:15:00Z", note: "Paiement Edahabia vérifié - retrait magasin" }
    ],
    createdAt: "2024-12-28T11:00:00Z",
    updatedAt: "2024-12-28T11:15:00Z"
  },
  {
    id: "CMD-2024-036",
    customer: {
      name: "Nassima Akrour",
      email: "nassima.akrour@live.com",
      phone: "+213 0775 11 22 33"
    },
    shippingAddress: {
      fullName: "Nassima Akrour",
      address: "Cité 400 Logements, Bâtiment B",
      city: "Aïn El Hadjel",
      wilaya: "M'Sila",
      wilayaCode: "28",
      postalCode: "28015"
    },
    items: [
      {
        productId: "PRD-003",
        name: "Robe Florale Volants",
        image: "https://picsum.photos/seed/prd003-1/80/80",
        size: "3-6m",
        color: "Rose Poudré",
        qty: 1,
        unitPrice: 2800,
        totalPrice: 2800
      },
      {
        productId: "PRD-007",
        name: "Gilet Cardigan Motifs",
        image: "https://picsum.photos/seed/prd007-1/80/80",
        size: "3-6m",
        color: "Gris Chiné",
        qty: 1,
        unitPrice: 2900,
        totalPrice: 2900
      }
    ],
    subtotal: 5700,
    shippingCost: 0,
    discountCode: null,
    discountAmount: 0,
    total: 5700,
    paymentMethod: "cash_on_delivery",
    paymentStatus: "unpaid",
    status: "confirmed",
    deliveryMethod: "standard",
    trackingNumber: null,
    notes: "Je suis enceinte, merci de faire vite",
    timeline: [
      { status: "pending", date: "2024-12-28T12:00:00Z", note: "Commande reçue" },
      { status: "confirmed", date: "2024-12-28T12:30:00Z", note: "Commande confirmée" }
    ],
    createdAt: "2024-12-28T12:00:00Z",
    updatedAt: "2024-12-28T12:30:00Z"
  },
  {
    id: "CMD-2024-037",
    customer: {
      name: "Houda Ferhat",
      email: "houda.ferhat@gmail.com",
      phone: "+213 0556 22 33 44"
    },
    shippingAddress: {
      fullName: "Houda Ferhat",
      address: "Rue des Martyrs, N°8",
      city: "Ghardaïa",
      wilaya: "Ghardaïa",
      wilayaCode: "47",
      postalCode: "47000"
    },
    items: [
      {
        productId: "PRD-016",
        name: "Veste polaire zippée",
        image: "https://picsum.photos/seed/prd016-1/80/80",
        size: "12-18m",
        color: "Orange",
        qty: 1,
        unitPrice: 3200,
        totalPrice: 3200
      }
    ],
    subtotal: 3200,
    shippingCost: 500,
    discountCode: null,
    discountAmount: 0,
    total: 3700,
    paymentMethod: "cash_on_delivery",
    paymentStatus: "unpaid",
    status: "confirmed",
    deliveryMethod: "standard",
    trackingNumber: null,
    notes: null,
    timeline: [
      { status: "pending", date: "2024-12-29T08:00:00Z", note: "Commande reçue" },
      { status: "confirmed", date: "2024-12-29T08:30:00Z", note: "Commande confirmée" }
    ],
    createdAt: "2024-12-29T08:00:00Z",
    updatedAt: "2024-12-29T08:30:00Z"
  },
  {
    id: "CMD-2024-038",
    customer: {
      name: "Fayçal Bouziane",
      email: "faycal.bouziane@hotmail.fr",
      phone: "+213 0668 33 44 55"
    },
    shippingAddress: {
      fullName: "Fayçal Bouziane",
      address: "Route de l'Hôpital, N°17",
      city: "Aïn Defla",
      wilaya: "Aïn Defla",
      wilayaCode: "44",
      postalCode: "44000"
    },
    items: [
      {
        productId: "PRD-024",
        name: "Ensemble Bébé Garçon",
        image: "https://picsum.photos/seed/prd024-1/80/80",
        size: "12-18m",
        color: "Bleu",
        qty: 1,
        unitPrice: 3400,
        totalPrice: 3400
      },
      {
        productId: "PRD-028",
        name: "Gilet Cardigan Écossais",
        image: "https://picsum.photos/seed/prd028-1/80/80",
        size: "12-18m",
        color: "Rouge et Noir",
        qty: 1,
        unitPrice: 3000,
        totalPrice: 3000
      }
    ],
    subtotal: 6400,
    shippingCost: 0,
    discountCode: null,
    discountAmount: 0,
    total: 6400,
    paymentMethod: "cash_on_delivery",
    paymentStatus: "unpaid",
    status: "confirmed",
    deliveryMethod: "pickup",
    trackingNumber: null,
    notes: null,
    timeline: [
      { status: "pending", date: "2024-12-29T09:00:00Z", note: "Commande reçue" },
      { status: "confirmed", date: "2024-12-29T09:30:00Z", note: "Confirmée - retrait magasin" }
    ],
    createdAt: "2024-12-29T09:00:00Z",
    updatedAt: "2024-12-29T09:30:00Z"
  },
  {
    id: "CMD-2024-039",
    customer: {
      name: "Leila Hadjar",
      email: "leila.hadjar@yahoo.fr",
      phone: "+213 0552 44 55 66"
    },
    shippingAddress: {
      fullName: "Leila Hadjar",
      address: "Cité Ben Boulaid, Rue C, N°22",
      city: "Bouïra",
      wilaya: "Bouïra",
      wilayaCode: "10",
      postalCode: "10000"
    },
    items: [
      {
        productId: "PRD-030",
        name: "Casquette Bébé",
        image: "https://picsum.photos/seed/prd030-1/80/80",
        size: "6-9m",
        color: "Bleu",
        qty: 2,
        unitPrice: 1300,
        totalPrice: 2600
      }
    ],
    subtotal: 2600,
    shippingCost: 0,
    discountCode: null,
    discountAmount: 0,
    total: 2600,
    paymentMethod: "cash_on_delivery",
    paymentStatus: "unpaid",
    status: "confirmed",
    deliveryMethod: "standard",
    trackingNumber: null,
    notes: null,
    timeline: [
      { status: "pending", date: "2024-12-29T14:00:00Z", note: "Commande reçue" },
      { status: "confirmed", date: "2024-12-29T14:30:00Z", note: "Commande confirmée" }
    ],
    createdAt: "2024-12-29T14:00:00Z",
    updatedAt: "2024-12-29T14:30:00Z"
  },
  {
    id: "CMD-2024-040",
    customer: {
      name: "Djamel Berrached",
      email: "djamel.berrached@gmail.com",
      phone: "+213 0665 55 66 77"
    },
    shippingAddress: {
      fullName: "Djamel Berrached",
      address: "Rue Abdelhamid Ibn Badis, N°14",
      city: "Tissemsilt",
      wilaya: "Tissemsilt",
      wilayaCode: "38",
      postalCode: "38000"
    },
    items: [
      {
        productId: "PRD-002",
        name: "Pyjama Pilote 2 Pièces",
        image: "https://picsum.photos/seed/prd002-1/80/80",
        size: "18-24m",
        color: "Avion",
        qty: 1,
        unitPrice: 2600,
        totalPrice: 2600
      }
    ],
    subtotal: 2600,
    shippingCost: 400,
    discountCode: null,
    discountAmount: 0,
    total: 3000,
    paymentMethod: "cib",
    paymentStatus: "paid",
    status: "confirmed",
    deliveryMethod: "standard",
    trackingNumber: null,
    notes: "Test commande site web",
    timeline: [
      { status: "pending", date: "2024-12-30T08:00:00Z", note: "Commande reçue" },
      { status: "confirmed", date: "2024-12-30T08:15:00Z", note: "Paiement CIB vérifié" }
    ],
    createdAt: "2024-12-30T08:00:00Z",
    updatedAt: "2024-12-30T08:15:00Z"
  },
  {
    id: "CMD-2024-041",
    customer: {
      name: "Naouel Baghdadi",
      email: "naouel.baghdadi@live.com",
      phone: "+213 0773 66 77 88"
    },
    shippingAddress: {
      fullName: "Naouel Baghdadi",
      address: "Lotissement El Bahia, Rue B, N°9",
      city: "El Bayadh",
      wilaya: "El Bayadh",
      wilayaCode: "32",
      postalCode: "32000"
    },
    items: [
      {
        productId: "PRD-010",
        name: "Ensemble Sport Bébé",
        image: "https://picsum.photos/seed/prd010-1/80/80",
        size: "9-12m",
        color: "Bleu Ciel",
        qty: 1,
        unitPrice: 3500,
        totalPrice: 3500
      }
    ],
    subtotal: 3500,
    shippingCost: 500,
    discountCode: null,
    discountAmount: 0,
    total: 4000,
    paymentMethod: "cash_on_delivery",
    paymentStatus: "unpaid",
    status: "pending",
    deliveryMethod: "standard",
    trackingNumber: null,
    notes: null,
    timeline: [
      { status: "pending", date: "2024-12-30T10:00:00Z", note: "Commande reçue" }
    ],
    createdAt: "2024-12-30T10:00:00Z",
    updatedAt: "2024-12-30T10:00:00Z"
  },
  {
    id: "CMD-2024-042",
    customer: {
      name: "Aissa Zerguine",
      email: "aissa.zerguine@yahoo.com",
      phone: "+213 0661 77 88 99"
    },
    shippingAddress: {
      fullName: "Aissa Zerguine",
      address: "Rue du Stade, N°11",
      city: "Illizi",
      wilaya: "Illizi",
      wilayaCode: "33",
      postalCode: "33000"
    },
    items: [
      {
        productId: "PRD-006",
        name: "T-shirt Bébé Girafe",
        image: "https://picsum.photos/seed/prd006-1/80/80",
        size: "6-9m",
        color: "Vert Sauge",
        qty: 2,
        unitPrice: 1800,
        totalPrice: 3600
      },
      {
        productId: "PRD-012",
        name: "Bonnet à Pompon",
        image: "https://picsum.photos/seed/prd012-1/80/80",
        size: "3-6m",
        color: "Blanc Cassé",
        qty: 1,
        unitPrice: 1200,
        totalPrice: 1200
      }
    ],
    subtotal: 4800,
    shippingCost: 0,
    discountCode: null,
    discountAmount: 0,
    total: 4800,
    paymentMethod: "cash_on_delivery",
    paymentStatus: "unpaid",
    status: "pending",
    deliveryMethod: "standard",
    trackingNumber: null,
    notes: null,
    timeline: [
      { status: "pending", date: "2024-12-30T11:00:00Z", note: "Commande reçue" }
    ],
    createdAt: "2024-12-30T11:00:00Z",
    updatedAt: "2024-12-30T11:00:00Z"
  },
  {
    id: "CMD-2024-043",
    customer: {
      name: "Yamina Adel",
      email: "yamina.adel@gmail.com",
      phone: "+213 0557 88 99 00"
    },
    shippingAddress: {
      fullName: "Yamina Adel",
      address: "Cité 1000 Logements, Bloc D, N°3",
      city: "Tamanrasset",
      wilaya: "Tamanrasset",
      wilayaCode: "11",
      postalCode: "11000"
    },
    items: [
      {
        productId: "PRD-015",
        name: "Salopette Jean Bébé",
        image: "https://picsum.photos/seed/prd015-1/80/80",
        size: "3-6m",
        color: "Bleu Denim",
        qty: 1,
        unitPrice: 3800,
        totalPrice: 3800
      }
    ],
    subtotal: 3800,
    shippingCost: 0,
    discountCode: null,
    discountAmount: 0,
    total: 3800,
    paymentMethod: "cash_on_delivery",
    paymentStatus: "unpaid",
    status: "pending",
    deliveryMethod: "express",
    trackingNumber: null,
    notes: "Livraison express urgent",
    timeline: [
      { status: "pending", date: "2024-12-31T08:00:00Z", note: "Commande reçue" }
    ],
    createdAt: "2024-12-31T08:00:00Z",
    updatedAt: "2024-12-31T08:00:00Z"
  },
  {
    id: "CMD-2024-044",
    customer: {
      name: "Nadjia Bouzerna",
      email: "nadjia.bouzerna@outlook.fr",
      phone: "+213 0779 99 00 11"
    },
    shippingAddress: {
      fullName: "Nadjia Bouzerna",
      address: "Rue des Frères Abbès, N°6",
      city: "Khenchela",
      wilaya: "Khenchela",
      wilayaCode: "40",
      postalCode: "40000"
    },
    items: [
      {
        productId: "PRD-018",
        name: "Body Manches Longues",
        image: "https://picsum.photos/seed/prd018-1/80/80",
        size: "0-3m",
        color: "Écru",
        qty: 3,
        unitPrice: 1100,
        totalPrice: 3300
      },
      {
        productId: "PRD-008",
        name: "Legging Bébé Fille",
        image: "https://picsum.photos/seed/prd008-1/80/80",
        size: "0-3m",
        color: "Lavande",
        qty: 1,
        unitPrice: 1500,
        totalPrice: 1500
      }
    ],
    subtotal: 4800,
    shippingCost: 0,
    discountCode: null,
    discountAmount: 0,
    total: 4800,
    paymentMethod: "edahabia",
    paymentStatus: "unpaid",
    status: "pending",
    deliveryMethod: "standard",
    trackingNumber: null,
    notes: null,
    timeline: [
      { status: "pending", date: "2024-12-31T09:00:00Z", note: "Commande reçue" }
    ],
    createdAt: "2024-12-31T09:00:00Z",
    updatedAt: "2024-12-31T09:00:00Z"
  },
  {
    id: "CMD-2024-045",
    customer: {
      name: "Zahir Mellal",
      email: "zahir.mellal@hotmail.com",
      phone: "+213 0660 00 11 22"
    },
    shippingAddress: {
      fullName: "Zahir Mellal",
      address: "Lotissement El Boustene, Rue 3, N°2",
      city: "Biskra",
      wilaya: "Biskra",
      wilayaCode: "7",
      postalCode: "07000"
    },
    items: [
      {
        productId: "PRD-020",
        name: "Chaussettes Lot 3 Paires",
        image: "https://picsum.photos/seed/prd020-1/80/80",
        size: "6-9m",
        color: "Assorties",
        qty: 2,
        unitPrice: 900,
        totalPrice: 1800
      }
    ],
    subtotal: 1800,
    shippingCost: 0,
    discountCode: null,
    discountAmount: 0,
    total: 1800,
    paymentMethod: "cash_on_delivery",
    paymentStatus: "unpaid",
    status: "pending",
    deliveryMethod: "pickup",
    trackingNumber: null,
    notes: "Retrait en magasin prévu demain",
    timeline: [
      { status: "pending", date: "2024-12-31T10:00:00Z", note: "Commande reçue" }
    ],
    createdAt: "2024-12-31T10:00:00Z",
    updatedAt: "2024-12-31T10:00:00Z"
  },
  {
    id: "CMD-2024-046",
    customer: {
      name: "Chahinez Benmoussa",
      email: "chahinez.benmoussa@gmail.com",
      phone: "+213 0555 11 22 33"
    },
    shippingAddress: {
      fullName: "Chahinez Benmoussa",
      address: "Rue Didouche Mourad, Résidence Nour",
      city: "Alger Centre",
      wilaya: "Alger",
      wilayaCode: "16",
      postalCode: "16000"
    },
    items: [
      {
        productId: "PRD-004",
        name: "Ensemble Short Bébé Été",
        image: "https://picsum.photos/seed/prd004-1/80/80",
        size: "6-9m",
        color: "Jaune Soleil",
        qty: 1,
        unitPrice: 2700,
        totalPrice: 2700
      }
    ],
    subtotal: 2700,
    shippingCost: 0,
    discountCode: null,
    discountAmount: 0,
    total: 2700,
    paymentMethod: "cash_on_delivery",
    paymentStatus: "unpaid",
    status: "cancelled",
    deliveryMethod: "standard",
    trackingNumber: null,
    notes: "Annulé suite à commande en double",
    timeline: [
      { status: "pending", date: "2024-12-20T09:00:00Z", note: "Commande reçue" },
      { status: "confirmed", date: "2024-12-20T09:30:00Z", note: "Commande confirmée" },
      { status: "cancelled", date: "2024-12-20T11:00:00Z", note: "Annulée par le client - commande en double" }
    ],
    createdAt: "2024-12-20T09:00:00Z",
    updatedAt: "2024-12-20T11:00:00Z"
  },
  {
    id: "CMD-2024-047",
    customer: {
      name: "Salah Eddine Mazouz",
      email: "salah.mazouz@yahoo.fr",
      phone: "+213 0663 22 33 44"
    },
    shippingAddress: {
      fullName: "Salah Eddine Mazouz",
      address: "Cité des Fonctionnaires, Bâtiment E",
      city: "Ouargla",
      wilaya: "Ouargla",
      wilayaCode: "30",
      postalCode: "30000"
    },
    items: [
      {
        productId: "PRD-013",
        name: "Short Bébé Tendance",
        image: "https://picsum.photos/seed/prd013-1/80/80",
        size: "12-18m",
        color: "Kaki",
        qty: 1,
        unitPrice: 2000,
        totalPrice: 2000
      },
      {
        productId: "PRD-009",
        name: "Ensemble Naissance Cadeau",
        image: "https://picsum.photos/seed/prd009-1/80/80",
        size: "0-3m",
        color: "Mixte",
        qty: 1,
        unitPrice: 4500,
        totalPrice: 4500
      }
    ],
    subtotal: 6500,
    shippingCost: 500,
    discountCode: null,
    discountAmount: 0,
    total: 7000,
    paymentMethod: "cash_on_delivery",
    paymentStatus: "unpaid",
    status: "cancelled",
    deliveryMethod: "standard",
    trackingNumber: null,
    notes: "Problème de livraison zone non desservie",
    timeline: [
      { status: "pending", date: "2024-12-22T14:00:00Z", note: "Commande reçue" },
      { status: "confirmed", date: "2024-12-22T14:30:00Z", note: "Commande confirmée" },
      { status: "cancelled", date: "2024-12-23T09:00:00Z", note: "Annulée - zone de livraison non desservie" }
    ],
    createdAt: "2024-12-22T14:00:00Z",
    updatedAt: "2024-12-23T09:00:00Z"
  },
  {
    id: "CMD-2024-048",
    customer: {
      name: "Nawel Bouchama",
      email: "nawel.bouchama@gmail.com",
      phone: "+213 0554 33 44 55"
    },
    shippingAddress: {
      fullName: "Nawel Bouchama",
      address: "Rue des Rosiers, Résidence El Karma",
      city: "Béchar",
      wilaya: "Béchar",
      wilayaCode: "8",
      postalCode: "08000"
    },
    items: [
      {
        productId: "PRD-017",
        name: "Robe de Cérémonie Bébé",
        image: "https://picsum.photos/seed/prd017-1/80/80",
        size: "12-18m",
        color: "Blanc Perle",
        qty: 1,
        unitPrice: 4800,
        totalPrice: 4800
      },
      {
        productId: "PRD-025",
        name: "Bandeau Tête Bébé",
        image: "https://picsum.photos/seed/prd025-1/80/80",
        size: "12-18m",
        color: "Blanc",
        qty: 1,
        unitPrice: 800,
        totalPrice: 800
      }
    ],
    subtotal: 5600,
    shippingCost: 0,
    discountCode: null,
    discountAmount: 0,
    total: 5600,
    paymentMethod: "cib",
    paymentStatus: "refunded",
    status: "cancelled",
    deliveryMethod: "standard",
    trackingNumber: null,
    notes: "Annulé avant expédition - problème de taille",
    timeline: [
      { status: "pending", date: "2024-12-26T16:00:00Z", note: "Commande reçue" },
      { status: "confirmed", date: "2024-12-26T16:20:00Z", note: "Paiement CIB vérifié" },
      { status: "cancelled", date: "2024-12-27T08:00:00Z", note: "Annulée par le client - erreur de taille" }
    ],
    createdAt: "2024-12-26T16:00:00Z",
    updatedAt: "2024-12-27T08:00:00Z"
  },
  {
    id: "CMD-2024-049",
    customer: {
      name: "Manel Cherifi",
      email: "manel.cherifi@live.fr",
      phone: "+213 0777 44 55 66"
    },
    shippingAddress: {
      fullName: "Manel Cherifi",
      address: "Rue des Jasmins, Villa N°5",
      city: "Tipaza",
      wilaya: "Tipaza",
      wilayaCode: "42",
      postalCode: "42000"
    },
    items: [
      {
        productId: "PRD-011",
        name: "Chaussons Bébé Laine",
        image: "https://picsum.photos/seed/prd011-1/80/80",
        size: "3-6m",
        color: "Beige",
        qty: 1,
        unitPrice: 1800,
        totalPrice: 1800
      },
      {
        productId: "PRD-019",
        name: "Doudoune Bébé Hiver",
        image: "https://picsum.photos/seed/prd019-1/80/80",
        size: "3-6m",
        color: "Rouge Cerise",
        qty: 1,
        unitPrice: 4200,
        totalPrice: 4200
      }
    ],
    subtotal: 6000,
    shippingCost: 0,
    discountCode: null,
    discountAmount: 0,
    total: 6000,
    paymentMethod: "cash_on_delivery",
    paymentStatus: "paid",
    status: "returned",
    deliveryMethod: "standard",
    trackingNumber: null,
    notes: "Retour pour échange de taille",
    timeline: [
      { status: "pending", date: "2024-12-10T10:00:00Z", note: "Commande reçue" },
      { status: "confirmed", date: "2024-12-10T10:30:00Z", note: "Commande confirmée" },
      { status: "shipped", date: "2024-12-11T09:00:00Z", note: "Expédiée" },
      { status: "delivered", date: "2024-12-13T14:00:00Z", note: "Livrée" },
      { status: "returned", date: "2024-12-15T10:00:00Z", note: "Retournée par la cliente - taille inadaptée" }
    ],
    createdAt: "2024-12-10T10:00:00Z",
    updatedAt: "2024-12-15T10:00:00Z"
  },
  {
    id: "CMD-2024-050",
    customer: {
      name: "Ahmed Baghdadli",
      email: "ahmed.baghdadli@outlook.com",
      phone: "+213 0669 55 66 77"
    },
    shippingAddress: {
      fullName: "Ahmed Baghdadli",
      address: "Lotissement El Amel, Rue 14, N°30",
      city: "El Oued",
      wilaya: "El Oued",
      wilayaCode: "39",
      postalCode: "39000"
    },
    items: [
      {
        productId: "PRD-026",
        name: "Chaussettes Antidérapantes",
        image: "https://picsum.photos/seed/prd026-1/80/80",
        size: "6-9m",
        color: "Multicolore",
        qty: 2,
        unitPrice: 700,
        totalPrice: 1400
      },
      {
        productId: "PRD-029",
        name: "Pantalon Jean Bébé",
        image: "https://picsum.photos/seed/prd029-1/80/80",
        size: "6-9m",
        color: "Bleu Clair",
        qty: 1,
        unitPrice: 2300,
        totalPrice: 2300
      },
      {
        productId: "PRD-014",
        name: "Gilet Sans Manches Polaire",
        image: "https://picsum.photos/seed/prd014-1/80/80",
        size: "6-9m",
        color: "Marine",
        qty: 1,
        unitPrice: 2500,
        totalPrice: 2500
      }
    ],
    subtotal: 6200,
    shippingCost: 500,
    discountCode: null,
    discountAmount: 0,
    total: 6700,
    paymentMethod: "edahabia",
    paymentStatus: "refunded",
    status: "returned",
    deliveryMethod: "standard",
    trackingNumber: null,
    notes: "Retour effectué - produit défectueux",
    timeline: [
      { status: "pending", date: "2024-12-05T08:00:00Z", note: "Commande reçue" },
      { status: "confirmed", date: "2024-12-05T08:20:00Z", note: "Paiement Edahabia vérifié" },
      { status: "shipped", date: "2024-12-06T10:00:00Z", note: "Expédiée" },
      { status: "delivered", date: "2024-12-09T15:00:00Z", note: "Livrée" },
      { status: "returned", date: "2024-12-12T09:00:00Z", note: "Retournée - défaut de fabrication constaté" }
    ],
    createdAt: "2024-12-05T08:00:00Z",
    updatedAt: "2024-12-12T09:00:00Z"
  }
];

export default orders;
