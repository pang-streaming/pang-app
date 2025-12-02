import LiveElem from "@/components/live/LiveElem";
import { View, ActivityIndicator, Text, ScrollView, RefreshControl } from "react-native";
import styled from "styled-components/native";
import { useAllLastVideo } from "@/entities/video/useVideo";
import type { ThemeProps } from "@/theme/types";
import { useState } from "react";

export default function Video() {
    const { data: videoResponse, isLoading, isError, refetch } = useAllLastVideo();
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
            <Container>
                <ActivityIndicator size="large" color="#fff" />
            </Container>
        );
    }

    if (isError) {
        return (
            <ScrollView
                contentContainerStyle={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#fff" />
                }
            >
                <Container>
                    <ErrorText>동영상을 불러오는데 실패했습니다.</ErrorText>
                </Container>
            </ScrollView>
        );
    }

    const videos = videoResponse?.data || [];

    if (videos.length === 0) {
        return (
            <ScrollView
                contentContainerStyle={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#fff" />
                }
            >
                <Container>
                    <ErrorText>동영상이 없습니다.</ErrorText>
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
                {videos.map((video) => (
                    <LiveElem key={video.streamId} video={video} />
                ))}
            </Container>
        </ScrollView>
    )
}


const Container = styled.View`
    width: 100%;
    padding: 20px 20px;
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