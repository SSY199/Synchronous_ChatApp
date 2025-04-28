

// eslint-disable-next-line no-unused-vars
export const createAuthSlice = (set, get) => ({
  userInfo: null,
  setUserInfo: (userInfo) => {
    set({ userInfo });
  },
});
