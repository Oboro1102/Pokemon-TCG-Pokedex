import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import setsReducer from './modules/setsSlice'
import deckReducer from './modules/deckSlice'

export const store = configureStore({
    reducer: {
        sets: setsReducer,
        deck: deckReducer
    }
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;