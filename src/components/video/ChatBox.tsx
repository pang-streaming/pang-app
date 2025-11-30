import { useState } from 'react';
import { TextInput, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import type { ThemeProps } from '@/theme/types';
import Text from '@/components/ui/Text';
import ChatMessages from './ChatMessages';
import { LaughIcon, SendIcon } from 'lucide-react-native';
import { useStreamViewer } from '@/hooks/useStreamViewer';

export interface ChatMessage {
  id: string;
  username: string;
  message: string;
  timestamp: Date;
  isSystem?: boolean;
}

interface ChatBoxProps {
  messages?: ChatMessage[];
  onSendMessage?: (message: string) => void;
  placeholder?: string;
  onBombPress?: () => void;
}

export default function ChatBox({
  messages = [],
  onSendMessage,
  placeholder = '메시지를 입력하세요...',
  onBombPress,
}: ChatBoxProps) {
  const insets = useSafeAreaInsets();
  const [inputText, setInputText] = useState('');
  const [isAtBottom, setIsAtBottom] = useState(true);

  const handleSend = () => {
    if (inputText.trim() && onSendMessage) {
      onSendMessage(inputText.trim());
      setInputText('');
      setIsAtBottom(true);
    }
  };

  return (
    <Container>
      <ContentWrapper>

        <ChatMessages
          messages={messages}
          onScrollStateChange={setIsAtBottom}
        />
      </ContentWrapper>

      <InputWrapper bottomInset={insets.bottom}>
        <InputRow>
          <InputFieldContainer>
            <TextInput
              style={{
                flex: 1,
                color: '#FFFFFF',
                fontSize: 13,
                paddingLeft: 16,
                paddingRight: 8,
                paddingVertical: 12,
              }}
              placeholder="채팅창 문구"
              placeholderTextColor="#A3A3A3"
              value={inputText}
              onChangeText={setInputText}
              onSubmitEditing={handleSend}
              multiline={false}
            />
            <IconButton onPress={() => {}}>
              <LaughIcon size={20} color="#FFFFFF" />
            </IconButton>
            <IconButton onPress={handleSend} disabled={!inputText.trim()}>
              <SendIcon size={20} color="#FFFFFF" />
            </IconButton>
          </InputFieldContainer>
          <BombButton onPress={() => {
            if (onBombPress) {
              onBombPress();
            }
          }}>
            <BombIcon>
              <Text size={24} color="#FFFFFF">💣</Text>
            </BombIcon>
          </BombButton>
        </InputRow>
      </InputWrapper>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  width: 100%;
  
`

const ContentWrapper = styled.View`
  flex: 1;
  background-color: ${({ theme }: ThemeProps) => theme.colors.background.normal};
`

const InputWrapper = styled.View<{ bottomInset: number }>`
  background-color: ${({ theme }: ThemeProps) => theme.colors.background.normal};
  padding: 10px 16px;
  padding-bottom: ${({ bottomInset }: { bottomInset: number }) => Math.max(12, bottomInset)}px;
  border-top-width: 1px;
  border-top-color: #222324;
  
`

const InputRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
`

const InputFieldContainer = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme }: ThemeProps) => theme.colors.content.normal};
  height: 40px;
  border-radius: 8px;
  padding-right: 8px;
`

const IconButton = styled(Pressable)<{ disabled?: boolean }>`   
    margin-left: 10px;
    align-items: center;
    justify-content: center;
    opacity: ${({ disabled }: { disabled?: boolean }) => disabled ? 0.5 : 1};
`

const BombButton = styled(Pressable)`
  width: 48px;
  height: 48px;
  align-items: center;
  justify-content: center;
`

const BombIcon = styled.View`
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
`

const SafeAreaBackground = styled.View<{ bottomInset: number }>`
  height: ${({ bottomInset }: { bottomInset: number }) => bottomInset}px;
  background-color: ${({ theme }: ThemeProps) => theme.colors.background.normal};
`

