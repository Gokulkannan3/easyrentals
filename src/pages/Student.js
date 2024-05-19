import React, { useState, useEffect } from 'react';
import Allnav from '../components/Allnav';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Student() {
  const [owners, setOwners] = useState([]);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://rentalsbackend-c5rm.onrender.com/owners', {
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

  const handleEnquiry = (owner) => {
    if (!userData || !owner) {
      console.error('User data or owner not available');
      return;
    }
    
    const { name, category, contact } = userData;
    
    axios.post('https://rentalsbackend-c5rm.onrender.com/studentreq', {
      name,
      category,
      contact,
      ownername: owner.name
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
        <Link to='/owneracceptance'>
          <button className='btn bg-orange-200 text-teal-950 text-xl font bold'>Enquiries</button>
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
                      <div className="carousel h-full w-full">
                        <div id={`item1-${owner.id}`} className="carousel-item relative w-full">
                          {owner.hall && <img className="w-full h-full object-cover" src={`https://rentalsbackend-c5rm.onrender.com/${owner.hall}`} alt="Hall" loading="lazy" />}
                        </div> 
                        <div id={`item2-${owner.id}`} className="carousel-item relative w-full">
                          {owner.kitchen && <img className="w-full h-full object-cover" src={`https://rentalsbackend-c5rm.onrender.com/${owner.kitchen}`} alt="Kitchen" loading="lazy" />}
                        </div> 
                        <div id={`item3-${owner.id}`} className="carousel-item relative w-full">
                          {owner.bedroomone && <img className="w-full h-full object-cover" src={`https://rentalsbackend-c5rm.onrender.com/${owner.bedroomone}`} alt="Bedroom One" loading="lazy" />}
                        </div> 
                        <div id={`item4-${owner.id}`} className="carousel-item relative w-full">
                          {owner.toiletone && <img className="w-full h-full object-cover" src={`https://rentalsbackend-c5rm.onrender.com/${owner.toiletone}`} alt="Toilet One" loading="lazy" />}
                        </div>
                        <div id={`item5-${owner.id}`} className="carousel-item relative w-full">
                          {owner.bedroomtwo && <img className="w-full h-full object-cover" src={`https://rentalsbackend-c5rm.onrender.com/${owner.bedroomtwo}`} alt="Bedroom Two" loading="lazy" />}
                        </div>
                        <div id={`item6-${owner.id}`} className="carousel-item relative w-full">
                          {owner.toilettwo && <img className="w-full h-full object-cover" src={`https://rentalsbackend-c5rm.onrender.com/${owner.toilettwo}`} alt="Toilet Two" loading="lazy" />}
                        </div>
                      </div>
                      <div className="absolute translate-y-28 w-full flex justify-center py-2 gap-2">
                        <a href={`#item1-${owner.id}`} className="btn btn-xs">1</a>
                        <a href={`#item2-${owner.id}`} className="btn btn-xs">2</a>
                        <a href={`#item3-${owner.id}`} className="btn btn-xs">3</a>
                        <a href={`#item4-${owner.id}`} className="btn btn-xs">4</a>
                        <a href={`#item5-${owner.id}`} className="btn btn-xs">5</a>
                        <a href={`#item6-${owner.id}`} className="btn btn-xs">6</a>
                      </div>
                    </figure>
                    <div className="card-body">
                      <h2 className="card-title">{owner.name}</h2>
                      <p><p className='text-lg font-bold underline'>Address : </p>{owner.address}</p>
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
