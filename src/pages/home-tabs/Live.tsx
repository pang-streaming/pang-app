import LiveElem from "@/components/live/LiveElem";
import { View, ActivityIndicator, Text } from "react-native";
import styled from "styled-components/native";
import { useLives } from "@/entities/stream/useStream";
import type { ThemeProps } from "@/theme/types";

export default function Live() {
    const { data: lives, isLoading, isError } = useLives();

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
                <ErrorText>실시간 스트림을 불러오는데 실패했습니다.</ErrorText>
            </Container>
        );
    }

    if (!lives || lives.length === 0) {
        return (
            <Container>
                <ErrorText>현재 진행 중인 실시간 스트림이 없습니다.</ErrorText>
            </Container>
        );
    }

    return (
        <Container>
            {lives.map((stream) => (
                <LiveElem key={stream.streamId} stream={stream} />
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