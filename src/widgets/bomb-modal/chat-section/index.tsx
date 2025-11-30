
import { useState } from "react";
import { VoiceSelect } from "./voice-select/index";
import { DonationSection } from "./donation";

export const BombModalChatSection = () => {
  const [voiceSelect, setVoiceSelect] = useState(false);

  return !voiceSelect ? (
    <DonationSection onPress={() => {setVoiceSelect(true)}}/>
  ) : (
    <VoiceSelect
      onClose={() => {setVoiceSelect(false);}}
    />
  );
};
