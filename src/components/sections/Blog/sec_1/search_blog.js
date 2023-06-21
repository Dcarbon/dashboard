import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import stls from "./index.module.scss";
import { useRouter } from "next/router";
import QueryString from "qs";
function SearchBlog() {
  const router = useRouter();
  const [keyBlog, setKeyBlog] = useState("");
  const handleSearch = (e) => {
    e.preventDefault();
    const strQue = QueryString.stringify({
      search: keyBlog,
    });
    router?.push(`${router?.pathname}?${strQue}`);
  };
  return (
    <div className={stls.formSearch}>
      <form>
        <button className={stls.btn} onClick={handleSearch}>
          <MagnifyingGlassIcon width={24} height={24} />
        </button>
        <input
          className={stls.field}
          placeholder="Enter your search key"
          value={keyBlog}
          onChange={(e) => setKeyBlog(e.target.value)}
        ></input>
      </form>
    </div>
  );
}

export default SearchBlog;
