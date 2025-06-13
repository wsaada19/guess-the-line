"use client";
import { useEffect, useState } from "react";
import Scorecard from "./Scorecard";
import { Matchup } from "./Matchup";
import PointsBanner from "./PointsBanner";
import { getScoreFromGuess } from "@/services/gameLogic";
import { useStore } from "@/store/guessTheLine";
import FinalScorePopup from "./FinalScorePopup";
import Header from "./Header";
import LoadingSpinner from "./ui/Loading";

export const GuessTheLine = ({ matches }) => {
  const {
    score,
    updateScore,
    numberOfGuesses,
    addGuess,
    date,
    setDate,
    reset,
    selectedSport,
    setSelectedSport,
  } = useStore((state) => ({
    score: state.score,
    updateScore: state.updateScore,
    numberOfGuesses: state.numberOfGuesses,
    addGuess: state.addGuess,
    date: state.date,
    setDate: state.setDate,
    reset: state.reset,
    selectedSport: state.selectedSport,
    setSelectedSport: state.setSelectedSport,
    finalGuesses: state.finalGuesses,
  }));

  const [bannerOpacity, setBannerOpacity] = useState("0");
  const [bannerScore, setBannerScore] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const handleReset = () => {
    reset();
    setDate(new Date());
  };

  const handleSportChange = (e) => {
    setSelectedSport(e.target.value);
  };

  const showBanner = (points, duration = 4000) => {
    setBannerScore(points);
    setBannerOpacity("100");
    setTimeout(() => setBannerOpacity("0"), duration);
  };

  const submitGuess = (guess, actual, id, home, away) => {
    addGuess({ guess, actual, id, home, away });
    const points = getScoreFromGuess(guess, actual);
    updateScore(points);
    showBanner(points);
  };

  useEffect(() => {
    const currentDate = new Date();
    if (!date || currentDate.getDate() !== new Date(date).getDate()) {
      handleReset();
      setDate(currentDate);
    }
    setIsLoading(false);
  }, [date, reset, setDate]);

  const hasMatches = matches && matches.length > 0;
  const filteredMatches = hasMatches
    ? matches.filter((match) => {
        if (selectedSport === "both") return true;
        const isWNBA =
          match.home.logo.includes("wnba") || match.away.logo.includes("wnba");
        return selectedSport === "wnba" ? isWNBA : !isWNBA;
      })
    : [];

  return (
    <div className="max-w-6xl mx-auto px-8">
      <Header handleReset={handleReset} />
      <hr className="mb-4 border-white" />
      <FinalScorePopup matchesLength={filteredMatches.length} />
      {hasMatches && (
        <Scorecard
          remainingGuesses={filteredMatches.length - numberOfGuesses()}
          score={score}
        />
      )}
      <div className="flex justify-end mt-4">
        <select
          value={selectedSport}
          onChange={handleSportChange}
          className="bg-white text-black px-3 py-1 rounded border border-white focus:outline-none focus:border-blue-500"
        >
          <option value="both">All</option>
          <option value="nba">NBA</option>
          <option value="wnba">WNBA</option>
        </select>
      </div>

      {hasMatches && !isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-x-6">
          {filteredMatches.map((match) => (
            <Matchup
              home={match.home}
              away={match.away}
              points={match.points}
              key={match.id}
              id={match.id}
              gameTime={match.gameTime}
              submitGuess={submitGuess}
            />
          ))}
        </div>
      )}

      {isLoading && <LoadingSpinner />}
      <PointsBanner opacity={bannerOpacity} points={bannerScore} />
    </div>
  );
};
