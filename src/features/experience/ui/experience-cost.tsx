import { Currency } from '@/shared/types/types';
import CustomDropDownRadio from '@/shared/ui/dropDown';
import { MapPin } from 'lucide-react';
import React, { Dispatch, SetStateAction, useState } from 'react';

interface Props {
  maxParticipant: number;
  minParticipant: number;
  setMaxParticipant: Dispatch<SetStateAction<number>>;
  setMinParticipant: Dispatch<SetStateAction<number>>;
  currency: Currency;
  setCurrency: Dispatch<SetStateAction<Currency>>;
  price: string;
  setPrice: Dispatch<SetStateAction<string>>;
  meetupLocation: string;
  setMeetupLocation: Dispatch<SetStateAction<string>>;
}

function ParticipantCountInput({
  maxParticipant,
  minParticipant,
  setMaxParticipant,
  setMinParticipant,
  meetupLocation,
  setMeetupLocation,
  setPrice,
}: Props) {
  const hanldeMinPartcipant = (e: React.ChangeEvent<HTMLInputElement>) => {
    const minNumber = parseInt(e.target.value.replace(/[^0-9]/g, ''));
    if (minNumber > 0) setMinParticipant(minNumber);
  };
  const hanldeMaxPartcipant = (e: React.ChangeEvent<HTMLInputElement>) => {
    const maxNumber = parseInt(e.target.value.replace(/[^0-9]/g, ''));
    if (maxNumber > minParticipant) setMaxParticipant(maxNumber);
    else alert('Maximum participants must be greater than the minimum participants.');
  };
  function formatWithComma(value: string) {
    if (!value) return '';
    return Number(value).toLocaleString('ko-KR');
  }
  function removeComma(value: string) {
    return value.replace(/,/g, '');
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 콤마 제거
    const numericValue = removeComma(e.target.value);
    // 숫자만 허용
    if (!/^\d*$/.test(numericValue)) return;
    setPrice(numericValue);
  };
  return (
    <div className="flex flex-col w-full">
      <h1 className="text-headline-lg text-gray-600">인원과 가격을 설정해 주세요</h1>

      <label className="text-body-xl text-gray-600 mt-6">모집 인원</label>
      <div className="flex flex-row w-full gap-3 items-center mt-3">
        <input
          onChange={hanldeMinPartcipant}
          value={minParticipant}
          type="number"
          inputMode="numeric"
          pattern="[0-9]*"
          placeholder="최소인원"
          className="ring ring-gray-100 py-3 px-4 rounded-xl text-body-lg min-w-0"
        />
        <span className="self-center leading-none text-body-lg">~</span>
        <input
          onChange={hanldeMaxPartcipant}
          value={maxParticipant}
          type="number"
          inputMode="numeric"
          pattern="[0-9]*"
          placeholder="최대인원"
          className="ring ring-gray-100 py-3 px-4 rounded-xl text-body-lg min-w-0"
        />
      </div>
      {/* <label htmlFor={''} className="text-body-xl text-gray-600 mt-6">
        가격
      </label>
      <span className="text-caption-md text-gray-400 mt-1.5">1인당 가격을 입력해주세요.</span>
      <div className="mt-3 flex flex-row gap-2">
        <input
          type="text"
          inputMode="numeric"
          placeholder="가격을 입력해주세요"
          value={formatWithComma(price)}
          onChange={handleChange}
          className="ring ring-gray-100 py-3 px-4 rounded-xl text-body-lg min-w-0 flex-1"
        />
        <CustomDropDownRadio
          value={currency}
          onChange={setCurrency}
          values={['USD', 'KRW']}
          className="ring ring-gray-100 px-4 py-3 rounded-xl"
        />
      </div> */}
      <div className="flex flex-col">
        <h1 className="text-headline-lg text-gray-600">장소를 설정해 주세요</h1>
        <div className="flex flex-col gap-8 mt-6">
          <div className="w-full flex flex-col gap-2">
            <h2 className="text-gray-600 text-body-xl">모임 장소</h2>
            <div className="flex w-full items-center ring ring-gray-200 p-4 gap-2  rounded-xl">
              <MapPin className="text-gray-400" />
              <input
                placeholder="모임 장소를 추가해주세요"
                className="text-body-lg text-black  outline-0"
                type="text"
                value={meetupLocation}
                onChange={(e) => setMeetupLocation(e.target.value)}
              ></input>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ParticipantCountInput;
