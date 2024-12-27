import React from 'react';
import { UserProfile } from '../../types';

interface ProfileHeaderProps {
  profile: UserProfile;
  avatarUrl?: string;
}

export const ProfileHeader = ({ profile, avatarUrl }: ProfileHeaderProps) => (
  <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
    <div className="flex items-center space-x-4">
      {avatarUrl && (
        <img
          src={avatarUrl}
          alt="Profile"
          className="w-20 h-20 rounded-full object-cover"
        />
      )}
      <div>
        <h1 className="text-2xl font-bold">Welcome back, {profile.nickname}!</h1>
        <p className="text-gray-600">Region: {profile.region}</p>
      </div>
    </div>
  </div>
);