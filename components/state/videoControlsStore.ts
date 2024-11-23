import servers from "@/constants/servernames";
import { SERVER_NAME, SERVER_NAMES } from "@/types";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface VideoControlsState {
  autoSkipIntro: boolean;
  autoSkipOutro: boolean;
  server: SERVER_NAME;
  setAutoSkipIntro: (value: boolean) => any;
  setAutoSkipOutro: (value: boolean) => any;
  setServer: (value: SERVER_NAME) => any;
}

const useVideoControlsStore = create(
  persist<VideoControlsState>(
    (set) => ({
      autoSkipIntro: false,
      autoSkipOutro: false,
      server: servers.VIDSTREAMING_SUB,
      setAutoSkipIntro: (value) => set({ autoSkipIntro: value }),
      setAutoSkipOutro: (value) => set({ autoSkipOutro: value }),
      setServer: (value: SERVER_NAME) => set({ server: value }),
    }),
    {
      name: "video-controls-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useVideoControlsStore;
