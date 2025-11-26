export interface CardInfo {
    name: string;
    cardNumber: string;
    expiryMonth: string;
    expiryYear: string;
    password: string;
    owner: string;
    phoneNumber: string;
    birth: string;
  }
  
  export interface AddCardRequest {
    name: string;
    phone: string;
    cardNumber: string;
    expiredYear: string;
    expiredMonth: string;
    birth: string;
    cardPassword: string;
  }
  
  export interface CardListItem {
    cardId: string;
    provider: string;
    name: string;
  }
  
  export interface ApiResponse<T> {
    status: string;
    message: string;
    data: T;
    timestamp: string;
  }
  
  export interface ProcessPaymentRequest {
    cardId: string;
    amount: number;
  }
  
  export interface ProcessPaymentResponse {
    transactionId: string;
    status: string;
    amount: number;
  }