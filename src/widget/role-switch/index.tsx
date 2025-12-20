'use client';

import { useUserStore } from '@/processes/profile-session/use-profile-store';
import { useState } from 'react';

const ROLE_MAP = {
  Guestmate: 'users',
  'Babmate(host mode)': 'hosts',
} as const;

type RoleLabel = keyof typeof ROLE_MAP;

export function RoleSwitch() {
  const { mode, setUser, name, isHost } = useUserStore();
  const currentLabel: RoleLabel = mode === 'hosts' ? 'Babmate(host mode)' : 'Guestmate';

  const handleChange = (label: RoleLabel) => {
    setUser({
      mode: ROLE_MAP[label],
      name: name,
      isHost: isHost,
    });
  };

  return (
    <div className="inline-flex rounded-full bg-gray-50 p-1 w-full">
      {(['Guestmate', 'Babmate(host mode)'] as const).map((label) => (
        <label key={label} className="cursor-pointer flex-1 text-button-sm">
          <input
            type="radio"
            name="role"
            className="peer sr-only"
            checked={currentLabel === label}
            onChange={() => handleChange(label)}
          />
          <span className="block rounded-full text-button-sm px-3 py-3  w-full text-black text-center whitespace-nowrap peer-checked:bg-black peer-checked:text-purewhite">
            {label}
          </span>
        </label>
      ))}
    </div>
  );
}
