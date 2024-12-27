import React from 'react';
import { Game } from '../../types';
import { GameCard } from '../GameCard';

interface GameSectionProps {
  title: string;
  games: Game[];
}

export const GameSection = ({ title, games }: GameSectionProps) => (
  <section>
    <h2 className="text-xl font-bold mb-4">{title}</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {games.map(game => (
        <GameCard key={game.id} game={game} />
      ))}
    </div>
  </section>
);