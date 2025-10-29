import styled from "styled-components/native"
import { TextInputProps, TouchableOpacity } from "react-native"
import { useState } from "react";
import {Eye, EyeOff} from "lucide-react-native"
import TextInput from "../ui/TextInput";
interface AuthTextFieldProps extends TextInputProps{
    icon: React.ReactNode;
    isSecret?: boolean;
}

export default function AuthTextField({ icon, isSecret = false, ...props }: AuthTextFieldProps) {
    const [isSecretText, setIsSecretText] = useState(isSecret);
    
    return (
        <Container>
            {icon}
            <Divider/>
            <TextInput
                {...props}
                placeholderTextColor="#A3A3A3"
                style={{ flex: 1, height: "100%", color: "white" }}
                secureTextEntry={isSecretText}
                autoComplete="off"
                autoCapitalize="none"
                autoCorrect={false}
                autoFocus={false}
            />
            {
                isSecret && (
                    <TouchableOpacity onPress={() => setIsSecretText(!isSecretText)}>
                        {isSecretText ? <Eye size={16} color={"#A3A3A3"}/> : <EyeOff size={16} color={"#A3A3A3"}/>}
                    </TouchableOpacity>
                )
            }
        </Container>
    )
}

const Container = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: 18px;

    width: 100%;
    height: 50px;

    border-radius: 8px;
    background-color: #262626;
    
    padding: 0 18px;
`

const Divider = styled.View`
    width: 0.5px;
    height: 30px;
    background-color: #737373;
`
