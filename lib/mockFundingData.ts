// mockFundingData.ts
export interface FundingCategory {
  category_name: string;
  total_budget: number;
  direct_funding: number;
  nonprofit_funding: number;
  budget_deficit: number;
  remaining_approved_funding: number;
  impact_metrics: string[];
}

export const mockFundingCategories: FundingCategory[] = [
  {
    category_name: "Parks & Recreation",
    total_budget: 450000000,
    direct_funding: 320000000,
    nonprofit_funding: 80000000,
    budget_deficit: 50000000,
    remaining_approved_funding: 15000000,
    impact_metrics: [
      "500+ parks maintained",
      "12 new playgrounds",
      "200k annual visitors"
    ]
  },
  {
    category_name: "Community Youth Centers",
    total_budget: 280000000,
    direct_funding: 200000000,
    nonprofit_funding: 60000000,
    budget_deficit: 20000000,
    remaining_approved_funding: 8000000,
    impact_metrics: [
      "50 youth centers",
      "10k daily participants",
      "95% satisfaction rate"
    ]
  },
  {
    category_name: "Affordable Housing",
    total_budget: 850000000,
    direct_funding: 600000000,
    nonprofit_funding: 150000000,
    budget_deficit: 100000000,
    remaining_approved_funding: 25000000,
    impact_metrics: [
      "2,500 units planned",
      "1,200 units completed",
      "5k families housed"
    ]
  },
  {
    category_name: "Public Transit",
    total_budget: 1200000000,
    direct_funding: 900000000,
    nonprofit_funding: 200000000,
    budget_deficit: 100000000,
    remaining_approved_funding: 30000000,
    impact_metrics: [
      "800k daily riders",
      "15 new bus routes",
      "98% on-time performance"
    ]
  },
  {
    category_name: "Small Business Support",
    total_budget: 180000000,
    direct_funding: 120000000,
    nonprofit_funding: 50000000,
    budget_deficit: 10000000,
    remaining_approved_funding: 5000000,
    impact_metrics: [
      "2k businesses supported",
      "8k jobs created",
      "85% survival rate"
    ]
  },
  {
    category_name: "Mental Health Services",
    total_budget: 320000000,
    direct_funding: 240000000,
    nonprofit_funding: 70000000,
    budget_deficit: 10000000,
    remaining_approved_funding: 12000000,
    impact_metrics: [
      "100k residents served",
      "24/7 crisis hotline",
      "30 wellness centers"
    ]
  }
];

// Category matching keywords for vision categorization
export const categoryKeywords: Record<string, string[]> = {
  "Parks & Recreation": ["park", "garden", "playground", "recreation", "outdoor", "green space", "trail", "beach"],
  "Community Youth Centers": ["youth", "teen", "after school", "mentorship", "education", "children", "kids"],
  "Affordable Housing": ["housing", "affordable", "homeless", "shelter", "apartment", "rent", "home"],
  "Public Transit": ["bus", "train", "transit", "transportation", "BART", "Muni", "bike", "pedestrian"],
  "Small Business Support": ["business", "entrepreneur", "shop", "restaurant", "startup", "commerce", "market"],
  "Mental Health Services": ["mental health", "wellness", "therapy", "counseling", "crisis", "support", "healthcare"]
};