import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const Form = () => {
    const[userData, setData]= useState({name:"", email:"", phone:"", password:""});
    const[formErrors, setFormErrors]= useState({});
    const[submit, setSubmit]= useState(false);
    const handleChange=(event)=>{
       const{name,value}=event.target;
       setData({
        ...userData, 
        [name]:value
       }
    )
    }
    const handleSubmit=(event)=>{
          event.preventDefault();
          setFormErrors(validate(userData));
          setSubmit(true);
    }
    const validate=(values)=>{
          const errors={};
          const regex= /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
          const regexPassword= /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
          if(!values.name){
            errors.name="Username is required!";
          }
          if(!values.email){
            errors.email="Email is required!";
          }
          else if(!regex.test(values.email)){
            errors.email="This is not a valid email format!";
          }
          if(!values.phone){
            errors.phone="Number is required!";
          }
          else if(values.phone.length <10){
            errors.phone="This is not a valid phone number!";
          }
          if(!values.password){
            errors.password="Password is required!";
          }
          else if(!regexPassword.test(values.password)){
            errors.password="This is not a valid password!";
          }
          return errors;
    }
    useEffect(() => {
      // console.log(formErrors);
       const postData= async()=>{
        try{
          if (Object.keys(formErrors).length === 0 && submit && Object.values(userData).every(value => value !== "")) {
            const response= await axios.post('http://localhost:5173',JSON.stringify(userData),{
              headers: {
                'Content-Type': 'application/json',
              }
            })
            if(response.status===200){
              console.log('Form data submitted successfully');
              setData({
                name: "",
                email: "",
                phone: "",
                password: ""
              });
            }
          }
        }
        catch(error){
          console.error('Error submitting form data:', error);
        }
       }
       postData();
   }, [formErrors, userData, submit]);

  return (
    <div className="bg-white flex justify-center items-center h-screen">
      <div className="max-w-md px-24 py-10 bg-gray-100 rounded-lg shadow-md">
        <h2 className="text-2xl mb-4 text-left">Signup Form</h2>
        <form onSubmit={handleSubmit}> 
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="form-input mt-1 block "
              name="name"
              onChange={handleChange}
              value={userData.name}
            />
            <p className="text-red-600">{formErrors.name}</p>
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="form-input mt-1 block"
              name="email"
              onChange={handleChange}
              value={userData.email}
            />
             <p className="text-red-600">{formErrors.email}</p>
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block text-gray-700">
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              className="form-input mt-1 block"
              name="phone"
              onChange={handleChange}
              value={userData.phone}
            />
             <p className="text-red-600">{formErrors.phone}</p>
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="form-input mt-1 block"
              name="password"
              onChange={handleChange}
              value={userData.password}
            />
             <p className="text-red-600">{formErrors.password}</p>
          </div>
          <div>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
