import React from 'react';
import { Link } from 'react-router-dom';
import { Game } from '../types';

interface GameCardProps {
  game: Game;
}

export const GameCard = ({ game }: GameCardProps) => (
  <Link
    to={`/game/${game.id}`}
    className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
  >
    <img
      src={game.background_image}
      alt={game.name}
      className="w-full h-48 object-cover"
    />
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-2">{game.name}</h2>
      <div className="flex items-center justify-between">
        <span className="text-gray-600">Rating: {game.rating}/5</span>
        <span className="text-gray-600">{game.released}</span>
      </div>
    </div>
  </Link>
);