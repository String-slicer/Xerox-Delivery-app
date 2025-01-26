

import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Temp from './Temp';
gsap.registerPlugin(ScrollTrigger);

const LandingPage = () => {
  


  return (
    <div className="relative flex size-full min-h-screen flex-col bg-[#131C24] dark group/design-root overflow-x-hidden font-sans">
      <div className="layout-container flex h-full grow flex-col">
        <header className="flex items-center justify-between border-b border-solid border-b-[#29374C] px-10 py-3">
          <div className="flex items-center gap-4 text-[#F8F9FB]">
            <div className="size-4">
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 42.4379C4 42.4379 14.0962 36.0744 24 41.1692C35.0664 46.8624 44 42.2078 44 42.2078L44 7.01134C44 7.01134 35.068 11.6577 24.0031 5.96913C14.0971 0.876274 4 7.27094 4 7.27094L4 42.4379Z" fill="currentColor"></path>
              </svg>
            </div>
            <h2 className="text-[#F8F9FB] text-lg font-bold leading-tight">Xerox</h2>
          </div>
          <div className="flex flex-1 justify-end gap-8">
            <div className="flex items-center gap-9">
              <a className="text-[#F8F9FB] text-sm font-medium" href="/delivery-steps">How it works</a>
              <a className="text-[#F8F9FB] text-sm font-medium" href="#">Ecosystem</a>
              <a className="text-[#F8F9FB] text-sm font-medium" href="#">FAQ</a>
            </div>
            <div className="flex gap-2">
              <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center rounded-xl h-10 px-4 bg-[#F4C753] text-[#141C24] text-sm font-bold">
                <span className="truncate">Sign In</span>
              </button>
              <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center rounded-xl h-10 px-4 bg-[#29374C] text-[#F8F9FB] text-sm font-bold">
                <span className="truncate">Get started</span>
              </button>
            </div>
          </div>
        </header>

        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <div className="opacity-100">
              <div className="flex min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat rounded-xl items-start justify-end px-4 pb-10" style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%), url("https://cdn.usegalileo.ai/sdxl10/f03e746a-79c0-4588-915d-f4891802bebf.png")` }}>
                <div className="flex flex-col gap-2 text-left">
                  <h1 className="text-white text-4xl font-black leading-tight">A new way to deliver with Xerox</h1>
                  <h2 className="text-white text-sm font-normal">Experience the power of blockchain-based delivery, real-time tracking, and easy-to-use interfaces for all user types. Join our community and be part of the future of delivery.</h2>
                </div>
                 <div className="flex-wrap gap-3 flex">
                  <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center rounded-xl h-10 px-4 bg-[#F4C753] text-[#141C24] text-sm font-bold">
                    <span className="truncate">Learn More</span>
                  </button>
                  <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center rounded-xl h-10 px-4 bg-[#29374C] text-[#F8F9FB] text-sm font-bold">
                    <span className="truncate">Join Waitlist</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-10 px-4 py-10">
              <div className="flex flex-col gap-4">
                <h1 className="text-[#F8F9FB] text-[32px] font-bold">How it works</h1>
                <p className="text-[#F8F9FB] text-base">With Xerox, the delivery process is seamless and transparent. Here's a step-by-step overview:</p>
              </div>
              <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3">
                <div className="flex flex-1 gap-3 rounded-lg border border-[#32415D] bg-[#1D2A36] p-4 flex-col">
                  <div className="text-[#F8F9FB]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                      <path d="M230.92,212c-15.23-26.33-38.7-45.21-66.09-54.16a72,72,0,1,0-73.66,0C63.78,166.78,40.31,185.66,25.08,212a8,8,0,1,0,13.85,8c18.84-32.56,52.14-52,89.07-52s70.23,19.44,89.07,52a8,8,0,1,0,13.85-8ZM72,96a56,56,0,1,1,56,56A56.06,56.06,0,0,1,72,96Z"></path>
                    </svg>
                  </div>
                  <h2 className="text-[#F8F9FB] text-base font-bold">User  places an order</h2>
                </div>
                <div className="flex flex-1 gap-3 rounded-lg border border-[#32415D] bg-[#1D2A36] p-4 flex-col">
                  <div className="text-[#F8F9FB]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                      <path d="M240,208H224V96a16,16,0,0,0-16-16H144V32a16,16,0,0,0-24.88-13.32L39.12,72A16,16,0,0,0,32,85.34V208H16a8,8,0,0,0,0,16H240a8,8,0,0,0,0-16ZM208,96V208H144V96ZM48,85.34,128,32V208H48ZM112,112v16a8,8,0,0,1-16,0V112a8,8,0,1,1,16,0Zm-32,0v16a8,8,0,0,1-16,0V112a8,8,0,1,1,16,0Zm0,56v16a8,8,0,0,1-16,0V168a8,8,0,0,1,16,0Zm32,0v16a8,8,0,0,1-16,0V168a8,8,0,0,1,16,0Z"></path>
                    </svg>
                  </div>
                  <h2 className="text-[#F8F9FB] text-base font-bold">Stores receive the request</h2>
                </div>
                <div className="flex flex-1 gap-3 rounded-lg border border-[#32415D] bg-[#1D2A36] p-4 flex-col">
                  <div className="text-[#F8F9FB]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                      <path d="M223.68,66.15,135.68,18a15.88,15.88,0,0,0-15.36,0l-88,48.17a16,16,0,0,0-8.32,14v95.64a16,16,0,0,0,8.32,14l88,48.17a15.88,15.88,0,0,0,15.36,0l88-48.17a16,16,0,0,0,8.32-14V80.18A16,16,0,0,0,223.68,66.15ZM128,32l80.34,44-29.77,16.3-80.35-44ZM128,120,47.66,76l33.9-18.56,80.34,44ZM40,90l80,43.78v85.79L40,175.82Zm176,85.78h0l-80,43.79V133.82l32-17.51V152a8,8,0,0,0,16,0V107.55L216,90v85.77Z"></path>
                    </svg>
                  </div>
                  <h2 className="text-[#F8F9FB] text-base font-bold">Store selects a delivery partner</h2>
                </div>
                <div className="flex flex-1 gap-3 rounded-lg border border-[#32415D] bg-[#1D2A36] p-4 flex-col">
                  <div className="text-[#F8F9FB]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                      <path d="M170.48,115.7A44,44,0,0,0,144,40.19V24a8,8,0,0,0-16,0V40H112V24a8,8,0,0,0-16,0V40H64a8,8,0,0,0,0,16h8V192H64a8,8,0,0,0,0,16H96v16a8,8,0,0,0,16,0V208h16v16a8,8,0,0,0,16,0V208h8a48,48,0,0,0,18.48-92.3ZM168,84a28,28,0,0,1-28,28H88V56h52A28,28,0,0,1,168,84ZM152,192H88V128h64a32,32,0,0,1,0,64Z"></path>
                    </svg>
                  </div>
                  <h2 className="text-[#F8F9FB] text-base font-bold">Order confirmation via blockchain</h2>
                </div>
                <div className="flex flex-1 gap-3 rounded-lg border border-[#32415D] bg-[#1D2A36] p-4 flex-col">
                  <div className="text-[#F8F9FB]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                      <path d="M128,64a40,40,0,1,0,40,40A40,40,0,0,0,128,64Zm0,64a24,24,0,1,1,24-24A24,24,0,0,1,128,128Zm0-112a88.1,88.1,0,0,0-88,88c0,31.4,14.51,64.68,42,96.25a254.19,254 .19,0,0,0,41.45,38.3,8,8,0,0,0,9.18,0A254.19,254.19,0,0,0,174,200.25c27.45-31.57,42-64.85,42-96.25A88.1,88.1,0,0,0,128,16Zm0,206c-16.53-13-72-60.75-72-118a72,72,0,0,1,144,0C200,161.23,144.53,209,128,222Z"></path>
                    </svg>
                  </div>
                  <h2 className="text-[#F8F9FB] text-base font-bold">Real-time status and location updates for the user</h2>
                </div>
              </div>
            </div>
            <h2 className="text-[#F8F9FB] text-[22px] font-bold px-4 pb-3 pt-5">Meet the community</h2>
            <div className="flex flex-col gap-10 px-4 py-10">
              <div className="flex flex-col gap-4">
                <h1 className="text-[#F8F9FB] text-[32px] font-bold">Meet the Xerox community</h1>
                <p className="text-[#F8F9FB] text-base">Get to know the people who make the Xerox delivery experience possible.</p>
              </div>
              <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3">
                <div className="flex flex-col gap-3 pb-3">
                  <div className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl" style={{ backgroundImage: 'url("https://cdn.usegalileo.ai/sdxl10/16fb944c-340a-45eb-be00-622f4af8743c.png")' }}></div>
                  <p className="text-[#F8F9FB] text-base">The Delivery Agent</p>
                </div>
                <div className="flex flex-col gap-3 pb-3">
                  <div className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl" style={{ backgroundImage: 'url("https://cdn.usegalileo.ai/sdxl10/dfe93a16-5116-473d-8571-81c9110ebe7d.png")' }}></div>
                  <p className="text-[#F8F9FB] text-base">The Store</p>
                </div>
                <div className="flex flex-col gap-3 pb-3">
                  <div className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl" style={{ backgroundImage: 'url("https://cdn.usegalileo.ai/sdxl10/d0a911bc-2441-42af-b5dc-4f5b5d829b36.png")' }}></div>
                  <p className="text-[#F8F9FB] text-base">The User</p>
                </div>
              </div>
            </div>
            <h2 className="text-[#F8F9FB] text-[22px] font-bold px-4 pb-3 pt-5">Benefits for each user type</h2>
            <div className="flex flex-col gap-10 px-4 py-10">
              <div className="flex flex-col gap-4">
                <h1 className="text-[#F8F9FB] text-[32px] font-bold">User  benefits</h1>
                <p className="text-[#F8F9FB] text-base">As a user, you get the following benefits.</p>
              </div>
              <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3">
                <div className="flex flex-1 gap-3 rounded-lg border border-[#32415D] bg-[#1D2A36] p-4 flex-col">
                  <div className="text-[#F8F9FB]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                      <path d="M223.68,66.15,135.68,18a15.88,15.88,0,0,0-15.36,0l-88 ```javascript
                      48.17a16,16,0,0,0-8.32,14v95.64a16,16,0,0,0,8.32,14l88,48.17a15.88,15.88,0,0,0,15.36,0l88-48.17a16,16,0,0,0,8.32-14V80.18A16,16,0,0,0,223.68,66.15ZM128,32l80.34,44-29.77,16.3-80.35-44ZM128,120,47.66,76l33.9-18.56,80.34,44ZM40,90l80,43.78v85.79L40,175.82Zm176,85.78h0l-80,43.79V133.82l32-17.51V152a8,8,0,0,0,16,0V107.55L216,90v85.77Z"></path>
                    </svg>
                  </div>
                  <h2 className="text-[#F8F9FB] text-base font-bold">Fast delivery</h2>
                </div>
                <div className="flex flex-1 gap-3 rounded-lg border border-[#32415D] bg-[#1D2A36] p-4 flex-col">
                  <div className="text-[#F8F9FB]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                      <path d="M128,64a40,40,0,1,0,40,40A40,40,0,0,0,128,64Zm0,64a24,24,0,1,1,24-24A24,24,0,0,1,128,128Zm0-112a88.1,88.1,0,0,0-88,88c0,31.4,14.51,64.68,42,96.25a254.19,254.19,0,0,0,41.45,38.3,8,8,0,0,0,9.18,0A254.19,254.19,0,0,0,174,200.25c27.45-31.57,42-64.85,42-96.25A88.1,88.1,0,0,0,128,16Zm0,206c-16.53-13-72-60.75-72-118a72,72,0,0,1,144,0C200,161.23,144.53,209,128,222Z"></path>
                    </svg>
                  </div>
                  <h2 className="text-[#F8F9FB] text-base font-bold">Transparent tracking</h2>
                </div>
                <div className="flex flex-1 gap-3 rounded-lg border border-[#32415D] bg-[#1D2A36] p-4 flex-col">
                  <div className="text-[#F8F9FB]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                      <path d="M170.48,115.7A44,44,0,0,0,144,40.19V24a8,8,0,0,0-16,0V40H112V24a8,8,0,0,0-16,0V40H64a8,8,0,0,0,0,16h8V192H64a8,8,0,0,0,0,16H96v16a8,8,0,0,0,16,0V208h16v16a8,8,0,0,0,16,0V208h8a48,48,0,0,0,18.48-92.3ZM168,84a28,28,0,0,1-28,28H88V56h52A28,28,0,0,1,168,84ZM152,192H88V128h64a32,32,0,0,1,0,64Z"></path>
                    </svg>
                  </div>
 <h2 className="text-[#F8F9FB] text-base font-bold">Blockchain security</h2>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-10 px-4 py-10">
              <div className="flex flex-col gap-4">
                <h1 className="text-[#F8F9FB] text-[32px] font-bold">Store benefits</h1>
                <p className="text-[#F8F9FB] text-base">As a store, you get the following benefits.</p>
              </div>
              <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3">
                <div className="flex flex-1 gap-3 rounded-lg border border-[#32415D] bg-[#1D2A36] p-4 flex-col">
                  <div className="text-[#F8F9FB]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                      <path d="M240,208H224V96a16,16,0,0,0-16-16H144V32a16,16,0,0,0-24.88-13.32L39.12,72A16,16,0,0,0,32,85.34V208H16a8,8,0,0,0,0,16H240a8,8,0,0,0,0-16ZM208,96V208H144V96ZM48,85.34,128,32V208H48ZM112,112v16a8,8,0,0,1-16,0V112a8,8,0,1,1,16,0Zm-32,0v16a8,8,0,0,1-16,0V112a8,8,0,1,1,16,0Zm0,56v16a8,8,0,0,1-16,0V168a8,8,0,0,1,16,0Zm32,0v16a8,8,0,0,1-16,0V168a8,8,0,0,1,16,0Z"></path>
                    </svg>
                  </div>
                  <h2 className="text-[#F8F9FB] text-base font-bold">Efficient order management</h2>
                </div>
                <div className="flex flex-1 gap-3 rounded-lg border border-[#32415D] bg-[#1D2A36] p-4 flex-col">
                  <div className="text-[#F8F9FB]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                      <path d="M223.68,66.15,135.68,18a15.88,15.88,0,0,0-15.36,0l-88,48.17a16,16,0,0,0-8.32,14v95.64a16,16,0,0,0,8.32,14l88,48.17a15.88,15.88,0,0,0,15.36,0l88-48.17a16,16,0,0,0,8.32-14V80.18A16,16,0,0,0,223.68,66.15ZM128,32l80.34,44-29.77,16.3-80.35-44ZM128,120,47.66,76l33.9-18.56,80.34,44ZM40,90l80,43.78v85.79L40,175.82Zm176,85.78h0l-80,43.79V133.82l32-17.51V152a8,8,0,0,0,16,0V107.55L216,90v85.77Z"></path>
                    </svg>
                  </div>
                  <h2 className="text-[#F8F9FB] text-base font-bold">Trusted delivery partners</h2>
                </div>
                <div className="flex flex-1 gap-3 rounded-lg border border-[#32415D ] bg-[#1D2A36] p-4 flex-col">
                  <div className="text-[#F8F9FB]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                      <path d="M170.48,115.7A44,44,0,0,0,144,40.19V24a8,8,0,0,0-16,0V40H112V24a8,8,0,0,0-16,0V40H64a8,8,0,0,0,0,16h8V192H64a8,8,0,0,0,0,16H96v16a8,8,0,0,0,16,0V208h16v16a8,8,0,0,0,16,0V208h8a48,48,0,0,0,18.48-92.3ZM168,84a28,28,0,0,1-28,28H88V56h52A28,28,0,0,1,168,84ZM152,192H88V128h64a32,32,0,0,1,0,64Z"></path>
                    </svg>
                  </div>
                  <h2 className="text-[#F8F9FB] text-base font-bold">Blockchain-verified orders</h2>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-10 px-4 py-10">
              <div className="flex flex-col gap-4">
                <h1 className="text-[#F8F9FB] text-[32px] font-bold">Delivery agent benefits</h1>
                <p className="text-[#F8F9FB] text-base">As a delivery agent, you get the following benefits.</p>
              </div>
              <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3">
                <div className="flex flex-1 gap-3 rounded-lg border border-[#32415D] bg-[#1D2A36] p-4 flex-col">
                  <div className="text-[#F8F9FB]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                      <path d="M223.68,66.15,135.68,18a15.88,15.88,0,0,0-15.36,0l-88,48.17a16,16,0,0,0-8.32,14v95.64a16,16,0,0,0,8.32,14l88,48.17a15.88,15.88,0,0,0,15.36,0l88-48.17a16,16,0,0,0,8.32-14V80.18A16,16,0,0,0,223.68,66.15ZM128,32l80.34,44-29.77,16.3-80.35-44ZM128,120,47.66,76l33.9-18.56,80.34,44ZM40,90l80,43.78v85.79L40,175.82Zm176,85.78h0l-80,43.79V133.82l32-17.51V152a8,8,0,0,0,16,0V107.55L216,90v85.77Z"></path>
                    </svg>
                  </div>
                  <h2 className="text-[#F8F9FB] text-base font-bold">Flexible working hours</h2>
                </div>
                <div className="flex flex-1 gap-3 rounded-lg border border-[#32415D] bg-[#1D2A36] p-4 flex-col">
                  <div className="text-[#F8F9FB]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                      <path d="M184,89.57V84c0-25.08-37.83-44- 88-44S8,58.92,8,84v40c0,20.89,26.25,37.49,64,42.46V172c0,25.08,37.83,44,88,44s88-18.92,88-44V132C248,111.3,222.58,94.68,184,89.57ZM232,132c0,13.22-30.79,28-72,28-3.73,0-7.43-.13-11.08-.37C170.49,151.77,184,139,184,124V105.74C213.87,110.19,232,122.27,232,132ZM72,150.25V126.46A183.74,183.74,0,0,0,96,128a183.74,183.74,0,0,0,24-1.54v23.79A163,163,0,0,1,96,152,163,163,0,0,1,72,150.25Zm96-40.32V124c0,8.39-12.41,17.4-32,22.87V123.5C148.91,120.37,159.84,115.71,168,109.93ZM96,56c41.21,0,72,14.78,72,28s-30.79,28-72,28S24,97.22,24,84,54.79,56,96,56ZM24,124V109.93c8.16,5.78,19.09,10.44,32,13.57v23.37C36.41,141.4,24,132.39,24,124Zm64,48v-4.17c2.63.1,5.29.17,8,.17,3.88,0,7.67-.13,11.39-.35A121.92,121.92,0,0,0,120,171.41v23.46C100.41,189.4,88,180.39,88,172Zm48,26.25V174.4a179.48,179.48,0,0,0,24,1.6,183.74,183.74,0,0,0,24-1.54v23.79a165.45,165.45,0,0,1-48,0Zm64-3.38V171.5c12.91-3.13,23.84-7.79,32-13.57V172C232,180.39,219.59,189.4,200,194.87Z"></path>
                    </svg>
                  </div>
                  <h2 className="text-[#F8F9FB] text-base font-bold">Fair compensation</h2>
                </div>
                <div className="flex flex-1 gap-3 rounded-lg border border-[#32415D] bg-[#1D2A36] p-4 flex-col">
                  <div className="text-[#F8F9FB]">
                  
                    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                      <path d="M170.48,115.7A44,44,0,0,0,144,40.19V24a8,8,0,0,0-16,0V40H112V24a8,8,0,0,0-16,0V40H64a8,8,0,0,0,0,16h8V192H64a8,8,0,0,0,0,16H96v16a8,8,0,0,0,16,0V208h16v16a8,8,0,0,0,16,0V208h8a48,48,0,0,0,18.48-92.3ZM168,84a28,28,0,0,1-28,28H88V56h52A28,28,0,0,1,168,84ZM152,192H88V128h64a32,32,0,0,1,0,64Z"></path>
                    </svg>
                  </div>
                  <h2 className="text-[#F8F9FB] text-base ```javascript
                  font-bold">Blockchain-secured payments</h2>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-end gap-6 px-4 py-10">
              <div className="flex flex-col gap-2 text-center">
                <h1 className="text-[#F8F9FB] text-[32px] font-bold">Ready to join us?</h1>
                <p className="text-[#F8F9FB] text-base">Earn money delivering with Xerox - apply now and start making deliveries as soon as today!</p>
              </div>
              <div className="flex flex-1 justify-center">
                <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center rounded-xl h-10 px-4 bg-[#F4C753] text-[#141C24] text-sm font-bold">
                  <span className="truncate">Become a courier</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Temp></Temp>
    </div>
  );
};
export default LandingPage;