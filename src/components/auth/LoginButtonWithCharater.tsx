import Button from "../ui/Button";
import RegisterTextButton from "./RegisterTextButton";
import styled from "styled-components/native";
import Character from "@/assets/pang-character.svg";
import { router } from "expo-router";

export default function LoginButtonWithCharater() {
    return (
        <ButtonContainer>
            <Character/>
            <Button label="로그인" onPress={() => router.push("/signin")}/>
            <RegisterTextButton/>
        </ButtonContainer>  
    )
}

const ButtonContainer = styled.View`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`