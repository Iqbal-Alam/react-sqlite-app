import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
// import axios from 'axios';

const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    setMessage("");
    console.log(email, password);

    // try {
    //   const response = await axios.post('http://localhost:5000/api/users/login', {
    //     email,
    //     password
    //   });

    //   const { token } = response.data;
    //   localStorage.setItem('authToken', token);
    //   setMessage('Login successful!');

    //   // TODO: Redirect to dashboard or home
    // } catch (err) {
    //   setMessage(err.response?.data?.error || 'Login failed');
    // }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-cyan-500">
      <Card title="Signup" className="w-25rem ">
        <form onSubmit={handleSignup} className="p-fluid">
          <div className="field mb-3">
            <label htmlFor="email">Name</label>
            <InputText
              id="name"
              type="text"
              value={email}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="field mb-3">
            <label htmlFor="email">Email</label>
            <InputText
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="field mb-3">
            <label htmlFor="password">Password</label>
            <Password
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              toggleMask
              feedback={false}
              required
            />
          </div>

          <Button
            label="Signup"
            icon="pi pi-sign-in"
            className="p-button-primary w-full"
            type="submit"
          />
        </form>

        {message && <div className="mt-3 text-red-500">{message}</div>}
      </Card>
    </div>
  );
};

export default SignupPage;
