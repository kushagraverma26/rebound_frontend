import { useState, useEffect } from 'react';
import axios from 'axios';

const login = (email, password) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const loginUser = async () => {
        try {
            console.log("ffjkdsnj")
            const response = await axios.post("http://127.0.0.1:8000/admins/login", {email,password},
            {
                headers: {
                  "Content-Type": "application/json",
                },
            });
            console.log(response)
            setData(response.data);
        } catch (error) {
          setError(error);
        } finally {
          setLoading(false);
        }
      };

      loginUser();
    }, []);
  
    return { data, loading, error };
  };
  
export { login }