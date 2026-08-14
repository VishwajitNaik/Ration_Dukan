import { create } from "zustand";

const useAuthStore = create((set) => ({
  token: null,
  owner: null,
  loading: true,

  setAuth: ({ token, owner }) => {
    localStorage.setItem("token", token);
    localStorage.setItem("owner", JSON.stringify(owner));

    set({
      token,
      owner,
      loading: false,
    });
  },

  setOwner: (owner) => {
    localStorage.setItem("owner", JSON.stringify(owner));

    set({ owner });
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("owner");

    set({
      token: null,
      owner: null,
      loading: false,
    });
  },

  loadAuth: () => {
    const token = localStorage.getItem("token");
    const owner = localStorage.getItem("owner");

    set({
      token,
      owner: owner ? JSON.parse(owner) : null,
      loading: false,
    });
  },

  setLoading: (loading) => set({ loading }),
}));

export default useAuthStore;