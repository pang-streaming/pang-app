


import { ThemeProps } from '@/theme/types';
import { Text, View } from 'react-native';
import styled from 'styled-components'

interface FinalAmountFieldProps {
  pungAmount: number;
}

export const FinalAmountField = ({ pungAmount }: FinalAmountFieldProps) => {
  
  return (
    <Container>
        <LeftText>최종 결제금액</LeftText>
        <RightText>{pungAmount.toLocaleString()}원</RightText>
    </Container>
  )
}

const Container = styled(View)`
    width: 100%;
    height: 50px;
    box-sizing: border-box;
    flex-direction: row;
    align-items: center;
    padding: 0 28px;
    justify-content: space-between;
    border-radius: ${({theme}:ThemeProps) => theme.borders.large};
    background-color: ${({theme}) => theme.colors.background.normal};
`

const LeftText = styled(Text)`
    font-size: ${({theme}:ThemeProps) => theme.font?.medium};
    font-weight: 700;
    color: ${({theme}:ThemeProps) => theme.colors.primary.normal};
`
const RightText = styled(Text)`
    font-size: ${({theme}:ThemeProps) => theme.font.large};
    font-weight: 900;
    color: ${({theme}) => theme.colors.primary.normal};
`