import Header from '@/components/ui/Header';
import TopVideoList from '@/components/ui/TopVideoList';
import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Dimensions, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import type { ThemeProps } from '@/theme/types';
import { useThemeStore } from '@/stores/useThemeStore';
import Button from '@/components/ui/Button';

export default function HomeScreen() {
  const toggleTheme = useThemeStore((s) => s.toggleTheme);

  return (
    <Container>
        <Header/>
        <Button label="테마 전환" onPress={toggleTheme} />
        <ScrollView 
          showsVerticalScrollIndicator={false}
        >
          <TopVideoList
            itemWidthRatio={0.8}
            itemSpacing={5}
          />
          <VerticalContent>
            <Text>세로 스크롤 콘텐츠</Text>
            <Text>추가 내용...</Text>
          </VerticalContent>
        </ScrollView>
    </Container>
  );
}

const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({ theme }: ThemeProps) => theme.colors.background.normal};
`

const VerticalContent = styled.View`
  flex: 1;
  padding: 20px 0;
`