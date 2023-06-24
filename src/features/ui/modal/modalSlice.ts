import { createSlice } from '@reduxjs/toolkit';

type ModalProps = {
  isOpen: boolean;
}

const initialState:ModalProps = {isOpen:false}

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state) => {
      console.log('state:', state)
      state.isOpen = true
    },
    closeModal: (state) => {
      state.isOpen = false
    },
  },
})

export const { openModal, closeModal } = modalSlice.actions

export default modalSlice.reducer
