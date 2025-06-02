import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import MapView from '../Components/MapView';
import Navbar from '../Components/Navbar';
import Loader from '../Utils/Loader';

function ProfileSummary() {
  const { state } = useLocation();
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    if (state) {
      const timer = setTimeout(() => {
        setLoading(false)
      }, 1000);
      return ()=> clearTimeout(timer)
    }
  },[state])

  if(loading){
    return <h1 style={{textAlign:'center'}}>Loading...<Loader/></h1>
  }

  if (!state) return <p>Invalid profile summary.</p>;

  const { name, lat, lng, address } = state;

  return (
    <>
    <Navbar/>
    <div style={{ padding: '2rem' }}>
      <h1>{name}</h1>
      <p>{address}</p>
      <MapView lat={lat} lng={lng} fullWidth zoom={14} />
    </div>
    </>
  );
}

export default ProfileSummary;



