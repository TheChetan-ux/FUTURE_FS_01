export const mockListings = [
  {
    title: "Courtyard Flat near Koregaon Park",
    location: "Pune, Maharashtra",
    mode: "Stay",
    type: "Daily or Monthly",
    price: "Rs. 2,800/night",
    tags: ["Verified", "Weekend pricing", "Near me ready"]
  },
  {
    title: "Activa 6-Hour City Sprint",
    location: "Goa, India",
    mode: "Drive",
    type: "6-hour block",
    price: "Rs. 500/block",
    tags: ["DL required", "Dry rental", "Late fines enabled"]
  },
  {
    title: "Indiranagar Studio Loft",
    location: "Bengaluru, Karnataka",
    mode: "Stay",
    type: "Monthly first",
    price: "Rs. 24,000/month",
    tags: ["Co-living", "Verified docs", "Owner chat"]
  },
  {
    title: "Baleno Weekend Escape",
    location: "Delhi NCR",
    mode: "Drive",
    type: "6-hour block",
    price: "Rs. 500/block",
    tags: ["Fuel excluded", "Damage reporting", "Realtime support"]
  }
];

export const membershipTiers = [
  {
    label: "Bronze",
    name: "The Explorer",
    price: "Rs. 999 / year",
    description: "Perfect for first-time users who want a smoother start on trusted rentals.",
    perks: ["Zero service fees on first 2 bookings", "Priority support"]
  },
  {
    label: "Silver",
    name: "The Nomad",
    price: "Rs. 2,499 / year",
    description: "Best for recurring renters who move between cities and weekends often.",
    perks: ["5% off all rentals", "Damage insurance up to Rs. 10k"]
  },
  {
    label: "Gold",
    name: "The Resident",
    price: "Rs. 4,999 / year",
    description: "Premium access for members who want speed, upgrades, and white-glove support.",
    perks: ["Free vehicle upgrades", "Early access to premium properties", "24/7 concierge"]
  }
];

export const ownerChecklist = [
  {
    title: "Upload listing photos",
    description: "Send high-resolution images to Supabase Storage before review.",
    icon: "upload"
  },
  {
    title: "Pending compliance review",
    description: "Admin verifies ID, ownership, and asset documents manually.",
    icon: "pending"
  },
  {
    title: "Go live after approval",
    description: "Only approved properties and vehicles appear in customer discovery.",
    icon: "verify"
  }
];
