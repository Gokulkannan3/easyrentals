import React, { useState, useEffect } from 'react';
import Allnav from '../components/Allnav';
import axios from 'axios';

export default function Normal() {
  const [owners, setOwners] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://ebackend-1llz.onrender.com/owners', {
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (response.data.owners && Array.isArray(response.data.owners)) {
          setOwners(response.data.owners);
        } else {
          console.error('Owners data not found or is not an array');
        }
      } catch (error) {
        console.error('Error fetching owner data from API:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Allnav />
      <h1>Owners</h1>
      {owners.length > 0 ? (
        owners.map((owner, index) => (
          <div key={index}>
            <h2>{owner.name}</h2>
            <p>{owner.contact}</p>
            <p>{owner.email}</p>
            <p>{owner.address}</p>
            <p>{owner.area}</p>
            <p>{owner.state}</p>
            <p>{owner.country}</p>
            <p>{owner.category}</p>
            <div>
              {owner.hall && <img src={`https://ebackend-1llz.onrender.com/${owner.hall}`} alt="Hall" />}
              {owner.kitchen && <img src={`https://ebackend-1llz.onrender.com/${owner.kitchen}`} alt="Kitchen" />}
              {owner.bedroomone && <img src={`https://ebackend-1llz.onrender.com/${owner.bedroomone}`} alt="Bedroom One" />}
              {owner.toiletone && <img src={`https://ebackend-1llz.onrender.com/${owner.toiletone}`} alt="Toilet One" />}
              {owner.bedroomtwo && <img src={`https://ebackend-1llz.onrender.com/${owner.bedroomtwo}`} alt="Bedroom Two" />}
              {owner.toilettwo && <img src={`https://ebackend-1llz.onrender.com/${owner.toilettwo}`} alt="Toilet Two" />}
            </div>
          </div>
        ))
      ) : (
        <p>No owners found</p>
      )}
    </div>
  );
}
