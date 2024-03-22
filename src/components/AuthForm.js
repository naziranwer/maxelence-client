import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { host } from "../constant";

const AuthForm = () => {
  const [isLoginForm, setIsLoginForm] = useState(true); // Default value is true for login form
  const [previewImage, setPreviewImage] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      if (isLoginForm) {
        // Handle login form submission
        const { email, password } = data;
        const loginData = { email, password };
        const response = await axios.post(
          host+"/auth/login",
          loginData
        );
        console.log("response data on login",response.data); // Handle successful login response
        if (response.status === 200) {
            const { token, user } = response.data; // Assuming API response contains token and user details
            
            // Save token and user details in localStorage
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            alert("You have successfully loggedIn");
            navigate("/browse");
        }
        else{
            alert("Something went wrong Please check your credentials");
        }
      } else {
        // Handle registration form submission
        const { email, password, confirmPassword, role } = data;
        const registerData = { email, password, confirmPassword, role };
        const response = await axios.post(
          host+"/auth/signup",
          registerData
        );
        console.log(response.data); // Handle successful registration response
        alert("Registration successful! You can now login.");
        // Switch to login form
        setIsLoginForm(true);
      }
    } catch (error) {
      console.error("Error:", error); // Handle error
      if (error.response) {
        alert("An error occurred. Please try again."); // Customize error message as needed
      }
    }
  };

  const toggleForm = () => {
    setIsLoginForm(!isLoginForm); // Toggle the value of isLoginForm
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen m-5">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-1/2"
        onSubmit={handleSubmit(onSubmit)}
        
        method="post" 
        enctype="multipart/form-data"
      >
        <h2 className="text-2xl mb-6 text-center">
          {isLoginForm ? "Login" : "Register"}
        </h2>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            {...register("email", { required: true })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Email"
          />
          {errors.email && (
            <span className="text-red-500">Email is required</span>
          )}
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            {...register("password", { required: true })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Password"
          />
          {errors.password && (
            <span className="text-red-500">Password is required</span>
          )}
        </div>
        {!isLoginForm && (
          <>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="confirmPassword"
              >
                Confirm Password
              </label>
              <input
                {...register("confirmPassword", { required: true })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="confirmPassword"
                type="password"
                placeholder="Confirm Password"
              />
              {errors.confirmPassword && (
                <span className="text-red-500">
                  Confirm Password is required
                </span>
              )}
            </div>

            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="role"
              >
                Role
              </label>
              <select
                {...register("role", { required: true })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="role"
              >
                <option value="">Select Role</option>
                <option value="superadmin">Superadmin</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
              {errors.role && (
                <span className="text-red-500">Role is required</span>
              )}
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="photo"
              >
                Profile Photo
              </label>
              <input
                {...register("photo", { required: true })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="photo"
                type="file"
                name="avatar"
                onChange={handleFileChange}
              />
              {errors.photo && (
                <span className="text-red-500">Profile photo is required</span>
              )}
            </div>
            {previewImage && (
              <div className="mb-4">
                <img
                  src={previewImage}
                  alt="Preview"
                  className="rounded-full h-24 w-24 mx-auto"
                />
              </div>
            )}
          </>
        )}
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            {isLoginForm ? "Login" : "Register"}
          </button>
        </div>
        <div
          className="flex items-center justify-between mt-5 cursor-pointer"
          onClick={toggleForm} // Call toggleForm function on button click
        >
          {isLoginForm
            ? "New User? Please Signup"
            : "Already registered? Please Login"}
        </div>
      </form>
    </div>
  );
};

export default AuthForm;
