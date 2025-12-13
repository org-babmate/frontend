'use client';

import React, { useEffect, useId, useMemo, useRef, useState } from 'react';

type Props = {
  accept?: string[];
  maxSizeBytes?: number;
  disabled?: boolean;
  label?: string;
  value?: File | null;
  onChange?: (file: File | null) => void;
};

const bytesToMB = (b: number) => (b / (1024 * 1024)).toFixed(1);

export default function SingleImageUpload({
  accept = ['image/jpeg', 'image/png', 'image/webp'],
  maxSizeBytes = 5 * 1024 * 1024,
  disabled = false,
  label = '이미지 업로드',
  value,
  onChange,
}: Props) {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const acceptAttr = useMemo(() => accept.join(','), [accept]);

  const [file, setFile] = useState<File | null>(value ?? null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [error, setError] = useState<string>('');

  // controlled 대응
  useEffect(() => {
    if (value !== undefined) setFile(value);
  }, [value]);

  // preview url 관리
  useEffect(() => {
    setError('');

    if (!file) {
      setPreviewUrl((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return '';
      });
      return;
    }

    const url = URL.createObjectURL(file);
    setPreviewUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return url;
    });

    return () => URL.revokeObjectURL(url);
  }, [file]);

  const validate = (f: File) => {
    if (!accept.includes(f.type)) return `지원하지 않는 파일 형식입니다: ${f.type || 'unknown'}`;
    if (f.size > maxSizeBytes)
      return `파일 용량이 너무 큽니다. (최대 ${bytesToMB(maxSizeBytes)}MB)`;
    return '';
  };

  const setNext = (next: File | null) => {
    if (value === undefined) setFile(next); // uncontrolled일 때만 내부 state 변경
    onChange?.(next);
  };

  const onPick: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const picked = e.target.files?.[0] ?? null;
    if (!picked) return;

    const msg = validate(picked);
    if (msg) {
      setError(msg);
      // 같은 파일 재선택 가능하게
      if (inputRef.current) inputRef.current.value = '';
      return;
    }

    setNext(picked);

    // 같은 파일 재선택 가능하게
    if (inputRef.current) inputRef.current.value = '';
  };

  const clear = () => setNext(null);

  return (
    <section className="w-full max-w-[520px] rounded-2xl border border-gray-200 bg-white p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-base font-semibold text-gray-900">{label}</div>
          <div className="mt-1 text-xs text-gray-500">
            허용: {accept.map((a) => a.replace('image/', '')).join(', ')} · 최대{' '}
            {bytesToMB(maxSizeBytes)}MB
          </div>
        </div>

        <div className="flex items-center gap-2">
          {file && (
            <button
              type="button"
              onClick={clear}
              disabled={disabled}
              className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              삭제
            </button>
          )}
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={disabled}
            className="rounded-xl bg-gray-900 px-3 py-2 text-sm font-semibold text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            파일 선택
          </button>
        </div>
      </div>

      <input
        id={inputId}
        ref={inputRef}
        type="file"
        accept={acceptAttr}
        disabled={disabled}
        onChange={onPick}
        className="hidden"
      />

      {error && (
        <div className="mt-3 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
          {error}
        </div>
      )}

      {previewUrl ? (
        <div className="mt-4 overflow-hidden rounded-2xl border border-gray-200 bg-gray-100">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={previewUrl}
            alt={file?.name ?? 'preview'}
            className="h-auto w-full object-cover"
          />
          <div className="flex items-center justify-between gap-2 p-3">
            <div className="min-w-0">
              <div className="truncate text-sm font-semibold text-gray-900" title={file?.name}>
                {file?.name}
              </div>
              <div className="mt-0.5 text-xs text-gray-500">
                {file ? `${(file.size / 1024).toFixed(0)}KB · ${file.type || 'unknown'}` : ''}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={disabled}
          className="mt-4 w-full rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-8 text-sm text-gray-500 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
        >
          클릭해서 이미지를 업로드하세요
        </button>
      )}
    </section>
  );
}
