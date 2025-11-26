import { ThemeProps } from "@/theme/types";
import { Text, TouchableOpacity } from "react-native";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import styled, { useTheme } from "styled-components";
import ChevronLeft from "@/assets/chevron-left.svg";
import { UserProfileInfoSection } from "@/widgets/user-profile/user-profile-info-section";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useUsernameToInfo } from "@/entities/user/useUser";
import { FollowButton } from "@/components/follow/FollowButton";

export default function UserProfile() {
  const theme = useTheme();
  const router = useRouter();
  const params = useLocalSearchParams<{ username: string }>();
  const username = typeof params.username === 'string' ? params.username : params.username?.[0] || '';
  
  const { data } = useUsernameToInfo({ 
    username: username 
  });

  return (
    <SafeAreaView
      style={{ backgroundColor: theme.colors.background.normal, flex: 1 }}
    >
      <Header>
        <IconButton>
          <ChevronLeft onPress={() => {router.back()}} width={24} height={24} />
        </IconButton>
        <HeaderTitle>프로필</HeaderTitle>
      </Header>
      <ScrollView>
        <Content>
          {data && <UserProfileInfoSection data={data.data} status={data.status} message={data.message} timestamp={data.timestamp} />}
          <FollowButton />
        </Content>
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
