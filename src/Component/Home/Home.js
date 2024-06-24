import React, { useState, useRef } from "react";
import "../Home/Home.css";

const Home = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [generatedOtp, setGeneratedOtp] = useState(generateOTP());
  const inputRefs = useRef([]);

  function generateOTP() {
    let otp = "";
    for (let i = 0; i < 4; i++) {
      otp += Math.floor(Math.random() * 10);
    }
    return otp;
  }

  const handleInputChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;

    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1].focus();
    }

    setOtp(newOtp);
  };

  const handleInputKeyDown = (index, e) => {
    if (e.key === "Backspace" && index > 0 && !otp[index]) {
      const newOtp = [...otp];
      newOtp[index - 1] = "";
      inputRefs.current[index - 1].focus();
      setOtp(newOtp);
    }
  };

  const handleVerifyOTP = () => {
    const enteredOtp = otp.join("");
    if (enteredOtp === generatedOtp) {
      alert("OTP Verified Successfully!");
    } else {
      alert("Incorrect OTP! Please try again.");
    }
  };

  return (
    <>
      <div className="otp">
        <div className="container">
          <div className="otpmain">
            <p>Random Number</p>
            <h1>{generatedOtp}</h1>
            <h2>OTP verification</h2>
            <p>Enter the 4-digit OTP you have received:</p>
          </div>
          {otp.map((digit, index) => (
            <input
              type="text"
              key={index}
              className="otp-input"
              maxLength={1}
              value={digit}
              autoFocus={index === 0}
              ref={(ref) => (inputRefs.current[index] = ref)}
              onChange={(e) => handleInputChange(index, e.target.value)}
              onKeyDown={(e) => handleInputKeyDown(index, e)}
            />
          ))}
          <button className="verify-button " onClick={handleVerifyOTP}>
            Verify OTP
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
