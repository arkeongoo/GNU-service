// src/store/mapUiStore.js
import { create } from "zustand";

export const useMapUiStore = create((set) => ({
  showCctv: true,
  setShowCctv: (v) => set({ showCctv: v }),
  toggleCctv: () => set((s) => ({ showCctv: !s.showCctv })),
}));
