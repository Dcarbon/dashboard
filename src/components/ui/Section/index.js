function Section({
  className,
  children,
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
