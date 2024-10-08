interface ModalProps {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
  title?: string;
  closeButton?: boolean;
  closeCross?: boolean;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ showModal, setShowModal, title, closeCross, children }) => {
  return showModal ? (
    <>
      <div className='fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none'>
        <div className='relative my-6 mx-auto w-auto max-w-3xl'>
          {/*content*/}
          <div className='relative flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none'>
            {/*header*/}
            <div className='flex items-start justify-between rounded-t border-b border-solid border-slate-200 p-5 gap-4'>
              <h3 className='text-3xl font-semibold'>{title && title}</h3>
              {closeCross && (
                <button
                  className='float-right ml-auto border-0 bg-transparent p-1 text-3xl font-semibold leading-none text-black opacity-75 outline-none focus:outline-none'
                  onClick={() => setShowModal(false)}
                >
                  <span className='block h-6 w-6 bg-transparent text-2xl text-black  outline-none focus:outline-none'>
                    ×
                  </span>
                </button>
              )}
            </div>
            {/*body*/}
            <div className='relative flex-auto p-6'>{children}</div>
            {/*footer*/}
            {/* <div className='flex items-center justify-end rounded-b border-t border-solid border-slate-200 p-6'>
              {closeButton && (
                <button
                  className='background-transparent mr-1 mb-1 px-6 py-2 text-sm font-bold uppercase text-red-500 outline-none transition-all duration-150 ease-linear focus:outline-none'
                  type='button'
                  onClick={() => setShowModal(false)}
                >
                  Cerrar
                </button>
              )}
            </div> */}
          </div>
        </div>
      </div>
      <div className='fixed inset-0 z-40 bg-black opacity-25'></div>
    </>
  ) : null;
};

export default Modal;
