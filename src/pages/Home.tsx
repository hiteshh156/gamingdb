import React, { useEffect, useState } from 'react';
import { GameCategories } from '../components/GameCategories';
import { fetchGames } from '../lib/api';
import { Game } from '../types';

export const Home = () => {
  const [popularGames, setPopularGames] = useState<Game[]>([]);
  const [upcomingGames, setUpcomingGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadGames = async () => {
      try {
        const [popularData, upcomingData] = await Promise.all([
          fetchGames(),
          fetchGames('', { upcoming: true })
        ]);
        
        setPopularGames(popularData.results);
        setUpcomingGames(upcomingData.results);
      } catch (error) {
        console.error('Error loading games:', error);
      } finally {
        setLoading(false);
      }
    };

    loadGames();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <GameCategories title="Popular Games" games={popularGames} />
      <GameCategories title="Upcoming Games" games={upcomingGames} />
    </div>
  );
};