import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '..';
import type { PayloadAction } from '@reduxjs/toolkit'

// export interface setsState {
//     list: {
//         id: string,
//         name: string,
//         series: string,
//         printedTotal: number,
//         total: number,
//         legalities: {
//             unlimited: string
//         },
//         ptcgoCode: string,
//         releaseDate: string,
//         updatedAt: string,
//         images: {
//             symbol: string,
//             logo: string
//         }
//     }[]
// }

const initialState = {
    setsList: [],
    cardList: []
}

export const setsSlice = createSlice({
    name: 'sets',
    initialState,
    reducers: {
        reset() { return initialState },
        setSetsList(state, action: PayloadAction<never[]>) {
            state.setsList = action.payload.reverse()
        },
        setCardList(state, action: PayloadAction<never[]>) {
            state.cardList = action.payload
        },
    },
})

export const { reset, setSetsList, setCardList } = setsSlice.actions
export const setsList = (state: RootState) => state.sets.setsList;
export const cardList = (state: RootState) => state.sets.cardList;

export default setsSlice.reducer