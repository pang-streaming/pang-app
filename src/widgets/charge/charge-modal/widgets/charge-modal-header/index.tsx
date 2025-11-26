
import { View,Text } from "react-native";
import styled from "styled-components";


interface Props {
  children: React.ReactNode;
  onClose?: () => void;
}

export const ChargeModalHeader = ({ children, onClose }: Props) => {
  return (
    <Container>
      <Title>{children}</Title>
    </Container>
  );
};

const Container = styled(View)`
  width: 100%;
  height: 61px;
  border-bottom: 1px solid ${({theme}) => theme.colors.stroke.light};
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const Title = styled(Text)`
  font-size: 20px;
  font-weight: 900;
  color: ${({theme})=>theme.colors.text.normal};
`;
// const Icon = styled.img`
//   position: absolute;
//   right: 15px;
//   top: 10px;
//   cursor: pointer;
// `;
