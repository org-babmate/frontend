type ActionButtonType = {
  name: string;
  children: string;
  bgColor: string;
  color: string;
  width: string;
  height: string;
  weight: string;
  radius: string;
};

export default function ActionButton(props: ActionButtonType) {
  const { children, name, bgColor, color, width, height, weight, radius } = props;

  return (
    <button
      name={name}
      id={name}
      className={` ${color} ${bgColor} ${width} ${height} ${weight} ${radius}`}
    >
      {children}
    </button>
  );
}
