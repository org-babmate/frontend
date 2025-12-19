type ActionButtonType = {
  name: string;
  children: string;
  bgColor: string;
  color: string;
  width: string;
  height: string;
  weight: string;
  radius: string;
  onClick: () => void;
};

export default function ActionButton(props: ActionButtonType) {
  const { children, name, bgColor, color, width, height, weight, radius, onClick } = props;

  return (
    <button
      name={name}
      id={name}
      className={` ${color} ${bgColor} ${width} ${height} ${weight} ${radius}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
