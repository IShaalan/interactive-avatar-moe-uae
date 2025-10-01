import {
  AvatarQuality,
  StreamingEvents,
  VoiceChatTransport,
  VoiceEmotion,
  StartAvatarRequest,
  STTProvider,
  ElevenLabsModel,
} from "@heygen/streaming-avatar";
import { useEffect, useRef } from "react";
import { useMemoizedFn, useUnmount } from "ahooks";

import { Button } from "./Button";
import { AvatarVideo } from "./AvatarSession/AvatarVideo";
import { useStreamingAvatarSession } from "./logic/useStreamingAvatarSession";
import { AvatarControls } from "./AvatarSession/AvatarControls";
import { useVoiceChat } from "./logic/useVoiceChat";
import { StreamingAvatarProvider, StreamingAvatarSessionState } from "./logic";
import { LoadingIcon } from "./Icons";
import { MessageHistory } from "./AvatarSession/MessageHistory";

const DEFAULT_CONFIG: StartAvatarRequest = {
  quality: AvatarQuality.High,
  //avatarName: "Amina_ProfessionalLook_public", // Custom avatar ID will be set here
  avatarName: "3f3a0986438b4456babda9c7ae8a025e", // Custom avatar ID will be set here
  knowledgeId: "69435cd0d3ca458896b378d48eaf7ffa", // Custom knowledge base ID will be set here
  voice: {
    rate: 0.75,
    emotion: VoiceEmotion.EXCITED,
    model: ElevenLabsModel.eleven_flash_v2_5,
  },
  language: "ar",
  voiceChatTransport: VoiceChatTransport.WEBSOCKET,
  sttSettings: {
    provider: STTProvider.GLADIA,
    confidence: 0.4,
  },
};

function InteractiveAvatar() {
  const { initAvatar, startAvatar, stopAvatar, sessionState, stream } =
    useStreamingAvatarSession();
  const { startVoiceChat } = useVoiceChat();

  const mediaStream = useRef<HTMLVideoElement>(null);

  async function fetchAccessToken() {
    try {
      const response = await fetch("/api/get-access-token", {
        method: "POST",
      });
      const token = await response.text();

      console.log("Access Token:", token); // Log the token to verify

      return token;
    } catch (error) {
      console.error("Error fetching access token:", error);
      throw error;
    }
  }

  const startSessionV2 = useMemoizedFn(async (isVoiceChat: boolean) => {
    try {
      const newToken = await fetchAccessToken();
      const avatar = initAvatar(newToken);

      avatar.on(StreamingEvents.AVATAR_START_TALKING, (e) => {
        console.log("Avatar started talking", e);
      });
      avatar.on(StreamingEvents.AVATAR_STOP_TALKING, (e) => {
        console.log("Avatar stopped talking", e);
      });
      avatar.on(StreamingEvents.STREAM_DISCONNECTED, () => {
        console.log("Stream disconnected");
      });
      avatar.on(StreamingEvents.STREAM_READY, (event) => {
        console.log(">>>>> Stream ready:", event.detail);
      });
      avatar.on(StreamingEvents.USER_START, (event) => {
        console.log(">>>>> User started talking:", event);
      });
      avatar.on(StreamingEvents.USER_STOP, (event) => {
        console.log(">>>>> User stopped talking:", event);
      });
      avatar.on(StreamingEvents.USER_END_MESSAGE, (event) => {
        console.log(">>>>> User end message:", event);
      });
      avatar.on(StreamingEvents.USER_TALKING_MESSAGE, (event) => {
        console.log(">>>>> User talking message:", event);
      });
      avatar.on(StreamingEvents.AVATAR_TALKING_MESSAGE, (event) => {
        console.log(">>>>> Avatar talking message:", event);
      });
      avatar.on(StreamingEvents.AVATAR_END_MESSAGE, (event) => {
        console.log(">>>>> Avatar end message:", event);
      });

      await startAvatar(DEFAULT_CONFIG);

      if (isVoiceChat) {
        await startVoiceChat();
      }
    } catch (error) {
      console.error("Error starting avatar session:", error);
    }
  });

  useUnmount(() => {
    stopAvatar();
  });

  useEffect(() => {
    if (stream && mediaStream.current) {
      mediaStream.current.srcObject = stream;
      mediaStream.current.onloadedmetadata = () => {
        mediaStream.current!.play();
      };
    }
  }, [mediaStream, stream]);

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="flex flex-col rounded-2xl bg-white shadow-edusofx-medium overflow-hidden border border-edusofx h-[600px]">
        {/* Video Container - Fixed height */}
        <div className="relative w-full h-[350px] overflow-hidden bg-gradient-to-br from-[#EAEAEC] to-white">
          <AvatarVideo ref={mediaStream} />
        </div>
        
        {/* Controls Container - Fixed height and position */}
        <div className="flex-1 flex flex-col items-center justify-center p-6 border-t border-edusofx bg-white">
          {sessionState === StreamingAvatarSessionState.CONNECTED ? (
            <AvatarControls />
          ) : sessionState === StreamingAvatarSessionState.INACTIVE ? (
            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
              <Button
                className="flex-1"
                size="lg"
                variant="primary"
                onClick={() => startSessionV2(true)}
              >
                🎤 Start Voice Chat
              </Button>
              <Button
                className="flex-1"
                size="lg"
                variant="secondary"
                onClick={() => startSessionV2(false)}
              >
                💬 Start Text Chat
              </Button>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3">
              <LoadingIcon className="text-edusofx-primary" />
              <p className="text-sm text-edusofx-dark font-medium">
                Connecting to avatar...
              </p>
            </div>
          )}
        </div>
      </div>
      {sessionState === StreamingAvatarSessionState.CONNECTED && (
        <MessageHistory />
      )}
    </div>
  );
}

export default function InteractiveAvatarWrapper() {
  return (
    <StreamingAvatarProvider basePath={process.env.NEXT_PUBLIC_BASE_API_URL}>
      <InteractiveAvatar />
    </StreamingAvatarProvider>
  );
}
