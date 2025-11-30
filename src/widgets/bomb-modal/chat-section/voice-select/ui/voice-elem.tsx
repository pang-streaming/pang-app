import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import styled from 'styled-components'

interface Props {
  isSelected?: boolean
  onPress?: () => void
}

export const VoiceElem = ({ isSelected = false, onPress }: Props) => {
  return (
    <Container isSelected={isSelected} onPress={onPress}>
      <Avatar />
      <View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
        <Title>학생회장 김민규</Title>
        <Description>부드럽고 똑부러지는 남자 목소리</Description>
      </View>
    </Container>
  )
}

const Container = styled(TouchableOpacity)<{ isSelected: boolean }>`
  flex: 1;
  height: 55px;
  justify-content: space-between;
  border-radius: ${({ theme }) => theme.borders.large};
  border-width: 1px;
  border-color: ${({ theme, isSelected }) =>
    !isSelected ? theme.colors.border.normal : theme.colors.primary.normal};
  align-items: center;
  flex-direction: row;
  padding: 10px;
`
const Avatar = styled(View)`
    width: 26px;
    height: 26px;
    border-radius: ${({theme}) => theme.borders.maximum};
    background-color: ${({theme}) => theme.colors.content.normal};
`

const Title = styled(Text)`
    font-size: 12px;
    font-weight: 700;
    color: ${({theme}) => theme.colors.text.normal};
`



const Description = styled(Text)`
    font-size: 10px;
    font-weight: 400;
    color: ${({theme}) => theme.colors.text.normal};
`
