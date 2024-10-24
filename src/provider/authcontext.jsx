// AuthContext.js
import { createContext, useState, useEffect } from 'react';
import { apiHandler } from '../utils/apihandler';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // User object or null
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRoleId, setUserRoleId] = useState(null)

  useEffect(() => {
    const storedToken = sessionStorage.getItem('token');
    if (storedToken) {
      setIsAuthenticated(true)
    } else {
      setIsAuthenticated(false)
    }
    
    /*if (storedToken) {
      // Validate token and fetch user data
      fetch('https://api.example.com/auth/validate-token', {
        headers: {
          'Authorization': `Bearer ${storedToken}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setUser(data.user);
          setToken(storedToken);
          setIsAuthenticated(true);
        })
        .catch((error) => {
          console.error('Error validating token:', error);
          setIsAuthenticated(false);
        });
    }*/
  }, []);

  const login = (token, userRoleId) => {
    setToken(token);
    setIsAuthenticated(true);
    setUserRoleId(userRoleId)
    sessionStorage.setItem('token', token);
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
