"use client";

import React, { useState } from "react";
import HelpModal from "./HelpModal";


export default function Header({ handleReset }) {
  const [showHelpModal, setShowHelpModal] = useState(false);
  const toggleHelpModal = () => setShowHelpModal(!showHelpModal);
  return (
    <>
      <header className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-left mb-1 text-white">
          Guess the Line
        </h1>
        <span className="flex gap-4">
          <button
            className="hover:underline font-semibold text-white"
            onClick={toggleHelpModal}
          >
            Help
          </button>
          <button
            className="hover:underline font-semibold text-white"
            onClick={handleReset}
          >
            Reset
          </button>
        </span>
      </header>
      <p className='font-semibold text-sm mb-4 text-white'>
        {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
      </p>
      <HelpModal showModal={showHelpModal} setShowModal={setShowHelpModal} />
    </>
  );
}
