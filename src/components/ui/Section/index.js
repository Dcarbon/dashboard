import Image from "next/image";
import { useEffect, useState } from "react";
import { imgsDir } from "src/tools/const";

function Section({
  id,
  className,
  children,
  bgColor,
  bgImageUrl,
  multiplebgImageUrl,
  bgPosition,
  bgSize,
  bgRepeat,
}) {
  const [isLoaded, setIsloaded] = useState(false);
  useEffect(() => {
    if (window && !isLoaded) {
      window.addEventListener("load", () => {
        // console.log("loaded");
        // setImage(qualityHigh);
        setIsloaded(true);
      });
    }
  }, [isLoaded]);

  return (
    <section
      id={id}
      className={`z-10 ${className}`}
      style={
        multiplebgImageUrl
          ? {
              position: "relative",
              backgroundColor: bgColor,
              backgroundImage: multiplebgImageUrl ?? "",
              backgroundPosition: bgPosition ?? "center",
              backgroundSize: bgSize ?? "cover",
              backgroundRepeat: bgRepeat ?? "no-repeat",
            }
          : {}
      }
    >
      {bgImageUrl && (
        <div className='absolute top-0 left-0 w-full h-full -z-10'>
          <Image
            priority
            quality={100}
            alt='DCarbon banner'
            src={imgsDir(bgImageUrl)}
            fill
            style={{
              position: "absolute",
              top: 0,
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
        </div>
      )}
      {children}
    </section>
  );
}

export default Section;
