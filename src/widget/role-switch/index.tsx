'use client';

import { useState } from 'react';

type RoleOption = 'Guestmate' | 'Babmate(host mode)';

export function RoleSwitch() {
  const [role, setRole] = useState<RoleOption>('Guestmate');

  return (
    <div className="inline-flex rounded-full bg-gray-50 p-1 w-full">
      <label className="cursor-pointer">
        <input
          type="radio"
          name="role"
          value="Guestmate"
          className="peer sr-only"
          checked={role === 'Guestmate'}
          onChange={() => setRole('Guestmate')}
        />
        <span className="block text-button-sm rounded-full px-4 py-2 text-sm font-medium text-black peer-checked:bg-black peer-checked:text-purewhite text-center">
          Guestmate
        </span>
      </label>

      {/* Babmate(host mode) */}
      <label className="cursor-pointer">
        <input
          type="radio"
          name="role"
          value="Babmate(host mode)"
          className="peer sr-only"
          checked={role === 'Babmate(host mode)'}
          onChange={() => setRole('Babmate(host mode)')}
        />
        <span className="text-button-sm block rounded-full px-4 py-2 text-sm font-medium text-black peer-checked:bg-black peer-checked:text-purewhite text-center whitespace-nowrap">
          Babmate(host mode)
        </span>
      </label>
    </div>
  );
}
