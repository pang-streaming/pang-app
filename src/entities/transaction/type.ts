

export interface Transaction {
    id: string;
    type: "CHARGE" | "USE" | "REFUND";
    amount: number;
    createdAt: string;
    description: string;
  }
  
  export interface BalanceData {
    balance: number;
    transactions: Transaction[];
  }
  
  export interface BalanceResponse {
    status: string; 
    message: string;
    data: BalanceData;
    timestamp: string;
  }

  export interface PurchaseHistoryResponse {
    status: string; 
    message: string;
    data: PurchaseHistory[];
    timestamp: string; 
  }
  
  export interface PurchaseHistory {
    purchaseId: string;
    productId: string;
    imageUrl: string;
    productName: string;
    price: number;
    fileUrl: string;
    address: string;
    email: string;
    deliveryStatus: "PREPARING" | "SHIPPING" | "DELIVERED" | "CANCELED"; 
    createdAt: string;
  }
  
