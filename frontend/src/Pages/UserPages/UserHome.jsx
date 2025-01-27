import React, { useState, useRef, useContext, useEffect } from "react";
import Navbar from "../../components/usercomponents/Navbar";
import Map from "../../components/usercomponents/Map";
import OrderButton from "../../components/usercomponents/OrderButton";
import OrderForm from "../../components/usercomponents/OrderForm";
import gsap from "gsap";
import WaitingToConfirm from "../../components/usercomponents/WaitingToConfirm";
import { Toaster, toast } from "react-hot-toast";
import AcceptedStatus from "../../components/usercomponents/AcceptedStatus";
import { useGSAP } from "@gsap/react";
import { SocketContext } from "../../context/socketcontext";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAcceptedOrderData } from "../../slices/userSlice";

function UserHome() {
  const [isFormOpen, setIsFormOpen] = useState(false); // State for form visibility
  const [isWaiting, setIsWaiting] = useState(false); // State for waiting confirmation visibility
  const form = useRef(null); // Ref for the form element
  const { socket } = useContext(SocketContext);
  const [Accepted, setAccepted] = useState(false);
  const user = useSelector((state) => state.user.user);
  const acceptedOrderData = useSelector((state) => state.user.acceptedOrderData);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const buttonHandler = () => {
    console.log("button clicked");
    setIsFormOpen(!isFormOpen);
  };

  useEffect(() => {
    socket.emit('join', {
      userId: user._id,
      userType: 'user'
    });
    socket.on("storeAcceptedOrder", (data) => {
      console.log(data);
      if (data.order.status === "Accepted") {
        setAccepted(true);
        setIsWaiting(false);
        dispatch(setAcceptedOrderData(data.order));
        toast.success('Your order has been accepted!');
        navigate('/accepted');
      }
    }, [socket, dispatch, navigate]);

    const updateUserLocation = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          socket.emit('update-location-user', {
            userId: user._id,
            location: { ltd: latitude, lng: longitude }
          });
        },
        (error) => {
          console.error("Error fetching location:", error);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    };

    updateUserLocation();
    let lastUpdateTime = null;
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const now = Date.now();
        if (!lastUpdateTime || now - lastUpdateTime >= 10000) {
          socket.emit('update-location-user', {
            userId: user._id,
            location: { ltd: latitude, lng: longitude }
          });
          lastUpdateTime = now;
        }
      },
      (error) => {
        console.error("Error fetching location:", error);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );

    return () => navigator.geolocation.clearWatch(watchId);

    
  }, [socket, user, dispatch, navigate]);

  useGSAP(() => {
    if (!isFormOpen) {
      gsap.to(form.current, { display: "none", opacity: 0, duration: 0.5 });
    } else {
      gsap.to(form.current, { display: "block", opacity: 1, duration: 0.5 });
    }
  }, [isFormOpen]);

  const closeFormHandler = () => {
    setIsFormOpen(false);
  };

  const handleFormSubmit = () => {
    setIsFormOpen(false);
    setIsWaiting(true);
  };

  return (
    <div className="relative bg-[#131C24] min-h-screen">
      <Navbar />

      {/* Map Section with Overlay Gradient */}
      <div className="relative w-full h-[70vh]">
        <Map />
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#131C24] to-transparent"></div>
      </div>

      {/* Order Button Section */}
      <div className="flex items-center justify-center w-full h-[30vh] bg-[#1D2A36] relative">
        <div className="transform hover:scale-105 transition-transform" onClick={buttonHandler}>
          <OrderButton />
        </div>
      </div>

      {/* Modal Overlays */}
      <div
        className="absolute top-0 left-0 w-full min-h-[100vh] bg-[#131C24] bg-opacity-95 z-[1000] flex items-center justify-center"
        ref={form}
        style={{ display: "none", opacity: 0 }} // Initial hidden state
      >
        <OrderForm onClose={closeFormHandler} onSubmit={handleFormSubmit} />
      </div>
      {/* waiting to confirm  */}
      {isWaiting && (
        <div className="w-full h-[50%] bottom-0 bg-[#1D2A36] absolute z-[20000] border-t border-[#32415D]">
          <WaitingToConfirm />
        </div>
      )}
      {Accepted && acceptedOrderData && (
        <div className="fixed z-[10000] bottom-0 w-full h-[50%] bg-[#1D2A36] border-t border-[#32415D] text-[#F8F9FB] flex justify-center items-center">
          <AcceptedStatus orderData={acceptedOrderData}></AcceptedStatus>
        </div>
      )}
    </div>
  );
}

export default UserHome;
