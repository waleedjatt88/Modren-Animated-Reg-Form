import React, { useState, useRef, useEffect, useCallback } from "react";
import { useAuth } from "../../context/AuthContext";
import { userService } from "../../services/userService";
import "./Dashboard.css";
import { handleApiCall } from "../../helpers/toast.helper";

const capitalizeFirstLetter = (string) => {
  if (!string) return "";
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const CustomerDashboard = ({ onBack }) => {
  const { user, logout, updateUser } = useAuth();
  const [loading, setLoading] = useState(true);

  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [profilePicUrl, setProfilePicUrl] = useState(null);
  const [newProfilePicFile, setNewProfilePicFile] = useState(null);

  const fileInputRef = useRef(null);
  const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

  const loadProfile = useCallback(async () => {
  if (!user) return;

  await handleApiCall(
    () => userService.getUserProfile(),   // ✅ function pass
    {
      pending: "Loading profile...",
      error: "Loading profile failed",
    }
  ).then((response) => {
    const userData = response.data;
    setFullName(userData.fullName || "");
    setPhoneNumber(userData.phoneNumber || "");
    setAddress(userData.address || "");
    if (userData.ProfilePictures?.length > 0) {
      const picData = userData.ProfilePictures[0];
      setProfilePicUrl(picData?.url ? `${BASE_URL}${picData.url}` : null);
    } else {
      setProfilePicUrl(null);
    }
  });
}, [user, BASE_URL]);


  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

 const handleProfileUpdate = async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append("fullName", fullName);
  formData.append("phoneNumber", phoneNumber);
  formData.append("address", address);

  if (newProfilePicFile) {
    formData.append("profilePicture", newProfilePicFile);
  }

  try {
    const response = await handleApiCall(
      userService.updateUserProfile(formData),
      {
        pending: "Updating profile...",
        success: "Profile updated successfully!",
        error: "Error updating profile.",
      }
    );

    const updatedUserFromServer = response.data;
    updateUser(updatedUserFromServer);

    if (
      updatedUserFromServer.ProfilePictures &&
      updatedUserFromServer.ProfilePictures.length > 0
    ) {
      const picData = updatedUserFromServer.ProfilePictures[0];
      setProfilePicUrl(`${BASE_URL}${picData.url}`);
    } else {
      setProfilePicUrl(null);
    }

    setNewProfilePicFile(null);
  } catch (err) {
    console.error("Profile update failed:", err);
  }
};


  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewProfilePicFile(file);
      const previewUrl = URL.createObjectURL(file);
      setProfilePicUrl(previewUrl);
    }
  };

  const handleProfilePicClick = () => {
    fileInputRef.current.click();
  };

  if (loading && !fullName) {
    return (
      <div className="dashboard-container">
        <div className="dashboard-card">
          <h2>Loading Profile...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-card profile-view">
        <i
          className="bx bx-arrow-back back-icon"
          onClick={onBack}
          title="Back to Home"
        ></i>
        <i
          className="bx bx-log-out logout-icon"
          onClick={logout}
          title="Logout"
        ></i>

        <div className="profile-pic-container" onClick={handleProfilePicClick}>
          <img
            src={
              profilePicUrl ||
              `https://api.dicebear.com/7.x/initials/svg?seed=${
                fullName || user?.email || "U"
              }`
            }
            alt="Profile"
            className="profile-pic-img"
          />
        </div>

        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
          accept="image/png, image/jpeg"
        />

        <form onSubmit={handleProfileUpdate}>
          <div className="input-group">
            <input
              id="fullName"
              type="text"
              className="input-field"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
            <label htmlFor="fullName" className="input-label">
              Full Name
            </label>
          </div>
          <div className="input-group">
            <input
              id="email"
              type="email"
              className="input-field"
              value={user ? user.email : ""}
              disabled
            />
            <label htmlFor="email" className="input-label">
              Email (Cannot be changed)
            </label>
          </div>
          <div className="input-group">
            <input
              id="phoneNumber"
              type="tel"
              className="input-field"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
            <label htmlFor="phoneNumber" className="input-label">
              Phone Number
            </label>
          </div>
          <div className="input-group">
            <input
              id="address"
              type="text"
              className="input-field"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <label htmlFor="address" className="input-label">
              Address
            </label>
          </div>
          <button
            type="submit"
            className="btn-primary"
            style={{ width: "100%", marginTop: "10px" }}
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default CustomerDashboard;
