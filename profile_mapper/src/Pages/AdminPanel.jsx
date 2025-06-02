import React, { useEffect, useState } from "react";
import {
  loadProfiles,
  saveProfiles,
  seedInitialProfiles,
} from "../Utils/Storage";
import ProfileForm from "../Components/ProfileForm";
import Navbar from "../Components/Navbar";
import Loader from "../Utils/Loader";

function AdminPanel() {
  const [profiles, setProfiles] = useState([]);
  const [editProfile, setEditProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    seedInitialProfiles();
    setProfiles(loadProfiles());
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  });

  useEffect(() => {
    console.log("Loaded Profiles:", profiles);
  }, [profiles]);

  const handleSubmit = (profile) => {
    const updated = editProfile
      ? profiles.map((p) => (p.id === profile.id ? profile : p))
      : [...profiles, profile];

    setProfiles(updated);
    saveProfiles(updated);
    setEditProfile(null);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this profile?")) {
      const updated = profiles.filter((p) => p.id !== id);
      setProfiles(updated);
      saveProfiles(updated);
    }
    alert("Profile deleted successfully!");
  };

  if (loading) {
    return (
      <h1 style={{ textAlign: "center" }}>
        Loading...
        <Loader />
      </h1>
    );
  }

  return (
    <div>
      <Navbar />
      <h1>Admin Panel</h1>
      <ProfileForm onSubmit={handleSubmit} existingProfile={editProfile} />
      <hr />
      <h3>All Profiles</h3>
      {profiles.map((p) => (
        <div key={p.id} className="adminProfile-card">
          <img
            src={p.photo}
            alt=""
            style={{ width: "100px", height: "100px", marginTop: "2%" }}
          />
          <h4>{p.name}</h4>
          <p>{p.description}</p>
          <p>
            <strong>Address :</strong>
            {p.address}
          </p>

          <p>
            <strong>Email :</strong>
            {p.contact?.email}
          </p>
          <p>
            <strong>Phone :</strong>
            {p.contact?.phone}
          </p>
          <p>
            <strong>Website :</strong>
            <a href={p.contact?.website} target="_blank">
              {p.contact?.website}
            </a>
          </p>
          <p>
            <strong>LinkedIn :</strong>
            <a href={p.contact?.linkedin} target="_blank">
              {p.contact?.linkedin}
            </a>
          </p>

          <p>
            <strong>Interest :</strong>
            {p.interests?.join(", ")}
          </p>

          <button className="admin-edit" onClick={() => setEditProfile(p)}>
            Edit
          </button>
          <button className="admin-delete" onClick={() => handleDelete(p.id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default AdminPanel;
