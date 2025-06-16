'use client'
export default function Modal({ title, children, showModal, setShowModal }) {
  const hideModal = () => {
    setShowModal(false)
  }

  return (
    <div
      className={`${
        !showModal ? 'hidden' : ''
      } fixed z-50 inset-0 bg-gray-900 bg-opacity-80 overflow-y-auto h-full w-full px-4`}
    >
      <div className='p-4 md:p-8 relative top-24 mx-auto shadow-xl rounded-md bg-white max-w-lg'>
        <div className='flex items-center justify-between p-2 border-b border-gray-400 rounded-t'>
          <h3 className='font-semibold text-xl mb-1'>{title}</h3>
          <button
            type='button'
            className='text-gray-500 bg-transparent hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center'
            onClick={hideModal}
          >
            <svg
              className='w-3 h-3'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 14 14'
            >
              <path
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6'
              />
            </svg>
            <span className='sr-only'>Close modal</span>
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}
