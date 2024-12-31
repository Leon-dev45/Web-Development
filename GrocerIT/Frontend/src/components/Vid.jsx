import React from 'react'
import bgv from './../assets/bgv.mp4'
 export default function Vid(){
    return(
        <div className="bgVideo absolute w-full h-[100dvh] top-0 left-0  overflow-hidden">

        {/* <!-- <img src="./assets/bg1.jpg" alt="" className="h-full w-full"> --> */}
        
        <video className="min-w-full min-h-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" autoPlay muted loop>
          <source src={bgv} type="video/mp4" />
        </video>
      </div>
    )
 }