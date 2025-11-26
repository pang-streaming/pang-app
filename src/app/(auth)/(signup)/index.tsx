import Body from "@/components/ui/Body";
import styled from "styled-components/native";
import Text from "@/components/ui/Text";
import { useMemo } from "react";
import { router } from "expo-router";
import SignupTermsAgree from "@/components/auth/SignupTermsAgree";
import { useAuthRegisterStore } from "@/stores/useAuthRegisterStore";
import AuthNextButton from "@/components/auth/AuthNextButton";

export default function SignUpIndexScreen() {
    const { termAgree, privacyAgree } = useAuthRegisterStore();
    
    const canProceed = useMemo(() => {
        return termAgree && privacyAgree;
    }, [termAgree, privacyAgree]);

    const handleNext = () => {
        if (canProceed) {
            router.push("/(auth)/(signup)/emailVerify");
        }
    };

    return <Body dismiss>
        <TextContainer>
            <Text weight="extrabold" size={24} align="left">PANG 서비스 약관에</Text>
            <Text weight="extrabold" size={24} align="left">동의해주세요.</Text>
            <SignupTermsAgree/>
            <AuthNextButton onPress={handleNext} disabled={!canProceed} step={1}/>
        </TextContainer>
    </Body>
}

const TextContainer = styled.View`
    width: 100%;
    margin-top: 120px;
`