"use client";

import React, { useState } from "react";
import HelpModal from "./HelpModal";
import { useStore } from "@/store/guessTheLine";
import Image from "next/image";

export default function Header({ handleReset }) {
  const [showHelpModal, setShowHelpModal] = useState(false);
  const { selectedDate } = useStore((state) => ({
    selectedDate: state.selectedDate
  }));
  
  const toggleHelpModal = () => setShowHelpModal(!showHelpModal);

  const formatDate = (dateString) => {
    // Split the date string and create a date object with local timezone
    const [year, month, day] = dateString.split('-').map(Number);
    const date = new Date(year, month - 1, day); // month is 0-based in JS Date
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <>
      <header className="flex items-center justify-between">
        <h1 className="text-xl md:text-3xl font-bold text-left mb-1 text-white flex items-center -translate-x-2">
        <Image className="inline-block brightness-200 w-8 md:w-12" src="/logo.png" alt="Guess the Lines" width={48} height={48} />
          Guess the Lines
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
      <p className='font-semibold text-sm mb-1 text-white'>
        {formatDate(selectedDate)}
      </p>
      <HelpModal showModal={showHelpModal} setShowModal={setShowHelpModal} />
    </>
  );
}
