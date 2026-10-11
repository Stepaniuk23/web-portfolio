import "./NavigationArrow.css";

function NavigationArrow({
  direction,
  variant = "light",
  className = "",
  onClick,
  disabled = false,
  ariaLabel,
  title,
}) {
  const isLeft = direction === "left";

  return (
    <button
      type="button"
      className={`btn-ghost navigation-arrow${variant === "dark" ? " navigation-arrow--dark" : ""} ${className}`}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      title={title}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d={isLeft ? "m14.5 5-7 7 7 7" : "m9.5 5 7 7-7 7"} />
      </svg>
    </button>
  );
}

export default NavigationArrow;
