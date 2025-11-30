import { IncreaseField } from "@/widgets/charge/charge-modal/ui/increase-field";
import { View } from "react-native";
import styled from "styled-components";
import { UrlInputSection } from "./url-input-section";
import { SubmitButton } from "@/ui/SubmitButton";

export const BombVideoSection = () => {
  return (
    <Container>
      <IncreaseField pungAmount={0} onPungChange={() => {}} />
      <UrlInputSection />
      <SubmitButton>펑 후원하기</SubmitButton>
    </Container>
  );
};

const Container = styled(View)`
  flex: 1;
  padding: 12px;
  gap: 20px;
`;
