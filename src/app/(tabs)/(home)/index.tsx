import Header from '@/components/ui/Header';
import TopVideoList from '@/components/explore/TopVideoList';
import React, { useRef, useState } from 'react';
import { View, Text,  ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import type { ThemeProps } from '@/theme/types';
import { useThemeStore } from '@/stores/useThemeStore';
import { useCategoryStore } from '@/stores/useCategoryStore';
import Live from '@/pages/home-tabs/Live';
import Video from '@/pages/home-tabs/Video';
import Clip from '@/pages/home-tabs/Clip';
import Category from '@/pages/home-tabs/Category';
import Explore from '@/pages/home-tabs/Explore';

export default function HomeScreen() {
  const toggleTheme = useThemeStore((s) => s.toggleTheme);
  const selectedCategory = useCategoryStore((s) => s.selectedCategory);

  const renderCategoryContent = () => {
    switch (selectedCategory) {
      case "탐색":
        return <Explore/>
      case "카테고리":
        return <Category />
      case "실시간":
        return <Live />
      case "동영상":
        return <Video />
      case "클립":
        return <Clip />
      default:
        return <View />;
    }
  };

  return (
    <Container>
        <Header/>
        {/* <ButtonContainer>
          <Button label="테마 전환" onPress={toggleTheme} />
          <View style={{ marginTop: 10 }}>
            <Button label="모달 열기" onPress={() => router.push('/stream-viewer')} />
          </View>
        </ButtonContainer> */}
        <ScrollView 
          showsVerticalScrollIndicator={false}
        >
          
          {renderCategoryContent()}
        </ScrollView>
    </Container>
  );
}

const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({ theme }: ThemeProps) => theme.colors.background.normal};
`

const ButtonContainer = styled.View`
  padding: 0 15px;
  margin-bottom: 10px;
`

const VerticalContent = styled.View`
  flex: 1;
  padding: 20px 0;
`

const ContentContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 20px;
  min-height: 400px;
`