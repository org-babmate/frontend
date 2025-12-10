'use client';

import { useState } from 'react';

type RoleOption = 'guest' | 'host';

export function RoleSwitch() {
  const [role, setRole] = useState<RoleOption>('guest');

  return (
    <div className="flex flex-col items-start gap-3">
      <div className="inline-flex rounded-full bg-gray-50 p-1">
        <label className="cursor-pointer">
          <input
            type="radio"
            name="role"
            value="guest"
            className="peer sr-only"
            checked={role === 'guest'}
            onChange={() => setRole('guest')}
          />
          <span className="block rounded-full px-4 py-2 text-sm font-medium text-black peer-checked:bg-black peer-checked:text-purewhite">
            guest
          </span>
        </label>

        {/* host */}
        <label className="cursor-pointer">
          <input
            type="radio"
            name="role"
            value="host"
            className="peer sr-only"
            checked={role === 'host'}
            onChange={() => setRole('host')}
          />
          <span className="block rounded-full px-4 py-2 text-sm font-medium text-black peer-checked:bg-black peer-checked:text-purewhite">
            host
          </span>
        </label>
      </div>
    </div>
  );
}
