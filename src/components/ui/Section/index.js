function Section({
  className,
  children,
  bgColor,
  bgImageUrl,
  multiplebgImageUrl,
  bgPosition,
  bgSize,
  bgRepeat,
}) {
  return (
    <section
      className={className}
      style={{
        backgroundColor: bgColor,
        backgroundImage: bgImageUrl
          ? `url(${bgImageUrl})`
          : multiplebgImageUrl ?? null,
        backgroundPosition: bgPosition ?? "center",
        backgroundSize: bgSize ?? "cover",
        backgroundRepeat: bgRepeat ?? "no-repeat",
      }}
    >
      {children}
    </section>
  );
}

export default Section;
