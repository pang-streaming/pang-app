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

export default function SetPasswordScreen() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const { setPassword: setStorePassword, setConfirmPassword: setStoreConfirmPassword } = useAuthRegisterStore();

    const isLengthValid = useMemo(() => password.length >= 8, [password]);
    const isMatch = useMemo(() => confirmPassword.length > 0 && password === confirmPassword, [password, confirmPassword]);
    const canProceed = useMemo(() => isLengthValid && isMatch, [isLengthValid, isMatch]);

    const handleNext = () => {
        if (canProceed) {
            setStorePassword(password);
            setStoreConfirmPassword(confirmPassword);
            router.replace("/(tabs)");
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
    display: flex;
    flex-direction: column;
    gap: 14px;
`