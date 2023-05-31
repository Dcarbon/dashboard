import stls from "./index.module.scss";
function SelectItem({ className, value, children, active }) {
  return (
    <li
      className={`border-b border-b-[#504F5A] cursor-pointer ${stls.item} ${
        !active ? "text-[#B3B2B8]" : "text-[#504F5A]"
      } ${!active ? "hover:bg-[#272541]" : ""} ${className ?? ""}`}
      value={value}
    >
      {children}
    </li>
  );
}

export default SelectItem;
