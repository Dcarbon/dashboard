import Container from "src/components/ui/Container";
import stls from "./header_transparent.module.scss";
import Link from "next/link";
import InfomationHook from "src/tools/menu";
import Logo from "src/components/ui/Logo";
import { Bars3BottomRightIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import Button from "src/components/ui/Button";
function HeaderTransparent() {
  const hookMenu = new InfomationHook();
  const [showMenuMobi, setShowMenuMobi] = useState(false);

  return (
    <header className={"absolute top-0 left-0 w-full z-50"}>
      <Container standard={false} className={stls.container}>
        <div className={stls.box}>
          <div className={stls.item}>
            <Link href={"/"} className={stls.logo}>
              <Logo />
            </Link>
            <Button
              className={stls.btnNav}
              onClick={() => setShowMenuMobi(!showMenuMobi)}
            >
              {showMenuMobi ? <XMarkIcon /> : <Bars3BottomRightIcon />}
            </Button>
          </div>
          <div className={stls.item}>
            <div className={stls.navbar}>
              <ul className={`${stls.menus} ${showMenuMobi ? stls.act : ""}`}>
                {hookMenu.GetMenu().map((item) => (
                  <li key={item?.id} className={stls.item}>
                    <Link href={item.href} className={stls.link}>
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li className={stls.item}>
                  <span className={stls.split}></span>
                </li>
                <li className={stls.item}>
                  <Link href={"/"} className={stls.link}>
                    Contact
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
