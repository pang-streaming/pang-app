

import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import styled from 'styled-components'
import Icon from '@/assets/chevron-right.svg'
import { ThemeProps } from '@/theme/types'

interface Props {
    label: string;
    onPress: () => void;
}

export const MenuRow = ({onPress,label}:Props) => {
  return (
<Container onPress={onPress}>
<Label>{label}</Label>
<Icon />
</Container>
  )
}

const Container = styled(TouchableOpacity)`
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
`

const Label = styled(Text)<ThemeProps>`
    font-size: ${({theme}) => theme.font.large};
    font-weight: 500;
    color: ${({theme}) => theme.colors.text.normal};
`