// C:\wamp64\www\Eventix\src\components\Customswitch.jsx

import React from "react";
import PropTypes from "prop-types";
import "../css/Customswitch.css";

const Customswitch = ({ isOn, handleToggle }) => {
  return (
    <div className={`custom-switch ${isOn ? 'custom-switch-on' : 'custom-switch-off'}`} onClick={handleToggle}>
      <div className="toggle-slider"></div>
    </div>
  );
};

Customswitch.propTypes = {
  isOn: PropTypes.bool.isRequired,
  handleToggle: PropTypes.func.isRequired,
};

export default Customswitch;
