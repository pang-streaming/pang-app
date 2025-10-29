import Body from "@/components/ui/Body";
import { Image } from "react-native";
import styled from "styled-components/native";
import LoginButtonWithCharater from "@/components/auth/LoginButtonWithCharater";

export default function AuthIndexScreen() {
    return <Body>
        <LogoContainer>
            <Image 
                source={require("@/assets/pang-text-full-logo.png")} 
                style={{height: 90, width: 271}}
                resizeMode="contain"
            />
        </LogoContainer>
        <LoginButtonWithCharater/>
    </Body>
}

const LogoContainer = styled.View`
    margin-top: 100px;
`