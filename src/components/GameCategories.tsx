import React from 'react';
import { GameCard } from './GameCard';
import { Game } from '../types';

interface GameCategoriesProps {
  title: string;
  games: Game[];
}

export const GameCategories = ({ title, games }: GameCategoriesProps) => (
  <section className="mb-12">
    <h2 className="text-2xl font-bold mb-6">{title}</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {games.map((game) => (
        <GameCard key={game.id} game={game} />
      ))}
    </div>
  </section>
);