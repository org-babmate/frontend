'use client';

import { Dispatch, SetStateAction, useState } from 'react';

interface Props {
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
}

export default function ExperienceTitleInput({ title, setTitle }: Props) {
  const MAX_LENGTH = 20;

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-heading-1 text-label">경험의 이름을 지어주세요</h1>
      <input
        className="text-body-lg text-black ring ring-gray-200 p-4 rounded-xl"
        placeholder="경험 제목을 입력해주세요"
        value={title}
        maxLength={MAX_LENGTH}
        onChange={(e) => setTitle(e.target.value)}
      />
      <div className="text-sm text-gray-400 text-right">
        {title.length}/{MAX_LENGTH}
      </div>
    </div>
  );
}
