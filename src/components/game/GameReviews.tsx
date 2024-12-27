import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { ReviewForm } from '../ReviewForm';

interface Review {
  id: string;
  user_id: string;
  content: string;
  rating: number;
  created_at: string;
  profiles: {
    nickname: string;
    avatar_url: string;
  };
}

interface GameReviewsProps {
  gameId: number;
}

export const GameReviews = ({ gameId }: GameReviewsProps) => {
  const [reviews, setReviews] = useState<Review[]>([]);

  const loadReviews = async () => {
    const { data, error } = await supabase
      .from('reviews')
      .select(`
        *,
        profiles:user_id (
          nickname,
          avatar_url
        )
      `)
      .eq('game_id', gameId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error loading reviews:', error);
      return;
    }

    setReviews(data);
  };

  useEffect(() => {
    loadReviews();
  }, [gameId]);

  return (
    <div className="space-y-8">
      <ReviewForm gameId={gameId} onReviewSubmitted={loadReviews} />
      
      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center gap-4 mb-2">
              {review.profiles.avatar_url && (
                <img
                  src={supabase.storage.from('avatars').getPublicUrl(review.profiles.avatar_url).data.publicUrl}
                  alt={review.profiles.nickname}
                  className="w-10 h-10 rounded-full"
                />
              )}
              <div>
                <div className="font-medium">{review.profiles.nickname}</div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
            <p className="text-gray-600">{review.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};