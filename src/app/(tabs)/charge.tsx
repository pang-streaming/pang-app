import React, { useState } from 'react';
import { View, Text, ScrollView, Modal, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import type { ThemeProps } from '@/theme/types';
import Header from '@/components/ui/Header';
import { ChargeBox } from '@/widgets/charge/charge-box';
import { useCategoryStore } from '@/stores/useCategoryStore';
import { TransactionElem } from '@/components/charge/transaction-elem';
import { ChargeModal } from '@/widgets/charge/charge-modal';
import { useTransaction, usePurchase } from '@/entities/transaction/useTransaction';
import type { PurchaseHistory } from '@/entities/transaction/type';

export default function ChargeScreen() {
  const selectedTabCategory = useCategoryStore((s) => s.selectedTabCategory);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalType, setModalType] = useState<"pung-charge" | "auto-charge">("pung-charge");
  
  const { data: transactionData, isLoading: isLoadingTransaction } = useTransaction();
  const { data: purchaseData, isLoading: isLoadingPurchase } = usePurchase();

  const renderContent = () => {
    if (selectedTabCategory === "사용내역") {
      if (isLoadingTransaction) {
        return (
          <LoadingContainer>
            <ActivityIndicator size="large" />
          </LoadingContainer>
        );
      }

      // 사용내역은 USE 타입만 표시
      const transactions = transactionData?.data?.transactions || [];
      const useTransactions = transactions.filter(t => t.type === "USE");
      
      return (
        <TransactionList>
          {useTransactions.length === 0 ? (
            <EmptyContainer>
              <EmptyText>사용 내역이 없습니다.</EmptyText>
            </EmptyContainer>
          ) : (
            useTransactions.map((transaction) => (
              <TransactionElem key={transaction.id} transaction={transaction} />
            ))
          )}
        </TransactionList>
      );
    } else if (selectedTabCategory === "구매내역") {
      const isLoading = isLoadingTransaction || isLoadingPurchase;
      
      if (isLoading) {
        return (
          <LoadingContainer>
            <ActivityIndicator size="large" />
          </LoadingContainer>
        );
      }

      // 구매내역은 CHARGE 타입 거래 + PurchaseHistory 데이터 모두 표시
      const transactions = transactionData?.data?.transactions || [];
      const chargeTransactions = transactions.filter(t => t.type === "CHARGE");
      const purchases = purchaseData?.data || [];
      
      // 날짜순으로 정렬 (최신순)
      const allPurchases = [
        ...chargeTransactions.map(t => ({
          id: t.id,
          type: 'CHARGE' as const,
          createdAt: t.createdAt,
        })),
        ...purchases.map(p => ({
          id: p.purchaseId,
          type: 'PURCHASE' as const,
          createdAt: p.createdAt,
        }))
      ].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      
      return (
        <TransactionList>
          {allPurchases.length === 0 ? (
            <EmptyContainer>
              <EmptyText>구매 내역이 없습니다.</EmptyText>
            </EmptyContainer>
          ) : (
            allPurchases.map((item) => {
              if (item.type === 'CHARGE') {
                const transaction = chargeTransactions.find(t => t.id === item.id);
                return transaction ? (
                  <TransactionElem key={transaction.id} transaction={transaction} />
                ) : null;
              } else {
                const purchase = purchases.find(p => p.purchaseId === item.id);
                return purchase ? (
                  <PurchaseElem key={purchase.purchaseId} purchase={purchase} />
                ) : null;
              }
            })
          )}
        </TransactionList>
      );
    } else {
      return (
        <Content>
          <ChargeBox 
            type='charge' 
            onPress={() => {
              setModalType("pung-charge");
              setIsModalVisible(true);
            }}
          />
          <ChargeBox 
            type='auto-setting' 
            onPress={() => {
              setModalType("auto-charge");
              setIsModalVisible(true);
            }}
          />
        </Content>
      );
    }
  };

  return (
    <Container>
        <Header />
        <ScrollView
          showsVerticalScrollIndicator={false}
        >
          {renderContent()}
        </ScrollView>
        <Modal
          visible={isModalVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setIsModalVisible(false)}
        >
          <ModalOverlay onPress={() => setIsModalVisible(false)}>
            <ChargeModal 
              initialType={modalType}
              chargeType={modalType === "auto-charge" ? "autochargepung" : "mypung"}
              onClose={() => setIsModalVisible(false)}
            />
          </ModalOverlay>
        </Modal>
    </Container>
  );
}

const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({ theme }: ThemeProps) => theme.colors.background.normal};
`;

const Content = styled.View`
  flex: 1;
  padding: 0 20px;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const TransactionList = styled.View`
  flex: 1;
`;

const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 40px;
`;

const EmptyContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 40px;
`;

const EmptyText = styled.Text<ThemeProps>`
  font-size: 16px;
  color: ${({ theme }: ThemeProps) => theme.colors.text.subtitle};
`;

const PurchaseElem = ({ purchase }: { purchase: PurchaseHistory }) => {
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${year}.${month}.${day} ${hours}:${minutes}`;
  };

  const getDeliveryStatusLabel = (status: PurchaseHistory["deliveryStatus"]): string => {
    switch (status) {
      case "PREPARING":
        return "준비중";
      case "SHIPPING":
        return "배송중";
      case "DELIVERED":
        return "배송완료";
      case "CANCELED":
        return "취소됨";
      default:
        return status;
    }
  };

  return (
    <PurchaseContainer>
      <PurchaseInfoSection>
        <PurchaseTitle>{purchase.productName}</PurchaseTitle>
        <PurchaseDate>{formatDate(purchase.createdAt)}</PurchaseDate>
        <PurchaseStatus>{getDeliveryStatusLabel(purchase.deliveryStatus)}</PurchaseStatus>
      </PurchaseInfoSection>
      <PurchaseAmountSection>
        <PurchaseAmountText>{purchase.price.toLocaleString()}원</PurchaseAmountText>
      </PurchaseAmountSection>
    </PurchaseContainer>
  );
};

const PurchaseContainer = styled.View<ThemeProps>`
  width: 100%;
  padding: 16px 20px;
  flex-direction: row;
  align-items: center;
  gap: 12px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }: ThemeProps) => theme.colors.border.light};
`;

const PurchaseInfoSection = styled.View`
  flex: 1;
  gap: 4px;
`;

const PurchaseTitle = styled.Text<ThemeProps>`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }: ThemeProps) => theme.colors.text.normal};
`;

const PurchaseDate = styled.Text<ThemeProps>`
  font-size: 14px;
  font-weight: 400;
  color: ${({ theme }: ThemeProps) => theme.colors.text.subtitle};
`;

const PurchaseStatus = styled.Text<ThemeProps>`
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }: ThemeProps) => theme.colors.text.subtitle};
  margin-top: 2px;
`;

const PurchaseAmountSection = styled.View`
  align-items: flex-end;
`;

const PurchaseAmountText = styled.Text<ThemeProps>`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }: ThemeProps) => theme.colors.text.normal};
`;

const ModalOverlay = styled.TouchableOpacity`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
`;

