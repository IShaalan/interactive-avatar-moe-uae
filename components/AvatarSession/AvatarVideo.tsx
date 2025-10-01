import React, { forwardRef } from "react";
import { ConnectionQuality } from "@heygen/streaming-avatar";
import Image from "next/image";

import { useConnectionQuality } from "../logic/useConnectionQuality";
import { useStreamingAvatarSession } from "../logic/useStreamingAvatarSession";
import { StreamingAvatarSessionState } from "../logic";
import { CloseIcon } from "../Icons";
import { Button } from "../Button";

export const AvatarVideo = forwardRef<HTMLVideoElement>(({}, ref) => {
  const { sessionState, stopAvatar } = useStreamingAvatarSession();
  const { connectionQuality } = useConnectionQuality();

  const isLoaded = sessionState === StreamingAvatarSessionState.CONNECTED;

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {connectionQuality !== ConnectionQuality.UNKNOWN && (
        <div className="absolute top-4 left-4 bg-gradient-to-r from-[#003399] to-[#33AA77] text-white rounded-lg px-3 py-2 text-sm font-medium shadow-edusofx z-20">
          Connection Quality: {connectionQuality}
        </div>
      )}
      {isLoaded && (
        <Button
          className="absolute top-4 right-4 !p-2 !bg-white !text-[#003399] !border !border-[#003399] hover:!bg-[#003399] hover:!text-white z-20 shadow-edusofx"
          size="sm"
          onClick={stopAvatar}
        >
          <CloseIcon size={16} />
        </Button>
      )}
      <div className="w-full h-full flex items-center justify-center">
        <video
          ref={ref}
          autoPlay
          playsInline
          className="w-full h-full object-cover rounded-lg"
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
            objectFit: "cover",
          }}
        >
          <track kind="captions" />
        </video>
      </div>
      {!isLoaded && (
        <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-gradient-to-br from-[#EAEAEC] to-white rounded-lg">
          <div className="flex flex-col items-center gap-3">
            <Image
              fill
              alt="Avatar"
              //className="object-cover opacity-50 blur-sm"
              className="object-contain w-full h-full"
              src="/avatar_cover_photo.png"
            />
          </div>
        </div>
      )}
    </div>
  );
});
AvatarVideo.displayName = "AvatarVideo";
