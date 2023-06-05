import Container from "src/components/ui/Container";
import Heading from "src/components/ui/Heading";
import Section from "src/components/ui/Section";
import stls from "./index.module.scss";
import Image from "next/image";
import { imgsDir, imgsObject } from "src/tools/const";
function Mechanical() {
  return (
    <Section>
      <Container className={stls.container}>
        <Heading Tag={"h2"} className={"text-[#FCFCFC] mb-6"}>
          Mechanical
        </Heading>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <p>
              Each private key is generated and stored through a Carbon agent,
              an autonomous tamper-resistant sensor-equipped IoT device. Users
              then use the keys to sign MRV data, then submit signature on smart
              contracts to mint the tokens. In the absence of the third party,
              this trustless, unbiased process provides mutual benefits for both
              buyers and the fragile environment.
            </p>
            <p className="text-white mt-5">A product for everyone</p>
            <p>
              Not only bighead firms, any individuals are incentivized to join
              the democratized Dcarbon market. Fight climate change, track your
              results and get rewarded!
            </p>
          </div>
          <div className={`${stls.box} ${stls.green}`}>
            <Image
              className={stls.icon}
              src={imgsDir(imgsObject.mechanical_1)}
              alt="Trustless"
              width={222}
              height={133}
            />
            <div className={stls.text}>
              <p className={stls.bigText}>Trustless</p>
            </div>
          </div>
          <div className={`${stls.box} ${stls.grey}`}>
            <Image
              className={stls.icon}
              src={imgsDir(imgsObject.mechanical_2)}
              alt="Transparency"
              width={166}
              height={164}
            />
            <div className={stls.text}>
              <p>Absolute</p>
              <p className={stls.bigText}>Transparency</p>
            </div>
          </div>
          <div className={`${stls.box} ${stls.darkBlue}`}>
            <Image
              className={stls.icon}
              src={imgsDir(imgsObject.mechanical_3)}
              alt="Trustless"
              width={145}
              height={174}
            />
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
