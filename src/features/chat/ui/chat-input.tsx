'use client';

import { useState } from 'react';
import { Plus, ArrowUp } from 'lucide-react';

interface ChatInputProps {
  onSend: (message: string) => void;
  onPlusClick?: () => void;
  disabled?: boolean;
}

export function ChatInput({ onSend, onPlusClick, disabled }: ChatInputProps) {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim() && !disabled) {
      onSend(message.trim());
      setMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-row items-center gap-3 px-4 py-3 pb-5 bg-white shadow-[0px_-4px_13px_rgba(0,0,0,0.12)]">
      {/* + 버튼 */}
      <button onClick={onPlusClick} className="w-6 h-6 flex items-center justify-center">
        <Plus className="w-6 h-6 text-gray-900" />
      </button>

      {/* 입력 영역 */}
      <div className="flex-1 flex flex-row items-center gap-2 px-3 py-3 bg-[#F3F3F5] rounded-lg">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Write your message."
          disabled={disabled}
          className="flex-1 bg-transparent ty-body-1-regular text-gray-900 placeholder:text-gray-400 focus:outline-none"
        />

        {/* 전송 버튼 */}
        <button
          onClick={handleSend}
          disabled={!message.trim() || disabled}
          className="w-6 h-6 flex items-center justify-center bg-gray-900 rounded-full disabled:opacity-50"
        >
          <ArrowUp className="w-4 h-4 text-white" />
        </button>
      </div>
    </div>
  );
}
