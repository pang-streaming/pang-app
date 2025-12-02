import React, { useEffect, useMemo, useState } from 'react';
import { Dimensions, Animated, Image, TouchableOpacity } from 'react-native';
import Text from '@/components/ui/Text';
import styled from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';
import Card from '@/components/ui/Card';
import axios from 'axios';
import { useRouter } from 'expo-router';

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
  items?: StreamItem[];
  isVideo?: boolean; // 동영상인지 라이브인지 구분
};

const { width: screenWidth } = Dimensions.get('window');

export default function TopVideoList({
  itemWidthRatio = 0.8,
  itemSpacing = 5,
  items: propItems,
  isVideo = false,
}: TopVideoListProps) {
  const router = useRouter();
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
    if (propItems) {
      setItems(propItems);
    } else {
      axios.get("https://pang-api.euns.dev/stream").then((res) => {
        console.log(res.data.data);
        setItems(res.data.data);
      }).catch((error) => {
        console.error('API 호출 오류:', error);
      });
    }
  }, [propItems]);


  if (items.length !== 0) {
    return (
        <Container onPress={()=>{}} height={ITEM_HEIGHT}>
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
                <TouchableOpacity
                  key={item.streamId}
                  activeOpacity={0.9}
                  onPress={() => {
                    // 동영상일 때만 type=video 추가
                    const typeParam = isVideo ? '&type=video' : '';
                    router.push(`/stream-viewer?streamId=${item.streamId}${typeParam}`);
                  }}
                >
                  <Card
                    width={ITEM_WIDTH}
                    height={ITEM_HEIGHT}
                    marginRight={itemSpacing}
                    scale={scale}
                    opacity={opacity}
                  >
                    <ThumbnailImage source={{ uri: item.thumbnail }} />
                    <TopOverlay>
                      <LiveIconContainer>
                        <LiveIcon />
                        <Text size={12} weight="600" color="white">
                          {item.viewCount.toLocaleString()}명  
                        </Text>  
                      </LiveIconContainer>
                    </TopOverlay>
                    <TitleOverlay>
                      <LinearGradient
                        colors={['transparent', 'rgba(0,0,0,0.2)', 'rgba(0,0,0,0.6)']}
                        style={{
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          right: 0,
                          height: '200%',
                          borderRadius: 12,
                        }}
                      />
                      <TitleText numberOfLines={2}>{item.title}</TitleText>
                      <UserInfo>
                        <ProfileImage 
                          source={item.profileImage ? { 
                            uri: item.profileImage 
                          } : require('@/assets/null-profile.png')} 
                        />
                        <NicknameText>{item.nickname}</NicknameText>
                      </UserInfo>
                    </TitleOverlay>
                  </Card>
                </TouchableOpacity>
              );
            })}
          </Animated.ScrollView>
        </Container>
    );
  }

}

interface ContainerProps {
  height: number;
}

const Container = styled.Pressable<ContainerProps>`
  margin-bottom: 20px;
`;

const ThumbnailImage = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 12px;
`;

const TopOverlay = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  padding: 12px;
  z-index: 1;
`;

const TitleOverlay = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 12px;
  z-index: 1;
`;

const TitleText = styled(Text)`
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

const NicknameText = styled(Text)`
  font-size: 12px;
  color: white;
  flex: 1;
`;

const ViewCountText = styled(Text)`
  font-size: 11px;
  color: white;
`;

const LiveIcon = styled.View`
  width: 8px;
  height: 8px;
  
  background-color: #FF0055;
  border-radius: 50%;
`

const LiveIconContainer = styled.View`
  background-color: rgba(18,18,18,0.9);
  padding: 2px 4px;
  align-self: flex-start;
  flex-direction: row;
  align-items: center;
  gap: 5px;
  justify-content: center;
  border-radius: 4px;
`