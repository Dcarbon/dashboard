import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import stls from "./index.module.scss";
function SearchBlog() {
  const [keyBlog, setKeyBlog] = useState("");
  return (
    <div className={stls.formSearch}>
      <form>
        <button className={stls.btn}>
          <MagnifyingGlassIcon width={24} height={24} />
        </button>
        <input
          className={stls.field}
          placeholder="Enter blog name"
          value={keyBlog}
          onChange={(e) => setKeyBlog(e.target.value)}
        ></input>
      </form>
    </div>
  );
}

export default SearchBlog;
