import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '..';
import type { PayloadAction } from '@reduxjs/toolkit'

export interface deckListType {
    id: string,
    name: string,
    images: string,
    number: string,
    quantity: number
}

const initialState = {
    deckList: [] as deckListType[]
}

export const deckSlice = createSlice({
    name: 'deck',
    initialState,
    reducers: {
        resetDeckList() { return initialState },
        initialDeckList(state, action: PayloadAction<deckListType[]>) {
            state.deckList = action.payload
        },
        addDeckList(state, action: PayloadAction<{ id: string, name: string, number: string, images: { small: string } }>) {
            const { id, name, number, images } = action.payload
            const card = {
                id, name, number, images: images.small, quantity: 1
            }
            const existCard = state.deckList.findIndex(item => item.id === card.id)
            if (existCard === -1) {
                state.deckList.push(card)
            } else {
                state.deckList[existCard].quantity += 1
            }
            localStorage.setItem('deckList', JSON.stringify(state.deckList))
        },
        removeDeckCard(state, action: PayloadAction<string>) {
            const id = action.payload
            const cardIndex = state.deckList.findIndex(item => item.id === id)
            state.deckList.splice(cardIndex, 1)
            localStorage.setItem('deckList', JSON.stringify(state.deckList))
        },
        tuneCardQuantity(state, action: PayloadAction<{ type: string, id: string }>) {
            const { id, type } = action.payload
            const cardIndex = state.deckList.findIndex(item => item.id === id)
            if (type === 'minus') {
                state.deckList[cardIndex].quantity -= 1
            } else {
                state.deckList[cardIndex].quantity += 1
            }
            localStorage.setItem('deckList', JSON.stringify(state.deckList))
        },
    },
})

export const { resetDeckList, initialDeckList, addDeckList, removeDeckCard, tuneCardQuantity } = deckSlice.actions
export const deckList = (state: RootState) => state.deck.deckList;

export default deckSlice.reducer