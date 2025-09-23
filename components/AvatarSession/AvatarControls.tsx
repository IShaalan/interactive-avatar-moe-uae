import { ToggleGroup, ToggleGroupItem } from "@radix-ui/react-toggle-group";
import React from "react";

import { useVoiceChat } from "../logic/useVoiceChat";
import { Button } from "../Button";
import { useInterrupt } from "../logic/useInterrupt";

import { AudioInput } from "./AudioInput";
import { TextInput } from "./TextInput";

export const AvatarControls: React.FC = () => {
  const {
    isVoiceChatLoading,
    isVoiceChatActive,
    startVoiceChat,
    stopVoiceChat,
  } = useVoiceChat();
  const { interrupt } = useInterrupt();

  return (
    <div className="flex flex-col gap-6 w-full items-center max-w-lg mx-auto h-full">
      {/* Interrupt Button - Positioned at the top */}
      <div className="w-full flex justify-end">
        <Button
          className="!bg-white !text-[#003399] !border-[#003399] hover:!bg-[#003399] hover:!text-white"
          size="sm"
          variant="outline"
          onClick={interrupt}
        >
          ⏹️ Interrupt
        </Button>
      </div>

      {/* Toggle Group */}
      <div className="w-full flex justify-center">
        <ToggleGroup
          className={`bg-[#EAEAEC] rounded-xl p-1 ${isVoiceChatLoading ? "opacity-50" : ""}`}
          disabled={isVoiceChatLoading}
          type="single"
          value={isVoiceChatActive || isVoiceChatLoading ? "voice" : "text"}
          onValueChange={(value) => {
            if (
              value === "voice" &&
              !isVoiceChatActive &&
              !isVoiceChatLoading
            ) {
              startVoiceChat();
            } else if (
              value === "text" &&
              isVoiceChatActive &&
              !isVoiceChatLoading
            ) {
              stopVoiceChat();
            }
          }}
        >
          <ToggleGroupItem
            className="data-[state=on]:bg-[#003399] data-[state=on]:text-white rounded-lg p-3 text-sm  text-center font-medium transition-all duration-200 text-edusofx-dark hover:text-edusofx-primary"
            value="voice"
          >
            🎤 Voice Chat
          </ToggleGroupItem>
          <ToggleGroupItem
            className="data-[state=on]:bg-[#33AA77] data-[state=on]:text-white rounded-lg p-3 text-sm  text-center font-medium transition-all duration-200 text-edusofx-dark hover:text-edusofx-green"
            value="text"
          >
            💬 Text Chat
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      {/* Input Controls */}
      <div className="w-full flex justify-center">
        {isVoiceChatActive || isVoiceChatLoading ? (
          <AudioInput />
        ) : (
          <TextInput />
        )}
      </div>
    </div>
  );
};
