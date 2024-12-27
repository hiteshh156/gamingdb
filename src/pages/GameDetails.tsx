import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchGameDetails } from '../lib/api';

export const GameDetails = () => {
  const { id } = useParams();
  const [game, setGame] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadGame = async () => {
      try {
        const data = await fetchGameDetails(id!);
        setGame(data);
      } catch (error) {
        console.error('Error loading game details:', error);
      } finally {
        setLoading(false);
      }
    };

    loadGame();
  }, [id]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!game) {
    return <div>Game not found</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <img
          src={game.background_image}
          alt={game.name}
          className="w-full h-96 object-cover"
        />
        <div className="p-8">
          <h1 className="text-4xl font-bold mb-4">{game.name}</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4">About</h2>
              <p className="text-gray-700">{game.description_raw}</p>
            </div>
            <div>
              <div className="bg-gray-100 p-4 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">Details</h3>
                <dl className="space-y-2">
                  <div>
                    <dt className="font-medium">Release Date</dt>
                    <dd>{game.released}</dd>
                  </div>
                  <div>
                    <dt className="font-medium">Rating</dt>
                    <dd>{game.rating}/5 ({game.ratings_count} reviews)</dd>
                  </div>
                  <div>
                    <dt className="font-medium">Platforms</dt>
                    <dd>{game.platforms?.map((p: any) => p.platform.name).join(', ')}</dd>
                  </div>
                  <div>
                    <dt className="font-medium">Genres</dt>
                    <dd>{game.genres?.map((g: any) => g.name).join(', ')}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};