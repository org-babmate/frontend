import CustomDropDownRadio from '@/shared/ui/dropDown';
import React, { useState } from 'react';

function ParticipantCountInput() {
  const [maxParticipant, setMaxParticipant] = useState('');
  const [minParticipant, setMinParticipant] = useState('');
  const hanldeMinPartcipant = (e: React.ChangeEvent<HTMLInputElement>) => {
    const minNumber = e.target.value.replace(/[^0-9]/g, '');
    setMinParticipant(minNumber);
  };
  const hanldeMaxPartcipant = (e: React.ChangeEvent<HTMLInputElement>) => {
    const maxNumber = e.target.value.replace(/[^0-9]/g, '');
    setMaxParticipant(maxNumber);
  };
  return (
    <div className="flex flex-col w-full">
      <h1 className="text-headline-lg text-gray-600">인원과 가격을 설정해 주세요</h1>

      <label htmlFor={''} className="text-body-xl text-gray-600 mt-6">
        모집 인원
      </label>
      <div className="flex flex-row w-full gap-3 items-center mt-3">
        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          placeholder="최소인원"
          className="ring ring-gray-100 py-3 px-4 rounded-xl text-body-lg min-w-0"
        />
        <span className="self-center leading-none text-body-lg">~</span>
        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          placeholder="최대인원"
          className="ring ring-gray-100 py-3 px-4 rounded-xl text-body-lg min-w-0"
        />
      </div>
      <label htmlFor={''} className="text-body-xl text-gray-600 mt-6">
        가격
      </label>
      <span className="text-caption-md text-gray-400 mt-1.5">1인당 가격을 입력해주세요.</span>
      <div className="mt-3 flex flex-row gap-2">
        {/* {가격 로직 필요 } */}
        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          placeholder="가격을 입력해주세요"
          className="ring ring-gray-100 py-3 px-4 rounded-xl text-body-lg min-w-0 flex-1"
        />
        <CustomDropDownRadio
          defaultValue={'USD'}
          values={['USD', 'KRW']}
          className="ring ring-gray-100 px-4 py-3 rounded-xl"
        />
      </div>
    </div>
  );
}

export default ParticipantCountInput;
