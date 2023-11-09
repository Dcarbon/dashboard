import Button from "./Components/Charts/Button";

function Charts() {
  return (
    <div className="py-8 lg:py-12">
      <div className="flex flex-col lg:flex-row gap-10">
        {/* left */}
        {/* left */}
        {/* left */}
        {/* left */}
        {/* left */}
        {/* left */}
        {/* left */}
        {/* left */}
        <div className="w-full lg:w-[272px]">
          <div className="flex flex-col sm:flex-row flex-wrap gap-x-3 gap-y-3 items-stretch lg:flex-col lg:gap-x-0 lg:gap-y-4"></div>
        </div>
        {/* right */}
        {/* right */}
        {/* right */}
        {/* right */}
        {/* right */}
        {/* right */}
        {/* right */}
        {/* right */}
        <div className="flex-1 items-stretch ">
          <div className="flex flex-col w-full h-full gap-6">
            <div className="flex-1  ">112341234</div>

            <div className="flex flex-row flex-wrap gap-6">
              <Button isActive={true}>1W</Button>
              <Button isActive={false}>1M</Button>
              <Button isActive={false}>3M</Button>
              <Button isActive={false}>6M</Button>
              <Button isActive={false}>1Y</Button>
              <Button isActive={false}>All time</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Charts;
