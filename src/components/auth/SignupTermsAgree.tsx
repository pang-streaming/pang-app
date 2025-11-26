import styled, { useTheme } from "styled-components/native"
import AuthCheckbox from "./AuthCheckbox"
import Text from "@/components/ui/Text"
import { useAuthRegisterStore } from "@/stores/useAuthRegisterStore"
import { router } from "expo-router"

export default function SignupTermsAgree() {
    const theme = useTheme();
    const { allAgree, termAgree, privacyAgree, setAllAgree, setTermAgree, setPrivacyAgree } = useAuthRegisterStore();

    return (
        <SignupTermsAgreeContainer>
            <AuthCheckbox 
                isChecked={allAgree}
                element={
                    <Text 
                        size={16} 
                        weight="medium" 
                        align="left"
                    >
                        약관 전체 동의
                    </Text>
                } 
                onValueChange={setAllAgree}
                background={true}
            />
            <AuthCheckbox 
                isChecked={termAgree}
                element={
                    <TermsAgreeTextContainer>
                        <Text 
                            size={16} 
                            weight="medium" 
                            align="left"
                            onPress={() => {router.push("/(auth)/(signup)/terms")}}
                            style={{ textDecorationLine: 'underline', color: theme.colors.hover.normal }}
                        >
                            서비스 이용 약관
                        </Text>
                        <Text 
                            size={16} 
                            weight="medium" 
                            align="left"
                        >
                            에 동의
                        </Text>
                    </TermsAgreeTextContainer>
                } 
                onValueChange={setTermAgree}
            />
            <AuthCheckbox 
                isChecked={privacyAgree}
                element={
                    <TermsAgreeTextContainer>
                        <Text 
                            size={16} 
                            weight="medium" 
                            align="left"
                            onPress={() => {router.push("/(auth)/(signup)/terms")}}
                            style={{ textDecorationLine: 'underline', color: theme.colors.hover.normal }}
                        >
                            개인정보 수집 및 이용 동의
                        </Text>
                        <Text 
                            size={16} 
                            weight="medium" 
                            align="left"
                        >
                            에 동의
                        </Text>
                    </TermsAgreeTextContainer>
                } 
                onValueChange={setPrivacyAgree}
            />        
        </SignupTermsAgreeContainer>
    )
}




const SignupTermsAgreeContainer = styled.View`
    
    margin-top: 70px;
    gap:5px;
    height: 160px;
`


const TermsAgreeTextContainer = styled.View`
    
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
`