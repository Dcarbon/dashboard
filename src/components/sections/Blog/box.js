import { handleAttributes, handleImage } from "src/tools/const";
import stls from "./index.module.scss";
import { useMemo } from "react";
import Image from "next/image";
import Heading from "src/components/ui/Heading";
import dateFormat from "dateformat";
import Link from "next/link";
function PostBox({
  data,
  boxClassName,
  titleClassName,
  summaryClassName,
  imageClassName,
}) {
  // -------------
  // -------------
  // -------------
  // -------------
  // -------------
  const attributes = useMemo(() => {
    return handleAttributes(data?.thumbnail);
  }, [data]);
  const dateCreate = useMemo(
    () =>
      data?.createdAt && dateFormat(new Date(data?.createdAt), "mmm dd, yyyy"),
    [data?.createdAt]
  );
  return (
    <div className={`${boxClassName ?? ""}`}>
      <Link
        className={`${stls.image} ${imageClassName ?? ""}`}
        href={"/post/" + data?.slug}
      >
        <Image
          unoptimized
          quality={10}
          src={handleImage(attributes)}
          alt={attributes?.alt ?? ""}
          width={1188}
          height={584}
          style={{ objectPosition: data?.position ?? "center" }}
        />
      </Link>
      <div className={stls.content}>
        {data?.blog_category?.data && (
          <Heading Tag={"h5"} className={stls.tag}>
            {handleAttributes(data?.blog_category)?.title}
          </Heading>
        )}
        <Link href={"/post/" + data?.slug}>
          <Heading
            Tag={"h3"}
            className={`${stls.title} ${titleClassName ?? ""}`}
          >
            {data?.title}
          </Heading>
        </Link>
        <summary className={`${stls.summary} ${summaryClassName ?? ""}`}>
          {data?.summary}
        </summary>
        <p className={stls.date}>{dateCreate}</p>
      </div>
    </div>
  );
}

export default PostBox;
