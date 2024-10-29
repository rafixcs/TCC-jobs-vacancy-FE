import { createContext, useState, useEffect, useContext } from 'react';
import { apiHandler } from '../utils/apihandler';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
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

  const logout = async () => {
    await apiHandler("logout", "POST").then((response) => {
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

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context
}
