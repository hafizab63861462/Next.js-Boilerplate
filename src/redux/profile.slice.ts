import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  email: "",
};

export const profileSlice = createSlice({
  name: "profile-slice",
  initialState,
  reducers: {
    updateProfile: (state, action) => {
      Object.assign(state, action.payload);
    },
    updateProfileEmail: (state, action) => {
      state.email = action.payload.email;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateProfile, updateProfileEmail } = profileSlice.actions;

export default profileSlice.reducer;
