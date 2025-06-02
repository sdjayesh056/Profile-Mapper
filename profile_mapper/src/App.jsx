import Home from './Pages/Home';
import ProfileSummary from './Pages/ProfileSummary';
import ProfileDetails from './Pages/ProfileDetails';
import AdminPanel from './Pages/AdminPanel';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/profile/:id/summary' element={<ProfileSummary />} />
        <Route path="/profile/:id/details" element={<ProfileDetails />}/>
        <Route path='/adminPanel' element={<AdminPanel/>} />
      </Routes>
    </>
  );
}

export default App;
