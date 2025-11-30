import React, { useState } from 'react'
import { View } from 'react-native'
import styled from 'styled-components'
import { VoiceElem } from './ui/voice-elem'
import { SubmitButton } from '@/ui/SubmitButton'

export const VoiceSelect = ({onClose}:{onClose: () => void}) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const voices = [0,1,2,3,4,5] 

  return (
    <Container>
      {voices.map((v, index) => (
        index % 2 === 0 && (
          <View key={index} style={{ flexDirection: 'row', gap: 10 }}>
            <VoiceElem 
              isSelected={selectedIndex === index} 
              onPress={() => setSelectedIndex(index)}
            />
            {voices[index + 1] !== undefined && (
              <VoiceElem 
                isSelected={selectedIndex === index + 1}
                onPress={() => setSelectedIndex(index + 1)}
              />
            )}
          </View>
        )
      ))}
      <SubmitButton onClick={onClose}>선택</SubmitButton>
    </Container>
  )
}

const Container = styled(View)`
  flex: 1;
  gap: 10px;
  padding: 12px;
  position: relative;
`

