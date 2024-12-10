import React, { useState, useRef } from "react";
import Navbar from "../../components/usercomponents/Navbar";
import Map from "../../components/usercomponents/Map";
import OrderButton from "../../components/usercomponents/OrderButton";
import OrderForm from "../../components/usercomponents/OrderForm";
import gsap from "gsap";
import WaitingToConfirm from "../../components/usercomponents/WaitingToConfirm";
import { useEffect } from "react";
import {useGSAP} from "@gsap/react"
import io from "socket.io-client";

const socket =io.connect("http://localhost:4000")
function UserHome() {
  const [isFormOpen, setIsFormOpen] = useState(false); // State for form visibility
  const [isWaiting, setIsWaiting] = useState(false); // State for waiting confirmation visibility
  const form = useRef(null); // Ref for the form element

  const buttonHandler = () => {
    console.log("button clicked");
    setIsFormOpen(!isFormOpen);
    // GSAP animation for toggling form visibility
    socket.emit("chat",{
      message:"form opened"
    })
  
    // setIsFormOpen(!isFormOpen); // Toggle state
  };
  useGSAP(()=>{
    if (!isFormOpen) {
      gsap.to(form.current, { display: "none", opacity: 0, duration: 0.5 });
    } else {
      gsap.to(form.current, { display: "block", opacity: 1, duration: 0.5 });
    }
  },[isFormOpen])

  const closeFormHandler = () => {
   
    setIsFormOpen(false);
  };

  const handleFormSubmit = () => {
    setIsFormOpen(false);
    setIsWaiting(true);
  };

  return (
    <div className="relative">
      {/* Navbar */}
      <Navbar />

      {/* Map Section */}
      <div className="w-full h-[70vh] bg-red-200">
        <Map />
      </div>

      {/* Order Button Section */}
      <div className="flex items-center justify-center w-full h-[30vh]">
        <div onClick={buttonHandler}>
          <OrderButton />
        </div>
      </div>

      {/* OrderForm Section */}
      <div
        className="absolute top-0 left-0 w-full h-full bg-white z-[1000] flex items-center justify-center"
        ref={form}
        style={{ display: "none", opacity: 0 }} // Initial hidden state
      >
        <OrderForm onClose={closeFormHandler} onSubmit={handleFormSubmit} />
      </div>
      {/* waiting to confirm  */}
      {isWaiting && (
        <div className="w-full h-[50%] bottom-0 bg-white absolute z-[20000]">
          <WaitingToConfirm />
        </div>
      )}
    </div>
  );
}

export default UserHome;
