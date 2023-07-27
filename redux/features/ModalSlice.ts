import {createSlice} from '@reduxjs/toolkit'

interface StateTypes {
    proModal:boolean
}

const initialState : StateTypes = {
    proModal:false
}

const modalSlice = createSlice({
    name:"modal",
    initialState,
    reducers:{
        openProModal : (state) => {
            state.proModal = true
        },
        closeProModal : (state) => {
            state.proModal = false
        }
    },
    extraReducers:{
        
    }
})

export const {openProModal, closeProModal} = modalSlice.actions

export default modalSlice.reducer