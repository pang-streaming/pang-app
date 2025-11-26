import { fetchPurchaseList, fetchTransaction } from "./api";
import { useQuery } from "@tanstack/react-query";
import type { BalanceResponse, PurchaseHistoryResponse } from "./type";


export const useTransaction = () => {
  return useQuery<BalanceResponse>({
    queryKey: ["transaction"],
    queryFn: fetchTransaction,
    staleTime: 1000 * 60,
    refetchOnWindowFocus: false,
  });
};

export const usePurchase = () => {
  return useQuery<PurchaseHistoryResponse>({
    queryKey: ["purchaseHistory"],
    queryFn: fetchPurchaseList,
    staleTime: 1000 * 60,
    refetchOnWindowFocus: false,
  });
}