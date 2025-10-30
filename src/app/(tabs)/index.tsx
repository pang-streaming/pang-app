import Header from '@/components/ui/Header';
import TopVideoList from '@/components/ui/TopVideoList';
import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Dimensions, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';

export default function HomeScreen() {

  return (
    <Container>
        <Header/>
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
  background-color: #fff;
`

const VerticalContent = styled.View`
  flex: 1;
  padding: 20px 0;
`