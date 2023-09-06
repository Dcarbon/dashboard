function BoxBorderTop({ children, isPadding = true, paddingClass }) {
  return (
    <div
      className={`border-t border-[#676767] border-opacity-30 ${
        isPadding ? "px-6 py-3" : paddingClass || ""
      }`}
    >
      {children}
    </div>
  );
}

export default BoxBorderTop;
