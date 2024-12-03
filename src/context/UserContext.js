import axios from 'axios';

const { createContext, useState, useEffect } = require("react");

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });
    const [token, setToken] = useState(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser).access_token : '';
    });

    const loginUser = (data) => {
        localStorage.setItem("user", JSON.stringify(data));
        setUser(data);
        setToken(data.access_token);
    };
    const loginOAuth = (data) => {
        localStorage.setItem("user", JSON.stringify(data));
        setUser(data);
        setToken(data.access_token);
    }
    const logoutUser = async () => {
        try {
            const response = await axios({
                method: 'DELETE',
                url: 'http://localhost:8083/api/v1/session/signout',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
    
            if (response.status === 200) {
                console.log("Logged out successfully");
                localStorage.removeItem("user");
                setUser(null);
                setToken('');
            } else {
                console.error("Failed to log out:", response.data);
            }
        } catch (error) {
            console.error("An error occurred during logout:", error.message || error);
            throw new Error("Failed to log out. Please try again.");
        }
    };
    
    

    const refreshAccessToken = async () => {
        try {
            if (user && user.refresh_token) {
                const response = await axios.post('http://localhost:8083/api/v1/session/refresh', {
                    refresh_token: user.refresh_token,
                });
                const newAccessToken = response.data.access_token;

                // Update localStorage and state
                const updatedUser = { ...user, access_token: newAccessToken };
                localStorage.setItem("user", JSON.stringify(updatedUser));
                setUser(updatedUser);
                setToken(newAccessToken);
                return newAccessToken;
            } else {
                throw new Error("No refresh token available");
            }
        } catch (error) {
            console.error("Failed to refresh access token:", error);
            logoutUser();
            throw error;
        }
    };

    const fetchWithAuth = async (url, options = {}) => {
        try {
            const response = await fetch(url, {
                ...options,
                headers: {
                    ...options.headers,
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 401) { // If access token is invalid
                const newToken = await refreshAccessToken();
                return fetch(url, {
                    ...options,
                    headers: {
                        ...options.headers,
                        Authorization: `Bearer ${newToken}`,
                    },
                });
            }

            return response;
        } catch (error) {
            console.error("Fetch with auth failed:", error);
            throw error;
        }
    };

    return (
        <UserContext.Provider
            value={{ user, token, loginUser,loginOAuth, logoutUser, fetchWithAuth }}
        >
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;
