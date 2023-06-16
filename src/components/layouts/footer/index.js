import Container from "src/components/ui/Container";
import stls from "./index.module.scss";
import Logo from "src/components/ui/Logo";
import Heading from "src/components/ui/Heading";
import InfomationHook from "src/tools/menu";
import Link from "next/link";
import Image from "next/image";
import { imgsDir, imgsObject } from "src/tools/const";
function Footer() {
  const hookInfo = new InfomationHook();
  const menu = hookInfo.GetMenu();
  const info = hookInfo.GetCompanyInfo();
  return (
    <footer>
      <Container className={stls.container}>
        <div
          className={`${stls.row} flex flex-col md:flex-row justify-between md:items-end  flex-wrap md:gap-9`}
        >
          <div className={stls.col_left}>
            <Logo />
            <Heading Tag={"h3"} className={"text-[#919097] mt-4"}>
              Fair to us, fair to earth
            </Heading>
          </div>
          <div>
            {menu && (
              <ul className={stls.navbar}>
                {menu?.map((item) => (
                  <li key={"fter-" + item.id} className={stls.item}>
                    <Link href={item.href} className={stls.link}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className={stls.row}>
          <Heading Tag={"h5"} className={"mb-5"}>
            Headquarters
          </Heading>
          <InfoIcon
            icon={imgsDir(imgsObject.phone_icon)}
            alt={"phone icon"}
            info={info.email}
          />
          <InfoIcon
            icon={imgsDir(imgsObject.location_icon)}
            alt={"location icon"}
            info={info.address}
          />
        </div>
        <div
          className={`${stls.bottom} flex flex-col md:flex-row gap-5 justify-between items-center`}
        >
          <p>&copy; 2023 D-carbon, All rights reserved</p>
          <Link href={"#"}>Privacy Policy</Link>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
function InfoIcon({ icon, alt, info }) {
  return (
    <div className={stls.infoIcon}>
      <Image src={icon} alt={alt} width={16} height={16} />
      <span>{info}</span>
    </div>
  );
}
