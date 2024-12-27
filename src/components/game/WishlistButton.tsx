import React from 'react';
import { Heart } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { supabase } from '../../lib/supabase';

interface WishlistButtonProps {
  gameId: number;
  isWishlisted: boolean;
  onToggle: () => void;
}

export const WishlistButton = ({ gameId, isWishlisted, onToggle }: WishlistButtonProps) => {
  const user = useAuthStore(state => state.user);

  const handleToggleWishlist = async () => {
    if (!user) return;

    try {
      if (isWishlisted) {
        await supabase
          .from('wishlists')
          .delete()
          .match({ user_id: user.id, game_id: gameId });
      } else {
        await supabase
          .from('wishlists')
          .insert([{ user_id: user.id, game_id: gameId }]);
      }
      onToggle();
    } catch (error) {
      console.error('Error toggling wishlist:', error);
    }
  };

  return (
    <button
      onClick={handleToggleWishlist}
      className={`p-2 rounded-full transition-all duration-150 ${
        isWishlisted 
          ? 'bg-red-500 text-white' 
          : 'bg-gray-200 text-gray-600 hover:bg-red-100'
      }`}
      title={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
    >
      <Heart className={`h-6 w-6 ${isWishlisted ? 'fill-current' : ''}`} />
    </button>
  );
};