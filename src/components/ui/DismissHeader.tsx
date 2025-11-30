
import React, { ReactNode } from 'react'
import { TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native';
import styled from 'styled-components';
import ChevronLeft from "@/assets/chevron-left.svg";
import { useRouter } from 'expo-router';

interface Props {
    onPress?: () => void;
    children: ReactNode;
}

export const DismissHeader = ({onPress,children}:Props) => {
  const router = useRouter();

  return (
    <Header>
    <IconButton>
      <ChevronLeft onPress={onPress ?? (()=>{router.back()})} width={24} height={24} />
    </IconButton>
    <HeaderTitle>{children}</HeaderTitle>
  </Header>
  )
}



const Header = styled(View)`
  height: 65px;
  margin-bottom: 10px;
  width: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const HeaderTitle = styled(Text)`
  font-size: 16px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.normal};
`;

const IconButton = styled(TouchableOpacity)`
  position: absolute;
  left: 10px;
  padding: 8px;
`;
