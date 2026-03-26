import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import toast from 'react-hot-toast';
import Button from '../components/Button';
import Input from '../components/Input';

function Profile() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
    country: '',
    city: '',
    profilePhoto: ''
  });

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem('JwtToken');

  const getUser = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/user`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (res.data.success) {
        setUser(res.data.data);
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error('Failed to fetch user');
      window.location.href = '/login';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUpdate = async () => {
    try {
      setLoading(true);

      const res = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/profile`,
        user,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (res.data.success) {
        toast.success('Profile updated successfully');
        setIsEditing(false);
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error('Update failed');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-gray-50 to-slate-200">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-14">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-bold text-slate-800">
            Welcome,{" "}
            <span className="text-indigo-500">
              {user.name || "User"}
            </span>
          </h1>

          <Button
            title={isEditing ? 'Cancel' : 'Edit Profile'}
            onClick={() => setIsEditing(!isEditing)}
          />
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-10 grid md:grid-cols-3 gap-10">


          <div className="flex justify-center">
             <div className="group relative w-48 h-48 rounded-full object-cover overflow-hidden border-[5px] border-indigo-400 shadow-lg cursor-pointer transition-all hover:scale-[1.03]">
               <img src={user.profilePhoto} alt="Profile" className="" /> 
          </div> 
          </div>
          <div className="md:col-span-2 space-y-5">
            {['name', 'email', 'phone', 'country', 'city'].map((field) => (
              <div key={field}>
                <label className="block text-sm text-gray-500 mb-1 capitalize">
                  {field}
                </label>

                {isEditing ? (
                  <Input
                    type="text"
                    name={field}
                    value={user[field] || ""}
                    placeholder={`Enter ${field}`}
                    onChange={handleChange}
                  />
                ) : (
                  <div className="px-4 py-2 bg-gray-100 rounded-lg">
                    {user[field] || "-"}
                  </div>
                )}
              </div>
            ))}

            {isEditing && (
              <Button
                title={loading ? 'Saving...' : 'Save Changes'}
                onClick={handleUpdate}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;