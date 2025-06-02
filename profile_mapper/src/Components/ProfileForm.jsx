import React, { useState, useEffect } from "react";
// import { profiles } from '../Data/MockData';

function ProfileForm({ onSubmit, existingProfile }) {
  const [form, setForm] = useState(() => {
    return existingProfile
      ? {
          name: existingProfile.name,
          photo: existingProfile.photo,
          description: existingProfile.description,
          address: existingProfile.address,
          contact: {
            email: existingProfile.contact?.email || "",
            phone: existingProfile.contact?.phone || "",
            website: existingProfile.contact?.website || "",
            linkedin: existingProfile.contact?.linkedin || "",
          },
          interests: existingProfile.interests?.join(", ") || "",
        }
      : {
          name: "",
          photo: "",
          description: "",
          address: "",
          contact: {
            email: "",
            phone: "",
            website: "",
            linkedin: "",
          },
          interests: "",
        };
  });

  useEffect(() => {
    if (existingProfile) {
      setForm({
        name: existingProfile.name,
        photo: existingProfile.photo,
        description: existingProfile.description,
        address: existingProfile.address,
        contact: {
          email: existingProfile.contact?.email || "",
          phone: existingProfile.contact?.phone || "",
          website: existingProfile.contact?.website || "",
          linkedin: existingProfile.contact?.linkedin || "",
        },
        interests: existingProfile.interests?.join(", ") || "",
      });
    }
  }, [existingProfile]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (["email", "phone", "website", "linkedin"].includes(name)) {
      setForm((prev) => ({
        ...prev,
        contact: { ...prev.contact, [name]: value },
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const geoRes = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        form.address
      )}&key=AIzaSyBb5Kl_lMuXp6ooYsbsASc2o_fPg1GQDlg`
    );

    const geoData = await geoRes.json();

    if (geoData.status !== "OK" || !geoData.results.length) {
      alert("Invalid address or geocoding failed.");
      return;
    }

    const { lat, lng } = geoData.results[0].geometry.location;

    onSubmit({
      id: existingProfile?.id || Date.now(),
      name: form.name,
      photo: form.photo,
      description: form.description,
      address: form.address,
      lat,
      lng,
      contact: { ...form.contact },
      interests: form.interests.split(",").map((i) => i.trim()),
    });

    alert(`Profile ${existingProfile ? "updated" : "created"} successfully!`);

    setForm({
      name: "",
      photo: "",
      description: "",
      address: "",
      contact: {
        email: "",
        phone: "",
        website: "",
        linkedin: "",
      },
      interests: "",
    });

    // if (!existingProfile) {
    //   setForm({
    //     name: '',
    //     photo: '',
    //     description: '',
    //     address: '',
    //     contact: {
    //       email: '',
    //       phone: '',
    //       website: '',
    //       linkedin: '',
    //     },
    //     interests: '',
    //   });
    // }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="profile-form">
        <input
          className="admin-input"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          required
        />
        <input
          className="admin-input"
          name="photo"
          value={form.photo}
          onChange={handleChange}
          placeholder="Photo"
          required
        />
        <textarea
          className="admin-input"
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          required
        />
        <input
          className="admin-input"
          name="address"
          value={form.address}
          onChange={handleChange}
          placeholder="Address"
          required
        />

        <input
          className="admin-input"
          name="email"
          value={form.contact.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          className="admin-input"
          name="phone"
          value={form.contact.phone}
          onChange={handleChange}
          placeholder="Phone"
          required
        />
        <input
          className="admin-input"
          name="website"
          value={form.contact.website}
          onChange={handleChange}
          placeholder="Website URL"
          required
        />
        <input
          className="admin-input"
          name="linkedin"
          value={form.contact.linkedin}
          onChange={handleChange}
          placeholder="LinkedIn"
        />

        <input
          className="admin-input"
          name="interests"
          value={form.interests}
          onChange={handleChange}
          placeholder="Interests(comma-seperated)"
        />

        <button type="submit">
          {existingProfile ? "Update" : "Create"} Profile
        </button>
      </form>
    </div>
  );
}

export default ProfileForm;
