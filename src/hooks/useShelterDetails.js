import { useState, useEffect } from 'react';
import axios from 'axios';

// GET details of one center given it's ID
const getShelterDetails = (id) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`http://127.0.0.1:8000/shelters/details?id=${id}`);
          setData(response.data);
        } catch (error) {
          setError(error);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }, []);
  
    return { data, loading, error };
  };
  
export { getShelterDetails }