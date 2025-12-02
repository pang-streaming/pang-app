import { useState } from "react";
import Body from "@/components/ui/Body";
import Button from "@/components/ui/Button";
import Text from "@/components/ui/Text";
import { Image, View, Alert } from "react-native";
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
import { loginUser } from "@/features/auth/login/api";
import * as SecureStore from "expo-secure-store";

export default function SiginInScreen() {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async () => {
        if (!id || !password) {
            Alert.alert("오류", "이메일과 비밀번호를 입력해주세요.");
            return;
        }

        setIsLoading(true);
        try {
            const response = await loginUser(id, password);
            if (response.data?.accessToken) {
                await SecureStore.setItemAsync("accessToken", response.data.accessToken);
                if (response.data.refreshToken) {
                    await SecureStore.setItemAsync("refreshToken", response.data.refreshToken);
                }
                
                const savedToken = await SecureStore.getItemAsync("accessToken");
                if (savedToken) {
                    console.log('[로그인] 토큰 저장 완료');
                    router.replace("/(tabs)");
                } else {
                    Alert.alert("오류", "토큰 저장에 실패했습니다. 다시 시도해주세요.");
                }
            } else {
                Alert.alert("오류", response.message || "로그인에 실패했습니다.");
            }
        } catch (error: any) {
            console.error("로그인 오류:", error);
            Alert.alert(
                "로그인 실패",
                error.response?.data?.message || error.message || "로그인 중 오류가 발생했습니다."
            );
        } finally {
            setIsLoading(false);
        }
    };

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
                <AuthTextField 
                    icon={<User />} 
                    placeholder="이메일"
                    value={id}
                    onChangeText={setId}
                    autoCapitalize="none"
                    keyboardType="email-address"
                />
                <AuthTextField 
                    icon={<Lock/>} 
                    placeholder="비밀번호" 
                    isSecret
                    value={password}
                    onChangeText={setPassword}
                />
                <Button 
                    label={isLoading ? "로그인 중..." : "로그인"} 
                    onPress={handleLogin}
                    disabled={isLoading || !id || !password}
                />
                <DividerText/>            
                {/* <OAuthLoginButtonContainer>
                    <OAuthLoginButton icon={<GoogleIcon/>}/>
                    <OAuthLoginButton icon={<AppleIcon/>}/>
                </OAuthLoginButtonContainer> */}
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
    
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    
    width: 100%;

    gap: 14px;
`

const OAuthLoginButtonContainer = styled.View`
    
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 15px;
`