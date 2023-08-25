import Layout from "src/components/layouts";
import stls from "../styles/404.module.scss";
import Section from "src/components/ui/Section";
import Container from "src/components/ui/Container";
import Image from "next/image";
import Button from "src/components/ui/Button";

export default function NotFound({}) {
  return (
    <Layout title={"Not found"}>
      <Section className={stls.main}>
        <Container>
          <div className={stls.container}>
            <div className={stls.images}>
              <div className={stls.main_image}>
                <Image
                  src={"/not_found/404.png"}
                  width={545}
                  height={490}
                  alt={"Not found"}
                />
              </div>
              <div className={`${stls.man} ${stls.image}`}>
                <Image src={"/not_found/a-man.svg"} fill alt={"Not found"} />
              </div>
              <div className={`${stls.gear_green} ${stls.image}`}>
                <Image
                  src={"/not_found/gear-green.svg"}
                  fill
                  alt={"Not found"}
                />
              </div>
              <div className={`${stls.gear_pink} ${stls.image}`}>
                <Image
                  src={"/not_found/gear-pink.svg"}
                  fill
                  alt={"Not found"}
                />
              </div>
              <div className={`${stls.gear_black} ${stls.image}`}>
                <Image
                  src={"/not_found/gear-black.svg"}
                  fill
                  alt={"Not found"}
                />
              </div>
            </div>
            <div className={stls.box}>
              <h1 className={stls.heading}>WE LOST THAT PAGE...</h1>
              <h3 className={stls.title}>
                This page doesn&apos;t exist or was removed!
              </h3>
              <h3 className={stls.title}>We suggest you back to Home</h3>

              <Button className={stls.button} href={"/"}>
                Back to Home
              </Button>
            </div>
          </div>
          <style jsx global>{`
            body {
              background-color: #ebebeb;
            }
          `}</style>
        </Container>
      </Section>
    </Layout>
  );
}
