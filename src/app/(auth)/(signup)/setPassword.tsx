import { useTheme } from "styled-components/native";
import Body from "@/components/ui/Body";
import styled from "styled-components/native";
import Text from "@/components/ui/Text";
import { useMemo, useState } from "react";
import { router } from "expo-router";
import { useAuthRegisterStore } from "@/stores/useAuthRegisterStore";
import AuthNextButton from "@/components/auth/AuthNextButton";
import AuthTextField from "@/components/auth/AuthTextField";
import Lock from "@/components/icons/Lock";
import { registerUser } from "@/features/auth/signup/api";
import { Alert } from "react-native";
import * as SecureStore from "expo-secure-store";
import { loginUser } from "@/features/auth/login/api";

export default function SetPasswordScreen() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { 
        email, 
        id, 
        setPassword: setStorePassword, 
        setConfirmPassword: setStoreConfirmPassword,
        reset 
    } = useAuthRegisterStore();

    const isLengthValid = useMemo(() => password.length >= 8, [password]);
    const isMatch = useMemo(() => confirmPassword.length > 0 && password === confirmPassword, [password, confirmPassword]);
    const canProceed = useMemo(() => isLengthValid && isMatch, [isLengthValid, isMatch]);

    const handleNext = async () => {
        if (!canProceed) return;

        if (!email || !id) {
            Alert.alert("오류", "이메일과 아이디를 확인해주세요.");
            return;
        }

        setIsLoading(true);
        try {
            setStorePassword(password);
            setStoreConfirmPassword(confirmPassword);
            
            const response = await registerUser({
                email,
                id,
                password,
            });

            if (response.status === "success" || response.data) {
                // 회원가입 성공 후 자동 로그인
                try {
                    const loginResponse = await loginUser(id, password);
                    if (loginResponse.data?.accessToken) {
                        await SecureStore.setItemAsync("accessToken", loginResponse.data.accessToken);
                        if (loginResponse.data.refreshToken) {
                            await SecureStore.setItemAsync("refreshToken", loginResponse.data.refreshToken);
                        }
                        
                        // 토큰 저장 확인
                        const savedToken = await SecureStore.getItemAsync("accessToken");
                        if (savedToken) {
                            console.log('[회원가입] 토큰 저장 완료');
                            reset();
                            router.replace("/(tabs)");
                        } else {
                            Alert.alert("오류", "토큰 저장에 실패했습니다. 다시 시도해주세요.");
                        }
                    }
                } catch (loginError: any) {
                    console.error("자동 로그인 오류:", loginError);
                    Alert.alert("회원가입 완료", "회원가입이 완료되었습니다. 로그인해주세요.", [
                        { text: "확인", onPress: () => router.replace("/(auth)/signin") }
                    ]);
                }
            } else {
                Alert.alert("오류", response.message || "회원가입에 실패했습니다.");
            }
        } catch (error: any) {
            console.error("회원가입 오류:", error);
            Alert.alert(
                "회원가입 실패",
                error.response?.data?.message || error.message || "회원가입 중 오류가 발생했습니다."
            );
        } finally {
            setIsLoading(false);
        }
    };

    const theme = useTheme();
    return <Body dismiss>
        <TextContainer>
            <Text weight="extrabold" size={24} align="left">비밀번호를 입력 후,</Text>
            <Text weight="extrabold" size={24} align="left">비밀번호 확인을 진행해주세요</Text>
            <EmailVerifyContainer>
                <AuthTextField 
                    value={password}
                    onChangeText={setPassword}
                    icon={<Lock/>}
                    isSecret
                    placeholder="비밀번호를 입력해주세요 (8자 이상)"
                />
                {!isLengthValid && password.length > 0 && (
                    <Text weight="medium" size={12} align="left" color={theme.colors.status.negative}>8자 이상 입력해주세요.</Text>
                )}
                <AuthTextField 
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    icon={<Lock/>}
                    isSecret
                    placeholder="입력한 비밀번호를 한 번 더 입력해주세요"
                />
                {!isMatch && confirmPassword.length > 0 && (
                    <Text weight="medium" size={12} align="left" color={theme.colors.status.negative}>비밀번호가 일치하지 않습니다.</Text>
                )}
            </EmailVerifyContainer>
            <AuthNextButton 
                onPress={handleNext}
                disabled={!canProceed}
                step={3}
            />
        </TextContainer>
    </Body>
}

const TextContainer = styled.View`
    width: 100%;
    margin-top: 120px;
`

const EmailVerifyContainer = styled.View`
    width: 100%;
    margin-top: 70px;
    height: 160px;
    
    flex-direction: column;
    gap: 14px;
`