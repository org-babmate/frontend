'use client';

import { Pencil } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useId, useRef, useState } from 'react';

type Props = {
  value?: File | null;
  onChange?: (file: File | null) => void;
  defaultImageUrl: string;
  accept?: string[];
  disabled?: boolean;
};

export default function SingleImagePreviewInput({
  value,
  onChange,
  defaultImageUrl,
  accept = ['image/jpeg', 'image/png', 'image/webp'],
  disabled = false,
}: Props) {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const isControlled = value !== undefined;
  const [internalFile, setInternalFile] = useState<File | null>(value ?? null);
  const file = isControlled ? value! : internalFile;

  const [previewUrl, setPreviewUrl] = useState<string>(defaultImageUrl);

  useEffect(() => {
    if (isControlled) setInternalFile(value ?? null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  useEffect(() => {
    if (!file) {
      setPreviewUrl(defaultImageUrl);
      return;
    }

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    return () => URL.revokeObjectURL(url);
  }, [file, defaultImageUrl]);

  const setNext = (next: File | null) => {
    if (!isControlled) setInternalFile(next);
    onChange?.(next);
  };

  const onPick: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const picked = e.target.files?.[0] ?? null;
    if (!picked) return;

    setNext(picked);

    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div className="">
      <input
        id={inputId}
        ref={inputRef}
        type="file"
        accept={accept.join(',')}
        disabled={disabled}
        onChange={onPick}
        className="hidden"
      />

      <button
        type="button"
        disabled={disabled}
        onClick={() => inputRef.current?.click()}
        className="relative flex size-24  disabled:cursor-not-allowed disabled:opacity-50"
        aria-label="이미지 선택"
      >
        <Image
          src={previewUrl === '' ? '/a.jpg' : previewUrl}
          alt="image preview"
          fill
          objectFit="cover"
          className="rounded-full"
        />
        <div className="absolute right-0 bottom-0 size-8 p-2 z-20 bg-black rounded-full">
          <Pencil className="size-4 text-white" />
        </div>
      </button>
    </div>
  );
}
