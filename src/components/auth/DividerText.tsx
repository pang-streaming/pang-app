import styled, { useTheme } from "styled-components/native"
import type { ThemeProps } from "@/theme/types";
import Text from "../ui/Text"

export default function DividerText() {
    const theme = useTheme();
    return (
        <Container>
            <Divider/>
            <Text size={18} weight="500" color={theme.colors.text.subtitle}>또는</Text>
            <Divider/>
        </Container>
    )
}

const Container = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 15px;
    width: 82%;
    margin-top: 10px;
    margin-bottom: 10px;
`

const Divider = styled.View`
    width: 50%;
    height: 1px;
    background-color: ${({ theme }: ThemeProps) => theme.colors.stroke.normal};
`