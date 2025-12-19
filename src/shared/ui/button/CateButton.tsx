type LanguageButton = {
  id: string;
  label: string;
  color: string;
  onClick: (lan: string) => void;
  active: boolean;
};

export default function CateButton(props: LanguageButton) {
  const { id, label, color, onClick, active } = props;

  return (
    <button
      name={id}
      id={id}
      className={`${color}  px-2.5 py-3 w-auto h-auto bg-[#F3F3F5] rounded-lg text-xs font-medium ${
        active && 'bg-[#a0a0a0]'
      }`}
      onClick={() => onClick(label)}
    >
      {label}
    </button>
  );
}
