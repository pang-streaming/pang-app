export interface ChatMessage {
  id: string;
  username: string;
  message: string;
  timestamp: Date;
  type?: 'normal' | 'subscription' | 'filter-notice' | 'system';
  subscriptionMonths?: number;
  textColor?: string;
}



