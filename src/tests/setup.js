import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Mock Next.js Image component
vi.mock('next/image', () => ({
  default: vi.fn().mockImplementation(({ src, alt, width, height, className }) => {
    return {
      type: 'img',
      props: { src, alt, width, height, className },
      $$typeof: Symbol.for('react.element'),
    }
  })
}))

// Mock the store
vi.mock('@/store/guessTheLine', () => ({
  useStore: vi.fn()
}))

// Mock localStorage for Zustand persist
Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: vi.fn(() => null),
    setItem: vi.fn(() => null),
    removeItem: vi.fn(() => null),
    clear: vi.fn(() => null),
  },
  writable: true
})