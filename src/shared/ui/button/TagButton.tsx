import { MouseEventHandler } from 'react';

type TagButtonType = {
  name: string;
  label: string;
  emoji: string;
  onClick: (label: string) => void;
  active: boolean;
};

export default function TagButton(props: TagButtonType) {
  const { name, label, emoji, onClick, active } = props;

  return (
    <button
      onClick={() => onClick(label)}
      name={name}
      id={name}
      className={`px-2.5 py-3 w-auto h-auto bg-[#F3F3F5] rounded-lg text-xs font-medium ${
        active && 'bg-[#a0a0a0]'
      }`}
    >
      {emoji} {label}
    </button>
  );
}
