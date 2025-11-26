import React from "react";
import { Text, TouchableOpacity, View } from "react-native"
import styled, { ThemeProps } from "styled-components/native"

interface Props {
    type? : 'charge' | 'auto-setting'
    onPress : ()  => void;
}
export const ChargeButton = ({type,onPress}:Props) => {
    return (
        <Container onPress={onPress}>
            <Label>{type === 'charge' ? '충전하기' : '설정하기'}</Label>
        </Container>
    )
}
const Container = styled(TouchableOpacity)`
border-radius: 12px;
border: 1px solid ${({theme}: ThemeProps) => theme.colors.primary.normal};

justify-content: center;
align-items: center;
`

const Label = styled(Text)`
color: ${({ theme }: ThemeProps) => theme.colors.primary.normal};
font-size: 15px;
font-weight: 400;
margin: 12px 16px;
`