import React from 'react'
import Mainnav from '../components/Mainnav'
import home from '../images/h-removebg-preview.png'
import hmap from '../images/hmap-removebg-preview.png'
import studhome from '../images/studhome-removebg-preview.png'
import house from '../images/House-Home.jpg'
import student from '../images/Student-home-min.png'
import { Link } from 'react-router-dom'
import logo from '../images/inst.png'
import logo1 from '../images/what.png'
import logo2 from '../images/youtube.png'

export default function Home() {
  return (
    <div className='h-screen overflow-x-hidden'>
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
        <div className='mt-10'>
          <img className='flex justify-start translate-x-10 w-1/3' src={house} alt='home' />
          <div className='flex justify-end -translate-y-72 -translate-x-28'>
            <p className='text-6xl font-bold text-teal-950'>Where Rentals made Easy!!</p>
          </div>
          <div className='flex justify-end -translate-y-64 -translate-x-28'>
            <p className='text-6xl text-teal-400 font-bold'>Your dream home is just a click!!</p>
          </div>
          <div className='flex justify-end -translate-x-1/4 my-10 -translate-y-60'>
            <Link to='/login'>
              <button className='btn bg-teal-950 text-orange-200 text-2xl font-bold hover:bg-orange-200 hover:text-teal-950'>Book Now</button>
            </Link>
          </div>
        </div>
        <div>
          <div className='flex justify-end -translate-x-28'>
            <img className='flex justify-end w-1/3' src={student} alt='home' />
          </div>
          <div className='flex justify-start -translate-y-72 translate-x-24'>
            <p className='text-6xl font-bold text-teal-950'>Being college student!!</p>
          </div>
          <div className='flex justify-start -translate-y-64 translate-x-24'>
            <p className='text-6xl text-teal-400 font-bold'>Find houses in just a click!!</p>
          </div>
          <div className='flex justify-start -translate-y-72 translate-x-80 my-24'>
            <Link to='/login'>
              <button className='btn bg-teal-950 text-orange-200 text-2xl font-bold hover:bg-orange-200 hover:text-teal-950'>Students Booking</button>
            </Link>
          </div>
        </div>
      </div>
      <footer className="footer footer-center p-10 bg-orange-200 text-teal-950 font-semibold rounded">
        <nav className="grid grid-flow-col gap-4">
          <p className="link link-hover">About us</p>
          <p className="link link-hover">Contact</p>
        </nav> 
        <nav>
          <div className="grid grid-flow-col gap-4">
            <button><img src={logo} alt='logo'/></button>
            <button><img src={logo1} alt='logo'/></button>
            <button><img src={logo2} alt='logo'/></button>
          </div>
        </nav> 
        <aside>
          <p>Copyright © 2024 - All right reserved by ACME Industries Ltd</p>
        </aside>
      </footer>
    </div>
  )
}
