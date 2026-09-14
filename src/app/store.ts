import { configureStore } from '@reduxjs/toolkit'
import themeSlice from '../features/theme/slice/theme-slice'

export const store = configureStore({
  reducer: {
    themeConfig: themeSlice,
  },
})

// Infer the types from the store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
