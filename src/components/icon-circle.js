function IconCircle({
  className,
  children,
  color = 'primary',
  onClick = () => {},
}) {
  return (
    <button
      className={'icon-circle pointer ' + className}
      onClick={onClick}
      data-color={color}
      aria-label={`Un bouton avec une couleur ${color}.`}
    >
      {children}
    </button>
  );
}

export default IconCircle;
