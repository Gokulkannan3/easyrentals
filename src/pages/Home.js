import React from 'react'
import Mainnav from '../components/Mainnav'
import home from '../images/h-removebg-preview.png'
import hmap from '../images/hmap-removebg-preview.png'
import studhome from '../images/studhome-removebg-preview.png'

export default function Home() {
  return (
    <div>
      <Mainnav/>
      <div>
        <div className="carousel w-full">
          <div id="slide1" className="carousel-item h-96 bg-orange-200 relative w-full">
            <div className='translate-x-44 translate-y-20 mt-10 italic'>
              <p className='text-teal-950 font-black text-6xl'>Welcome to</p>
              <p className='text-teal-950 font-black text-6xl'>Easy Rentals!</p>
            </div>
            <div className='flex justify-end translate-x-3/4 ml-20'>
              <img src={home} alt='slide' className='w-96' />
            </div>
            <div className='translate-x-72 ml-48 translate-y-20 mt-10 italic'>
              <p className='text-teal-950 font-black text-6xl'>Find Homes</p>
              <p className='text-teal-950 font-black text-6xl'>Easy Ways!</p>
            </div>
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <a href="#slide4" className="btn btn-circle bg-teal-950 text-orange-200">❮</a> 
              <a href="#slide2" className="btn btn-circle bg-teal-950 text-orange-200">❯</a>
            </div>
          </div> 
          <div id="slide2" className="carousel-item bg-orange-200 relative w-full">
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <div className='translate-x-40 mt-10 translate-y-20 italic'>
                <p className='text-teal-950 font-black text-6xl'>Quick Locations</p>
                <p className='text-teal-950 font-black text-6xl'>Rent by Areas!</p>
              </div>
              <div className=' ml-20'>
                <img src={hmap} alt='slide' className='w-96' />
              </div>
              <div className='-translate-x-24 mt-10 translate-y-20 italic'>
                <p className='text-teal-950 font-black text-6xl'>Houses at your</p>
                <p className='text-teal-950 font-black text-6xl'>Prefered Locations!</p>
              </div>
            </div>
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <a href="#slide1" className="btn btn-circle bg-teal-950 text-orange-200">❮</a> 
              <a href="#slide3" className="btn btn-circle bg-teal-950 text-orange-200">❯</a>
            </div>
          </div> 
          <div id="slide3" className="carousel-item bg-orange-200 relative w-full">
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <div className='translate-x-24 mt-4 translate-y-20 italic'>
                <p className='text-teal-950 font-black text-6xl'>A student looking</p>
                <p className='text-teal-950 font-black text-6xl'>For Rental House?</p>
              </div>
              <div className=' ml-20'>
                <img src={studhome} alt='slide' className='w-96' />
              </div>
              <div className='-translate-x-24 mt-4 translate-y-20 italic'>
                <p className='text-teal-950 font-black text-6xl'>Find Houses</p>
                <p className='text-teal-950 font-black text-6xl'>Near your College!</p>
              </div>
              <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a href="#slide2" className="btn btn-circle bg-teal-950 text-orange-200">❮</a> 
                <a href="#slide1" className="btn btn-circle bg-teal-950 text-orange-200">❯</a>
              </div>
            </div>
          </div> 
        </div>
        Home
      </div>
    </div>
  )
}
