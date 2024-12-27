import React from 'react';
import { GamepadIcon } from 'lucide-react';

export const Logo = () => (
  <div className="flex items-center gap-2">
    <div className="relative">
      <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
        <GamepadIcon className="h-6 w-6 text-yellow-400" />
      </div>
    </div>
    <span className="text-2xl font-bold text-black">
      XPEDIA
    </span>
  </div>
);