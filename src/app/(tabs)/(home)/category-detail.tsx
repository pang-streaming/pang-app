import { DismissHeader } from "@/components/ui/DismissHeader";
import { CategoryInfo } from "@/widgets/category-detail/category-info";
import { View, RefreshControl } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";


export default function CategoryDetailScreen() {
  const { categoryId, categoryName, categoryImage } = useLocalSearchParams<{ categoryId: string; categoryName: string; categoryImage: string }>();
  const categoryIdString = Array.isArray(categoryId) ? categoryId[0] : categoryId;
  const categoryNameString = Array.isArray(categoryName) ? categoryName[0] : categoryName;
  const categoryImageString = Array.isArray(categoryImage) ? categoryImage[0] : categoryImage;
  const decodedCategoryName = categoryNameString ? decodeURIComponent(categoryNameString) : '';
  const decodedCategoryImage = categoryImageString ? decodeURIComponent(categoryImageString) : '';
  const [refreshing, setRefreshing] = useState(false);
  const [refetchFunctions, setRefetchFunctions] = useState<{ refetchLives?: () => Promise<any>; refetchVideos?: () => Promise<any> }>({});

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      if (refetchFunctions.refetchLives && refetchFunctions.refetchVideos) {
        await Promise.all([refetchFunctions.refetchLives(), refetchFunctions.refetchVideos()]);
      }
    } finally {
      setRefreshing(false);
    }
  };
  
  return (
    <Container>
        <DismissHeader>카테고리</DismissHeader>
        <Divider />
        
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#fff" />
        }
      >
        <Content>
            <CategoryInfo 
              categoryId={categoryIdString} 
              categoryName={decodedCategoryName} 
              categoryImage={decodedCategoryImage}
              onRefetchReady={(refetchLives, refetchVideos) => {
                setRefetchFunctions({ refetchLives, refetchVideos });
              }}
            />
        </Content>
      </ScrollView>
    </Container>
  );
}

const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background.normal};
`;
const Content = styled(View)`
  flex: 1;
  padding: 20px;
`;

const Divider = styled(View)`
    width: 100%;
    height: 1px;
    background-color: ${({theme}) => theme.colors.content.normal};
`

