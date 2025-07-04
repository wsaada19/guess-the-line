"use client";
import { useEffect, useState } from "react";
import Scorecard from "./Scorecard";
import { Matchup } from "./Matchup";
import PointsBanner from "./PointsBanner";
import { getScoreFromGuess } from "@/services/gameLogic";
import { useStore } from "@/store/guessTheLine";
import FinalScorePopup from "./FinalScorePopup";
import Header from "./Header";
import DaySelector from "./DaySelector";
import { useMemo } from "react";
import { matchesSelectedSport } from "@/lib/utils";

export const GuessTheLine = ({ initialGames }) => {
  const {
    getCurrentScore,
    numberOfGuessesForMatches,
    addGuess,
    date,
    setDate,
    reset,
    resetGuessesForCurrentDate,
    selectedSport,
    setSelectedSport,
    setGamesByDate,
    selectedDate,
    setSelectedDate,
    gamesByDate,
  } = useStore((state) => ({
    getCurrentScore: state.getCurrentScore,
    numberOfGuesses: state.numberOfGuesses,
    numberOfGuessesForMatches: state.numberOfGuessesForMatches,
    addGuess: state.addGuess,
    date: state.date,
    setDate: state.setDate,
    reset: state.reset,
    resetGuessesForCurrentDate: state.resetGuessesForCurrentDate,
    selectedSport: state.selectedSport,
    setSelectedSport: state.setSelectedSport,
    setGamesByDate: state.setGamesByDate,
    selectedDate: state.selectedDate,
    setSelectedDate: state.setSelectedDate,
    gamesByDate: state.gamesByDate,
  }));

  const [bannerOpacity, setBannerOpacity] = useState("0");
  const [bannerScore, setBannerScore] = useState(0);

  useEffect(() => {
    const gamesMap = new Map();
    
    initialGames.forEach(game => {
      const serverTime = new Date(game.gameTime);
      const localGameDate = new Date(
        serverTime.getFullYear(),
        serverTime.getMonth(),
        serverTime.getDate(),
        serverTime.getHours(),
        serverTime.getMinutes(),
        serverTime.getSeconds()
      );
      
      localGameDate.setHours(0, 0, 0, 0);
      const dateKey = localGameDate.toISOString().split('T')[0];
      
      if (!gamesMap.has(dateKey)) {
        gamesMap.set(dateKey, []);
      }
      
      // Convert the game time to local timezone for display
      const localGameTime = new Date(
        serverTime.getFullYear(),
        serverTime.getMonth(),
        serverTime.getDate(),
        serverTime.getHours(),
        serverTime.getMinutes(),
        serverTime.getSeconds()
      );
      
      gamesMap.get(dateKey).push({
        ...game,
        gameTime: localGameTime.toISOString()
      });
    });
    
    setGamesByDate(gamesMap);
  }, [initialGames, setGamesByDate]);

  // Ensure selectedDate is set when component loads
  useEffect(() => {
    if (!selectedDate) {
      const today = new Date().toISOString().split('T')[0];
      setSelectedDate(today);
    }
  }, [selectedDate, setSelectedDate]);

  const handleReset = () => {
    resetGuessesForCurrentDate();
    setDate(new Date());
  };

  const showBanner = (points, duration = 4000) => {
    setBannerScore(points);
    setBannerOpacity("100");
    setTimeout(() => setBannerOpacity("0"), duration);
  };

  const submitGuess = (guess, actual, id, home, away) => {
    addGuess({ guess, actual, id, home, away });
    const points = getScoreFromGuess(guess, actual);
    showBanner(points);
  };

  useEffect(() => {
    const currentDate = new Date();
    if (!date || currentDate.getDate() !== new Date(date).getDate()) {
      handleReset();
      setDate(currentDate);
    }
  }, [date, reset, setDate]);

  const filteredMatches = useMemo(() => {
    const matches = gamesByDate.get(selectedDate);
    if (!matches) return [];
    return matches.filter((match) => matchesSelectedSport(match, selectedSport));
  }, [selectedSport, selectedDate, gamesByDate]);

  const remainingGuesses = filteredMatches.length - numberOfGuessesForMatches(filteredMatches.map(match => match.id));

  return (
    <div className="max-w-5xl mx-auto px-8">
      <Header handleReset={handleReset} />

      <div className="bg-slate-800/50 rounded-lg p-4 mb-4">
        <DaySelector />

        <div className="pt-4">
          <div className="flex items-center justify-between">
            <Scorecard
              remainingGuesses={remainingGuesses}
              score={getCurrentScore()}
            />
            <select
              value={selectedSport}
              onChange={(e) => setSelectedSport(e.target.value)}
              className="bg-slate-700 text-white px-3 font-semibold py-2 rounded border border-slate-600 focus:outline-none focus:border-slate-500"
            >
              <option value="both">All</option>
              <option value="basketball_nba">NBA</option>
              <option value="basketball_wnba">WNBA</option>
              <option value="baseball_mlb">MLB</option>
            </select>
          </div>
        </div>
      </div>

      {filteredMatches.length > 0 ? (
        <>
          <FinalScorePopup matchesLength={filteredMatches.length} />
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
        </>
      ) : (
        <div className="text-center py-12 bg-slate-800/50 rounded-lg mt-6">
          <p className="text-base md:text-xl text-slate-300">
            No games available for this date
          </p>
        </div>
      )}

      <PointsBanner opacity={bannerOpacity} points={bannerScore} />
    </div>
  );
};
