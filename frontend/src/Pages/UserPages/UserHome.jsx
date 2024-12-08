import React, { useState, useRef } from "react";
import Navbar from "../../components/usercomponents/Navbar";
import Map from "../../components/usercomponents/Map";
import OrderButton from "../../components/usercomponents/OrderButton";
import OrderForm from "../../components/usercomponents/OrderForm";
import gsap from "gsap";

function UserHome() {
  const [isFormOpen, setIsFormOpen] = useState(false); // State for form visibility
  const form = useRef(null); // Ref for the form element

  const buttonHandler = () => {
    console.log("button clicked");

    // GSAP animation for toggling form visibility
    if (isFormOpen) {
      gsap.to(form.current, { display: "none", opacity: 0, duration: 0.5 });
    } else {
      gsap.to(form.current, { display: "block", opacity: 1, duration: 0.5 });
    }
    setIsFormOpen(!isFormOpen); // Toggle state
  };

  const closeFormHandler = () => {
    gsap.to(form.current, { display: "none", opacity: 0, duration: 0.5 });
    setIsFormOpen(false);
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
        <OrderForm onClose={closeFormHandler} />
      </div>
    </div>
  );
}

export default UserHome;
