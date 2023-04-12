import React from 'react'
import logo from '../../assets/images/logo.png';
import '../../App.css';
import { Typewriter } from 'react-simple-typewriter'
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p className="p">
          Wellcome to alshifa homeopathic clinic buneer
        </p>
        <span className="text">
          <Typewriter words={['Dr', 'Muhammd Fayeq', 'alshifa homeopathic clinic',]} loop={0} cursor={false} />
        </span>
        <div className='button'>
       <Link to="/detail" > Get Start</Link>
       </div>
      </header>
  )
}

export default Home