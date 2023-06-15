import {createSlice, PayloadAction} from '@reduxjs/toolkit';

type CatalogState = {
    openModalImport:boolean;
}

const initialState = {
    openModalImport:false
} as CatalogState

const CatalogSlice = createSlice({
    name:'catalog',
    initialState,
    reducers:{
        setOpenModalImport: (state, action: PayloadAction<boolean>) => {
      state.openModalImport = action.payload;
    },},
});

export const { setOpenModalImport } = CatalogSlice.actions;
export default CatalogSlice.reducer