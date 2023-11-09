function CircleLoading() {
  return (
    <div className="w-full h-full min-h-[100px] min-w-[100px] flex justify-center items-center">
      <div className="w-8 h-8 rounded-full border-4 border-primary border-t-transparent animate-spin">
        <div className="rounded-full w-full h-full border-lime-700 border-4 border-b-transparent border-r-transparent animate-spin"></div>
      </div>
    </div>
  );
}

export default CircleLoading;
