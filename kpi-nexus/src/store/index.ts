import { create } from 'zustand';
import type { FilterState } from '../types/ui';

interface UIState {
  sidebarCollapsed: boolean;
  activeModal: string | null;
  notificationPanelOpen: boolean;
  toggleSidebar: () => void;
  openModal: (id: string) => void;
  closeModal: () => void;
  toggleNotificationPanel: () => void;
  closeNotificationPanel: () => void;
}

interface FilterStoreState extends FilterState {
  setDomain: (d: FilterState['activeDomain']) => void;
  setKpi: (k: string | null) => void;
  setDateRange: (range: { start: string; end: string }) => void;
  reset: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  sidebarCollapsed: false,
  activeModal: null,
  notificationPanelOpen: false,
  toggleSidebar: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
  openModal: (id) => set({ activeModal: id }),
  closeModal: () => set({ activeModal: null }),
  toggleNotificationPanel: () =>
    set((s) => ({ notificationPanelOpen: !s.notificationPanelOpen })),
  closeNotificationPanel: () => set({ notificationPanelOpen: false }),
}));

const defaultFilter: FilterState = {
  activeDomain: 'All',
  activeKpi: null,
  dateRange: { start: '2025-01', end: '2027-09' },
};

export const useFilterStore = create<FilterStoreState>((set) => ({
  ...defaultFilter,
  setDomain: (d) => set({ activeDomain: d }),
  setKpi: (k) => set({ activeKpi: k }),
  setDateRange: (range) => set({ dateRange: range }),
  reset: () => set(defaultFilter),
}));
