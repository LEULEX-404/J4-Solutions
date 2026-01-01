import React from "react";
import Lottie from "lottie-react";
import santaAnim from "../assets/santaclaus.json";
import "./SantaPeekLottie.css";

const SantaPeekLottie = () => {
  return (
    <div className="santa-lottie-peek">
      <Lottie
        animationData={santaAnim}
        loop
        autoplay
      />
    </div>
  );
};

export default SantaPeekLottie;
