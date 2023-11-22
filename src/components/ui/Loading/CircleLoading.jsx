function CircleLoading({ small }) {
  return (
    <div
      className={`${
        small ? "min-h-[20px] min-w-[20px]" : "min-h-[100px] min-w-[100px]"
      }  flex justify-center items-center`}
    >
      <div
        className={`${
          small ? "w-6 h-6" : "w-8 h-8"
        } rounded-full border-4 border-primary border-t-transparent animate-spin`}
      >
        <div className="rounded-full w-full h-full border-lime-700 border-4 border-b-transparent border-r-transparent animate-spin"></div>
      </div>
    </div>
  );
}

export default CircleLoading;
