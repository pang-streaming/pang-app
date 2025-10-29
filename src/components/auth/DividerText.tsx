import styled from "styled-components/native"
import Text from "../ui/Text"

export default function DividerText() {
    return (
        <Container>
            <Divider/>
            <Text color="#737373" size={18} weight="500">또는</Text>
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
    background-color: #737373;
`