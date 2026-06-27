const stats = {
  overview: {
    revenueThisMonth: 284500,
    revenueLastMonth: 231200,
    revenueGrowth: 23.1,
    ordersToday: 12,
    ordersTodayVsYesterday: 4,
    newCustomersThisMonth: 38,
    newCustomersGrowth: 15.4,
    lowStockItems: 7,
    outOfStockItems: 3,
    avgOrderValue: 4250,
    returnRate: 2.3,
    pendingOrders: 14
  },
  revenueByMonth: [
    { month: "Jan", revenue: 148000, orders: 38 },
    { month: "Fév", revenue: 162000, orders: 42 },
    { month: "Mar", revenue: 175000, orders: 45 },
    { month: "Avr", revenue: 168000, orders: 40 },
    { month: "Mai", revenue: 192000, orders: 50 },
    { month: "Juin", revenue: 201000, orders: 52 },
    { month: "Juil", revenue: 218000, orders: 55 },
    { month: "Aoû", revenue: 224000, orders: 58 },
    { month: "Sep", revenue: 210000, orders: 53 },
    { month: "Oct", revenue: 231200, orders: 60 },
    { month: "Nov", revenue: 256000, orders: 65 },
    { month: "Déc", revenue: 284500, orders: 72 }
  ],
  revenueByCategory: [
    { category: "Knitwear", revenue: 98000, percent: 34 },
    { category: "Tops & Tees", revenue: 52000, percent: 18 },
    { category: "Bottoms", revenue: 47000, percent: 16 },
    { category: "Outerwear", revenue: 38000, percent: 13 },
    { category: "Accessories", revenue: 26000, percent: 9 },
    { category: "Dresses & Jumpsuits", revenue: 18000, percent: 6 },
    { category: "Sets & Coordos", revenue: 12000, percent: 4 }
  ],
  ordersByStatus: [
    { status: "Livrées", count: 289, color: "#2E7D32" },
    { status: "En cours", count: 42, color: "#1565C0" },
    { status: "Expédiées", count: 31, color: "#7B1FA2" },
    { status: "En attente", count: 18, color: "#F57F17" },
    { status: "Retournées", count: 8, color: "#C62828" },
    { status: "Annulées", count: 12, color: "#616161" }
  ],
  topProducts: [
    { id: "PRD-001", name: "Combinaison Tricot Ours", sales: 84, revenue: 268800 },
    { id: "PRD-002", name: "Ensemble Coton Bébé", sales: 72, revenue: 194400 },
    { id: "PRD-003", name: "Gilet Tressé Laine", sales: 65, revenue: 227500 },
    { id: "PRD-004", name: "Robe Brodée Fille", sales: 58, revenue: 150800 },
    { id: "PRD-005", name: "Bonnet & Écharpe Set", sales: 51, revenue: 91800 }
  ],
  paymentMethods: [
    { method: "Paiement à la livraison", percent: 68 },
    { method: "CIB", percent: 22 },
    { method: "Edahabia", percent: 10 }
  ],
  revenueByWilaya: [
    { wilaya: "Alger", revenue: 98000 },
    { wilaya: "Oran", revenue: 62000 },
    { wilaya: "Constantine", revenue: 54000 },
    { wilaya: "Tizi Ouzou", revenue: 41000 },
    { wilaya: "Sétif", revenue: 38000 },
    { wilaya: "Béjaïa", revenue: 35000 },
    { wilaya: "Blida", revenue: 29000 },
    { wilaya: "Annaba", revenue: 24000 }
  ],
  dailyRevenueLast30: [
    { date: "2024-11-01", revenue: 8400, orders: 3 },
    { date: "2024-11-02", revenue: 9200, orders: 4 },
    { date: "2024-11-03", revenue: 7600, orders: 2 },
    { date: "2024-11-04", revenue: 10800, orders: 5 },
    { date: "2024-11-05", revenue: 9500, orders: 3 },
    { date: "2024-11-06", revenue: 11200, orders: 4 },
    { date: "2024-11-07", revenue: 7800, orders: 2 },
    { date: "2024-11-08", revenue: 13100, orders: 5 },
    { date: "2024-11-09", revenue: 10200, orders: 3 },
    { date: "2024-11-10", revenue: 14500, orders: 6 },
    { date: "2024-11-11", revenue: 8800, orders: 3 },
    { date: "2024-11-12", revenue: 12100, orders: 4 },
    { date: "2024-11-13", revenue: 9600, orders: 3 },
    { date: "2024-11-14", revenue: 10400, orders: 4 },
    { date: "2024-11-15", revenue: 15800, orders: 6 },
    { date: "2024-11-16", revenue: 11200, orders: 4 },
    { date: "2024-11-17", revenue: 9700, orders: 3 },
    { date: "2024-11-18", revenue: 13600, orders: 5 },
    { date: "2024-11-19", revenue: 14300, orders: 5 },
    { date: "2024-11-20", revenue: 12400, orders: 4 },
    { date: "2024-11-21", revenue: 10100, orders: 3 },
    { date: "2024-11-22", revenue: 15200, orders: 6 },
    { date: "2024-11-23", revenue: 11800, orders: 4 },
    { date: "2024-11-24", revenue: 8200, orders: 2 },
    { date: "2024-11-25", revenue: 13900, orders: 5 },
    { date: "2024-11-26", revenue: 16100, orders: 6 },
    { date: "2024-11-27", revenue: 12700, orders: 4 },
    { date: "2024-11-28", revenue: 14400, orders: 5 },
    { date: "2024-11-29", revenue: 15600, orders: 6 },
    { date: "2024-11-30", revenue: 17200, orders: 7 }
  ],
  recentActivity: [
    { type: "commande", text: "Nouvelle commande #CMD-042 de Youssef Benali", time: "Il y a 12 min" },
    { type: "commande", text: "Commande #CMD-039 expédiée vers Oran", time: "Il y a 34 min" },
    { type: "stock", text: "Produit 'Combinaison Tricot Ours' réapprovisionné (+20)", time: "Il y a 1 h" },
    { type: "client", text: "Nouveau client inscrit : Yamina Ghoul", time: "Il y a 1 h" },
    { type: "retour", text: "Retour traité pour commande #CMD-015", time: "Il y a 2 h" },
    { type: "commande", text: "Commande #CMD-041 confirmée - Paiement CIB", time: "Il y a 2 h" },
    { type: "stock", text: "Alerte stock bas : 'Gilet Tressé Laine' (3 restants)", time: "Il y a 3 h" },
    { type: "client", text: "Rachid Boudiaf a passé sa 15e commande", time: "Il y a 3 h" },
    { type: "commande", text: "Livraison effectuée #CMD-038 à Blida", time: "Il y a 4 h" },
    { type: "stock", text: "Nouveau lot de 'Bonnet & Écharpe Set' reçu (50 pièces)", time: "Il y a 5 h" }
  ]
};

export default stats;
