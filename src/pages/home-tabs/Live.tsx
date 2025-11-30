import LiveElem from "@/components/live/LiveElem";
import { View, ActivityIndicator, Text, ScrollView, RefreshControl, Platform } from "react-native";
import styled from "styled-components/native";
import { useLives } from "@/entities/stream/useStream";
import type { ThemeProps } from "@/theme/types";
import { useState } from "react";

export default function Live() {
    const { data: lives, isLoading, isError, refetch } = useLives();
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = async () => {
        setRefreshing(true);
        try {
            await refetch();
        } finally {
            setRefreshing(false);
        }
    };

    if (isLoading && !refreshing) {
        return (
            <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                <ActivityIndicator size="large" color="#fff" />
            </View>
        );
    }

    if (isError) {
        return (
            <ScrollView
                contentContainerStyle={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
                refreshControl={
                    <RefreshControl 
                        refreshing={refreshing} 
                        onRefresh={onRefresh} 
                        tintColor="#fff"
                        colors={["#fff"]}
                        progressViewOffset={Platform.OS === 'android' ? 20 : 0}
                    />
                }
            >
                <Container>
                    <ErrorText>실시간 스트림을 불러오는데 실패했습니다.</ErrorText>
                </Container>
            </ScrollView>
        );
    }

    if (!lives || lives.length === 0) {
        return (
            <ScrollView
                contentContainerStyle={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
                refreshControl={
                    <RefreshControl 
                        refreshing={refreshing} 
                        onRefresh={onRefresh} 
                        tintColor="#fff"
                        colors={["#fff"]}
                        progressViewOffset={Platform.OS === 'android' ? 20 : 0}
                    />
                }
            >
                <Container>
                    <ErrorText>현재 진행 중인 실시간 스트림이 없습니다.</ErrorText>
                </Container>
            </ScrollView>
        );
    }

    return (
        <ScrollView
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#fff" />
            }
        >
            <Container>
                {lives.map((stream) => (
                    <LiveElem key={stream.streamId} stream={stream} />
                ))}
            </Container>
        </ScrollView>
    )
}

const Container = styled.View`
    width: 100%;
    padding: 0 20px;
    gap: 10px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const ErrorText = styled.Text`
    color: ${({ theme }: ThemeProps) => theme.colors.text.subtitle};
    font-size: 14px;
    margin-top: 20px;
`