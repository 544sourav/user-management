/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useRef, useState } from "react";
import { addUser } from "../service/operations/userAPI";
import { toast } from "react-hot-toast";
import upload from "../assets/upload.svg";

const AddUser = ({ onClose, onUserAdded }) => {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [previewSource, setPreviewSource] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const filerefernce = useRef(null);

  //*Form data handler* 
  const changeHandler = (event) => {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  };

  // *Image change handler*
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      previewFile(file);
      setImageFile(file);
     // console.log("file selected"); 
    }
  };

  const clickHandler=(e)=>{
        //console.log("click")
        filerefernce.current.click()
  }
  

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
      //console.log("preview"); 
    };
  };

  //*Submit handler*

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.phone && imageFile) {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("phone", formData.phone);
      data.append("image", imageFile);

      await addUser(data);
      onUserAdded(); 
      onClose(); 
    } else {
      toast.error("Please fill in all fields");
    }
  };

  return (
    <div className="bg-gray-900 p-6 relative rounded-xl text-white max-w-md">
      <input
        type="file"
        onChange={handleFileChange}
        ref={filerefernce}
        className="hidden pointer-events-none cursor-pointer"
        accept="image/png, image/jpg, image/jpeg, image/gif"
        required
      />
      <div className="absolute inset-0 rounded-2xl overflow-hidden">
        <div className="absolute -top-10 -left-10 w-60 h-60 bg-pink-500 rounded-full opacity-40 blur-2xl animate-pulse"></div>
        <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-blue-500 rounded-full opacity-40 blur-2xl animate-pulse"></div>
      </div>
      <div className="z-10 relative">
        <h2 className="text-2xl font-semibold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">
          Add User
        </h2>

        {/* Form to add new User */}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <div className="mt-2 z-10 relative flex items-center justify-center">
              <img
                src={previewSource || upload}
                alt="Profile Preview"
                className="w-40 h-40 object-cover rounded-full border cursor-pointer border-purple-500"
                onClick={clickHandler}
              />
            </div>
            <p className="text-gray-300 text-center mt-1">Profile Image</p>
          </label>
          <label className="block">
            <span className="text-gray-300">Name</span>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={changeHandler}
              className="mt-1 block w-full p-2 bg-gray-900 border border-purple-500 rounded-lg text-white placeholder-gray-500"
              required
            />
          </label>
          <label className="block">
            <span className="text-gray-300">Email</span>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={changeHandler}
              className="mt-1 block w-full p-2 bg-gray-900 border border-purple-500 rounded-lg text-white placeholder-gray-500"
              required
            />
          </label>
          <label className="block">
            <span className="text-gray-300">Mobile No.</span>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={changeHandler}
              className="mt-1 block w-full p-2 bg-gray-900 border border-purple-500 rounded-lg text-white placeholder-gray-500"
              required
            />
          </label>
          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-gray-700 text-gray-300 font-bold shadow-lg transition-transform transform hover:scale-105 hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white font-medium rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg shadow-pink-500/50 hover:from-pink-500 hover:to-purple-500 transform transition-all hover:scale-105"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
