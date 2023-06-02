function FlexBetween({ children, className, ...all }) {
  return (
    <div className={`flex justify-between ${className ?? ""}`} {...all}>
      {children}
    </div>
  );
}

export default FlexBetween;
