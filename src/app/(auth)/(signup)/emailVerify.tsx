import Body from "@/components/ui/Body";
import styled from "styled-components/native";
import Text from "@/components/ui/Text";
import { useMemo, useState } from "react";
import { router } from "expo-router";
import SignupTermsAgree from "@/components/auth/SignupTermsAgree";
import { useAuthRegisterStore } from "@/stores/useAuthRegisterStore";
import Button from "@/components/ui/Button";
import AuthNextButton from "@/components/auth/AuthNextButton";
import AuthTextField from "@/components/auth/AuthTextField";
import User from "@/components/icons/User";
import SideActionTextField from "@/components/auth/SideActionTextField";
import { SendHorizonal } from "lucide-react-native";

export default function EmailVerifyScreen() {
    const [email, setEmail] = useState("");
    const [checkedEmail, setCheckedEmail] = useState(false);

    const handleNext = () => {
        if (email.length !== 0 && checkedEmail) {
            router.push("/(auth)/(signup)/checkUsername");
        }
    };

    return <Body dismiss>
        <TextContainer>
            <Text weight="extrabold" size={24} align="left" color="white">이메일을 입력한 후,</Text>
            <Text weight="extrabold" size={24} align="left" color="white">이메일 인증을 진행해주세요</Text>
            <EmailVerifyContainer>
                <SideActionTextField 
                    value={email}
                    onChangeText={setEmail}
                    icon={<User/>} 
                    keyboardType="email-address"
                    placeholder="이메일을 입력해주세요"
                    actionIcon={<SendHorizonal size={16} color="#262626"/>}
                    actionOnPress={() => {setCheckedEmail(true)}}
                />
            </EmailVerifyContainer>
            <AuthNextButton 
                onPress={handleNext} 
                disabled={email.length === 0 || !checkedEmail} 
                step={2}
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
`