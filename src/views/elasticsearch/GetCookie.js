import axios from 'axios';
import React, { useEffect, useState } from 'react';

const GetCookie = () => {
    const [cook, setCook] = useState();
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(
              "http://localhost:8080/demo/elasticsearch", {withCredentials: true}
            );
            console.log(response.data);
            setCook(response.data);
          } catch (error) {
            console.log(error);
          }
        };
        fetchData();
      }, []);
    return (
        <div>
            {cook}
        </div>
    );
};

export default GetCookie;