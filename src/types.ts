export interface MenuItem {
  id: string;
  name: string;
  thaiName: string;
  category: 'starters' | 'curries' | 'wok_charcoal' | 'seafood' | 'desserts' | 'cocktails';
  description: string;
  price: string;
  spiceLevel: 0 | 1 | 2 | 3 | 4; // 0 none, 1 mild, 2 medium, 3 fiery southern, 4 extreme
  dietary?: ('Gluten-Free' | 'Dairy-Free' | 'Pescatarian' | 'Vegetarian Option' | 'Contains Nuts' | 'Shellfish')[];
  featured?: boolean;
  tag?: string;
  ingredients?: string[];
}

export interface ChefBio {
  name: string;
  title: string;
  subtitle: string;
  hometown: string;
  story: string[];
  accolades: {
    year: string;
    award: string;
    organization: string;
  }[];
  quote: string;
}

export interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
  quickReplies?: string[];
  actionLink?: {
    text: string;
    action: 'open_reservations' | 'open_menu' | 'open_hours' | 'open_directions' | 'open_chef';
  };
}

export interface ReservationDetails {
  date: string;
  time: string;
  guests: number;
  seatingArea: 'Main Dining Hall' | "Chef's Counter" | 'Covered Garden Pergola';
  name: string;
  email: string;
  phone: string;
  dietaryNotes: string;
  celebrationType?: string;
}
