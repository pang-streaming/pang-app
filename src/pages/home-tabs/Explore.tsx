import TopVideoList from "@/components/explore/TopVideoList";
import { Image, View } from "react-native";
import styled from "styled-components";


export default function Explore() {
  return (
    <Container>
      <TopVideoList itemWidthRatio={0.8} itemSpacing={5} />
      <Icon source={require("@/assets/null-profile.png")} ></Icon>
    </Container>
  );
}

const Container = styled(View)`
  width: 100%;
  padding: 0 16px;
  flex-direction: column;
  gap: 10px;
`;

const Icon = styled(Image)`
`;