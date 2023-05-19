import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { useCallback, useEffect, useRef, useState } from "react";
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
  className,
}) {
  const [showSelect, setShowSelect] = useState(false);
  const listRef = useRef(null);
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
  }, []);
  const fixedSize = useCallback(() => {
    switch (size) {
      case "sm":
        return {
          root: "mb-2",
          label: "mb-1",
          input: "p-2 h-8 text-sm",
          icon: "right-1 mb-1",
        };

      case "lg":
        return {
          root: "mb-6",
          label: "mb-3",
          input: "p-3 h-12 text-lg",
          icon: "right-3 mb-3",
        };
      case "xl":
        return {
          root: "mb-8",
          label: "mb-4",
          input: "p-4 h-16 text-xl",
          icon: "right-4 mb-4",
        };
      default:
        return {
          root: "mb-4",
          label: "mb-2",
          input: "p-2 h-8",
          icon: "right-2 mb-2",
        };
    }
  }, [size]);
  return (
    <div className={`relative ${fixedSize().root} `}>
      <form>
        {label && (
          <label htmlFor={id} className={`${fixedSize().label} block `}>
            {label}
          </label>
        )}
        <input
          title={label}
          placeholder='Name of project'
          readOnly={!isSearch}
          id={id}
          className={`w-full bg-transparent ${
            fixedSize().input
          } rounded-md border border-[#32313D] text-white`}
          type='text'
          value={value}
          onKeyDown={() => {
            if (!showSelect && isSearch) setShowSelect(true);
          }}
          onChange={(evt) => isSearch && onSearch(evt)}
        />
      </form>
      <div className={`absolute min-w-full top-full right-0 z-20`}>
        <span
          ref={btnToggleRef}
          onClick={toggleSelection}
          className={`${stls.iconSelect} cursor-pointer absolute bottom-full ${
            fixedSize().icon
          } text-center`}>
          <ChevronDownIcon />
        </span>
        <div
          ref={listRef}
          className={`${showSelect ? stls.showSelect : stls.hiddenSelect}`}>
          <ul
            className={`${
              stls.list
            } overflow-hidden bg-[#171623] border border-[#504F5A] ${
              className?.list ?? "rounded-md mt-2"
            }`}
            onClick={onChange}>
            {children}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Selection;
