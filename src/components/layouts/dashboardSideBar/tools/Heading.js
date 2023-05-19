import stls from "./Heading.module.scss";
function HeadingSideBar({ className, text }) {
  return (
    <h3 className={`${className} ${stls.title} relative font-normal`}>
      {text}
    </h3>
  );
}

export default HeadingSideBar;
