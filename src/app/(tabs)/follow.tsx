import React, { useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import type { ThemeProps } from '@/theme/types';
import Header from '@/components/ui/Header';
import LiveElem from '@/components/live/LiveElem';
import { useFollowingLives } from '@/entities/stream/useStream';
import { useMyFollowing } from '@/features/follow/useFollow';
import FollowingUserItem from '@/components/follow/FollowingUserItem';
import { useCategoryStore } from '@/stores/useCategoryStore';
import { useRouter } from 'expo-router';

export default function FollowScreen() {
  const selectedTabCategory = useCategoryStore((s) => s.selectedTabCategory);
  const { data: followingLives, isLoading: isLoadingLives, isError: isErrorLives, refetch: refetchLives } = useFollowingLives();
  const { data: followingUsers, isLoading: isLoadingUsers, refetch: refetchUsers } = useMyFollowing();
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await Promise.all([refetchLives(), refetchUsers()]);
    } finally {
      setRefreshing(false);
    }
  };

  const renderLiveTab = () => {
    if (isLoadingLives) {
      return (
        <LoadingContainer>
          <ActivityIndicator size="large" color="#fff" />
        </LoadingContainer>
      );
    }

    if (isErrorLives) {
      return (
        <EmptyContainer>
          <EmptyText>팔로잉 중인 라이브를 불러오는데 실패했습니다.</EmptyText>
        </EmptyContainer>
      );
    }

    if (!followingLives || followingLives.length === 0) {
      return (
        <EmptyContainer>
          <EmptyText>팔로잉 중인 라이브가 없습니다.</EmptyText>
        </EmptyContainer>
      );
    }

    return (
      <LiveListContainer
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#fff" />
        }
      >
        {followingLives.map((stream) => (
          <LiveItemWrapper key={stream.streamId}>
            <LiveElem stream={stream} />
          </LiveItemWrapper>
        ))}
      </LiveListContainer>
    );
  };

  const renderAllTab = () => {
    const liveStreamers = new Set(
      followingLives?.map(stream => stream.username || stream.nickname).filter(Boolean) || []
    );

    if (isLoadingLives || isLoadingUsers) {
      return (
        <LoadingContainer>
          <ActivityIndicator size="large" color="#fff" />
        </LoadingContainer>
      );
    }

    return (
      <ScrollView 
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#fff" />
        }
      >
        {followingLives && followingLives.length > 0 && (
          <Section>
            <SectionTitle>라이브</SectionTitle>
            {followingLives.map((stream) => (
              <LiveItemWrapper key={stream.streamId}>
                <LiveElem stream={stream} />
              </LiveItemWrapper>
            ))}
          </Section>
        )}

        {followingUsers?.data && followingUsers.data.length > 0 && (
          <Section>
            <SectionTitle>팔로잉</SectionTitle>
            {followingUsers.data
              .filter(user => !liveStreamers.has(user.username))
              .map((user) => (
                <FollowingUserItem key={user.username} user={user} onPress={() => {router.push(`/user-profile?username=${user.username}`)}}/>
              ))}
          </Section>
        )}

        {(!followingLives || followingLives.length === 0) &&
          (!followingUsers?.data || followingUsers.data.length === 0) && (
            <EmptyContainer>
              <EmptyText>팔로잉 중인 사용자나 라이브가 없습니다.</EmptyText>
            </EmptyContainer>
          )}
      </ScrollView>
    );
  };

  return (
    <Container>
      <Header />
      <ContentContainer>
        {selectedTabCategory === '라이브' ? renderLiveTab() : renderAllTab()}
      </ContentContainer>
    </Container>
  );
}

const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({ theme }: ThemeProps) => theme.colors.background.normal};
`;

const ContentContainer = styled.View`
  flex: 1;
`;

const Section = styled.View`
  width: 100%;
  margin-bottom: 20px;
`;

const SectionTitle = styled(Text)`
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }: ThemeProps) => theme.colors.text.normal};
  padding: 20px 20px 10px 20px;
`;

const LiveListContainer = styled(ScrollView)`
  flex: 1;
`;

const LiveItemWrapper = styled(View)`
  margin-bottom: 10px;
padding: 0 20px;
`;

const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 40px 0;
`;

const EmptyContainer = styled.View`
  padding: 40px 20px;
  align-items: center;
`;

const EmptyText = styled(Text)`
  color: ${({ theme }: ThemeProps) => theme.colors.text.subtitle};
  font-size: 14px;
  text-align: center;
`;
