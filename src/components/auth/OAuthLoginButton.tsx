import styled from "styled-components/native"
import { TouchableOpacity } from "react-native"
import GoogleIcon from "@/assets/google.svg"

interface OAuthLoginButtonProps {
    icon: React.ReactNode;
    onPress?: () => void;
}

export default function OAuthLoginButton({ icon, onPress }: OAuthLoginButtonProps) {
    return (
      <OAuthLoginButtonContainer onPress={onPress}>
        {icon}
      </OAuthLoginButtonContainer>     
    )
}

const OAuthLoginButtonContainer = styled(TouchableOpacity)`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    
    width: 46px;
    height: 46px;

    border-radius: 8px;

    background-color: #262626;
`