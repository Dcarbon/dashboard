import Container from "src/components/ui/Container";
import Heading from "src/components/ui/Heading";
import Section from "src/components/ui/Section";
import stls from "./index.module.scss";
import Image from "next/image";
import { imgsDir, imgsObject } from "src/tools/const";
function Mechanical() {
  return (
    <Section className={stls.section}>
      <Container className={stls.container}>
        <Heading Tag={"h2"} className={"text-[#FCFCFC] mb-6"}>
          Mechanical
        </Heading>
        <div className={stls.grid}>
          <div className={stls.content}>
            <p>
              Each private key is generated and stored through a Carbon agent,
              an autonomous tamper-resistant sensor-equipped IoT device. Users
              then use the keys to sign MRV data, then submit signature on smart
              contracts to mint the tokens. In the absence of the third party,
              this trustless, unbiased process provides mutual benefits for both
              buyers and the fragile environment.
            </p>
            <p className="text-white mt-2 lg:mt-5">A product for everyone</p>
            <p>
              Not only bighead firms, any individuals are incentivized to join
              the democratized DCarbon market. Fight climate change, track your
              results and get rewarded!
            </p>
          </div>

          <div className={`${stls.box} ${stls.green}`}>
            <div className={stls.icon}>
              <Image
                src={imgsDir(imgsObject.mechanical_1)}
                alt="Trustless"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>

            <div className={stls.text}>
              <p className={stls.bigText}>Trustless</p>
            </div>
          </div>

          <div className={`${stls.box} ${stls.grey}`}>
            <div className={stls.icon}>
              <Image
                src={imgsDir(imgsObject.mechanical_2)}
                alt="Trustless"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>

            <div className={stls.text}>
              <p>Absolute</p>
              <p className={stls.bigText}>Transparency</p>
            </div>
          </div>

          <div className={`${stls.box} ${stls.darkBlue}`}>
            <div className={stls.icon}>
              <Image
                priority
                src={imgsDir(imgsObject.mechanical_3)}
                alt="Errorless"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>

            <div className={stls.text}>
              <p className={stls.bigText}>Errorless</p>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

export default Mechanical;
