function Li({ noMarginBottom, textLeft, textRight }) {
  return (
    <li className={noMarginBottom ? "mb-0" : "mb-3"}>
      <div className="flex justify-between items-start space-x-8">
        <p className="text-B-M leading-B-M text-extended-400">{textLeft}</p>
        <p className="text-B-M leading-B-M text-extended-200 text-right">
          {textRight}
        </p>
      </div>
    </li>
  );
}
export default Li;
