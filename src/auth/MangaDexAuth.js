import React, { useState } from 'react';
import axios from 'axios';
require("dotenv").config(); // Load environment variables

const MangaDexAuth = () => {
  const [accessToken, setAccessToken] = useState('');

  const handleLogin = async () => {
    try {
      // Redirect the user to MangaDex for authorization
      window.location.href = `https://api.mangadex.org/auth/login?client_id=your-client-id&redirect_uri=your-redirect-uri&response_type=code&scope=openid%20manga`;
    } catch (error) {
      console.error('Error initiating login:', error);
    }
  };

  const handleTokenExchange = async () => {
    try {
      // Extract the authorization code from the URL after the user is redirected back
      const urlParams = new URLSearchParams(window.location.search);
      const authorizationCode = urlParams.get('code');

      if (authorizationCode) {
        // Exchange authorization code for access token
        const response = await axios.post('https://api.mangadex.org/auth/token', {
          grant_type: 'authorization_code',
          client_id: process.env.CLIENT_ID_KEY,
          client_secret: process.env.REACT_APP_MANGADEX_API_KEY,
          code: authorizationCode,
          redirect_uri: '/',
        });

        const { access_token } = response.data;
        setAccessToken(access_token);
      }
    } catch (error) {
      console.error('Error exchanging authorization code for access token:', error);
    }
  };

  return (
    <div>
      <h1>MangaDex Authentication</h1>
      {accessToken ? (
        <p>Access Token: {accessToken}</p>
      ) : (
        <>
          <button onClick={handleLogin}>Login to MangaDex</button>
          <button onClick={handleTokenExchange}>Exchange Authorization Code for Access Token</button>
        </>
      )}
    </div>
  );
};

export default MangaDexAuth;