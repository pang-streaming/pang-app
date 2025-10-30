import styled from "styled-components/native"
import type { ThemeProps } from "@/theme/types";
import Logo from '@/assets/logo.svg';

export default function Header() {
    return (
        <Container>
            <Logo width={100} /> 
        </Container>
    )
}

const Container = styled.View`
    width: 100%;
    padding: 10px;
    
    flex-direction: col;
    justify-content: center;
    align-content: space-between;

    border-bottom-width: 1px;
    border-bottom-color: ${({ theme }: ThemeProps) => theme.colors.border.light};

    margin-bottom: 20px;
`
