export interface User {
  id: string;
  email: string;
  username?: string;
  created_at: string;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string, user: User) => void;
  logout: () => void;
  loading: boolean;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface SignupCredentials {
  email: string;
  password: string;
}

export interface Receipt {
  id: string;
  merchant: string;
  total: number;
  date: string;
  currency: string;
  items: ReceiptItem[];
  imageUrl?: string;
  createdAt: string;
  userId: string;
}

export interface ReceiptItem {
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  category?: string;
}

export interface ExtractedReceipt {
  merchant: string;
  total: number;
  date: string;
  currency: string;
  items: Omit<ReceiptItem, 'id'>[];
}

export interface HistoryFilters {
  dateFrom?: string;
  dateTo?: string;
  merchant?: string;
  minAmount?: number;
  maxAmount?: number;
}