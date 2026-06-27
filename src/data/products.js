const products = [
  {
    id: "PRD-001",
    name: "Combinaison Tricot Ours",
    nameAr: "بدلة الدب المحبوكة",
    slug: "combinaison-tricot-ours",
    category: "Knitwear",
    ageRange: "0-3m",
    gender: "unisex",
    price: 3200,
    salePrice: 2500,
    images: [
      "https://picsum.photos/seed/prd001-1/600/600",
      "https://picsum.photos/seed/prd001-2/600/600",
      "https://picsum.photos/seed/prd001-3/600/600"
    ],
    sizes: ["0-3m", "3-6m", "6-12m"],
    stockPerSize: {
      "0-3m": 12,
      "3-6m": 4,
      "6-12m": 0
    },
    colors: [
      { name: "Miel", hex: "#F5C842" },
      { name: "Crème", hex: "#FAF3DC" },
      { name: "Menthe", hex: "#8DD5D0" }
    ],
    material: "100% coton peigné biologique",
    washInstruction: "Lavage à 30°C, ne pas essorer",
    rating: 4.8,
    reviewCount: 34,
    reviews: [
      {
        id: "RV-001",
        author: "Amira B.",
        wilaya: "Alger",
        rating: 5,
        date: "2024-11-15",
        comment: "Qualité exceptionnelle, ma fille adore cette combinaison. Le tissu est très doux et tient bien chaud."
      }
    ],
    description: "Combinaison en tricot doux avec bonnet assorti, parfaite pour les premiers mois. La matière en coton biologique respecte la peau sensible des bébés.",
    features: ["Matière hypoallergénique", "Fermeture pression", "Bonnet inclus", "Certifié OEKO-TEX"],
    tags: ["bestseller", "nouveau", "hiver"],
    isNew: true,
    isBestseller: true,
    isActive: true,
    sku: "CHK-KNT-001",
    weight: 280,
    createdAt: "2024-10-01T10:00:00Z"
  },
  {
    id: "PRD-002",
    name: "Pull Col Roulé Rayé",
    nameAr: "سترة ياقة مدورة مخططة",
    slug: "pull-col-roule-raye",
    category: "Knitwear",
    ageRange: "6-12m",
    gender: "unisex",
    price: 2800,
    salePrice: null,
    images: [
      "https://picsum.photos/seed/prd002-1/600/600",
      "https://picsum.photos/seed/prd002-2/600/600",
      "https://picsum.photos/seed/prd002-3/600/600"
    ],
    sizes: ["6-12m", "12-18m", "18-24m"],
    stockPerSize: {
      "6-12m": 8,
      "12-18m": 5,
      "18-24m": 3
    },
    colors: [
      { name: "Marine", hex: "#1B3A5C" },
      { name: "Bordeaux", hex: "#7A2E3B" },
      { name: "Forêt", hex: "#2D5A3D" }
    ],
    material: "50% laine mérinos, 50% coton biologique",
    washInstruction: "Lavage à main, séchage à plat",
    rating: 4.6,
    reviewCount: 22,
    reviews: [
      {
        id: "RV-002",
        author: "Yasmine K.",
        wilaya: "Oran",
        rating: 5,
        date: "2024-10-28",
        comment: "Très beau pull, couleur fidèle. Mon fils est à l'aise dedans."
      },
      {
        id: "RV-003",
        author: "Ines M.",
        wilaya: "Constantine",
        rating: 4,
        date: "2024-11-02",
        comment: "Belle qualité, mais les rayures sont plus fines que sur la photo."
      }
    ],
    description: "Pull col roulé à rayures intemporel, idéal pour l'hiver. Sa composition en laine mérinos et coton offre chaleur et confort.",
    features: ["Col roulé doux", "Rayures contrastantes", "Laine mérinos", "Boutons d'épaule"],
    tags: ["hiver", "classique"],
    isNew: false,
    isBestseller: true,
    isActive: true,
    sku: "CHK-KNT-002",
    weight: 310,
    createdAt: "2024-09-15T10:00:00Z"
  },
  {
    id: "PRD-003",
    name: "Cardigan Tresse Pois",
    nameAr: "كارديغان مضفر بنقاط البولكا",
    slug: "cardigan-tresse-pois",
    category: "Knitwear",
    ageRange: "12-18m",
    gender: "fille",
    price: 3500,
    salePrice: 2900,
    images: [
      "https://picsum.photos/seed/prd003-1/600/600",
      "https://picsum.photos/seed/prd003-2/600/600",
      "https://picsum.photos/seed/prd003-3/600/600"
    ],
    sizes: ["12-18m", "18-24m", "2-3y"],
    stockPerSize: {
      "12-18m": 6,
      "18-24m": 4,
      "2-3y": 2
    },
    colors: [
      { name: "Rose Poudré", hex: "#E8B4B8" },
      { name: "Lavande", hex: "#C3B1E1" },
      { name: "Perle", hex: "#F0E6E8" }
    ],
    material: "100% coton biologique",
    washInstruction: "Lavage à 30°C, programme laine",
    rating: 4.7,
    reviewCount: 18,
    reviews: [
      {
        id: "RV-004",
        author: "Lina H.",
        wilaya: "Blida",
        rating: 5,
        date: "2024-11-20",
        comment: "Un cardigan magnifique, ma fille est trop mignonne dedans! Le motif tresse est superbe."
      }
    ],
    description: "Cardigan féminin avec motif tresse et détails pois. Boutons en nacre et finitions soignées pour un look chic et confortable.",
    features: ["Motif tresse", "Boutons nacre", "Bordures côtelées", "Poches appliquées"],
    tags: ["fille", "automne"],
    isNew: true,
    isBestseller: false,
    isActive: true,
    sku: "CHK-KNT-003",
    weight: 340,
    createdAt: "2024-10-20T10:00:00Z"
  },
  {
    id: "PRD-004",
    name: "Robe Tricot Tulipe",
    nameAr: "فستان توليب محبوك",
    slug: "robe-tricot-tulipe",
    category: "Knitwear",
    ageRange: "18-24m",
    gender: "fille",
    price: 3800,
    salePrice: null,
    images: [
      "https://picsum.photos/seed/prd004-1/600/600",
      "https://picsum.photos/seed/prd004-2/600/600",
      "https://picsum.photos/seed/prd004-3/600/600"
    ],
    sizes: ["18-24m", "2-3y", "3-4y"],
    stockPerSize: {
      "18-24m": 7,
      "2-3y": 5,
      "3-4y": 3
    },
    colors: [
      { name: "Corail", hex: "#E8706A" },
      { name: "Vanille", hex: "#F3E5D8" },
      { name: "Sauge", hex: "#A8C4A8" }
    ],
    material: "100% coton biologique",
    washInstruction: "Lavage à 30°C, retourner avant lavage",
    rating: 4.9,
    reviewCount: 27,
    reviews: [
      {
        id: "RV-005",
        author: "Meriem D.",
        wilaya: "Sétif",
        rating: 5,
        date: "2024-10-05",
        comment: "Robe magnifique! Le tombé est parfait et la couleur corail est encore plus belle en vrai."
      },
      {
        id: "RV-006",
        author: "Nawel S.",
        wilaya: "Tizi Ouzou",
        rating: 5,
        date: "2024-11-10",
        comment: "Achetée pour une fête, un véritable coup de cœur. Taille parfaitement."
      }
    ],
    description: "Robe en tricot coupe tulipe avec taille élastiquée. Légère et confortable pour les journées d'automne.",
    features: ["Taille élastiquée", "Coupe tulipe", "Manches ballon", "Doublure coton"],
    tags: ["fille", "robe", "automne"],
    isNew: false,
    isBestseller: true,
    isActive: true,
    sku: "CHK-KNT-004",
    weight: 260,
    createdAt: "2024-08-20T10:00:00Z"
  },
  {
    id: "PRD-005",
    name: "Gilet Tricot Boutons Bois",
    nameAr: "صدرية محبوكة بأزرار خشبية",
    slug: "gilet-tricot-boutons-bois",
    category: "Knitwear",
    ageRange: "2-3y",
    gender: "garçon",
    price: 2600,
    salePrice: 2100,
    images: [
      "https://picsum.photos/seed/prd005-1/600/600",
      "https://picsum.photos/seed/prd005-2/600/600",
      "https://picsum.photos/seed/prd005-3/600/600"
    ],
    sizes: ["2-3y", "3-4y", "4-5y"],
    stockPerSize: {
      "2-3y": 10,
      "3-4y": 6,
      "4-5y": 4
    },
    colors: [
      { name: "Châtaigne", hex: "#6B3A2A" },
      { name: "Gris Anthracite", hex: "#3D3D3D" },
      { name: "Moutarde", hex: "#D4A843" }
    ],
    material: "80% coton, 20% polyester recyclé",
    washInstruction: "Lavage à 30°C, séchage suspendu",
    rating: 4.5,
    reviewCount: 15,
    reviews: [
      {
        id: "RV-007",
        author: "Sofiane R.",
        wilaya: "Annaba",
        rating: 4,
        date: "2024-09-25",
        comment: "Très joli gilet, les boutons en bois sont une belle touche. Mon fils est fier de le porter."
      }
    ],
    description: "Gilet en tricot épais avec boutons en bois naturels. Parfait pour superposer sur une chemise ou un t-shirt.",
    features: ["Boutons en bois certifié FSC", "Col en V", "Côtes aux poignets", "Poches plaquées"],
    tags: ["garçon", "automne", "promo"],
    isNew: true,
    isBestseller: false,
    isActive: true,
    sku: "CHK-KNT-005",
    weight: 295,
    createdAt: "2024-10-10T10:00:00Z"
  },
  {
    id: "PRD-006",
    name: "Ensemble Bonnet et Écharpe Tricot",
    nameAr: "طقم قبعة ووشاح محبوك",
    slug: "ensemble-bonnet-echarpe-tricot",
    category: "Knitwear",
    ageRange: "0-3m",
    gender: "unisex",
    price: 1800,
    salePrice: null,
    images: [
      "https://picsum.photos/seed/prd006-1/600/600",
      "https://picsum.photos/seed/prd006-2/600/600",
      "https://picsum.photos/seed/prd006-3/600/600"
    ],
    sizes: ["0-3m", "3-6m", "6-12m"],
    stockPerSize: {
      "0-3m": 15,
      "3-6m": 10,
      "6-12m": 7
    },
    colors: [
      { name: "Nuage", hex: "#E8E8E8" },
      { name: "Caramel", hex: "#B87D4B" },
      { name: "Bleuet", hex: "#6B8FA3" }
    ],
    material: "100% coton biologique",
    washInstruction: "Lavage à 30°C, ne pas utiliser d'adoucissant",
    rating: 4.4,
    reviewCount: 12,
    reviews: [
      {
        id: "RV-008",
        author: "Fatima Z.",
        wilaya: "Béjaïa",
        rating: 5,
        date: "2024-11-30",
        comment: "Ensemble tout doux et super mignon. Le bonnet tient bien sur la tête de bébé."
      }
    ],
    description: "Ensemble bonnet et écharpe assortis en tricot ultra-doux. Idéal pour les promenades d'hiver.",
    features: ["Bonnet à revers", "Écharpe nouable", "Tricot côtelé", "Sans étiquette irritante"],
    tags: ["nouveau", "hiver", "accessoires"],
    isNew: true,
    isBestseller: false,
    isActive: true,
    sku: "CHK-KNT-006",
    weight: 140,
    createdAt: "2024-11-01T10:00:00Z"
  },
  {
    id: "PRD-007",
    name: "Pull Mouton Tout Doux",
    nameAr: "سترة الخروف الناعمة",
    slug: "pull-mouton-tout-doux",
    category: "Knitwear",
    ageRange: "3-6m",
    gender: "unisex",
    price: 3400,
    salePrice: 2800,
    images: [
      "https://picsum.photos/seed/prd007-1/600/600",
      "https://picsum.photos/seed/prd007-2/600/600",
      "https://picsum.photos/seed/prd007-3/600/600"
    ],
    sizes: ["3-6m", "6-12m", "12-18m"],
    stockPerSize: {
      "3-6m": 9,
      "6-12m": 6,
      "12-18m": 2
    },
    colors: [
      { name: "Blanc Neige", hex: "#F9F9F9" },
      { name: "Chamois", hex: "#DFC8A8" },
      { name: "Gris Perle", hex: "#C8C8C8" }
    ],
    material: "100% coton peigné biologique",
    washInstruction: "Lavage à 30°C, essorage doux",
    rating: 4.9,
    reviewCount: 41,
    reviews: [
      {
        id: "RV-009",
        author: "Assia L.",
        wilaya: "Batna",
        rating: 5,
        date: "2024-10-18",
        comment: "Le pull le plus doux que j'ai jamais acheté pour mon bébé! Les motifs moutons sont adorables."
      },
      {
        id: "RV-010",
        author: "Lydia C.",
        wilaya: "Djelfa",
        rating: 5,
        date: "2024-11-05",
        comment: "Vraiment un excellent rapport qualité-prix. Il a tenu parfaitement après plusieurs lavages."
      },
      {
        id: "RV-011",
        author: "Rayan M.",
        wilaya: "Sidi Bel Abbès",
        rating: 4,
        date: "2024-11-22",
        comment: "Très beau pull, seul bémol: la taille est un peu juste. Prenez une taille au-dessus."
      }
    ],
    description: "Pull en coton peigné avec motif mouton en relief. Extrêmement doux, parfait pour les peaux sensibles.",
    features: ["Motif mouton 3D", "Col rond", "Boutons pression épaule", "Tissu anti-bouloche"],
    tags: ["bestseller", "hiver"],
    isNew: false,
    isBestseller: true,
    isActive: true,
    sku: "CHK-KNT-007",
    weight: 300,
    createdAt: "2024-08-10T10:00:00Z"
  },
  {
    id: "PRD-008",
    name: "Pont-Neuf Tricot Chiné",
    nameAr: "بذلة محبوكة رمادية",
    slug: "pont-neuf-tricot-chine",
    category: "Knitwear",
    ageRange: "0-3m",
    gender: "unisex",
    price: 3100,
    salePrice: null,
    images: [
      "https://picsum.photos/seed/prd008-1/600/600",
      "https://picsum.photos/seed/prd008-2/600/600",
      "https://picsum.photos/seed/prd008-3/600/600"
    ],
    sizes: ["0-3m", "3-6m"],
    stockPerSize: {
      "0-3m": 14,
      "3-6m": 8
    },
    colors: [
      { name: "Gris Chiné", hex: "#A8A8A8" },
      { name: "Beige Chiné", hex: "#D4C5A9" },
      { name: "Bleu Chiné", hex: "#8899A8" }
    ],
    material: "100% coton biologique",
    washInstruction: "Lavage à 30°C, séchage à plat",
    rating: 4.7,
    reviewCount: 19,
    reviews: [
      {
        id: "RV-012",
        author: "Sabrina F.",
        wilaya: "Biskra",
        rating: 5,
        date: "2024-09-30",
        comment: "Superbe combinaison chinée. La matière est épaisse et de qualité."
      },
      {
        id: "RV-013",
        author: "Khadidja A.",
        wilaya: "Tebessa",
        rating: 4,
        date: "2024-10-15",
        comment: "Très jolie, mais les pressions pourraient être plus solides."
      }
    ],
    description: "Pont-neuf en tricot chiné avec fermeture à pression sur le devant et entre les jambes. Habillage facile et rapide.",
    features: ["Fermeture pression intégrale", "Manches longues", "Capuche amovible", "Entrejambe pressions"],
    tags: ["nouveau"],
    isNew: false,
    isBestseller: false,
    isActive: true,
    sku: "CHK-KNT-008",
    weight: 320,
    createdAt: "2024-09-01T10:00:00Z"
  },
  {
    id: "PRD-009",
    name: "Manteau Doudoune Capuche",
    nameAr: "معطف منتفخ بغطاء للرأس",
    slug: "manteau-doudoune-capuche",
    category: "Manteaux",
    ageRange: "6-12m",
    gender: "unisex",
    price: 4900,
    salePrice: 4200,
    images: [
      "https://picsum.photos/seed/prd009-1/600/600",
      "https://picsum.photos/seed/prd009-2/600/600",
      "https://picsum.photos/seed/prd009-3/600/600"
    ],
    sizes: ["6-12m", "12-18m", "18-24m"],
    stockPerSize: {
      "6-12m": 8,
      "12-18m": 5,
      "18-24m": 3
    },
    colors: [
      { name: "Rouge Cerise", hex: "#C62828" },
      { name: "Bleu Glacier", hex: "#81B9C8" },
      { name: "Vert Sapin", hex: "#1E5631" }
    ],
    material: "100% polyester recyclé, rembourrage en fibres recyclées",
    washInstruction: "Lavage à 30°C, programme synthétique, ne pas repasser",
    rating: 4.6,
    reviewCount: 28,
    reviews: [
      {
        id: "RV-014",
        author: "Melissa B.",
        wilaya: "Alger",
        rating: 5,
        date: "2024-11-25",
        comment: "Excellent manteau d'hiver, très chaud et léger. La capuche tient bien en place."
      }
    ],
    description: "Doudoune matelassée chaude et légère avec capuche amovible et bordure en fausse fourrure. Parfaite pour les hivers algérois.",
    features: ["Capuche amovible", "Matelassage", "Fermeture éclair double curseur", "Poches zippées"],
    tags: ["hiver", "bestseller"],
    isNew: false,
    isBestseller: true,
    isActive: true,
    sku: "CHK-MNT-001",
    weight: 420,
    createdAt: "2024-09-20T10:00:00Z"
  },
  {
    id: "PRD-010",
    name: "Blouson Jean Doublé",
    nameAr: "جاكيت جينز مبطن",
    slug: "blouson-jean-double",
    category: "Manteaux",
    ageRange: "2-3y",
    gender: "unisex",
    price: 4200,
    salePrice: 3600,
    images: [
      "https://picsum.photos/seed/prd010-1/600/600",
      "https://picsum.photos/seed/prd010-2/600/600",
      "https://picsum.photos/seed/prd010-3/600/600"
    ],
    sizes: ["2-3y", "3-4y", "4-5y"],
    stockPerSize: {
      "2-3y": 7,
      "3-4y": 5,
      "4-5y": 2
    },
    colors: [
      { name: "Jean Brut", hex: "#4A6B8A" },
      { name: "Jean Noir", hex: "#2C2C2C" },
      { name: "Jean Clair", hex: "#7BA0C4" }
    ],
    material: "100% coton denim, doublure polaire 100% polyester recyclé",
    washInstruction: "Lavage à 30°C, retourner avant lavage",
    rating: 4.5,
    reviewCount: 16,
    reviews: [
      {
        id: "RV-015",
        author: "Yacine D.",
        wilaya: "Oran",
        rating: 4,
        date: "2024-10-12",
        comment: "Blouson solide et bien doublé. Parfait pour la mi-saison."
      },
      {
        id: "RV-016",
        author: "Chaima N.",
        wilaya: "Constantine",
        rating: 5,
        date: "2024-10-29",
        comment: "Ma fille ne le quitte plus! La doublure polaire est très chaude."
      }
    ],
    description: "Blouson en jean doublé polaire, intemporel et résistant. Idéal pour les sorties et l'école.",
    features: ["Doublure polaire", "Col réversible", "Boutons pression", "Poches plaquées"],
    tags: ["automne", "classique"],
    isNew: false,
    isBestseller: false,
    isActive: true,
    sku: "CHK-MNT-002",
    weight: 480,
    createdAt: "2024-08-25T10:00:00Z"
  },
  {
    id: "PRD-011",
    name: "Parka Imperméable Forêt",
    nameAr: "باركا مقاومة للماء",
    slug: "parka-impermeable-foret",
    category: "Manteaux",
    ageRange: "3-4y",
    gender: "unisex",
    price: 5500,
    salePrice: null,
    images: [
      "https://picsum.photos/seed/prd011-1/600/600",
      "https://picsum.photos/seed/prd011-2/600/600",
      "https://picsum.photos/seed/prd011-3/600/600"
    ],
    sizes: ["3-4y", "4-5y", "5-6y"],
    stockPerSize: {
      "3-4y": 6,
      "4-5y": 4,
      "5-6y": 2
    },
    colors: [
      { name: "Vert Forêt", hex: "#2B4F2B" },
      { name: "Kaki", hex: "#6B6E4A" },
      { name: "Ocre", hex: "#C49A3B" }
    ],
    material: "100% polyester imperméable, enduction PU",
    washInstruction: "Lavage à 30°C, ne pas essorer, repassage à basse température",
    rating: 4.8,
    reviewCount: 23,
    reviews: [
      {
        id: "RV-017",
        author: "Samir K.",
        wilaya: "Blida",
        rating: 5,
        date: "2024-11-08",
        comment: "Parka géniale, vraiment imperméable. Utilisée sous la pluie et parfaite."
      }
    ],
    description: "Parka imperméable légère avec capuche ajustable et cordon de serrage. Parfaite pour les aventures en plein air.",
    features: ["Déperlant", "Capuche ajustable", "Cordon taille", "Poches imperméables"],
    tags: ["nouveau", "aventure"],
    isNew: true,
    isBestseller: false,
    isActive: true,
    sku: "CHK-MNT-003",
    weight: 390,
    createdAt: "2024-10-15T10:00:00Z"
  },
  {
    id: "PRD-012",
    name: "Manteau Laine Chic",
    nameAr: "معطف صوف أنيق",
    slug: "manteau-laine-chic",
    category: "Manteaux",
    ageRange: "4-5y",
    gender: "fille",
    price: 6200,
    salePrice: 5200,
    images: [
      "https://picsum.photos/seed/prd012-1/600/600",
      "https://picsum.photos/seed/prd012-2/600/600",
      "https://picsum.photos/seed/prd012-3/600/600"
    ],
    sizes: ["4-5y", "5-6y", "6-7y"],
    stockPerSize: {
      "4-5y": 4,
      "5-6y": 3,
      "6-7y": 1
    },
    colors: [
      { name: "Bordeaux", hex: "#6E2639" },
      { name: "Gris Foncé", hex: "#4A4A4A" },
      { name: "Noir", hex: "#1A1A1A" }
    ],
    material: "70% laine, 30% coton",
    washInstruction: "Nettoyage à sec recommandé",
    rating: 4.7,
    reviewCount: 14,
    reviews: [
      {
        id: "RV-018",
        author: "Maria H.",
        wilaya: "Alger",
        rating: 5,
        date: "2024-10-20",
        comment: "Manteau d'une élégance rare! Toutes les mamans me demandent où je l'ai acheté."
      },
      {
        id: "RV-019",
        author: "Nawal R.",
        wilaya: "Médéa",
        rating: 4,
        date: "2024-11-12",
        comment: "Très beau manteau, coupe parfaite. Par contre la laine gratte un peu au niveau du cou."
      }
    ],
    description: "Manteau en laine coupe princesse avec col Claudine et boutons dorés. L'élégance à la française pour vos petites filles.",
    features: ["Col Claudine", "Boutons dorés", "Ceinture nouée", "Doublure satin"],
    tags: ["fille", "cérémonie", "hiver"],
    isNew: false,
    isBestseller: false,
    isActive: true,
    sku: "CHK-MNT-004",
    weight: 560,
    createdAt: "2024-08-05T10:00:00Z"
  },
  {
    id: "PRD-013",
    name: "Veste Polaire Ourson",
    nameAr: "سترة صوفية دب",
    slug: "veste-polaire-ourson",
    category: "Manteaux",
    ageRange: "0-3m",
    gender: "unisex",
    price: 2400,
    salePrice: null,
    images: [
      "https://picsum.photos/seed/prd013-1/600/600",
      "https://picsum.photos/seed/prd013-2/600/600",
      "https://picsum.photos/seed/prd013-3/600/600"
    ],
    sizes: ["0-3m", "3-6m", "6-12m"],
    stockPerSize: {
      "0-3m": 18,
      "3-6m": 12,
      "6-12m": 6
    },
    colors: [
      { name: "Brun Ours", hex: "#8B5A2B" },
      { name: "Blanc Polaire", hex: "#F5F5F5" },
      { name: "Rose Tendre", hex: "#F2C4C4" }
    ],
    material: "100% polyester polaire",
    washInstruction: "Lavage à 30°C, séchage en machine à basse température",
    rating: 4.6,
    reviewCount: 31,
    reviews: [
      {
        id: "RV-020",
        author: "Fatiha S.",
        wilaya: "Tizi Ouzou",
        rating: 5,
        date: "2024-11-01",
        comment: "Trop mignonne avec ses petites oreilles! Mon bébé est au chaud et confortable."
      },
      {
        id: "RV-021",
        author: "Meriem B.",
        wilaya: "Béjaïa",
        rating: 4,
        date: "2024-11-18",
        comment: "Veste très douce et chaude. Les oreilles d'ours sont adorables."
      }
    ],
    description: "Veste polaire ultra-douce avec oreilles d'ourson sur la capuche. Légère, chaude et irrésistiblement mignonne.",
    features: ["Capuche à oreilles", "Polaire anti-pilling", "Fermeture éclair", "Poches latérales"],
    tags: ["bestseller", "hiver", "nouveau"],
    isNew: true,
    isBestseller: true,
    isActive: true,
    sku: "CHK-MNT-005",
    weight: 200,
    createdAt: "2024-10-25T10:00:00Z"
  },
  {
    id: "PRD-014",
    name: "Coupe-Vent Léger",
    nameAr: "سترة واقية من الرياح خفيفة",
    slug: "coupe-vent-leger",
    category: "Manteaux",
    ageRange: "5-6y",
    gender: "unisex",
    price: 3600,
    salePrice: 3000,
    images: [
      "https://picsum.photos/seed/prd014-1/600/600",
      "https://picsum.photos/seed/prd014-2/600/600",
      "https://picsum.photos/seed/prd014-3/600/600"
    ],
    sizes: ["5-6y", "6-7y", "7-8y"],
    stockPerSize: {
      "5-6y": 5,
      "6-7y": 3,
      "7-8y": 2
    },
    colors: [
      { name: "Bleu Ciel", hex: "#87CEEB" },
      { name: "Jaune Citron", hex: "#E8E02A" },
      { name: "Rouge Sport", hex: "#D32F2F" }
    ],
    material: "100% nylon ripstop",
    washInstruction: "Lavage à 30°C, programme synthétique",
    rating: 4.3,
    reviewCount: 10,
    reviews: [
      {
        id: "RV-022",
        author: "Karim A.",
        wilaya: "Annaba",
        rating: 4,
        date: "2024-10-08",
        comment: "Bon coupe-vent pour le sport. Leger et se plie facilement dans le sac."
      }
    ],
    description: "Coupe-vent léger et pliable, idéal pour le sport et les activités en extérieur. Se range dans sa poche intégrée.",
    features: ["Pliable dans sa poche", "Capuche intégrée", "Zip anti-pincement", "Élastiques aux poignets"],
    tags: ["sport", "printemps"],
    isNew: false,
    isBestseller: false,
    isActive: true,
    sku: "CHK-MNT-006",
    weight: 160,
    createdAt: "2024-07-15T10:00:00Z"
  },
  {
    id: "PRD-015",
    name: "Nid d'Ange Brodé",
    nameAr: "عش الملاك المطرز",
    slug: "nid-ange-brode",
    category: "Nouveaux-nés",
    ageRange: "0-3m",
    gender: "unisex",
    price: 2900,
    salePrice: null,
    images: [
      "https://picsum.photos/seed/prd015-1/600/600",
      "https://picsum.photos/seed/prd015-2/600/600",
      "https://picsum.photos/seed/prd015-3/600/600"
    ],
    sizes: ["0-3m"],
    stockPerSize: {
      "0-3m": 20
    },
    colors: [
      { name: "Blanc Lys", hex: "#FDFBF7" },
      { name: "Rose Thé", hex: "#E8C4C4" },
      { name: "Bleu Ciel", hex: "#B5D5E2" }
    ],
    material: "100% coton biologique certifié GOTS",
    washInstruction: "Lavage à 30°C, essorage doux, repassage à température moyenne",
    rating: 4.9,
    reviewCount: 45,
    reviews: [
      {
        id: "RV-023",
        author: "Sara M.",
        wilaya: "Alger",
        rating: 5,
        date: "2024-09-12",
        comment: "Le plus beau nid d'ange que j'ai vu! La broderie est faite à la main, magnifique."
      },
      {
        id: "RV-024",
        author: "Ines T.",
        wilaya: "Oran",
        rating: 5,
        date: "2024-10-02",
        comment: "Offert pour une naissance, la maman a adoré. Le coton est très doux."
      },
      {
        id: "RV-025",
        author: "Amel D.",
        wilaya: "Sétif",
        rating: 5,
        date: "2024-10-30",
        comment: "Qualité premium. La broderie fine fait toute la différence."
      }
    ],
    description: "Nid d'ange en coton biologique avec broderie artisanale. Un cadeau de naissance chic et confortable.",
    features: ["Broderie main", "Coton GOTS", "Fermeture éclair latérale", "Capuche ajustable"],
    tags: ["bestseller", "nouveau", "cadeau"],
    isNew: true,
    isBestseller: true,
    isActive: true,
    sku: "CHK-NNE-001",
    weight: 250,
    createdAt: "2024-10-05T10:00:00Z"
  },
  {
    id: "PRD-016",
    name: "Pyjama Naissance Coton",
    nameAr: "بيجامة قطن للمواليد",
    slug: "pyjama-naissance-coton",
    category: "Nouveaux-nés",
    ageRange: "0-3m",
    gender: "unisex",
    price: 2200,
    salePrice: 1900,
    images: [
      "https://picsum.photos/seed/prd016-1/600/600",
      "https://picsum.photos/seed/prd016-2/600/600",
      "https://picsum.photos/seed/prd016-3/600/600"
    ],
    sizes: ["0-3m", "3-6m"],
    stockPerSize: {
      "0-3m": 25,
      "3-6m": 15
    },
    colors: [
      { name: "Blanc", hex: "#FFFFFF" },
      { name: "Écru", hex: "#F5ECD7" },
      { name: "Gris Souris", hex: "#C4C4C4" }
    ],
    material: "100% coton biologique",
    washInstruction: "Lavage à 40°C, repassage moyen",
    rating: 4.5,
    reviewCount: 38,
    reviews: [
      {
        id: "RV-026",
        author: "Nadia B.",
        wilaya: "Blida",
        rating: 5,
        date: "2024-11-05",
        comment: "Pyjama parfait pour la naissance. Le coton est tout doux et les pressions faciles à utiliser."
      }
    ],
    description: "Pyjama naissance en coton biologique avec pattes de boutonnage. Fermeture pression intégrale pour changer bébé facilement.",
    features: ["Fermeture pression intégrale", "Pattes retournables", "Coton biologique", "Manches longues"],
    tags: ["naissance", "cadeau"],
    isNew: false,
    isBestseller: true,
    isActive: true,
    sku: "CHK-NNE-002",
    weight: 200,
    createdAt: "2024-08-15T10:00:00Z"
  },
  {
    id: "PRD-017",
    name: "Body Manches Longues Lot 3",
    nameAr: "طقم 3 بودي بأكمام طويلة",
    slug: "body-manches-longues-lot-3",
    category: "Nouveaux-nés",
    ageRange: "3-6m",
    gender: "unisex",
    price: 2600,
    salePrice: null,
    images: [
      "https://picsum.photos/seed/prd017-1/600/600",
      "https://picsum.photos/seed/prd017-2/600/600",
      "https://picsum.photos/seed/prd017-3/600/600"
    ],
    sizes: ["3-6m", "6-12m"],
    stockPerSize: {
      "3-6m": 20,
      "6-12m": 12
    },
    colors: [
      { name: "Mix Pastel", hex: "#F0D9DA" },
      { name: "Mix Nature", hex: "#D4C5A9" },
      { name: "Mix Océan", hex: "#A9C4D4" }
    ],
    material: "100% coton biologique",
    washInstruction: "Lavage à 40°C, résiste au sèche-linge",
    rating: 4.4,
    reviewCount: 52,
    reviews: [
      {
        id: "RV-027",
        author: "Lydia F.",
        wilaya: "Batna",
        rating: 4,
        date: "2024-09-20",
        comment: "Lot pratique et économique. Les bodies sont de bonne qualité et les couleurs sont jolies."
      },
      {
        id: "RV-028",
        author: "Assia K.",
        wilaya: "Djelfa",
        rating: 5,
        date: "2024-10-14",
        comment: "Parfait pour la layette. La matière est douce et les bodies tiennent bien après lavage."
      }
    ],
    description: "Lot de 3 bodies manches longues en coton biologique. Pratiques et confortables pour le quotidien.",
    features: ["Lot de 3", "Ouverture pression entrejambe", "Encolure élastiquée", "Coton certifié"],
    tags: ["lot", "essentiel"],
    isNew: false,
    isBestseller: true,
    isActive: true,
    sku: "CHK-NNE-003",
    weight: 320,
    createdAt: "2024-09-10T10:00:00Z"
  },
  {
    id: "PRD-018",
    name: "Gigoteuse Naissance",
    nameAr: "كيس نوم للمواليد",
    slug: "gigoteuse-naissance",
    category: "Nouveaux-nés",
    ageRange: "0-3m",
    gender: "unisex",
    price: 3800,
    salePrice: 3300,
    images: [
      "https://picsum.photos/seed/prd018-1/600/600",
      "https://picsum.photos/seed/prd018-2/600/600",
      "https://picsum.photos/seed/prd018-3/600/600"
    ],
    sizes: ["0-3m", "3-6m", "6-12m"],
    stockPerSize: {
      "0-3m": 10,
      "3-6m": 8,
      "6-12m": 4
    },
    colors: [
      { name: "Lavande", hex: "#C3B1E1" },
      { name: "Menthe", hex: "#98D8C8" },
      { name: "Pêche", hex: "#FAD5B5" }
    ],
    material: "Extérieur 100% coton biologique, rembourrage 100% polyester recyclé",
    washInstruction: "Lavage à 30°C, ne pas mettre au sèche-linge",
    rating: 4.8,
    reviewCount: 29,
    reviews: [
      {
        id: "RV-029",
        author: "Meriem L.",
        wilaya: "Tizi Ouzou",
        rating: 5,
        date: "2024-11-28",
        comment: "Ma fille dort paisiblement dans cette gigoteuse. La taille est parfaite et la matière très douce."
      }
    ],
    description: "Gigoteuse naissance avec manches amovibles et zip des deux côtés pour changer bébé sans le déshabiller.",
    features: ["Manches amovibles", "Zip bilatéral", "Capuche intégrée", "TOG 2.5"],
    tags: ["hiver", "sommeil"],
    isNew: true,
    isBestseller: false,
    isActive: true,
    sku: "CHK-NNE-004",
    weight: 350,
    createdAt: "2024-10-20T10:00:00Z"
  },
  {
    id: "PRD-019",
    name: "Chaussons Prématuré",
    nameAr: "جوارب أطفال خدج",
    slug: "chaussons-premature",
    category: "Nouveaux-nés",
    ageRange: "0-3m",
    gender: "unisex",
    price: 1200,
    salePrice: null,
    images: [
      "https://picsum.photos/seed/prd019-1/600/600",
      "https://picsum.photos/seed/prd019-2/600/600",
      "https://picsum.photos/seed/prd019-3/600/600"
    ],
    sizes: ["0-3m"],
    stockPerSize: {
      "0-3m": 30
    },
    colors: [
      { name: "Blanc Nuage", hex: "#F0F0F0" },
      { name: "Rose Bonbon", hex: "#F4A4B8" },
      { name: "Bleu Azur", hex: "#A0C4E8" }
    ],
    material: "100% coton biologique non traité",
    washInstruction: "Lavage à 30°C, pas d'adoucissant",
    rating: 4.3,
    reviewCount: 11,
    reviews: [
      {
        id: "RV-030",
        author: "Fatima H.",
        wilaya: "Constantine",
        rating: 5,
        date: "2024-10-22",
        comment: "Parfaits pour mon petit prématuré. Ils tiennent bien aux pieds et ne serrent pas."
      }
    ],
    description: "Chaussons doux spécialement conçus pour les bébés prématurés. Taille extra-petite avec élastique doux à la cheville.",
    features: ["Taille prématuré", "Élastique doux", "Semelle antidérapante", "Sans couture"],
    tags: ["prématuré", "essentiel"],
    isNew: false,
    isBestseller: false,
    isActive: true,
    sku: "CHK-NNE-005",
    weight: 60,
    createdAt: "2024-09-01T10:00:00Z"
  },
  {
    id: "PRD-020",
    name: "Salopette Jean Élastiqué",
    nameAr: "بذلة جينز مطاطية",
    slug: "salopette-jean-elastique",
    category: "Tout-petits",
    ageRange: "12-18m",
    gender: "unisex",
    price: 3400,
    salePrice: null,
    images: [
      "https://picsum.photos/seed/prd020-1/600/600",
      "https://picsum.photos/seed/prd020-2/600/600",
      "https://picsum.photos/seed/prd020-3/600/600"
    ],
    sizes: ["12-18m", "18-24m", "2-3y"],
    stockPerSize: {
      "12-18m": 8,
      "18-24m": 6,
      "2-3y": 4
    },
    colors: [
      { name: "Bleu Denim", hex: "#5B7B9A" },
      { name: "Gris Denim", hex: "#7A8A9A" },
      { name: "Noir Denim", hex: "#3A3A3A" }
    ],
    material: "98% coton, 2% élasthanne",
    washInstruction: "Lavage à 30°C, retourner avant lavage",
    rating: 4.7,
    reviewCount: 25,
    reviews: [
      {
        id: "RV-031",
        author: "Sabrina H.",
        wilaya: "Alger",
        rating: 5,
        date: "2024-11-10",
        comment: "Salopette super pratique! La taille élastiquée est idéale pour l'apprentissage de la propreté."
      },
      {
        id: "RV-032",
        author: "Nawel D.",
        wilaya: "Oran",
        rating: 4,
        date: "2024-11-25",
        comment: "Très jolie salopette, le tissu est résistant. Les bretelles sont ajustables."
      }
    ],
    description: "Salopette en jean élastiqué avec bretelles ajustables et taille élastiquée. Confortable et facile à enfiler.",
    features: ["Taille élastiquée", "Bretelles ajustables", "Poches kangourou", "Boutons pression latéraux"],
    tags: ["jean", "tendance"],
    isNew: false,
    isBestseller: true,
    isActive: true,
    sku: "CHK-TPT-001",
    weight: 360,
    createdAt: "2024-09-25T10:00:00Z"
  },
  {
    id: "PRD-021",
    name: "T-Shirt Apprendre Lot 2",
    nameAr: "طقم تي شيرت تعليمي قطعتان",
    slug: "t-shirt-apprendre-lot-2",
    category: "Tout-petits",
    ageRange: "18-24m",
    gender: "unisex",
    price: 1800,
    salePrice: 1500,
    images: [
      "https://picsum.photos/seed/prd021-1/600/600",
      "https://picsum.photos/seed/prd021-2/600/600",
      "https://picsum.photos/seed/prd021-3/600/600"
    ],
    sizes: ["18-24m", "2-3y", "3-4y"],
    stockPerSize: {
      "18-24m": 15,
      "2-3y": 12,
      "3-4y": 8
    },
    colors: [
      { name: "Blanc", hex: "#FFFFFF" },
      { name: "Bleu Roi", hex: "#2162A3" },
      { name: "Jaune Soleil", hex: "#F5D742" }
    ],
    material: "100% coton biologique",
    washInstruction: "Lavage à 40°C, repassage moyen",
    rating: 4.5,
    reviewCount: 20,
    reviews: [
      {
        id: "RV-033",
        author: "Chaima B.",
        wilaya: "Sétif",
        rating: 5,
        date: "2024-10-16",
        comment: "Lot super mignon avec les lettres de l'alphabet. Mon fils apprend en s'habillant!"
      }
    ],
    description: "Lot de 2 t-shirts avec motifs éducatifs (lettres et chiffres). En coton biologique doux pour la peau sensible.",
    features: ["Motifs éducatifs", "Lot de 2", "Encolure renforcée", "Coton bio"],
    tags: ["lot", "éducatif", "promo"],
    isNew: true,
    isBestseller: false,
    isActive: true,
    sku: "CHK-TPT-002",
    weight: 180,
    createdAt: "2024-10-10T10:00:00Z"
  },
  {
    id: "PRD-022",
    name: "Pantalon Training Doux",
    nameAr: "بنطلون تدريب ناعم",
    slug: "pantalon-training-doux",
    category: "Tout-petits",
    ageRange: "2-3y",
    gender: "unisex",
    price: 2200,
    salePrice: null,
    images: [
      "https://picsum.photos/seed/prd022-1/600/600",
      "https://picsum.photos/seed/prd022-2/600/600",
      "https://picsum.photos/seed/prd022-3/600/600"
    ],
    sizes: ["2-3y", "3-4y", "4-5y"],
    stockPerSize: {
      "2-3y": 20,
      "3-4y": 14,
      "4-5y": 8
    },
    colors: [
      { name: "Gris Mélangé", hex: "#A0A0A0" },
      { name: "Bleu Nuit", hex: "#1A2A3A" },
      { name: "Bordeaux", hex: "#6E2639" }
    ],
    material: "80% coton, 20% polyester",
    washInstruction: "Lavage à 30°C, séchage en machine modéré",
    rating: 4.6,
    reviewCount: 33,
    reviews: [
      {
        id: "RV-034",
        author: "Rayan H.",
        wilaya: "Annaba",
        rating: 5,
        date: "2024-09-28",
        comment: "Le pantalon préféré de mon fils! Confortable pour jouer et facile à laver."
      },
      {
        id: "RV-035",
        author: "Yasmine D.",
        wilaya: "Béjaïa",
        rating: 4,
        date: "2024-11-02",
        comment: "Bonne qualité, taille élastiquée confortable. Parfait pour la crèche."
      }
    ],
    description: "Pantalon training doux avec taille élastique et chevilles ajustées. Idéal pour les jeux et les sorties.",
    features: ["Taille élastique", "Chevilles côtelées", "Poches latérales", "Coton doux"],
    tags: ["essentiel", "confort"],
    isNew: false,
    isBestseller: true,
    isActive: true,
    sku: "CHK-TPT-003",
    weight: 240,
    createdAt: "2024-08-20T10:00:00Z"
  },
  {
    id: "PRD-023",
    name: "Robe Tablier Fleurie",
    nameAr: "فستان مريول مزهر",
    slug: "robe-tablier-fleurie",
    category: "Tout-petits",
    ageRange: "18-24m",
    gender: "fille",
    price: 3000,
    salePrice: 2500,
    images: [
      "https://picsum.photos/seed/prd023-1/600/600",
      "https://picsum.photos/seed/prd023-2/600/600",
      "https://picsum.photos/seed/prd023-3/600/600"
    ],
    sizes: ["18-24m", "2-3y", "3-4y"],
    stockPerSize: {
      "18-24m": 9,
      "2-3y": 7,
      "3-4y": 4
    },
    colors: [
      { name: "Fleurs Printemps", hex: "#E8A0B4" },
      { name: "Fleurs Jardin", hex: "#A8C8A0" },
      { name: "Fleurs Ciel", hex: "#A0B8D8" }
    ],
    material: "100% coton biologique",
    washInstruction: "Lavage à 30°C, fer à repasser moyen",
    rating: 4.8,
    reviewCount: 22,
    reviews: [
      {
        id: "RV-036",
        author: "Lina D.",
        wilaya: "Blida",
        rating: 5,
        date: "2024-11-06",
        comment: "Robe à fleurs magnifique! Ma petite princesse est superbe. Le tablier est amovible ce qui est pratique."
      },
      {
        id: "RV-037",
        author: "Maria L.",
        wilaya: "Médéa",
        rating: 5,
        date: "2024-11-20",
        comment: "Coup de cœur! Les fleurs sont brodées, pas imprimées. La qualité est top."
      }
    ],
    description: "Robe tablier avec motif fleuri brodé et ceinture amovible. Un look champêtre chic pour les petites filles.",
    features: ["Tablier amovible", "Broderie fleurs", "Ceinture nouée", "Dos boutonné"],
    tags: ["fille", "robe", "promo"],
    isNew: false,
    isBestseller: false,
    isActive: true,
    sku: "CHK-TPT-004",
    weight: 220,
    createdAt: "2024-09-05T10:00:00Z"
  },
  {
    id: "PRD-024",
    name: "Short Bermuda Vacances",
    nameAr: "شورت برمودا للعطلات",
    slug: "short-bermuda-vacances",
    category: "Tout-petits",
    ageRange: "3-4y",
    gender: "garçon",
    price: 2000,
    salePrice: null,
    images: [
      "https://picsum.photos/seed/prd024-1/600/600",
      "https://picsum.photos/seed/prd024-2/600/600",
      "https://picsum.photos/seed/prd024-3/600/600"
    ],
    sizes: ["3-4y", "4-5y", "5-6y"],
    stockPerSize: {
      "3-4y": 14,
      "4-5y": 10,
      "5-6y": 6
    },
    colors: [
      { name: "Kaki", hex: "#7B8A6F" },
      { name: "Beige", hex: "#D4C5A9" },
      { name: "Bleu Marine", hex: "#1B3A5C" }
    ],
    material: "100% coton léger",
    washInstruction: "Lavage à 30°C, repassage moyen",
    rating: 4.4,
    reviewCount: 14,
    reviews: [
      {
        id: "RV-038",
        author: "Mehdi S.",
        wilaya: "Tebessa",
        rating: 5,
        date: "2024-10-05",
        comment: "Short parfait pour l'été. Léger et confortable, mon garçon court partout!"
      }
    ],
    description: "Short bermuda en coton léger avec taille élastique et cordon. Idéal pour les vacances et les jeux en extérieur.",
    features: ["Taille élastique", "Cordon de serrage", "Poches profondes", "Tissu respirant"],
    tags: ["été", "vacances"],
    isNew: false,
    isBestseller: false,
    isActive: true,
    sku: "CHK-TPT-005",
    weight: 160,
    createdAt: "2024-07-01T10:00:00Z"
  },
  {
    id: "PRD-025",
    name: "Sweat Capuche Sport",
    nameAr: "سويت شيرت بغطاء رياضي",
    slug: "sweat-capuche-sport",
    category: "Enfants",
    ageRange: "4-5y",
    gender: "unisex",
    price: 2800,
    salePrice: 2300,
    images: [
      "https://picsum.photos/seed/prd025-1/600/600",
      "https://picsum.photos/seed/prd025-2/600/600",
      "https://picsum.photos/seed/prd025-3/600/600"
    ],
    sizes: ["4-5y", "5-6y", "6-7y"],
    stockPerSize: {
      "4-5y": 10,
      "5-6y": 8,
      "6-7y": 5
    },
    colors: [
      { name: "Gris Sport", hex: "#8A8A8A" },
      { name: "Bleu Royal", hex: "#2A52BE" },
      { name: "Rouge", hex: "#CC0000" }
    ],
    material: "80% coton biologique, 20% polyester recyclé",
    washInstruction: "Lavage à 30°C, programme synthétique",
    rating: 4.6,
    reviewCount: 18,
    reviews: [
      {
        id: "RV-039",
        author: "Samir B.",
        wilaya: "Alger",
        rating: 4,
        date: "2024-10-28",
        comment: "Bon sweat pour le sport à l'école. La capuche est bien proportionnée."
      },
      {
        id: "RV-040",
        author: "Khadidja M.",
        wilaya: "Oran",
        rating: 5,
        date: "2024-11-15",
        comment: "Très confortable et belle couleur. Résiste bien aux lavages fréquents."
      }
    ],
    description: "Sweat à capuche sportif avec poche kangourou et bord côtes. Parfait pour l'école et les activités sportives.",
    features: ["Capuche doublée", "Poche kangourou", "Bord côtes", "Maille grattée"],
    tags: ["sport", "école", "promo"],
    isNew: false,
    isBestseller: false,
    isActive: true,
    sku: "CHK-ENF-001",
    weight: 340,
    createdAt: "2024-08-30T10:00:00Z"
  },
  {
    id: "PRD-026",
    name: "Chemise Col Claudine",
    nameAr: "قميص بياقة كلودين",
    slug: "chemise-col-claudine",
    category: "Enfants",
    ageRange: "5-6y",
    gender: "fille",
    price: 2600,
    salePrice: null,
    images: [
      "https://picsum.photos/seed/prd026-1/600/600",
      "https://picsum.photos/seed/prd026-2/600/600",
      "https://picsum.photos/seed/prd026-3/600/600"
    ],
    sizes: ["5-6y", "6-7y", "7-8y"],
    stockPerSize: {
      "5-6y": 7,
      "6-7y": 5,
      "7-8y": 3
    },
    colors: [
      { name: "Blanc", hex: "#FFFFFF" },
      { name: "Rose Pâle", hex: "#F2D0D0" },
      { name: "Bleu Clair", hex: "#C8DCE8" }
    ],
    material: "100% coton",
    washInstruction: "Lavage à 30°C, repasser à température moyenne",
    rating: 4.7,
    reviewCount: 16,
    reviews: [
      {
        id: "RV-041",
        author: "Assia N.",
        wilaya: "Constantine",
        rating: 5,
        date: "2024-10-18",
        comment: "Une chemise élégante pour les cérémonies. Le col Claudine est délicat et joli."
      }
    ],
    description: "Chemise fille avec col Claudine orné de dentelle et boutons nacrés. Idéale pour les occasions spéciales.",
    features: ["Col Claudine dentelle", "Boutons nacrés", "Manches bouffantes", "Poignets élastiqués"],
    tags: ["fille", "cérémonie", "élégant"],
    isNew: true,
    isBestseller: false,
    isActive: true,
    sku: "CHK-ENF-002",
    weight: 190,
    createdAt: "2024-10-01T10:00:00Z"
  },
  {
    id: "PRD-027",
    name: "Legging Taille Haute",
    nameAr: "ليغينغ خصر عالي",
    slug: "legging-taille-haute",
    category: "Enfants",
    ageRange: "5-6y",
    gender: "fille",
    price: 1600,
    salePrice: 1200,
    images: [
      "https://picsum.photos/seed/prd027-1/600/600",
      "https://picsum.photos/seed/prd027-2/600/600",
      "https://picsum.photos/seed/prd027-3/600/600"
    ],
    sizes: ["5-6y", "6-7y", "7-8y"],
    stockPerSize: {
      "5-6y": 18,
      "6-7y": 14,
      "7-8y": 10
    },
    colors: [
      { name: "Noir", hex: "#1A1A1A" },
      { name: "Bordeaux", hex: "#6E2639" },
      { name: "Vert Émeraude", hex: "#2E7D5E" }
    ],
    material: "95% coton, 5% élasthanne",
    washInstruction: "Lavage à 30°C, ne pas repasser",
    rating: 4.5,
    reviewCount: 24,
    reviews: [
      {
        id: "RV-042",
        author: "Meriem K.",
        wilaya: "Sidi Bel Abbès",
        rating: 5,
        date: "2024-09-22",
        comment: "Legging super confortable! La taille haute ne glisse pas, ma fille court et joue sans problème."
      },
      {
        id: "RV-043",
        author: "Fatiha D.",
        wilaya: "Mostaganem",
        rating: 4,
        date: "2024-10-30",
        comment: "Bon legging, belle qualité. Le prix en promo était imbattable."
      }
    ],
    description: "Legging taille haute en coton stretch, ultra-confortable pour le quotidien. Tient bien et ne se déforme pas.",
    features: ["Taille haute", "Coton stretch", "Large élastique", "Coutures plates"],
    tags: ["fille", "promo", "essentiel"],
    isNew: false,
    isBestseller: true,
    isActive: true,
    sku: "CHK-ENF-003",
    weight: 180,
    createdAt: "2024-08-01T10:00:00Z"
  },
  {
    id: "PRD-028",
    name: "Débardeur Basketball",
    nameAr: "قميص كرة سلة بدون أكمام",
    slug: "debardeur-basketball",
    category: "Enfants",
    ageRange: "6-7y",
    gender: "garçon",
    price: 1800,
    salePrice: null,
    images: [
      "https://picsum.photos/seed/prd028-1/600/600",
      "https://picsum.photos/seed/prd028-2/600/600",
      "https://picsum.photos/seed/prd028-3/600/600"
    ],
    sizes: ["6-7y", "7-8y"],
    stockPerSize: {
      "6-7y": 10,
      "7-8y": 6
    },
    colors: [
      { name: "Orange", hex: "#F57C20" },
      { name: "Noir", hex: "#1A1A1A" },
      { name: "Blanc", hex: "#FFFFFF" }
    ],
    material: "100% coton jersey",
    washInstruction: "Lavage à 30°C, repassage moyen",
    rating: 4.3,
    reviewCount: 9,
    reviews: [
      {
        id: "RV-044",
        author: "Yacine B.",
        wilaya: "Alger",
        rating: 4,
        date: "2024-10-12",
        comment: "Parfait pour le basketball! Mon fils le porte aussi pour aller à l'école."
      }
    ],
    description: "Débardeur sportif imprimé basketball en coton léger. Idéal pour le sport et les journées chaudes.",
    features: ["Imprimé basketball", "Tissu respirant", "Coupe athlétique", "Emmanchures larges"],
    tags: ["garçon", "sport"],
    isNew: false,
    isBestseller: false,
    isActive: true,
    sku: "CHK-ENF-004",
    weight: 140,
    createdAt: "2024-07-20T10:00:00Z"
  },
  {
    id: "PRD-029",
    name: "Bonnet Pompon Noir",
    nameAr: "قبعة بومبون سوداء",
    slug: "bonnet-pompon-noir",
    category: "Accessoires",
    ageRange: "2-3y",
    gender: "unisex",
    price: 1400,
    salePrice: null,
    images: [
      "https://picsum.photos/seed/prd029-1/600/600",
      "https://picsum.photos/seed/prd029-2/600/600",
      "https://picsum.photos/seed/prd029-3/600/600"
    ],
    sizes: ["2-3y", "3-4y", "4-5y"],
    stockPerSize: {
      "2-3y": 25,
      "3-4y": 20,
      "4-5y": 15
    },
    colors: [
      { name: "Noir", hex: "#1A1A1A" },
      { name: "Bordeaux", hex: "#6E2639" },
      { name: "Gris", hex: "#808080" }
    ],
    material: "100% coton biologique",
    washInstruction: "Lavage à main, séchage à plat",
    rating: 4.5,
    reviewCount: 17,
    reviews: [
      {
        id: "RV-045",
        author: "Nadia K.",
        wilaya: "Tiaret",
        rating: 5,
        date: "2024-11-18",
        comment: "Bonnet très mignon et bien chaud. Le pompon est bien fixé, même après plusieurs lavages."
      },
      {
        id: "RV-046",
        author: "Sofiane L.",
        wilaya: "Biskra",
        rating: 4,
        date: "2024-11-30",
        comment: "Bonne qualité, taille parfaite pour mon fils de 3 ans."
      }
    ],
    description: "Bonnet en coton avec pompon assorti, doublé en polaire pour plus de chaleur. Un accessoire tendance pour l'hiver.",
    features: ["Doublure polaire", "Pompon amovible", "Bord roulotté", "Taille ajustable"],
    tags: ["hiver", "accessoire"],
    isNew: true,
    isBestseller: false,
    isActive: true,
    sku: "CHK-ACC-001",
    weight: 80,
    createdAt: "2024-10-15T10:00:00Z"
  },
  {
    id: "PRD-030",
    name: "Sac à Dos Ourson",
    nameAr: "حقيبة ظهر دب",
    slug: "sac-a-dos-ourson",
    category: "Accessoires",
    ageRange: "2-3y",
    gender: "unisex",
    price: 2500,
    salePrice: 2000,
    images: [
      "https://picsum.photos/seed/prd030-1/600/600",
      "https://picsum.photos/seed/prd030-2/600/600",
      "https://picsum.photos/seed/prd030-3/600/600"
    ],
    sizes: ["2-3y"],
    stockPerSize: {
      "2-3y": 15
    },
    colors: [
      { name: "Brun Ours", hex: "#8B5A2B" },
      { name: "Gris Panda", hex: "#4A4A4A" },
      { name: "Blanc Polaire", hex: "#F0F0F0" }
    ],
    material: "100% polyester, doublure coton",
    washInstruction: "Nettoyage à l'éponge humide",
    rating: 4.6,
    reviewCount: 21,
    reviews: [
      {
        id: "RV-047",
        author: "Amira S.",
        wilaya: "Alger",
        rating: 5,
        date: "2024-10-25",
        comment: "Le sac préféré de ma fille! Elle met ses jouets dedans et le porte partout."
      },
      {
        id: "RV-048",
        author: "Yasmine L.",
        wilaya: "Oran",
        rating: 4,
        date: "2024-11-08",
        comment: "Très joli sac, les bretelles sont rembourrées et confortables."
      },
      {
        id: "RV-049",
        author: "Rayan K.",
        wilaya: "Constantine",
        rating: 5,
        date: "2024-11-22",
        comment: "Parfait pour la crèche! Il contient tout le nécessaire et mon fils l'adore."
      }
    ],
    description: "Sac à dos en forme d'ourson avec bretelles ajustables et poche avant. Léger et facile à porter pour les tout-petits.",
    features: ["Forme ourson 3D", "Bretelles ajustables", "Poche avant zippée", "Étiquette porte-nom"],
    tags: ["promo", "accessoire", "cadeau"],
    isNew: true,
    isBestseller: false,
    isActive: true,
    sku: "CHK-ACC-002",
    weight: 200,
    createdAt: "2024-10-20T10:00:00Z"
  }
];

export default products;
