// AuthContext.js
import { createContext, useState, useEffect } from 'react';
import { apiHandler } from '../utils/apihandler';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // User object or null
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRoleId, setUserRoleId] = useState(0)

  useEffect(() => {
    const storedToken = sessionStorage.getItem('token');
    if (storedToken) {
      setIsAuthenticated(true)
    } else {
      setIsAuthenticated(false)
    }
    
    if (isAuthenticated) {
      console.log(`fetch user data`)
      console.log(userRoleId)
      apiHandler("user", "GET")
        .then((response) => response.json())
        .then((data) => {
          setUser(data);
          console.log(data)
          setToken(storedToken);
          setIsAuthenticated(true);
        })
        .catch((error) => {
          console.error('Error validating token:', error);
          setIsAuthenticated(false);
        });
    }
  }, [isAuthenticated]);

  const login = (_token, roleId) => {
    console.log(`role id: ${roleId}`)
    setUserRoleId(roleId)
    setToken(_token);
    setIsAuthenticated(true);
    sessionStorage.setItem('token', _token);
  };

  const logout = () => {
    apiHandler("logout", "POST").then((response) => {
      if (response.ok) {
        setToken(null);
        setIsAuthenticated(false);
        sessionStorage.removeItem('token');
      } else {
        console.log("failed to logout")
      }
    }).catch((reason) => {
      console.log(reason)
    })
  };

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated, userRoleId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
