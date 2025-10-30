import Body from "@/components/ui/Body";
import Button from "@/components/ui/Button";
import Text from "@/components/ui/Text";
import { Image, View } from "react-native";
import styled from "styled-components/native";
import Character from "@/assets/pang-character.svg";
import { Link, router } from "expo-router";
import RegisterTextButton from "@/components/auth/RegisterTextButton";
import AuthTextField from "@/components/auth/AuthTextField";
import User from "@/components/icons/User";
import Lock from "@/components/icons/Lock";
import DividerText from "@/components/auth/DividerText";
import OAuthLoginButton from "@/components/auth/OAuthLoginButton";
import GoogleIcon from "@/assets/google.svg";
import AppleIcon from "@/assets/apple.svg";

export default function SiginInScreen() {
    return (
        <Body dismiss>
            <LogoContainer>
                <Image 
                    source={require("@/assets/pang-text-full-logo.png")} 
                    style={{height: 90, width: 271}}
                    resizeMode="contain"
                />
            </LogoContainer>
            <LoginItemContainer>
                <AuthTextField icon={<User />} placeholder="이메일"/>
                <AuthTextField icon={<Lock/>} placeholder="비밀번호" isSecret/>
                <Button label="로그인" onPress={() => {
                    router.replace("/(tabs)");
                }}/>
                <DividerText/>            
                <OAuthLoginButtonContainer>
                    <OAuthLoginButton icon={<GoogleIcon/>}/>
                    <OAuthLoginButton icon={<AppleIcon/>}/>
                </OAuthLoginButtonContainer>
                <RegisterTextButton/>    
            </LoginItemContainer>
            <View />
        </Body>
    )
}

const LogoContainer = styled.View`
    margin-top: 100px;
`

const LoginItemContainer = styled.View`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    
    width: 100%;

    gap: 14px;
`

const OAuthLoginButtonContainer = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 15px;
`