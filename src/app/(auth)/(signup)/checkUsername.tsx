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
import { Check, SendHorizonal } from "lucide-react-native";

export default function CheckUsernameScreen() {
    const [username, setUsername] = useState("");
    const [checkedAvailable, setCheckedAvailable] = useState(false);

    const handleNext = () => {
        if (username.length !== 0 && checkedAvailable) {
            router.push("/(auth)/(signup)/setPassword");
        }
    };

    return <Body dismiss>
        <TextContainer>
            <Text weight="extrabold" size={24} align="left" color="white">아이디 입력한 후,</Text>
            <Text weight="extrabold" size={24} align="left" color="white">아이디 중복 체크를 진행해주세요</Text>
            <EmailVerifyContainer>
                <SideActionTextField 
                    value={username}
                    onChangeText={setUsername}
                    icon={<User/>} 
                    placeholder="사용자 이름을 입력해주세요"
                    actionIcon={<Check size={16} color="#262626"/>}
                    actionOnPress={() => {setCheckedAvailable(true)}}
                />
            </EmailVerifyContainer>
            <AuthNextButton 
                onPress={handleNext} 
                disabled={username.length === 0 || !checkedAvailable} 
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
`