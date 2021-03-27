/* eslint-disable react/react-in-jsx-scope */
import { useState } from "react";
import { Link } from "react-router-dom";
import "./index.css";
import '@fortawesome/fontawesome-free/css/fontawesome.css';
import '@fortawesome/fontawesome-free/css/all.css';
import Auth_Database from "../../Container/Auth";
import { getCookie } from "../../utils/cookie-utils";
import { Detector } from "react-detect-offline";
import Swal from 'sweetalert2'

const ConnectWarn = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})

const SideNav = () => {
  const [toggleClass, setToggle] = useState("close-nav");
  const [visibleClass, setVisible] = useState(false);

  function userStatus( notiType = false ){
    if( notiType ) {
      ConnectWarn.fire({
        icon: 'success',
        title: 'Admin'
      })
    } else {
      ConnectWarn.fire({
        icon: 'info',
        title: 'User'
      })
    }
  }
  
  return (
    <>
      <div id="mySidenav" className={`sidenav ${toggleClass}`}>
        <div
          className="closebtn"
          onClick={() => {
            setToggle("close-nav");
          }}
        >
          &times;
        </div>
        <Link to="/home">Home</Link>

        <div>
          <Auth_Database
             visible = {visibleClass}
             >
          </Auth_Database>
        </div>
        
      </div>

      <div
        style={{
          fontSize: "20px",
          cursor: "pointer",
          background: "rgb(39, 155, 190)",
          color: "white",
          position: "fixed",
          zIndex: "1000",
          width: "100%",
          padding: "5px"
        }}
        onClick={() => {
          setToggle("open-nav");
          if (getCookie("MASTER_LOGIN") === "exists") setVisible(true);
          else  setVisible(false);
        }}
      >
        &nbsp; &#9776; &nbsp; Shan Map Live &nbsp;&nbsp;&nbsp;
        <Detector
          render={({ online }) => {
            return(
              <a className={`${online ? "normal" : "warning"}`}>
                  {online ? "Online" : "Offline"}
              </a>
            )
          }}
        />
        
      </div>
    </>
  );
};

export default SideNav;
