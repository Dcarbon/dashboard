import { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

function Error({ err, err_code, clearErrType }) {
  const [thisErr, setThisErr] = useState(null);
  const [thisErrCode, setThisErrCode] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    if (err) {
      setThisErr(err);
      setThisErrCode(err_code);
      dispatch({ type: clearErrType });
    }
  }, [clearErrType, dispatch, err, err_code]);
  const handleClose = () => {
    setThisErr(null);
    setThisErrCode(null);
  };
  return (
    <Fragment>
      {/* <!-- Main modal --> */}
      <div
        id='defaultModal'
        tabIndex='-1'
        aria-hidden='true'
        className={`fixed top-0 left-0 ${
          thisErr ? "visible" : "hidden"
        } w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full`}>
        <div className='mx-auto mt-9 relative w-full max-w-2xl max-h-full'>
          {/* <!-- Modal content --> */}
          <div className='relative bg-white rounded-lg border-4 border-red-400 shadow '>
            {/* <!-- Modal body --> */}
            <div className='flex justify-between items-center p-6'>
              <p className='text-lg leading-relaxed text-red-800'>{thisErr}</p>
              <button
                onClick={() => setThisErr(null)}
                data-modal-hide='defaultModal'
                type='button'
                className='text-gray-500 bg-white hover:bg-red-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border-4 border-red-500 text-sm font-medium px-5 py-2.5 hover:text-red-900 focus:z-10 '>
                <BTNSVG />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Error;
function BTNSVG() {
  return (
    <svg
      aria-hidden='true'
      className='w-4 h-4 inline-block align-text-top'
      fill='currentColor'
      viewBox='0 0 20 20'
      xmlns='http://www.w3.org/2000/svg'>
      <path
        fillRule='evenodd'
        d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
        clipRule='evenodd'></path>
    </svg>
  );
}
