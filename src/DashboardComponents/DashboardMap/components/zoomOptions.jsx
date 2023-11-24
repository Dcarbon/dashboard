function ZoomOptions({ mapREF }) {
  const handleZoom = (diff) => {
    let currZoom = mapREF.current.getZoom();
    let currCenter = mapREF.current.getCenter();
    mapREF.current.flyTo({
      center: currCenter, // lat, lng
      zoom: currZoom + diff,
    });
  };
  return (
    <div
      className={`absolute flex flex-col text-slate-100 gap-1 text-H-M leading-H-M top-3 right-2 md:top-6 mx-3 md:mx-6 rounded-[4px]`}
    >
      <div>
        <button
          className={
            "w-10 h-10 bg-white hover:bg-primary hover:text-slate-800 bg-opacity-30"
          }
          onClick={() => handleZoom(3)}
        >
          +
        </button>
      </div>
      <div>
        <button
          className={
            "w-10 h-10 bg-white hover:bg-primary hover:text-slate-800 bg-opacity-30"
          }
          onClick={() => handleZoom(-3)}
        >
          -
        </button>
      </div>
    </div>
  );
}

export default ZoomOptions;
