import React from 'react';
import './Home.css';
import Instrument from '../Instruments/Instrument';
function Home() {
  return (
    <>
    <div className='homepage'>
        <div className='class-name'>
            <h1><span className='name'>Aryan</span><br />Music Academy</h1>
            <div className='description'>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta dolore adipisci distinctio commodi quae, dolores, iure error voluptatibus inventore autem repellat molestias delectus officia, eum atque minima itaque soluta illo!</p>
              <p>Timings: Monday - Friday</p>
              <ul>
                  <li className='time1'>Morning: 9am - 11am </li>
                  <li className='time2'> Evening: 4:30pm - 8:30pm</li>
              </ul>
            </div>
        </div>
        <img src='/assets/aeDilGuitar.png' alt='Ae Dil' className='home-image'/>
    </div>
    <div className='contact'>
        <button className='contact-btn'><a href="#contact-section" className='contact-btn-link'>Contact Us</a></button>
    </div>
    <Instrument />
    </>
  )
}

export default Home
