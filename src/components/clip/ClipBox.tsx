import { ThemeProps } from "@/theme/types";
import { ImageBackground, View, Dimensions, TouchableOpacity, Image } from "react-native";
import { Text } from "react-native";
import styled from "styled-components/native";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { useRouter } from "expo-router";

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CONTAINER_PADDING = 20 * 2; 
const GAP = 10;
const ITEM_WIDTH = (SCREEN_WIDTH - CONTAINER_PADDING - GAP) / 2;

interface ClipBoxProps {
  imageUrl: string;
  title: string;
  streamerName: string;
  profileImage?: string;
}

export const ClipBox = ({ imageUrl, title, streamerName, profileImage }: ClipBoxProps) => {
  const router = useRouter()
  return (
    <Container onPress={() => {router.push('/clip-scroll')}}>
      <BackgroundImage source={{ uri: imageUrl }} resizeMode="cover">
        <GradientOverlay>
          <LinearGradient
            colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.7)']}
            style={{ width: '100%', height: '100%' }}
          />
        </GradientOverlay>
        <InfoSection>
          <Title>{title}</Title>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 3 }}>
            {profileImage ? (
              <ProfileImageStyled source={{ uri: profileImage }} />
            ) : (
              <ProfileImagePlaceholder />
            )}
            <StreamerName>{streamerName}</StreamerName>
          </View>
        </InfoSection>
      </BackgroundImage>
    </Container>
  );
};

const Container = styled(TouchableOpacity)`
  width: ${ITEM_WIDTH}px;
  height: 250px;
  position: relative;
  overflow: hidden;
  border-radius: 8px;
`;

const BackgroundImage = styled(ImageBackground)`
  width: 100%;
  height: 100%;
`;

const GradientOverlay = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 150px;
  z-index: 1;
  pointer-events: none;
`;

const InfoSection = styled(View)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 16px;
  z-index: 2;
`;

const Title = styled(Text)`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }: ThemeProps) => theme.colors.text.normal};
  margin-bottom: 5px;
`;

const ProfileImageStyled = styled(Image)`
  width: 25px;
  height: 25px;
  border-radius: 12.5px;
`;

const ProfileImagePlaceholder = styled(View)`
  width: 25px;
  height: 25px;
  border-radius: 12.5px;
  background-color: ${({ theme }: ThemeProps) => theme.colors.content.normal};
`;

const StreamerName = styled(Text)`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }: ThemeProps) => theme.colors.text.subtitle};
  margin-bottom: 3px;
`;
