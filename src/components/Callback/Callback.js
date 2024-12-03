import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UserContext from "../../context/UserContext";

const Callback = () => {
    const navigate = useNavigate();
    const { loginUser, loginOAuth } = useContext(UserContext);
    function extractTokensFromUrl(url) {
        // Parse the hash portion of the URL
        const hash = new URL(url).hash.substring(1); // Remove the '#' from the start
        const queryStartIndex = hash.indexOf("?");
        if (queryStartIndex === -1) {
            console.error("No query parameters found in the URL hash.");
            return { accessToken: null, refreshToken: null };
        }

        // Extract the query part and parse it
        const queryString = hash.substring(queryStartIndex + 1);
        const params = new URLSearchParams(queryString);

        // Extract access_token and refresh_token
        const access_token = params.get("access_token");
        const refresh_token = params.get("refresh_token");
        const username = params.get("username");
        const user = {username: username}
        return { access_token, refresh_token, user };
    }
    useEffect(() => {
        const fetchUserData = async () => {
            const currentUrl = window.location.href;
            try {
                const response = await axios.get(currentUrl);

                if (response.status === 200) {
                    console.log(response);

                    const { access_token, refresh_token, user } = extractTokensFromUrl(
                        response.config.url
                    );

                    // Store user info in context and localStorage
                    const userData = { access_token, refresh_token, user };
                    loginOAuth(userData);

                    // Navigate to dashboard
                    navigate("/");
                } else {
                    console.error(
                        "Error during OAuth callback:",
                        response.data.message
                    );
                    navigate("/login"); // Redirect to login on failure
                }
            } catch (error) {
                console.error("Failed to fetch data from callback URL:", error);
                navigate("/login"); // Redirect to login on failure
            }
        };

        fetchUserData();
    }, [navigate, loginOAuth]);

    return <div>Loading...</div>; // Optional loading indicator
};

export default Callback;
