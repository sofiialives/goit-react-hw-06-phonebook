import { createSlice } from '@reduxjs/toolkit';

const initialNames = {
  name: '',
  number: '',
};

const formSlice = createSlice({
  name: 'form',
  initialState: initialNames,
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
    setNumber: (state, action) => {
      state.number = action.payload;
    },
  },
});

export const { setNumber, setName } = formSlice.actions;
export const formTask = formSlice.reducer;
