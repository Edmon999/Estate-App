import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { EViewMode, IRealEstateItem } from "./interfaces/interfaces";
import { API_URL } from "../../constants";

export interface IRealEstateState {
  properties: IRealEstateItem[];
  filteredProperties: IRealEstateItem[];
  viewMode: EViewMode;
  error: string | null;
}

const initialState: IRealEstateState = {
  properties: [],
  filteredProperties: [],
  error: null,
  viewMode: EViewMode.user,
};

export const getRealEstatesData = createAsyncThunk<IRealEstateItem[]>(
  "realEstate/getRealEstatesData",
  async () => {
    const response = await fetch(`${API_URL}/properties`);
    const data = await response.json();
    return data;
  }
);

export const createNewData = createAsyncThunk<IRealEstateItem, IRealEstateItem>(
  "realEstate/createProperty",
  async (propertyData) => {
    const response = await fetch(`${API_URL}/properties`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(propertyData),
    });
    const data = await response.json();
    return data;
  }
);

export const deleteRealEstateData = createAsyncThunk(
  "realEstate/deleteRealEstateData",
  async (id: number) => {
    await fetch(`${API_URL}/properties/${id}`, {
      method: "DELETE",
    });
    return id;
  }
);

export const editRealEstateData = createAsyncThunk(
  "realEstate/editRealEstateData",
  async (editedData: IRealEstateItem) => {
    const response = await fetch(`${API_URL}/properties/${editedData.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedData),
    });
    const data = await response.json();
    return data;
  }
);

export const realEstateSlice = createSlice({
  name: "realEstate",
  initialState,
  reducers: {
    setFilteredData: (state, action) => {
      state.filteredProperties = action.payload;
    },
    setViewMode: (state, action) => {
      state.viewMode = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getRealEstatesData.fulfilled, (state, action) => {
      state.properties = action.payload;
      state.filteredProperties = action.payload;
    });
    builder.addCase(createNewData.fulfilled, (state, action) => {
      state.properties = [...state.properties, action.payload];
      state.filteredProperties = [...state.filteredProperties, action.payload];
    });
    builder.addCase(deleteRealEstateData.fulfilled, (state, action) => {
      const id = action.payload;
      state.properties = state.properties.filter((item) => item.id !== id);
      state.filteredProperties = state.filteredProperties.filter(
        (item) => item.id !== id
      );
    });
    builder.addCase(editRealEstateData.fulfilled, (state, action) => {
      const editedItem = action.payload;
      const index = state.filteredProperties.findIndex(
        (item) => item.id === editedItem.id
      );
      state.filteredProperties[index] = editedItem;
      state.properties[index] = editedItem;
    });
  },
});

export const { setFilteredData,setViewMode } = realEstateSlice.actions;

export default realEstateSlice.reducer;
