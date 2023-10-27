import Logo from "./logo";
import Search from "./search";

function Header() {
  return (
    <div className="flex flex-col space-y-6 justify-center items-center md:flex-row md:justify-between md:space-y-0">
      <Logo />
      <Search />
    </div>
  );
}

export default Header;
