import { ThemeProps } from "@/theme/types";
import { Text, TouchableOpacity, Pressable, LayoutChangeEvent } from "react-native";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import styled, { useTheme } from "styled-components";
import { UserProfileInfoSection } from "@/widgets/user-profile/user-profile-info-section";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useUsernameToInfo } from "@/entities/user/useUser";
import { FollowButton } from "@/components/follow/FollowButton";
import { DismissHeader } from "@/components/ui/DismissHeader";
import { useCategoryStore } from "@/stores/useCategoryStore";
import { useEffect, useState, useMemo } from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { UserProfileHome } from "@/widgets/user-profile/home";
import { UserProfileVideo } from "@/widgets/user-profile/video";
import { UserProfileCommunity } from "@/widgets/user-profile/community";

type TabType = '홈' | '동영상' | '커뮤니티' | '정보';

const ALL_TABS: TabType[] = ['홈', '동영상', '커뮤니티', '정보'];

export default function UserProfile() {
  const theme = useTheme();
  const params = useLocalSearchParams<{ username: string }>();
  const username = typeof params.username === 'string' ? params.username : params.username?.[0] || '';
  
  const selectedTabCategory = useCategoryStore((s) => s.selectedTabCategory);
  const setSelectedTabCategory = useCategoryStore((s) => s.setSelectedTabCategory);
  
  const [buttonLayouts, setButtonLayouts] = useState<{
    [key: string]: { x: number; width: number };
  }>({});
  const indicatorX = useSharedValue(0);
  const indicatorWidth = useSharedValue(0);
  
  const { data } = useUsernameToInfo({ 
    username: username 
  });

  // communityId에 따라 탭 동적 생성
  const communityId = data?.data?.communityId;
  const userProfileTabs = useMemo(() => {
    return communityId != null 
      ? ALL_TABS 
      : ALL_TABS.filter(tab => tab !== '커뮤니티');
  }, [communityId]);

  useEffect(() => {
    // 현재 선택된 탭이 유효한 탭 목록에 없으면 첫 번째 탭으로 초기화
    if (!userProfileTabs.includes(selectedTabCategory as TabType)) {
      setSelectedTabCategory(userProfileTabs[0]);
    }
  }, [userProfileTabs, selectedTabCategory, setSelectedTabCategory]);

  const selectedTab = userProfileTabs.includes(selectedTabCategory as TabType) 
    ? (selectedTabCategory as TabType) 
    : userProfileTabs[0];

  // 애니메이션 인디케이터 업데이트
  useEffect(() => {
    if (buttonLayouts[selectedTab]) {
      const { x, width } = buttonLayouts[selectedTab];
      indicatorX.value = withSpring(x, {
        damping: 18,
        stiffness: 300,
        mass: 0.5,
      });
      indicatorWidth.value = withSpring(width, {
        damping: 18,
        stiffness: 300,
        mass: 0.5,
      });
    }
  }, [selectedTab, buttonLayouts]);

  const animatedIndicatorStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: indicatorX.value }],
      width: indicatorWidth.value,
    };
  });

  const handleButtonLayout = (tab: string, event: LayoutChangeEvent) => {
    const { x, width } = event.nativeEvent.layout;
    setButtonLayouts((prev) => ({
      ...prev,
      [tab]: { x, width },
    }));
  };

  const renderTabContent = () => {
    switch (selectedTab) {
      case '홈':
        return (
          <UserProfileHome username={username} />
        );
      case '동영상':
        return (
          <UserProfileVideo username={username}/>
        );
      case '커뮤니티':
        return (
          data?.data?.communityId ? (
            <UserProfileCommunity communityId={data.data.communityId} />
          ) : (
            <EmptyText>커뮤니티가 없습니다.</EmptyText>
          )
        );
      case '정보':
        return (
            <EmptyText>정보 콘텐츠</EmptyText>
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView
      style={{ backgroundColor: theme.colors.background.normal, flex: 1 }}
    >
     <DismissHeader>프로필</DismissHeader>
      <ScrollView>
        <Content>
          {data && <UserProfileInfoSection data={data.data} status={data.status} message={data.message} timestamp={data.timestamp} />}
          <FollowButton />
          
          <TabContainer>
            {userProfileTabs.map((tab) => {
              const isActive = selectedTab === tab;
              return (
                <TabButton
                  key={tab}
                  onPress={() => setSelectedTabCategory(tab)}
                  onLayout={(event: LayoutChangeEvent) =>
                    handleButtonLayout(tab, event)
                  }
                  isActive={isActive}
                >
                  <TabText isActive={isActive}>{tab}</TabText>
                </TabButton>
              );
            })}
            <AnimatedIndicator style={animatedIndicatorStyle} />
          </TabContainer>

        </Content>
          {renderTabContent()}
      </ScrollView>
    </SafeAreaView>
  );
}

const Content = styled(View)`
  flex: 1;
  padding: 0 20px;
  gap: 20px;
`;

const Header = styled(View)`
  height: 65px;
  margin-bottom: 10px;
  width: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const HeaderTitle = styled(Text)<ThemeProps>`
  font-size: 16px;
  font-weight: 700;
  color: ${({ theme }: ThemeProps) => theme.colors.text.normal};
`;

const IconButton = styled(TouchableOpacity)`
  position: absolute;
  left: 10px;
  padding: 8px;
`;

const TabContainer = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-left: -20px;
  margin-right: -20px;
  padding-left: 20px;
  padding-right: 20px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }: ThemeProps) => theme.colors.border.light};
  position: relative;
`;

const TabButton = styled(Pressable)<{ isActive?: boolean }>`
  height: 100%;
  padding: 10px;
  position: relative;
`;

const TabText = styled(Text)<{ isActive?: boolean }>`
  color: ${({ theme, isActive }: ThemeProps & { isActive?: boolean }) =>
    isActive ? theme.colors.primary.normal : theme.colors.stroke.normal};
  font-size: 16px;
  font-weight: bold;
`;

const AnimatedIndicator = styled(Animated.View)`
  position: absolute;
  bottom: -1px;
  height: 3px;
  background-color: ${({ theme }: ThemeProps) => theme.colors.primary.normal};
  border-radius: 1.5px;
`;

// const TabContentContainer = styled(View)`
//   width: 100%;
//   align-items: center;
//   justify-content: center;
// `;

const EmptyText = styled(Text)`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text.subtitle};
`;
