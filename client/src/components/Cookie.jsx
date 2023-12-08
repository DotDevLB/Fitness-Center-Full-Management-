import React, { useEffect } from 'react';

function Cookie() {
  useEffect(() => {
    // Function to get the value of a cookie by its name
    const getCookie = (name) => {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(name + '=')) {
          return cookie.substring(name.length + 1);
        }
      }
      return null;
    };

    // Example: Get the value of a cookie named "userId"
    const userId = getCookie('userId');
    console.log('User ID:', userId);
  }, []);

  return (
    <div>
      {/* Your React components */}
    </div>
  );
}

export default Cookie;
