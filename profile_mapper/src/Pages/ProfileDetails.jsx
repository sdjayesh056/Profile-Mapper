import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { profiles } from '../Data/MockData';
import MapView from '../Components/MapView';
import Navbar from '../Components/Navbar';
import Loader from '../Utils/Loader';

function ProfileDetails() {
  const { id } = useParams();
  const [profile, setProfile] = useState([]);
  const [loading, setLoading] = useState(true);
  // console.log("URL param ID:", id);
  // console.log("All profile id:", profiles.map(p=> p.id));

  useEffect(() => {
    setTimeout(() => {
      const matched = profiles.find((p) => p.id === Number(id));
      setProfile(matched);
      setLoading(false);
    }, 1000);
  }, [id]);

  if (loading) {
    return <h1 style={{textAlign:'center'}}>Loading...<Loader/></h1>;
  }

  // console.log("Matched profile:", profile);

  if (!profile) {
    return <h3>Profile Not Found..</h3>;
  }
  return (
    <>
      <Navbar />
      <div className='profile-detail'>
        <div>
          <img className='profile-img' src={profile.photo} alt='' />
          <p>
            <strong>Address</strong> : {profile.address}
          </p>
          <p>
            <strong>Email</strong> : {profile.contact.email}
          </p>
          <p>
            <strong>Phone</strong> : {profile.contact.phone}
          </p>
          <p>
            <strong>Website</strong> : {profile.contact.website}
          </p>
          <p>
            <strong>LinkedIn</strong> : {profile.contact.linkedin}
          </p>
        </div>
        <div className='profile-detail2'>
          <h1 className='profile-h1'>{profile.name}</h1>
          <p>{profile.description}</p>
          <p>
            <strong>Interest</strong> : {profile.interests}
          </p>
          <MapView
            lat={profile.lat}
            lng={profile.lng}
            style={{ width: '50%' }}
          />
        </div>

        {/* <h2>{profile.name}</h2>
        <p>{profile.description}</p>
        <MapView lat={profile.lat} lng={profile.lng}/> */}
      </div>
    </>
  );
}

export default ProfileDetails;
