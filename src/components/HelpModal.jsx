'use client'
import Modal from './Modal'

export default function HelpModal({ showModal, setShowModal }) {
  return (
    <Modal
      title={'How to Play'}
      showModal={showModal}
      setShowModal={setShowModal}
    >
      <div className='mt-4'>
        <p className='mb-2'>
          Guess the lines is a game where you can test your knowledge of the
          NBA/WNBA betting market. Use input fields or the + and - buttons to move the line for
          each game. Click submit to submit your guess and get points based on how close your guess was to the actual line.
        </p>
        <div className='p-2 border border-slate-400 rounded-lg'>
          <div className='flex items-center gap-4'>
            <div className='flex gap-2 items-center'>Perfect Guess</div>
            <div className='font-semibold ml-auto'>10 (+5 bonus)</div>
          </div>
          <div className='flex items-center gap-4 mb-1'>
            <div className='flex gap-2 items-center'>Within 1.5</div>
            <div className='font-semibold ml-auto'>10</div>
          </div>
          <div className='flex items-center gap-4 mb-1'>
            <div className='flex gap-2 items-center'>Within 3</div>
            <div className='font-semibold ml-auto'>7</div>
          </div>
          <div className='flex items-center gap-4 mb-1'>
            <div className='flex gap-2 items-center'>Within 5</div>
            <div className='font-semibold ml-auto'>5</div>
          </div>
          <div className='flex items-center gap-4 mb-1'>
            <div className='flex gap-2 items-center'>Within 6</div>
            <div className='font-semibold ml-auto'>2</div>
          </div>
          <div className='flex items-center gap-4 mb-1'>
            <div className='flex gap-2 items-center'>Within 7</div>
            <div className='font-semibold ml-auto'>1</div>
          </div>
        </div>
      </div>
    </Modal>
  )
}
