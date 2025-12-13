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
    <div className="flex flex-col">
      <label htmlFor={''} className="text-body-xl text-gray-600">
        인원
      </label>
      <p>최소, 최대 인원을 입력해주세요.</p>
      <div className="flex flex-row justify-between">
        <input type="text" inputMode="numeric" pattern="[0-9]*" placeholder="최소인원" />~
        <input type="text" inputMode="numeric" pattern="[0-9]*" placeholder="최대인원" />
      </div>
    </div>
  );
}

export default ParticipantCountInput;
