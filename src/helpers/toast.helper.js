import { toast } from "react-toastify";

const toastOptions = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: "dark",
};

export const showSuccessToast = (message) => {
  toast.success(message, toastOptions);
};

export const showErrorToast = (message) => {
  toast.error(message, toastOptions);
};

export const handleApiCall = (promise, messages = {}) => {
  return toast.promise(
    promise,
    {
      pending: messages.pending || "Loading...",
      success: messages.success || "Success!",
      error: {
        render({ data }) {
          return (
            data?.response?.data?.message ||
            messages.error ||
            "An error occurred!"
          );
        },
      },
    },
    toastOptions
  );
};
