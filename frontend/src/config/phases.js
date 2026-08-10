export const PHASES = [
  {
    id: 1,
    key: 'phase1',
    title: 'Crop Selection',
    subtitle: 'Planning & Strategy',
    slug: 'crop-selection',
    description: 'Get AI-powered crop recommendations based on your farm location, resources, and budget.',
    hasPhotos: false,
    hasSoilReport: false,
    cardCount: 6,
  },
  {
    id: 2,
    key: 'phase2',
    title: 'Crop Maintenance',
    subtitle: 'Active Season Support',
    slug: 'crop-maintenance',
    description: 'Diagnose crop health and receive actionable maintenance guidance with photo analysis.',
    hasPhotos: true,
    hasSoilReport: true,
    cardCount: 6,
  },
  {
    id: 3,
    key: 'phase3',
    title: 'Harvest Intelligence',
    subtitle: 'Optimal Timing & Execution',
    slug: 'harvest-intelligence',
    description: 'Determine harvest readiness, plan logistics, and estimate costs with AI analysis.',
    hasPhotos: true,
    hasSoilReport: false,
    cardCount: 7,
  },
  {
    id: 4,
    key: 'phase4',
    title: 'Market & Selling',
    subtitle: 'Commercial Optimization',
    slug: 'market-selling',
    description: 'Maximize returns through quality assessment, pricing, and market intelligence.',
    hasPhotos: true,
    hasSoilReport: false,
    cardCount: 9,
  },
]

export const PHASE_QUESTIONS = {
  1: [
    {
      title: 'Farm Location',
      subtitle: 'Where is your farm located?',
      fields: [
        {
          name: 'state',
          label: 'State',
          type: 'dropdown',
          required: true,
          options: [
            'Andhra Pradesh', 'Bihar', 'Chhattisgarh', 'Gujarat', 'Haryana',
            'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra',
            'Odisha', 'Punjab', 'Rajasthan', 'Tamil Nadu', 'Telangana',
            'Uttar Pradesh', 'West Bengal',
          ],
        },
        {
          name: 'district',
          label: 'District',
          type: 'text',
          required: true,
          placeholder: 'Enter your district',
        },
        {
          name: 'climateZone',
          label: 'Climate Zone',
          type: 'dropdown',
          required: false,
          options: ['Tropical', 'Sub-tropical', 'Arid', 'Semi-arid', 'Temperate', 'Coastal'],
        },
      ],
    },
    {
      title: 'Land & Resources',
      subtitle: 'Tell us about your farmland',
      fields: [
        {
          name: 'landSize',
          label: 'Land Size (acres)',
          type: 'slider',
          required: false,
          min: 0.5,
          max: 100,
          step: 0.5,
          defaultValue: 5,
        },
        {
          name: 'irrigation',
          label: 'Irrigation Available',
          type: 'toggle',
          required: false,
          defaultValue: false,
        },
        {
          name: 'waterSource',
          label: 'Water Source',
          type: 'dropdown',
          required: false,
          options: ['Borewell', 'Canal', 'River', 'Rainwater', 'Tank/Pond', 'None'],
        },
      ],
    },
    {
      title: 'Budget & Labour',
      subtitle: 'Your investment capacity',
      fields: [
        {
          name: 'budgetRange',
          label: 'Budget (INR/acre)',
          type: 'slider',
          required: false,
          min: 5000,
          max: 200000,
          step: 5000,
          defaultValue: 30000,
          format: 'currency',
        },
        {
          name: 'labourAvailability',
          label: 'Labour Availability',
          type: 'dropdown',
          required: true,
          options: ['Self only', '1-2 workers', '3-5 workers', '6-10 workers', '10+ workers'],
        },
      ],
    },
    {
      title: 'Crop History',
      subtitle: 'Previous farming experience',
      skippable: true,
      fields: [
        {
          name: 'previousCrop',
          label: 'Previous Crop',
          type: 'dropdown',
          required: false,
          options: [
            'Rice', 'Wheat', 'Maize', 'Cotton', 'Sugarcane', 'Soybean',
            'Groundnut', 'Mustard', 'Pulses', 'Vegetables', 'Fruits', 'None/First time',
          ],
        },
        {
          name: 'previousYield',
          label: 'Previous Yield',
          type: 'dropdown',
          required: false,
          options: ['Excellent', 'Good', 'Average', 'Poor', 'Not applicable'],
        },
      ],
    },
  ],
  2: [
    {
      title: 'Crop Stage',
      subtitle: 'Current growth stage of your crop',
      fields: [
        {
          name: 'stage',
          label: 'Growth Stage',
          type: 'dropdown',
          required: true,
          options: ['Germination', 'Vegetative', 'Flowering', 'Fruiting', 'Harvest-ready'],
        },
      ],
    },
    {
      title: 'Visible Symptoms',
      subtitle: 'What are you observing?',
      fields: [
        {
          name: 'symptoms',
          label: 'Symptoms',
          type: 'multiselect',
          required: true,
          options: [
            'Yellow leaves', 'Wilting', 'Brown spots', 'Pest presence',
            'Mold/Fungus', 'Stunted growth', 'No issues',
          ],
        },
      ],
    },
    {
      title: 'Inputs Applied',
      subtitle: 'Recent treatments or fertilizers',
      fields: [
        {
          name: 'appliedInputs',
          label: 'Applied Inputs Recently',
          type: 'toggle',
          required: false,
          defaultValue: false,
        },
        {
          name: 'inputType',
          label: 'Input Type',
          type: 'dropdown',
          required: false,
          options: ['Urea', 'DAP', 'NPK', 'Organic manure', 'Pesticide', 'Herbicide', 'Fungicide', 'Other'],
          dependsOn: { field: 'appliedInputs', value: true },
        },
      ],
    },
    {
      title: 'Water Availability',
      subtitle: 'How many days of water supply?',
      fields: [
        {
          name: 'waterDays',
          label: 'Water Available (days)',
          type: 'slider',
          required: false,
          min: 0,
          max: 60,
          step: 1,
          defaultValue: 30,
        },
      ],
    },
  ],
  3: [
    {
      title: 'Crop Maturity',
      subtitle: 'How ready is your crop?',
      fields: [
        {
          name: 'maturityStage',
          label: 'Maturity Stage',
          type: 'dropdown',
          required: true,
          options: ['Not yet ready', 'Nearly ready', 'Ready now', 'Overdue'],
        },
      ],
    },
    {
      title: 'Labour & Tools',
      subtitle: 'Resources for harvesting',
      fields: [
        {
          name: 'labourAvailable',
          label: 'Labour Available',
          type: 'toggle',
          required: false,
          defaultValue: true,
        },
        {
          name: 'equipmentAvailable',
          label: 'Equipment Available',
          type: 'toggle',
          required: false,
          defaultValue: false,
        },
        {
          name: 'labourCount',
          label: 'Number of Workers',
          type: 'slider',
          required: false,
          min: 1,
          max: 50,
          step: 1,
          defaultValue: 5,
          dependsOn: { field: 'labourAvailable', value: true },
        },
      ],
    },
    {
      title: 'Storage Readiness',
      subtitle: 'Post-harvest logistics',
      fields: [
        {
          name: 'storageAvailable',
          label: 'Storage Available',
          type: 'toggle',
          required: false,
          defaultValue: false,
        },
        {
          name: 'transportAvailable',
          label: 'Transport Available',
          type: 'toggle',
          required: false,
          defaultValue: false,
        },
      ],
    },
    {
      title: 'Weather Urgency',
      subtitle: 'Weather-related concerns',
      fields: [
        {
          name: 'weatherConcerns',
          label: 'Weather Concerns',
          type: 'multiselect',
          required: true,
          options: ['Heavy rain expected', 'High humidity', 'Extreme heat', 'Strong winds', 'No concern'],
        },
      ],
    },
  ],
  4: [
    {
      title: 'Quantity Available',
      subtitle: 'How much are you selling?',
      fields: [
        {
          name: 'unit',
          label: 'Unit',
          type: 'dropdown',
          required: true,
          options: ['Kg', 'Quintal', 'Ton', 'Bags', 'Crates'],
        },
        {
          name: 'quantity',
          label: 'Quantity',
          type: 'slider',
          required: false,
          min: 1,
          max: 1000,
          step: 1,
          defaultValue: 50,
        },
      ],
    },
    {
      title: 'Selling Urgency',
      subtitle: 'How soon do you need to sell?',
      fields: [
        {
          name: 'urgency',
          label: 'Urgency',
          type: 'dropdown',
          required: true,
          options: ['Sell now', 'Can wait 3-5 days', 'Can wait 1-2 weeks', 'Need recommendation'],
        },
      ],
    },
    {
      title: 'Storage & Transport',
      subtitle: 'Your logistics readiness',
      fields: [
        {
          name: 'hasStorage',
          label: 'Storage Available',
          type: 'toggle',
          required: false,
          defaultValue: false,
        },
        {
          name: 'hasTransport',
          label: 'Transport Available',
          type: 'toggle',
          required: false,
          defaultValue: false,
        },
      ],
    },
    {
      title: 'Buyer Preference',
      subtitle: 'Where would you like to sell?',
      fields: [
        {
          name: 'buyerPreference',
          label: 'Preferred Buyers',
          type: 'multiselect',
          required: true,
          options: ['Mandi (APMC)', 'Contractor/Dealer', 'Local buyer', 'Platform-assisted', 'Need suggestion'],
        },
      ],
    },
  ],
}

export const PHOTO_SLOTS = {
  2: [
    { label: 'Field Overview', description: 'Wide view of your crop field' },
    { label: 'Leaf Close-up', description: 'Close-up of leaves or symptoms' },
    { label: 'Stem & Roots', description: 'Stem, root zone, or soil surface' },
    { label: 'Area of Concern', description: 'Any additional problem area' },
  ],
  3: [
    { label: 'Field Maturity', description: 'Overall crop maturity view' },
    { label: 'Harvest Detail', description: 'Grain/fruit readiness indicators' },
    { label: 'Damage Check', description: 'Visible damage or spoilage risk' },
    { label: 'Weather Impact', description: 'Post-rain or post-storm condition' },
  ],
  4: [
    { label: 'Batch Overview', description: 'Overall harvested crop batch' },
    { label: 'Quality Close-up', description: 'Color, size, uniformity check' },
    { label: 'Defect View', description: 'Spoilage, bruising, or damage' },
    { label: 'Packaging State', description: 'Bagging or crate condition' },
  ],
}

export const QUICK_ACTIONS = {
  1: [
    { id: 'cheaper', label: 'Cheaper Options', modifier: 'prioritize_cost' },
    { id: 'profit', label: 'High Profit', modifier: 'prioritize_profit' },
    { id: 'lowWater', label: 'Low Water', modifier: 'prioritize_water_efficiency' },
    { id: 'budget', label: 'Adjust Budget', modifier: 'adjust_budget' },
  ],
  2: [
    { id: 'organic', label: 'Organic Only', modifier: 'organic_only' },
    { id: 'urgent', label: 'Urgent Care', modifier: 'urgent_treatment' },
    { id: 'budget', label: 'Budget Friendly', modifier: 'budget_treatment' },
    { id: 'preventive', label: 'Preventive Plan', modifier: 'preventive_focus' },
  ],
  3: [
    { id: 'urgent', label: 'Harvest Now', modifier: 'immediate_harvest' },
    { id: 'delay', label: 'Can I Wait?', modifier: 'delay_analysis' },
    { id: 'cost', label: 'Reduce Costs', modifier: 'cost_optimization' },
    { id: 'quality', label: 'Max Quality', modifier: 'quality_focus' },
  ],
  4: [
    { id: 'bestPrice', label: 'Best Price', modifier: 'maximize_price' },
    { id: 'quickSale', label: 'Quick Sale', modifier: 'fastest_sale' },
    { id: 'bulk', label: 'Bulk Deal', modifier: 'bulk_optimization' },
    { id: 'compare', label: 'Compare Buyers', modifier: 'buyer_comparison' },
  ],
}
