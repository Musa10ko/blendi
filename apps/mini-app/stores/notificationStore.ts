// stores/notificationStore.ts
import { create } from 'zustand'

export const useNotificationStore = create((set) => ({
  notifications: [],
  addNotification: (message: string, type: 'success' | 'error' | 'info') => {
    const id = Date.now()
    set((state) => ({
      notifications: [...state.notifications, { id, message, type }],
    }))
    setTimeout(() => {
      set((state) => ({
        notifications: state.notifications.filter((n) => n.id !== id),
      }))
    }, 3000)
  },
}))

// Usage
useNotificationStore().addNotification('Vote submitted!', 'success')