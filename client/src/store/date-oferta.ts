import {createSlice} from '@reduxjs/toolkit'
// import type { PayloadAction } from "@reduxjs/toolkit";


const initialOffersState = { tipAsigurare: ["Rca", "Casco"] };

const offerSlice = createSlice({
  name: "oferta",
  initialState: initialOffersState,
  reducers: {
    addaugaAutorizatii(state){
      //...
    }
  },
});

export default offerSlice.reducer;

export const offerActions = offerSlice.actions;