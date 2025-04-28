import { create } from "zustand";
import { createAuthSlice } from "./slices/authSlice";


export const useAppStore = create()((...a) => ({
  ...createAuthSlice(...a),
}))


// import { create } from "zustand";
// import { createAuthSlice } from "./slices/authSlice";

// // Correctly create the store by passing a function to `create()`
// export const useAppStore = create((set, get) => ({
//   ...createAuthSlice(set, get), // Spread the returned object from createAuthSlice
// }));
