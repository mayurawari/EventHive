import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export const Home = () => {
  const { isLoggedin } = useContext(AuthContext);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://eventhive-62am.onrender.com/api/get/events",
          {
            method: "GET",
            credentials: "include",
          }
        );
        const result = await response.json();
        console.log(result);
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [isLoggedin]);

  return (
    <div>
      {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : <p>Loading...</p>}
    </div>
  );
};

//https://eventhive-62am.onrender.com/api/get/events
//https://eventhive-62am.onrender.com/api/login
//https://eventhive-62am.onrender.com/api/register
