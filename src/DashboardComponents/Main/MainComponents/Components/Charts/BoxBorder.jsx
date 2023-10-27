function BoxBorder({ title, number }) {
  return (
    <div className="flex-1 border rounded-md border-extended-700 px-6 py-5">
      <h3 className="text-T-M leading-T-M text-extended-300 mt-0.5 mb-2">
        {title}
      </h3>
      <p className="text-H-L leading-H-L py-0.5 text-white">{number}</p>
    </div>
  );
}

export default BoxBorder;
