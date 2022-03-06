import React, { useEffect } from 'react'


declare global {
  interface Window {
    adsbygoogle: {[key: string]: unknown}[]
  }
}
interface Props{
  slotId:String,
  width:String,
  height:String
  
}

function Ad({slotId, width, height}:Props) {
  
  const loadAds = () => {
    try {
      if (typeof window !== "undefined") {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (error:any) {
      console.log("adsense error", error.message);
    }
  };

  useEffect(() => {
    loadAds();
  }, []);
  return (
    <div className=" ">
        <ins className="adsbygoogle absolute md:top-1/2 md:left-5 block w-full h-full"
     style={{ width: `${width}px`, height: `${height}px` }}
     data-ad-client={process.env.NEXT_PUBLIC_GOOGLE_ADSENSE}
     data-ad-slot={slotId}
     data-adtest="on"
     data-ad-format="autorelaxed"
     data-full-width-responsive="true">
       </ins>
       </div>
  
  )
}

export default Ad