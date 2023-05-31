import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { useEffect, useRef, useState } from "react";
import stls from "./index.module.scss";
function Selection({
  size,
  id,
  label,
  value,
  onChange,
  onSearch,
  children,
  isSearch,
  listClassName,
}) {
  const [showSelect, setShowSelect] = useState(false);
  const listRef = useRef(null);

  return (
    <div className={`relative ${stls[size || "md"]} `}>
      <Form
        id={id}
        label={label}
        isSearch={isSearch}
        onSearch={onSearch}
        showSelect={showSelect}
        setShowSelect={setShowSelect}
        value={value}
      />
      <div className={`absolute min-w-full top-full right-0 z-20`}>
        <div
          ref={listRef}
          className={`${showSelect ? stls.showSelect : stls.hiddenSelect}`}
        >
          <ul
            className={`${stls.list} overflow-hidden bg-[#171623] border border-[#504F5A] ${listClassName}`}
            onClick={onChange}
          >
            {children}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Selection;
function Form({
  label,
  id,
  value,
  isSearch,
  onSearch,
  showSelect,
  setShowSelect,
}) {
  const btnToggleRef = useRef(null);

  const toggleSelection = () => setShowSelect(!showSelect);
  useEffect(() => {
    let clickOutSide = (event) => {
      if (event?.button === 0) {
        const btnContains = () => btnToggleRef?.current?.contains(event.target);
        if (!btnContains()) {
          setShowSelect(false);
        }
      }
    };
    document.addEventListener("mousedown", clickOutSide);
    return () => document.removeEventListener("mousedown", clickOutSide);
  }, [setShowSelect]);
  return (
    <form>
      {label && (
        <label htmlFor={id} className={stls.label}>
          {label}
        </label>
      )}
      <div className="relative">
        <input
          title={label}
          placeholder="Name of project"
          readOnly={!isSearch}
          id={id}
          className={`${stls.input} w-full bg-transparent rounded-md border border-[#32313D] text-white `}
          type="text"
          value={value}
          onKeyDown={() => {
            if (!showSelect && isSearch) setShowSelect(true);
          }}
          onChange={(evt) => isSearch && onSearch(evt)}
        />
        <span
          ref={btnToggleRef}
          onClick={toggleSelection}
          className={`absolute block bottom-full text-center ${stls.iconSelect}`}
        >
          <ChevronDownIcon />
        </span>
      </div>
    </form>
  );
}
