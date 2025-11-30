import { Text, TextInput, View } from "react-native"
import styled from "styled-components"


export const UrlInputSection = () => {
    return (
        <Container>
            <Label>후원할 영상</Label>
            <Input placeholder="URL를 입력해주세요"/>
        </Container>
    )
}

const Container = styled(View)`
    width: 100%;
    padding: 16px;
    justify-content: space-between;
    gap: 10px;
    border-radius: ${({theme}) => theme.borders.large};
    border:  1px solid ${({theme}) => theme.colors.content.normal};
`
const Label = styled(Text)`
    font-size: 15px;
    font-weight: 600;
    color: ${({theme}) => theme.colors.text.subtitle};
`

const Input = styled(TextInput)`
height: 37px;
padding: 0 12px;
border-radius: ${({theme}) => theme.borders.small};
background-color: ${({theme}) => theme.colors.content.normal};
color: #737373
`