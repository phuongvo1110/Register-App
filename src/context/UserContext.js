const { createContext, useState, useEffect } = require("react");

const UserContext = createContext();
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState('');
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
            setUser({user});
            const token = user.token;
            setToken({ token });
        }
    }, []);
    const loginUser = (data) => {
        localStorage.setItem("user", JSON.stringify(data));
        setUser(data);
    };
    const logoutUser = () => {
        localStorage.removeItem("user");
        setUser(null);
    };
    return (
        <UserContext.Provider
            value={{ user, token, loginUser, logoutUser }}
        >
            {children}
        </UserContext.Provider>
    );
};
export default UserContext;
