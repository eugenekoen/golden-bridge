// Golden Bridge Services - Master Data Repository

const GOLDEN_BRIDGE_DATA = {
  hospitals: [
    {
      id: "st-augustines",
      name: "Netcare St Augustine's Hospital",
      region: "Central Durban (Glenwood)",
      address: "107 JB Marks Rd, Bulwer, Durban",
      visitingHours: "15:00 - 16:00 & 19:00 - 20:00 (CAT)",
      status: "Active Coverage",
      popular: true,
      image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "gateway",
      name: "Busamed Gateway Private Hospital",
      region: "Umhlanga / North Coast",
      address: "36 Aurora Dr, Umhlanga Rocks, Durban",
      visitingHours: "14:30 - 16:00 & 18:30 - 20:00 (CAT)",
      status: "Active Coverage",
      popular: true,
      image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "entabeni",
      name: "Life Entabeni Hospital",
      region: "Central Durban (Berea)",
      address: "148 Mazisi Kunene Rd, Glenwood, Durban",
      visitingHours: "15:00 - 16:00 & 19:00 - 20:00 (CAT)",
      status: "Active Coverage",
      popular: true,
      image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "westville",
      name: "Life Westville Hospital",
      region: "Westville",
      address: "72 Harry Gwala Rd, Westville, Durban",
      visitingHours: "15:00 - 16:00 & 19:00 - 20:00 (CAT)",
      status: "Active Coverage",
      popular: false,
      image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "crompton",
      name: "Netcare Crompton Hospital",
      region: "Pinetown / Highway Area",
      address: "102 Crompton St, Pinetown, Durban",
      visitingHours: "14:30 - 16:00 & 19:00 - 20:00 (CAT)",
      status: "Active Coverage",
      popular: false,
      image: "https://images.unsplash.com/photo-1512678080530-7760d81faba6?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "umhlanga-netcare",
      name: "Netcare Umhlanga Hospital",
      region: "Umhlanga Ridge",
      address: "323 Umhlanga Rocks Dr, Umhlanga",
      visitingHours: "15:00 - 16:00 & 19:00 - 20:00 (CAT)",
      status: "Active Coverage",
      popular: false,
      image: "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "addington",
      name: "Addington Hospital",
      region: "South Beach / Point",
      address: "16 Erskine Terrace, South Beach, Durban",
      visitingHours: "14:00 - 16:00 & 18:00 - 19:00 (CAT)",
      status: "Active Coverage",
      popular: false,
      image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "kingsway",
      name: "Netcare Kingsway Hospital",
      region: "Amanzimtoti / South Coast",
      address: "27 Conviction Rd, Amanzimtoti, Durban",
      visitingHours: "15:00 - 16:00 & 19:00 - 20:00 (CAT)",
      status: "Active Coverage",
      popular: false,
      image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=600&q=80"
    }
  ],

  packages: [
    {
      id: "companion",
      name: "Companion Visit",
      subtitle: "Heartfelt Bedside Companionship",
      badge: "Essential Care",
      basePriceZAR: 650,
      basePriceGBP: 29,
      basePriceUSD: 36,
      basePriceAUD: 55,
      duration: "Up to 30 mins per visit",
      features: [
        "Warm, 1-on-1 bedside conversation & presence",
        "Live WhatsApp / Zoom video call with family",
        "Comprehensive post-visit report emailed to family",
        "High-resolution patient photo (with permission)"
      ],
      icon: "fa-heart",
      recommended: false
    },
    {
      id: "comfort",
      name: "Comfort Visit",
      subtitle: "Companionship + Fresh Treats & Reading",
      badge: "Most Popular",
      basePriceZAR: 850,
      basePriceGBP: 38,
      basePriceUSD: 47,
      basePriceAUD: 72,
      duration: "Up to 30 mins per visit",
      features: [
        "Everything in Companion Visit",
        "Fresh fruit juice or cold beverage",
        "Dietary-approved snack or bakery treat",
        "Fresh magazine, newspaper, or puzzle book",
        "Detailed WhatsApp photo & text summary"
      ],
      icon: "fa-sun",
      recommended: true
    },
    {
      id: "weekly-plan",
      name: "Weekly Care Plan",
      subtitle: "Comprehensive 3-Visit Weekly Care",
      badge: "Best Value",
      basePriceZAR: 2200,
      basePriceGBP: 98,
      basePriceUSD: 122,
      basePriceAUD: 185,
      duration: "per week (3 visits)",
      features: [
        "3 visits per week (combination of Companion & Comfort)",
        "Dedicated personal companion assigned to your loved one",
        "Priority scheduling & emergency visit availability",
        "Weekly summary log & photo progress gallery"
      ],
      icon: "fa-calendar-check",
      recommended: false
    }
  ],

  addOns: [
    { id: "flowers", name: "Fresh Bedside Flowers", priceZAR: 250, priceGBP: 11, priceUSD: 14, priceAUD: 21 },
    { id: "extra-time", name: "Extended 30 Min Bedside Stay", priceZAR: 200, priceGBP: 9, priceUSD: 11, priceAUD: 17 },
    { id: "custom-treats", name: "Specialty Snack / Fruit Basket", priceZAR: 180, priceGBP: 8, priceUSD: 10, priceAUD: 15 },
    { id: "extra-video", name: "Additional Family Video Call", priceZAR: 150, priceGBP: 7, priceUSD: 8, priceAUD: 13 }
  ],

  timezones: [
    { city: "London, UK", offset: -1, code: "GBP", symbol: "£", label: "BST / GMT" },
    { city: "Sydney, Australia", offset: 8, code: "AUD", symbol: "A$", label: "AEST" },
    { city: "Auckland, New Zealand", offset: 10, code: "NZD", symbol: "NZ$", label: "NZST" },
    { city: "New York / Toronto", offset: -6, code: "USD", symbol: "$", label: "EDT / EST" },
    { city: "Vancouver, Canada", offset: -9, code: "CAD", symbol: "CA$", label: "PDT / PST" },
    { city: "Dublin, Ireland", offset: -1, code: "EUR", symbol: "€", label: "IST" }
  ],

  sampleReports: [
    {
      id: "report-1",
      patient: "Eleanor Vance (Mom)",
      hospital: "Netcare St Augustine's, Room 314",
      date: "Today, 15:30 CAT",
      visitor: "Sarah (Golden Bridge Companion)",
      mood: "Upbeat & Smiling 😊",
      summary: "I visited your mom today around 3:30 PM. She was sitting up in bed looking bright and rested. We had a lovely chat while she enjoyed the fresh magazine I brought. She spoke fondly about your garden in Surrey and was thrilled with our video call! Nurse Thandi confirmed her blood pressure is stable and she is recovering well.",
      highlights: [
        "Completed 15-minute live WhatsApp video call with overseas family in London.",
        "Delivered requested cold beverage & biscuit snack.",
        "Completed 3 magazine puzzles together.",
        "Patient expressed extreme gratitude for the surprise visit!"
      ]
    },
    {
      id: "report-2",
      patient: "Robert Jenkins (Dad)",
      hospital: "Busamed Gateway Hospital, Room 108",
      date: "Yesterday, 14:45 CAT",
      visitor: "David (Golden Bridge Companion)",
      mood: "Relaxed & Grateful 😊",
      summary: "Robert was delighted to have company this afternoon. We read through the sports section of the Natal Mercury together and chatted about rugby. He enjoyed his fresh orange juice and asked me to remind you that he loves the photos you sent over WhatsApp. The ward nurse noted he is eating well today.",
      highlights: [
        "Read daily newspaper sports section together.",
        "Assisted with smartphone settings & charging.",
        "Shared fresh fruit juice treat.",
        "Confirmed afternoon rest schedule with nursing team."
      ]
    }
  ],

  faqs: [
    {
      q: "How do I pay from overseas?",
      a: "We accept all major international credit/debit cards (Visa, Mastercard, American Express) via secure online invoice link (Stripe / PayFast). You can pay in your local currency (GBP, USD, AUD, EUR, NZD, CAD)."
    },
    {
      q: "Can you provide medical care or advice?",
      a: "No. Golden Bridge Services provides non-medical companionship, emotional support, bedside comfort, and family updates. We work respectfully alongside hospital staff and never administer medications or medical procedures."
    },
    {
      q: "How do you coordinate video calls with overseas time zones?",
      a: "Prior to the visit, we coordinate a precise time window that fits both hospital visiting hours in Durban and your local time zone to ensure a seamless connection."
    },
    {
      q: "What if the hospital has dietary restrictions for my relative?",
      a: "We always verify dietary permissions with the ward sister or nurse on duty before handing over any beverages or snacks. If treats are restricted, we substitute them with books, flowers, or extra reading time."
    },
    {
      q: "How quickly can a visit be arranged?",
      a: "We can typically arrange visits within 24 hours of enquiry. Emergency same-day visit requests in Durban are accommodated subject to companion availability."
    }
  ]
};
