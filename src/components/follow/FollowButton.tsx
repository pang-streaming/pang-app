import { Text, TouchableOpacity, View } from "react-native"
import styled from "styled-components"

interface Props {
    onPress?: () => void;
    isFollowing?: () => void;
}


export const FollowButton = ({onPress, isFollowing}:Props) =>{
    return (
        <Container>
            <Label>팔로우</Label>
        </Container>
    )
}

const Container = styled(TouchableOpacity)`
    flex: 1;
    height: 32px;
    border-radius: ${({theme}) => theme.borders.large};
    justify-content: center;
    align-items: center;
    background-color: ${({theme}) => theme.colors.primary.normal};

`

const Label = styled(Text)`
    font-size: 12px;
    font-weight: 700;
    color: ${({theme}) => theme.colors.background.normal};
`