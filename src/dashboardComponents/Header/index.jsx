import Logo from "./logo";
import Search from "./search";

function Header() {
  return (
    <div className="flex flex-row justify-between items-center">
      <Logo />
      <Search />
    </div>
  );
}

export default Header;
