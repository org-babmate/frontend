type TagButtonType = {
  name: string;
  label: string;
  emoji: string;
};

export default function TagButton(props: TagButtonType) {
  const { name, label, emoji } = props;

  return (
    <button
      name={name}
      id={name}
      className="px-2.5 py-3 w-auto h-auto bg-[#F3F3F5] rounded-lg text-xs font-medium"
    >
      {emoji} {label}
    </button>
  );
}
