import api from "@/api/api";
import type { BalanceResponse, PurchaseHistoryResponse } from "./type";

export const fetchTransaction = async (): Promise<BalanceResponse> => {
  const res = await api.get("/cash");
  return res.data;
}

export const fetchPurchaseList = async (): Promise<PurchaseHistoryResponse> => {
  const res = await api.get("/market/purchases");
  return res.data;
}