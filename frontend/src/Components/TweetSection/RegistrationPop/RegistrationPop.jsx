import React from 'react'
import './RegistrationPop.css'
import CloseIcon from './../../../Images/close-icon.svg';
import './RegistrationPop.css'
import { useHistory } from "react-router-dom";

export default function RegistrationPop() {
  const history = useHistory();
  function handleLogin(){ 
    history.push("/login");
  }
  return (
    <div className='RegistrationPop'>
       <div className='Box'>
       <div className="Registration-Heading">
            <p>Participa en las conversaciones de FinkHub!</p>
            <img src={CloseIcon} alt="close" />
        </div>
        <div className='Controls'>
            <div className='Registration'>Register</div>
            <div className='Login'onClick={handleLogin}>LogIn</div>
        </div>
       </div>
    </div>
  )
}
