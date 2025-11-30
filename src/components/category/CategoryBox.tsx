import { View, Dimensions } from "react-native";
import styled, { ThemeProps } from "styled-components/native";
import { LiveChip } from "../ui/LiveChip";
import { useRouter } from "expo-router";

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CONTAINER_PADDING = 16 * 3; 
const GAP = 10;
const ITEM_WIDTH = (SCREEN_WIDTH - CONTAINER_PADDING - GAP) / 3;

interface CategoryBoxProps {
  image: string;
  categoryName: string;
  liveCount: number;
  viewerCount: number;
  categoryId: number;
}

export default function CategoryBox({
  categoryName,liveCount,viewerCount,image, categoryId
}: CategoryBoxProps) {
  const router = useRouter()
  return (
    <Container onPress={() => {router.push(`/(home)/category-detail?categoryId=${categoryId}&categoryName=${encodeURIComponent(categoryName)}&categoryImage=${encodeURIComponent(image)}`)}}>
      <Image source={{ uri: image }}>
        <LiveChip viewerCount={viewerCount} />
      </Image>
      <Title>{categoryName}</Title>
      <SubTitle>라이브 {liveCount}개</SubTitle>
    </Container>
  );
}

const Container = styled.TouchableOpacity`
  width: ${ITEM_WIDTH}px;
`;

const Image = styled.ImageBackground`
  width: 100%;
  height: 152px;
  background-color: ${({ theme }: ThemeProps) => theme.colors.content.dark};
  border-radius: 4px;
  margin-bottom: 10px;
  position: relative;
`;

const Title = styled.Text`
  font-size: 18px;
  color: ${({ theme }: ThemeProps) => theme.colors.text.normal};
  font-weight: 700;
`;

const SubTitle = styled.Text`
  font-size: 12px;
  font-weight: 500;
  color: ${({ theme }: ThemeProps) => theme.colors.text.subtitle};
`;
