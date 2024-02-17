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
          Guess the lines is a game where you can test your knowledge of the NBA
          betting market. Use the + and - buttons to move the line for each
          game. Once you are happy with your guess, click submit. You will be
          awarded points based on how close your guess was to the actual line.
        </p>
        <div className='p-2 border border-green-600'>
          <div className='flex items-center gap-4 mb-1'>
            <div className='flex gap-2 items-center'>Perfect Guess</div>
            <div className='font-semibold ml-auto'>15 points</div>
          </div>
          <div className='flex items-center gap-4 mb-1'>
            <div className='flex gap-2 items-center'>Within 1.5</div>
            <div className='font-semibold ml-auto'>10 points</div>
          </div>
          <div className='flex items-center gap-4 mb-1'>
            <div className='flex gap-2 items-center'>Within 3</div>
            <div className='font-semibold ml-auto'>7 points</div>
          </div>
          <div className='flex items-center gap-4 mb-1'>
            <div className='flex gap-2 items-center'>Within 5</div>
            <div className='font-semibold ml-auto'>5 points</div>
          </div>
          <div className='flex items-center gap-4 mb-1'>
            <div className='flex gap-2 items-center'>Within 6</div>
            <div className='font-semibold ml-auto'>2 points</div>
          </div>
          <div className='flex items-center gap-4 mb-1'>
            <div className='flex gap-2 items-center'>Within 7</div>
            <div className='font-semibold ml-auto'>1 point</div>
          </div>
        </div>
      </div>
    </Modal>
  )
}
