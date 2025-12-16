'use client';

import { useState } from 'react';

export default function ExperienceNameInput() {
  const MAX_LENGTH = 20;
  const [name, setName] = useState('');

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-headline-lg text-gray-600">경험의 이름을 지어주세요</h1>

      <input
        className="text-body-lg text-[#878787] ring ring-gray-200 p-4 rounded-xl"
        placeholder="경험 제목을 입력해주세요"
        value={name}
        maxLength={MAX_LENGTH}
        onChange={(e) => setName(e.target.value)}
      />

      <div className="text-sm text-gray-400 text-right">
        {name.length}/{MAX_LENGTH}
      </div>
    </div>
  );
}
