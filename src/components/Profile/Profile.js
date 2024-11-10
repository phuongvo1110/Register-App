import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import UserContext from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, logoutUser } = useContext(UserContext);
  const [profileData, setProfileData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      axios
        .get("https://localhost:7242/user/profile", {
          headers: { Authorization: `Bearer ${user.token}` },
        })
        .then((response) => setProfileData(response.data))
        .catch((error) => {
          console.error("Failed to fetch profile data:", error);
          logoutUser();
          navigate("/login");
        });
    }
  }, [user, logoutUser, navigate]);

  return (
    <div>
      <h2>Profile</h2>
      {profileData ? (
        <div>
          <p>Email: {profileData.email}</p>
          <p>Name: {profileData.name}</p>
          <button onClick={logoutUser}>Logout</button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;
