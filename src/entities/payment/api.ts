
import api from "@/api/api";
import * as P  from "./type";


export const paymentApi = {
  addCard: async (cardInfo: P.CardInfo): Promise<P.ApiResponse<null>> => {
    const requestData: P.AddCardRequest = {
      name: cardInfo.name,
      phone: cardInfo.phoneNumber,
      cardNumber: cardInfo.cardNumber,
      expiredYear: cardInfo.expiryYear,
      expiredMonth: cardInfo.expiryMonth,
      birth: cardInfo.birth,
      cardPassword: cardInfo.password,
    };
    const response = await api.post("/payment/card", requestData);
    return response.data;
  },

  getCards: async (): Promise<P.ApiResponse<P.CardListItem[]>> => {
    const response = await api.get("/payment/card");
    return response.data;
  },

  processPayment: async (cardId: string, amount: number): Promise<P.ApiResponse<P.ProcessPaymentResponse>> => {
    const requestData: P.ProcessPaymentRequest = {
      cardId,
      amount,
    };
    const response = await api.post("/cash/payment", requestData);
    return response.data;
  },
};

