import api from "./api";

const getUserProfile = () => {
  return api.get("/users/me");
};

const updateUserProfile = (formData) => {
  return api.patch("/users/me", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const userService = {
  getUserProfile,
  updateUserProfile,
};