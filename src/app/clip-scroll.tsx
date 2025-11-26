import { View, FlatList, Dimensions, ImageBackground, Image, Pressable } from "react-native"
import styled from "styled-components"
import { useRouter } from "expo-router"
import { useCallback, useMemo, useState } from "react"
import { LinearGradient } from "expo-linear-gradient"
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"
import Text from "@/components/ui/Text"

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface ShortFormItem {
    id: string;
    imageUrl: string;
    title: string;
    username: string;
    profileImage?: string;
    likes: number;
    views: number;
}

const generateShortFormData = (): ShortFormItem[] => {
    return Array.from({ length: 20 }, (_, index) => ({
        id: `${index}`,
        imageUrl: `https://picsum.photos/seed/${index}/400/800`,
        title: `숏폼 비디오 ${index + 1}`,
        username: `user${index + 1}`,
        profileImage: `https://picsum.photos/seed/profile${index}/100/100`,
        likes: Math.floor(Math.random() * 10000),
        views: Math.floor(Math.random() * 100000),
    }));
};

export default function ClipScrollScreen() {
    const router = useRouter()
    const insets = useSafeAreaInsets()
    const [data] = useState<ShortFormItem[]>(generateShortFormData())
    const [currentIndex, setCurrentIndex] = useState(0)
    const itemHeight = SCREEN_HEIGHT - insets.top - insets.bottom

    const renderItem = ({ item, index }: { item: ShortFormItem; index: number }) => {
        const isActive = index === currentIndex;
        
        return (
            <ItemContainer height={itemHeight}>
                <BackgroundImage source={{ uri: item.imageUrl }} resizeMode="cover">
                    <GradientOverlay>
                        <LinearGradient
                            colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.7)']}
                            style={{ width: '100%', height: '100%' }}
                        />
                    </GradientOverlay>
                    
                    <ContentContainer>
                        <LeftSection>
                            <UserInfo>
                                <ProfileImageContainer>
                                    <ProfileImage 
                                        source={{ uri: item.profileImage || `https://picsum.photos/seed/${item.id}/100/100` }}
                                    />
                                </ProfileImageContainer>
                                <UserDetails>
                                    <Username>{item.username}</Username>
                                    <Title numberOfLines={2}>{item.title}</Title>
                                </UserDetails>
                            </UserInfo>
                            
                            <StatsContainer>
                                <StatItem>
                                    <Ionicons name="thumbs-up" size={14} color="#FFFFFF" />
                                    <Text size={12} weight="400" color="#FFFFFF">{item.likes.toLocaleString()}</Text>
                                </StatItem>
                                <StatItem>
                                    <Ionicons name="eye" size={14} color="#FFFFFF" />
                                    <Text size={12} weight="400" color="#FFFFFF">{item.views.toLocaleString()}</Text>
                                </StatItem>
                            </StatsContainer>
                        </LeftSection>
                        
                        <RightSection>
                            <ActionButton>
                                <Ionicons name="heart" size={24} color="#FFFFFF" />
                            </ActionButton>
                            <ActionButton>
                                <Ionicons name="chatbubble" size={24} color="#FFFFFF" />
                            </ActionButton>
                            <ActionButton>
                                <Ionicons name="share" size={24} color="#FFFFFF" />
                            </ActionButton>
                            <ActionButton>
                                <Ionicons name="star" size={24} color="#FFFFFF" />
                            </ActionButton>
                        </RightSection>
                    </ContentContainer>
                </BackgroundImage>
            </ItemContainer>
        )
    }

    const onViewableItemsChanged = useCallback(({ viewableItems }: any) => {
        if (viewableItems.length > 0) {
            setCurrentIndex(viewableItems[0].index || 0)
        }
    }, [])

    const viewabilityConfig = useMemo(() => ({
        itemVisiblePercentThreshold: 50
    }), [])

    return (
        <SafeContainer edges={['top', 'bottom']}>
            <CloseButton topInset={insets.top} onPress={() => router.back()}>
                <Ionicons name="close" size={24} color="#FFFFFF" />
            </CloseButton>
            
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                pagingEnabled
                showsVerticalScrollIndicator={false}
                snapToInterval={itemHeight}
                snapToAlignment="start"
                decelerationRate="fast"
                onViewableItemsChanged={onViewableItemsChanged}
                viewabilityConfig={viewabilityConfig}
                getItemLayout={(data, index) => ({
                    length: itemHeight,
                    offset: itemHeight * index,
                    index,
                })}
            />
        </SafeContainer>
    )
}

const SafeContainer = styled(SafeAreaView)`
    flex: 1;
    background-color: #000000;
`

const ItemContainer = styled(View)<{ height?: number }>`
    width: ${SCREEN_WIDTH}px;
    height: ${({ height }) => height || SCREEN_HEIGHT}px;
`

const BackgroundImage = styled(ImageBackground)`
    width: 100%;
    height: 100%;
    justify-content: flex-end;
`

const GradientOverlay = styled(View)`
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 60%;
    z-index: 1;
    pointer-events: none;
`

const ContentContainer = styled(View)`
    flex-direction: row;
    padding: 20px;
    padding-bottom: 40px;
    z-index: 2;
`

const LeftSection = styled(View)`
    flex: 1;
    justify-content: flex-end;
`

const UserInfo = styled(View)`
    flex-direction: row;
    align-items: center;
    margin-bottom: 16px;
`

const ProfileImageContainer = styled(View)`
    width: 48px;
    height: 48px;
    border-radius: 24px;
    overflow: hidden;
    margin-right: 12px;
    border-width: 2px;
    border-color: #FFFFFF;
`

const ProfileImage = styled(Image)`
    width: 100%;
    height: 100%;
`

const UserDetails = styled(View)`
    flex: 1;
`

const Username = styled(Text)`
    font-size: 16px;
    font-weight: 600;
    color: #FFFFFF;
    margin-bottom: 4px;
`

const Title = styled(Text)`
    font-size: 14px;
    font-weight: 400;
    color: #FFFFFF;
`

const StatsContainer = styled(View)`
    flex-direction: row;
    gap: 16px;
`

const StatItem = styled(View)`
    flex-direction: row;
    align-items: center;
    gap: 6px;
`

const RightSection = styled(View)`
    align-items: center;
    justify-content: flex-end;
    gap: 24px;
    padding-left: 16px;
`

const ActionButton = styled(Pressable)`
    width: 48px;
    height: 48px;
    align-items: center;
    justify-content: center;
`

const CloseButton = styled(Pressable)<{ topInset?: number }>`
    position: absolute;
    top: ${({ topInset = 0 }) => topInset + 10}px;
    right: 20px;
    z-index: 10;
    width: 40px;
    height: 40px;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 20px;
`
