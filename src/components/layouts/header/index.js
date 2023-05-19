import Image from "next/image";
import { imgsDir, imgsObject } from "src/tools/const";
import stls from "./index.module.scss";
function Header() {
  return (
    <header className='bg-[#0B0A12]'>
      <div className='container mx-auto '>
        <div className='flex justify-between space-x-2 py-4'>
          <div className={`${stls.logo} relative `}>
            <Image
              src={imgsDir(imgsObject.logo)}
              alt=''
              fill
              priority
              sizes='(max-width: 768px) 250,
              (max-width: 1200px) 320,
              272'
            />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
