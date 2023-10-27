function Button({ className, children, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`${className} min-w-[80px] h-10 rounded-sm ${
        isActive
          ? "bg-primary hover:bg-opacity-70 text-extended-900"
          : "bg-transparent hover:bg-primary hover:bg-opacity-25 text-extended-300"
      }`}
    >
      {children}
    </button>
  );
}

export default Button;
