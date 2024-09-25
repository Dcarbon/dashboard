import Container from "src/components/ui/Container";
import stls from "./header_transparent.module.scss";
import Link from "next/link";
import InfomationHook from "src/tools/menu";
import Logo from "src/components/ui/Logo";
import { Bars3BottomRightIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import Button from "src/components/ui/Button";
import { useRouter } from "next/router";
function HeaderTransparent() {
  const hookMenu = new InfomationHook();
  const [showMenuMobi, setShowMenuMobi] = useState(false);
  const { pathname } = useRouter();
  return (
    <header className={"absolute top-0 left-0 w-full z-50"}>
      <Container className={stls.container}>
        <div className={stls.box}>
          <div className={stls.item}>
            <Link href={"/"} className={stls.logo}>
              <Logo />
            </Link>
            <Button
              className={stls.btnNav}
              onClick={() => setShowMenuMobi(!showMenuMobi)}
            >
              {showMenuMobi ? (
                <XMarkIcon width={24} height={24} />
              ) : (
                <Bars3BottomRightIcon width={24} height={24} />
              )}
            </Button>
          </div>
          <div className={stls.item}>
            <div className={stls.navbar}>
              <ul className={`${stls.menus} ${showMenuMobi ? stls.act : ""}`}>
                {hookMenu.GetMenu()?.map((item) => (
                  <li key={item?.id} className={stls.item}>
                    <Link
                      href={item.href}
                      className={`${
                        pathname === item.href ? stls.active : ""
                      } ${stls.link}`}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li className={stls.item}>
                  <span className={stls.split}></span>
                </li>
                <li className={stls.item}>
                  <Link
                    href={"/"}
                    as={"/#contact-form"}
                    className={stls.link}
                    scroll={false}
                  >
                    Contact
                  </Link>
                </li>
                <li className={stls.item}>
                  <Link
                    target="_blank"
                    href={"https://market-dev.dcarbon.org/"}
                    className={stls.button_beta}
                  >
                    <span className={stls.text}>Marketplace</span>
                    <span className={stls.beta}>Beta</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
}

export default HeaderTransparent;
