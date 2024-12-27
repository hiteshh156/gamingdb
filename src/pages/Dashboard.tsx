import React, { useEffect, useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { Game, UserProfile } from '../types';
import { supabase } from '../lib/supabase';
import { ProfileHeader } from '../components/dashboard/ProfileHeader';
import { GameSection } from '../components/dashboard/GameSection';

export const Dashboard = () => {
  const user = useAuthStore(state => state.user);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [recommendations, setRecommendations] = useState<Game[]>([]);
  const [wishlist, setWishlist] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      if (!user) return;

      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (error) throw error;
        setProfile(data);
      } catch (error) {
        console.error('Error loading profile:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [user]);

  if (!user || loading || !profile) {
    return <div>Loading...</div>;
  }

  const avatarUrl = profile.avatar_url 
    ? supabase.storage.from('avatars').getPublicUrl(profile.avatar_url).data.publicUrl 
    : undefined;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <ProfileHeader profile={profile} avatarUrl={avatarUrl} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <GameSection title="Recommended Games" games={recommendations} />
        <GameSection title="Your Wishlist" games={wishlist} />
      </div>
    </div>
  );
};