import LiveElem from "@/components/live/LiveElem";
import { useVideoByUsername } from "@/entities/video/useVideo";
import { View } from "react-native"
import styled from "styled-components"


interface Props {
    username: string;
}

export const UserProfileVideo = ({username}:Props) => {
    const {data} = useVideoByUsername(username);

    const videos = data?.data;
    return (
        <Container>
            {videos?.map((v) => (
                <LiveElem key={v.streamId} video={v}/>
            ))}
        </Container>
    )
}

const Container = styled(View)`
    flex: 1;
    padding: 20px;
    gap: 10px;
    
`