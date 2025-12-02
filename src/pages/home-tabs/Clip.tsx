import { ClipBox } from "@/components/clip/ClipBox";
import { View } from "react-native";
import styled from "styled-components/native";
import { useMemo } from "react";

interface ClipItem {
    id: string;
    imageUrl: string;
    title: string;
    streamerName: string;
    profileImage?: string;
}

const generateClipData = (): ClipItem[] => {
    return Array.from({ length: 20 }, (_, index) => ({
        id: `${index}`,
        imageUrl: `https://picsum.photos/seed/clip${index}/400/600`,
        title: `클립 제목 ${index + 1}`,
        streamerName: `스트리머${index + 1}`,
        profileImage: `https://picsum.photos/seed/profile${index}/100/100`,
    }));
};

export default function Clip() {
    const clipData = useMemo(() => generateClipData(), []);

    return (
        <Container>
            {clipData.map((item) => (
                <ClipBox
                    key={item.id}
                    imageUrl={item.imageUrl}
                    title={item.title}
                    streamerName={item.streamerName}
                    profileImage={item.profileImage}
                />
            ))}
        </Container>
    )
}

const Container = styled.View`
    padding: 20px 20px;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 10px;
`