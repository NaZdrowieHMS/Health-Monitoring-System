import React, {Context, createContext, useState} from 'react';

const UserContext = createContext([]);

const UserProvider = ({ children }) => {
    const [user, setUser] = useState({
        id: 2,
        isDoctor: false,
    });

    return (
    <UserContext.Provider value={[ user, setUser ]}>
        {children}
    </UserContext.Provider>
);
};

export { UserContext, UserProvider };