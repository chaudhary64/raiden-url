const Button = ({
  as: Component = "button",
  variant = "primary",
  size = "medium",
  className = "",
  children,
  ...props
}) => {
  const baseClasses =
    "font-medium text-center transition-all duration-200 rounded-none outline-none flex items-center justify-center cursor-pointer";

  const sizeClasses = {
    small: "px-3 py-1.5 text-sm",
    medium: "px-4 py-2 text-sm",
    large: "px-6 py-3 text-base",
  };

  const variants = {
    primary:
      "bg-gray-900 text-white hover:bg-gray-800 active:bg-gray-950 disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed shadow-sm",
    secondary:
      "bg-white text-gray-900 border border-gray-200 hover:bg-gray-50 hover:border-gray-300 shadow-sm",
    ghost: "bg-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-100",
    destructive: "bg-red-500 text-white hover:bg-red-600 shadow-sm",
  };

  return (
    <Component
      className={`${baseClasses} ${sizeClasses[size]} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Button;
