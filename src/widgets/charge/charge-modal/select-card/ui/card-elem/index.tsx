

import React from 'react'
import styled from 'styled-components'
import { SvgProps } from 'react-native-svg'
import { Text, TouchableOpacity, View } from 'react-native';

interface CardElemProps {
    id: string;
    image: React.FC<SvgProps>;
    cardName: string;
    isSelected: boolean;
    onSelect: (id: string) => void;
}

export const CardElem = ({id, image: ImageComponent, cardName, isSelected, onSelect}: CardElemProps) => {
  const handleClick = () => {
    onSelect(id);
  };

  return (
    <Container onPress={handleClick} isSelected={isSelected}>
        <IconContainer>
          <ImageComponent width={40} height={40} />
        </IconContainer>
        <Label>{cardName}</Label>
        {isSelected && <SelectionIndicator />}
    </Container>
  )
}


const Container = styled(TouchableOpacity)<{ isSelected: boolean }>`
    width: 100%;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    box-sizing: border-box;
    padding: 8px;
    border-radius: ${({ theme }) => theme.borders.small};
    cursor: pointer;
    transition: all 0.2s ease;
    border: 2px solid ${({ theme, isSelected }) =>
        isSelected ? theme.colors.primary.normal : 'transparent'};
    background-color: ${({ theme, isSelected }) =>
        isSelected ? theme.colors.primary.light : 'transparent'};

    &:hover {
        background-color: ${({ theme, isSelected }) =>
            isSelected ? theme.colors.primary.light : theme.colors.background.light};
    }
`

const SelectionIndicator = styled(View)`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.colors.primary.normal};
    flex-direction: row;
    align-items: center;
    justify-content: center;

    &::after {
        content: '✓';
        color: white;
        font-size: 12px;
        font-weight: bold;
    }
`
const IconContainer = styled(View)`
    margin-right: 10px;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`

const Label = styled(Text)`
    font-size: ${({theme}) => theme.font.large};
    font-weight: 500;
    margin-right: auto;
    color: ${({theme}) => theme.colors.text.normal};
`