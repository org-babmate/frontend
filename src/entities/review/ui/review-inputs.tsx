'use client';

import { RatingStars } from '@/shared/ui/rating-stars';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
type StarRatingProps = {
  name?: string; // form submit용 필드명
  value: number; // 0~5
  setValue: (v: number) => void; // 점수 변경
  max?: number; // 기본 5
  disabled?: boolean;
  size?: number; // px
  className?: string;
};
interface ImageUploadProps {
  star: number;
  setStar: Dispatch<SetStateAction<number>>;
  value: File[];
  onChange: (files: File[]) => void;
  maxFiles?: number;
  maxSizeMB?: number;
  description: string;
  setDescription: Dispatch<SetStateAction<string>>;
}

function ReviewInputs({
  value,
  onChange,
  star,
  setStar,
  maxFiles = 6,
  maxSizeMB = 5,
  description,
  setDescription,
}: ImageUploadProps) {
  const MAX_LENGTH = 1000;
  const MIN_LENGTH = 200;
  const inputRef = useRef<HTMLInputElement>(null);

  // 미리보기 URL
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  useEffect(() => {
    // value(File[]) 기준으로 objectURL 생성
    const urls = value.map((f) => URL.createObjectURL(f));
    setPreviewUrls(urls);

    return () => {
      urls.forEach((u) => URL.revokeObjectURL(u));
    };
  }, [value]);

  const openPicker = () => inputRef.current?.click();

  const handleAdd = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files ?? []);
    if (!selected.length) return;

    const maxBytes = maxSizeMB * 1024 * 1024;

    // 용량 필터
    const sizeOk = selected.filter((f) => f.size <= maxBytes);
    if (sizeOk.length !== selected.length) {
      alert(`이미지는 ${maxSizeMB}MB 이하만 업로드할 수 있습니다.`);
    }

    // 최대 개수 제한
    const remaining = Math.max(0, maxFiles - value.length);
    const merged = [...value, ...sizeOk].slice(0, value.length + remaining);

    if (merged.length === value.length) {
      alert(`최대 ${maxFiles}장까지 업로드할 수 있습니다.`);
    }

    onChange(merged);

    // 같은 파일 재선택 가능하도록 초기화
    if (inputRef.current) inputRef.current.value = '';
  };

  const removeAt = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
    if (inputRef.current) inputRef.current.value = '';
  };

  const clearAll = () => {
    onChange([]);
    if (inputRef.current) inputRef.current.value = '';
  };

  const disabled = value.length >= maxFiles;
  return (
    <div>
      <RatingStars value={star} onChange={setStar} allowClear size={33} />
      <div className="flex flex-col gap-3 mt-9">
        <div className="flex items-center justify-between">
          {value.length > 0 && (
            <button
              type="button"
              onClick={clearAll}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              전체 삭제
            </button>
          )}
        </div>

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleAdd}
          disabled={disabled}
        />

        <button
          type="button"
          onClick={openPicker}
          disabled={disabled}
          className="h-14 rounded-xl border border-dashed border-gray-300 text-gray-500 hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {disabled ? (
            <div>{`최대 ${maxFiles}장까지 업로드 가능`}</div>
          ) : (
            <div className="flex flex-row gap-1.5 justify-center items-center">
              <Image src={'/icons/camera.svg'} width={20} height={20} alt="camera icon" /> 사진
              첨부하기
              <p className="text-sm text-gray-500">
                {value.length}/{maxFiles}
              </p>
            </div>
          )}
        </button>

        {value.length > 0 && (
          <div className="grid grid-cols-3 gap-3">
            {value.map((file, idx) => {
              const key = `${file.name}-${file.size}-${file.lastModified}`;
              const url = previewUrls[idx]; // value와 같은 순서라고 가정
              return (
                <div key={key} className="relative aspect-square">
                  {url && (
                    <img
                      src={url}
                      alt={`업로드 이미지 ${idx + 1}`}
                      className="w-full h-full object-cover rounded-xl ring-1 ring-gray-200"
                    />
                  )}

                  <button
                    type="button"
                    onClick={() => removeAt(idx)}
                    className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-lg"
                  >
                    삭제
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {/* <p className="text-xs text-gray-400">
          JPG/PNG 등 이미지 파일 · 최대 {maxSizeMB}MB · 최대 {maxFiles}장
        </p> */}
      </div>

      <textarea
        className="text-body-lg text-[#878787] pt-2.5 px-4 ring ring-gray-200 rounded-xl w-full mt-5 h-30"
        value={description}
        maxLength={MAX_LENGTH}
        onChange={(e) => setDescription(e.currentTarget.value)}
        placeholder="경험 소개글을 입력해주세요."
      />

      <div className="text-sm text-gray-400 text-right mt-1">
        {description.length}/{MAX_LENGTH}
      </div>
    </div>
  );
}

export default ReviewInputs;
