import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MapView from './MapView';

function ProfileCard({ profile }) {
  
  const navigate = useNavigate();
   

  return (
    <div
      className='profile-card'
      onClick={() => navigate(`/profile/${profile.id}/details`)}
    >
      <img className='home-img' src={profile.photo} alt={profile.name} />
      <h3>{profile.name}</h3>
      <p>{profile.description}</p>
      <div style={{width:'200px', height:'200px'}}>

      <MapView lat={profile.lat} lng={profile.lng} />
      </div>
      <button
        className='summary-btn'
        onClick={(e) => {
          navigate(`/profile/${profile.id}/summary`, {
            state: {
              lat: profile.lat,
              lng: profile.lng,
              address: profile.address,
              name: profile.name
            },
          });
          e.stopPropagation();
        }}
      >
        Summary
      </button>
    </div>
  );
}

export default ProfileCard;
