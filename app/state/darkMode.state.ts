import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type DarkModeState = {
    isDarkMode: boolean;
    toggle: () => void;
    enable: () => void;
    disable: () => void;
};

export const useDarkMode = create<DarkModeState>()(
    persist(
        (set) => ({
            isDarkMode:
                typeof window !== 'undefined'
                    ? window.matchMedia('(prefers-color-scheme: dark)').matches
                    : true,
            toggle: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
            enable: () => set({ isDarkMode: true }),
            disable: () => set({ isDarkMode: false }),
        }),
        {
            name: 'dark-mode',
        },
    ),
);
