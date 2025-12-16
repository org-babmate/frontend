type LanguageButton = {
  id: string;
  label: string;
  color: string;
};

export default function CateButton(props: LanguageButton) {
  const { id, label, color } = props;

  return (
    <button
      name={id}
      id={id}
      className={`${color}  px-2.5 py-3 w-auto h-auto bg-[#F3F3F5] rounded-lg text-xs font-medium`}
    >
      {label}
    </button>
  );
}
