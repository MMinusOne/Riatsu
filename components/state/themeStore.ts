import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface ThemeState {
  theme: string;
  setTheme: (theme: string) => void;
}

const useThemeStore = create(
  persist<ThemeState>(
    (set) => ({
      theme: "black",
      setTheme: (theme: string) => set({ theme: theme }),
    }),
    {
      name: "theme",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useThemeStore;
