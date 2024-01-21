'use client'
import { useState } from 'react'
import Modal from './Modal'

export default function HelpModal() {
  return (
    <Modal title={'How to Play Guess the Lines'}>
      <div className='mt-4'>
        <p className='px-2'>
          Guess the lines is a game where you can test your knowledge of the NBA
          betting market. Use the + and - buttons to move the line for each
          game. Once you are happy with your guess, click submit. You will be
          awarded points based on how close your guess was to the actual line.
        </p>
        {/* <div className='mt-4'>
          <p className='col-span-3 mb-2'>
            Exact guess <span className='text-green-600'>10</span>
          </p>
          <p className='col-span-3'>
            Within 1 <span className='text-green-600'>7</span>
          </p>
        </div> */}
      </div>
    </Modal>
  )
}
