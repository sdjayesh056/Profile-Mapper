import React, { useEffect, useState } from 'react';
import { profiles as mockProfiles } from '../Data/MockData';
import ProfileCard from '../Components/ProfileCard';
import Navbar from '../Components/Navbar';
import Loader from '../Utils/Loader';


function Home() {
  const [search, setSearch] = useState('');
  const [profiles, setProfiles] = useState([]);
  const [loading, setloading] = useState(true);

  const [profileItems, setProfileItems] = useState()
  console.log('profileItems :', profileItems);

  const STORAGE_KEY = 'profiles';

  useEffect(() => { 
    setProfileItems(JSON.parse(localStorage.getItem(STORAGE_KEY)) || [])
  },[])
  

  useEffect(() => {
    const fetchData = () => {
      setTimeout(() => {
        // setProfiles(mockProfiles)
        setProfiles(profileItems)
        setloading(false);
      }, 1000);
    };
    fetchData();
  }, []);


  const filtered = profileItems?.filter((p) => {
    return (
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase())
    );
  });

  if (loading) {
    return <h1 style={{textAlign:'center'}}>Loading...<Loader/></h1>;
  }

  return (
    <div className='profile-list'>
      <Navbar/>
      <div className='home-inputWrapper'>
        <input
          className='home-input'
          type='text'
          value={search}
          placeholder='search by name or description'
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      {filtered.map((p) => (
        <ProfileCard key={p.id} profile={p} />
      ))}
    </div>
  );
}

export default Home;
