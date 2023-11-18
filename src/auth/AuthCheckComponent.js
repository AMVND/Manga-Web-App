import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AuthCheckComponent = () => {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        // Replace 'your-access-token' with the actual access token
        const response = await axios.get('https://api.mangadex.org/auth/check', {
          headers: {
            Authorization: 'Bearer your-access-token',
          },
        });

        // If the request is successful, the user is authenticated
        setAuthenticated(true);
      } catch (error) {
        // If there's an error or the request fails, the user is not authenticated
        setAuthenticated(false);
      }
    };

    checkAuthentication();
  }, []);

  return (
    <div>
      {authenticated ? (
        <p>User is authenticated</p>
      ) : (
        <p>User is not authenticated</p>
      )}
    </div>
  );
};

export default AuthCheckComponent;
