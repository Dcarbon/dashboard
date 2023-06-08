import Section from "src/components/ui/Section";
import Layout from "..";
import Container from "src/components/ui/Container";
import stls from "./index.module.scss";
import { imgsDir, imgsObject } from "src/tools/const";
import Image from "next/image";
import Heading from "src/components/ui/Heading";
import Link from "next/link";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import Button from "src/components/ui/Button";
import { useState } from "react";
function ComingSoon() {
  const [email, setEmail] = useState();
  return (
    <Layout noFooter>
      <Section
        className={stls.section}
        bgImageUrl={imgsDir(imgsObject.coming_soon)}
      >
        <Container>
          <div className={stls.box}>
            <div className={stls.image}>
              <Image
                src={imgsDir(imgsObject.image_coming_soon)}
                alt=""
                width={262}
                height={200}
              />
            </div>
            <Heading Tag={"h1"} className={"mb-3 uppercase text-[#FCFCFC]"}>
              Coming soon!
            </Heading>
            <Heading
              Tag={"h5"}
              className={
                "text-[#FFFFFF] text-opacity-80 text-sm md:text-base mb-5"
              }
            >
              Something Awesome Is About to Happen - Stay Tuned!
            </Heading>
            <Link className={stls.link} href={"/"} as={"/"}>
              <ChevronLeftIcon
                className={"inline-block p-1"}
                width={24}
                height={24}
              />{" "}
              Back to home page
            </Link>
            <div className={stls.form}>
              <input
                className={stls.input}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
              />
              <Button className={`${stls.btn}`}>Notify me</Button>
            </div>
          </div>
        </Container>
      </Section>
    </Layout>
  );
}

export default ComingSoon;
