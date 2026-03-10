import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from ".";

export type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
  thumbnail?: string;
  images?: string[];
  description: string;
  date: string;
  seller: {
    id: string;
    name: string;
    avatar?: string;
  };
};

const initialState: Product[] = [];

const listingSlice = createSlice({
  name: "listings",
  initialState,
  reducers: {
    updateListings(_, { payload }: PayloadAction<Product[]>) {
      return payload 
    },
    deleteItem(oldListings, { payload }: PayloadAction<{id: string}>) {
      return oldListings.filter((item)=> item.id !== payload.id) 
    },
  },
});

const listingsReducer = listingSlice.reducer;
export default listingsReducer;
export const getListingsState = createSelector(
  (state: RootState) => state,
  (state) => state.listings
)
export const {updateListings, deleteItem} = listingSlice.actions;