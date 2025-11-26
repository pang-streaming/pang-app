import LiveElem from "@/components/live/LiveElem";
import { View, ActivityIndicator, Text } from "react-native";
import styled from "styled-components/native";
import { useAllLastVideo } from "@/entities/video/useVideo";
import type { ThemeProps } from "@/theme/types";

export default function Video() {
    const { data: videoResponse, isLoading, isError } = useAllLastVideo();

    if (isLoading) {
        return (
            <Container>
                <ActivityIndicator size="large" color="#fff" />
            </Container>
        );
    }

    if (isError) {
        return (
            <Container>
                <ErrorText>동영상을 불러오는데 실패했습니다.</ErrorText>
            </Container>
        );
    }

    const videos = videoResponse?.data || [];

    if (videos.length === 0) {
        return (
            <Container>
                <ErrorText>동영상이 없습니다.</ErrorText>
            </Container>
        );
    }

    return (
        <Container>
            {videos.map((video) => (
                <LiveElem key={video.streamId} video={video} />
            ))}
        </Container>
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