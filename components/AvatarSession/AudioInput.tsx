import React from "react";

import { useVoiceChat } from "../logic/useVoiceChat";
import { Button } from "../Button";
import { LoadingIcon, MicIcon, MicOffIcon } from "../Icons";
import { useConversationState } from "../logic/useConversationState";

export const AudioInput: React.FC = () => {
  const { muteInputAudio, unmuteInputAudio, isMuted, isVoiceChatLoading } =
    useVoiceChat();
  const { isUserTalking } = useConversationState();

  const handleMuteClick = () => {
    if (isMuted) {
      unmuteInputAudio();
    } else {
      muteInputAudio();
    }
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <Button
        className={`!p-4 relative !rounded-full !w-16 !h-16 ${
          isMuted ? "!bg-red-500 hover:!bg-red-600" : "!bg-[#33AA77] hover:!bg-[#2A8A66]"
        }`}
        disabled={isVoiceChatLoading}
        onClick={handleMuteClick}
      >
        <div
          className={`absolute left-0 top-0 rounded-full border-2 border-[#33AA77] w-full h-full ${isUserTalking ? "animate-ping" : ""}`}
        />
        {isVoiceChatLoading ? (
          <LoadingIcon className="animate-spin text-white" size={24} />
        ) : isMuted ? (
          <MicOffIcon size={20} className="text-white" />
        ) : (
          <MicIcon size={20} className="text-white" />
        )}
      </Button>
      <div className="text-center">
        <p className="text-sm font-medium text-edusofx-dark">
          {isVoiceChatLoading ? "Connecting..." : isMuted ? "Microphone Muted" : "Tap to mute"}
        </p>
        {isUserTalking && (
          <p className="text-xs text-edusofx-green font-medium animate-pulse">Speaking...</p>
        )}
      </div>
    </div>
  );
};
