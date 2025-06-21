# Guess the Line

A simple web app that pulls daily betting odds for NBA and WNBA games and lets you guess the betting lines.

## Features

- View daily NBA and WNBA games with betting lines
- Guess the betting line for each game
- Filter games by league (NBA/WNBA)
- Track your score based on how close your guesses are to the actual lines

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/wsaada19/guess-the-line.git
cd guess-the-line
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Run the development server
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application

## Testing

The application uses Vitest for testing. To run the tests:

```bash
# Run all tests
npm test

# Run tests in watch mode (for development)
npm run test:watch

# Run tests with coverage report
npm run test:coverage
```

The tests verify that:
- The GuessTheLine component loads properly when given matchup data
- All matchups appear correctly under the current date
- The component handles filtering by sport (NBA/WNBA)
- The component displays appropriate messages when no games are available

## Built With

- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Zustand](https://github.com/pmndrs/zustand) - State management
- [Vitest](https://vitest.dev/) - Testing framework
