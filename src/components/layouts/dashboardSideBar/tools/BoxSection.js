function BoxSection({ className, children }) {
  return (
    <section className={`py-6 border-t border-[#676767] ${className ?? ""}`}>
      {children}
    </section>
  );
}

export default BoxSection;
