import React, { useEffect } from 'react';
require("dotenv").config(); // Load environment variables

const clientId = process.env.CLIENT_ID_KEY;
const redirectUri = process.env.REACT_APP_MANGADEX_API_KEY;

const authorizationEndpoint = 'https://api.mangadex.org/auth/check';

const authorizationUrl = `${authorizationEndpoint}?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}`;

const LoginMangaDex = () => {
  const handleLoginMangaDex = () => {
    // Redirect user to MangaDex authorization endpoint
    window.location.href = authorizationUrl;
  };

  useEffect(() => {
    // After redirection from MangaDex, extract authorization code from URL
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');

    if (code) {
      
    }
  }, []);

  return (
    <div>
      <button onClick={handleLoginMangaDex}>Login with MangaDex</button>
    </div>
  );
};

export default LoginMangaDex;
