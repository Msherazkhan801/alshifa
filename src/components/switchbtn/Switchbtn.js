import React from 'react';
import './style.css';

const Switchbtn = ({ isTable, setIsTable }) => {
  const handleSwitchToggle = () => {
    setIsTable((prevState) => !prevState);
  };

  return (
    <div className="switch-container">
      <input type="checkbox" id="switch" checked={isTable} onChange={handleSwitchToggle} />
      <label htmlFor="switch" ></label>
    </div>
  );
};

export default Switchbtn;