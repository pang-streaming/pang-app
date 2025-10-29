import React, { useEffect, useMemo, useState } from 'react';
import { Dimensions, Animated, Text, Image } from 'react-native';
import styled from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';
import Card from '@/components/ui/card';
import axios from 'axios';

type StreamItem = {
  nickname: string;
  profileImage: string | null;
  streamId: string;
  thumbnail: string;
  title: string;
  url: string;
  username: string;
  viewCount: number;
};

type TopVideoListProps = {
  itemWidthRatio?: number;
  itemSpacing?: number;
};

const { width: screenWidth } = Dimensions.get('window');

export default function TopVideoList({
  itemWidthRatio = 0.8,
  itemSpacing = 5,
}: TopVideoListProps) {
  const scrollX = React.useRef(new Animated.Value(0)).current;

  const { ITEM_WIDTH, ITEM_HEIGHT, ITEM_SIZE, H_PADDING } = useMemo(() => {
    const w = screenWidth * itemWidthRatio;
    const h = w * (9 / 16);
    const size = w + itemSpacing;
    const hPadding = (screenWidth - w) / 2;
    return { ITEM_WIDTH: w, ITEM_HEIGHT: h, ITEM_SIZE: size, H_PADDING: hPadding };
  }, [itemWidthRatio, itemSpacing]);

  const [items, setItems] = useState<StreamItem[]>([]);

  useEffect(() => { 
    axios.get("https://pang-api.euns.dev/stream").then((res) => {
        console.log(res.data.data);
        setItems(res.data.data);
    }).catch((error) => {
        console.error('API 호출 오류:', error);
    });
  }, []);

  return (
    <Container height={ITEM_HEIGHT}>
      <Animated.ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={ITEM_SIZE}
        decelerationRate="fast"
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        contentContainerStyle={{ paddingHorizontal: H_PADDING }}
      >
        {items.map((item, index) => {
          const inputRange = [
            (index - 1) * ITEM_SIZE,
            index * ITEM_SIZE,
            (index + 1) * ITEM_SIZE,
          ];

          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.95, 1, 0.95],
            extrapolate: 'clamp',
          });

          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.6, 1, 0.6],
            extrapolate: 'clamp',
          });

          return (
            <Card
              key={item.streamId}
              width={ITEM_WIDTH}
              height={ITEM_HEIGHT}
              marginRight={itemSpacing}
              scale={scale}
              opacity={opacity}
            >
              <ThumbnailImage source={{ uri: item.thumbnail }} />
              <TitleOverlay>
                <LinearGradient
                  colors={['transparent', 'rgba(0,0,0,0.2)', 'rgba(0,0,0,0.5)']}
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '130%',
                    borderRadius: 12,
                  }}
                />
                <TitleText numberOfLines={2}>{item.title}</TitleText>
                <UserInfo>
                  <ProfileImage 
                    source={{ 
                      uri: item.profileImage || 'https://via.placeholder.com/30x30' 
                    }} 
                  />
                  <NicknameText>{item.nickname}</NicknameText>
                </UserInfo>
                <ViewCountText>👁 {item.viewCount}</ViewCountText>
              </TitleOverlay>
            </Card>
          );
        })}
      </Animated.ScrollView>
    </Container>
  );
}

interface ContainerProps {
  height: number;
}

const Container = styled.View<ContainerProps>`
  margin-bottom: 20px;
  height: ${(props:ContainerProps) => props.height + 30}px;
`;

const ThumbnailImage = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 12px;
`;

const TitleOverlay = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 12px;
  z-index: 1;
`;

const TitleText = styled.Text`
  font-size: 14px;
  font-weight: 600;
  color: white;
  margin-bottom: 8px;
`;

const UserInfo = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 4px;
`;

const ProfileImage = styled.Image`
  width: 20px;
  height: 20px;
  border-radius: 10px;
  margin-right: 6px;
`;

const NicknameText = styled.Text`
  font-size: 12px;
  color: white;
  flex: 1;
`;

const ViewCountText = styled.Text`
  font-size: 11px;
  color: white;
`;


