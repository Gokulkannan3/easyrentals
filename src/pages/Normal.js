import React, { useState, useEffect } from 'react';
import Allnav from '../components/Allnav';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Normal() {
  const [owners, setOwners] = useState([]);
  const [userData, setUserData] = useState(null);
  const [activeIndex, setActiveIndex] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://rentalsbackend-c5rm.onrender.com/ownern', {
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
    const interval = setInterval(fetchData, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    } else {
      axios
        .get('https://rentalsbackend-c5rm.onrender.com/isAuth', {
          headers: {
            'x-access-token': localStorage.getItem('token'),
          },
        })
        .then((response) => {
          if (response.data.result && response.data.result.length > 0) {
            const userData = response.data.result[0];
            setUserData(userData);
            localStorage.setItem('userData', JSON.stringify(userData));
          } else {
            console.error('No user details found in the response');
          }
        })
        .catch((error) => {
          console.error('An unexpected error occurred:', error.message);
        });
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => {
        const newIndex = { ...prevIndex };
        owners.forEach((owner) => {
          if (!newIndex[owner.id]) {
            newIndex[owner.id] = 0;
          }
          newIndex[owner.id] = (newIndex[owner.id] + 1) % 6;
        });
        return newIndex;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [owners]);

  const handleEnquiry = (owner) => {
    if (!userData || !owner) {
      console.error('User data or owner not available');
      return;
    }
    
    const { name, mail, category, contact } = userData;
    
    axios.post('https://rentalsbackend-c5rm.onrender.com/studentreq', {
      name,
      mail,
      category,
      contact,
      ownername: owner.name,
      ownercontact: owner.contact,
      ownermail: owner.mail,
    })
    .then((response) => {
      console.log('User details sent to the backend successfully');
    })
    .catch((error) => {
      console.error('Error sending user details to the backend:', error.message);
    });
  };

  const chunkArray = (array, size) => {
    const chunkedArr = [];
    for (let i = 0; i < array.length; i += size) {
      chunkedArr.push(array.slice(i, i + size));
    }
    return chunkedArr;
  };

  return (
    <div>
      <Allnav />
      <h1 className="text-center text-3xl font-bold my-8">Owners</h1>
      <div className='flex justify-center mt-10 mb-5'>
        <Link to='/studentaccept'>
          <button className='btn bg-orange-200 text-teal-950 text-xl font bold'>My Enquiries</button>
        </Link>
      </div>
      <div className="container mx-auto px-4">
        {owners.length > 0 ? (
          chunkArray(owners, 3).map((row, rowIndex) => (
            <div key={rowIndex} className="flex flex-wrap justify-between mb-4">
              {row.map((owner, index) => (
                <div key={index} className="w-1/2 sm:w-1/2 md:w-96 lg:w-1/3 p-2">
                  <div className="card bg-teal-950 text-orange-200 shadow-xl">
                    <figure className="h-64">
                      <div className="carousel h-full w-full relative overflow-hidden">
                        <div
                          className="flex transition-transform duration-2000 ease-in-out"
                          style={{ transform: `translateX(-${(activeIndex[owner.id] || 0) * 100}%)` }}
                        >
                          {['hall', 'kitchen', 'bedroomone', 'toiletone', 'bedroomtwo', 'toilettwo'].map((imageKey, imgIndex) => (
                            <div
                              key={imgIndex}
                              className="carousel-item w-full flex-shrink-0"
                            >
                              {owner[imageKey] && (
                                <img
                                  className="w-full h-full object-cover"
                                  src={`https://rentalsbackend-c5rm.onrender.com/${owner[imageKey]}`}
                                  alt={imageKey}
                                  loading="lazy"
                                />
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="absolute translate-y-28 w-full flex justify-center py-2 gap-2">
                        {Array.from({ length: 6 }).map((_, btnIndex) => (
                          <button
                            key={btnIndex}
                            className={`btn btn-xs ${activeIndex[owner.id] === btnIndex ? 'btn-active' : ''}`}
                            onClick={() => setActiveIndex((prevIndex) => ({
                              ...prevIndex,
                              [owner.id]: btnIndex
                            }))}
                          >
                            {btnIndex + 1}
                          </button>
                        ))}
                      </div>
                    </figure>
                    <div className="card-body">
                      <h2 className="card-title">{owner.name}</h2>
                      <p><span className='text-lg font-bold underline'>Address:</span> {owner.address}</p>
                      <div className="flex flex-wrap">
                        <div className="w-1/2">
                          <p className='text-lg font-bold underline'>Contact:</p>
                          <p>{owner.contact}</p>
                          <p className='text-lg font-bold underline'>Area:</p>
                          <p>{owner.area}</p>
                          <p className='text-lg font-bold underline'>Category:</p>
                          <p>{owner.category}</p>
                        </div>
                        <div className="w-1/2">
                          <p className='text-lg font-bold underline'>State:</p>
                          <p>{owner.state}</p>
                          <p className='text-lg font-bold underline'>Country:</p>
                          <p>{owner.country}</p>
                        </div>
                      </div>
                      <div className="card-actions justify-end">
                        <button onClick={() => handleEnquiry(owner)} className="btn bg-orange-200 text-lg text-teal-950">Enquire Now</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))
        ) : (
          <p>No owners found</p>
        )}
      </div>
    </div>
  );
}
