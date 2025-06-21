import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { GuessTheLine } from '@/components/GuessTheLine';
import { useStore } from '@/store/guessTheLine';

// Mock the components that are causing issues
vi.mock('@/components/Matchup', () => ({
  Matchup: ({ home, away }) => (
    <div data-testid="matchup">
      <span>{home.name}</span>
      <span>{away.name}</span>
    </div>
  )
}));

vi.mock('@/components/Header', () => ({
  default: () => <div data-testid="header">Guess The Line</div>
}));

vi.mock('@/components/FinalScorePopup', () => ({
  default: () => <div data-testid="final-score-popup">Final Score</div>
}));

// Create a date for today
const today = new Date();
const todayISOString = today.toISOString();
const todayDateString = today.toISOString().split('T')[0];

// Create mock games
const createMockGame = (id, homeTeam, awayTeam, gameTime) => ({
  id,
  home: {
    name: homeTeam,
    city: 'Test City',
    logo: '/logos/test.svg',
    isWNBA: false
  },
  away: {
    name: awayTeam,
    city: 'Test City',
    logo: '/logos/test.svg',
    isWNBA: false
  },
  points: 5.5,
  gameTime
});

// Create mock games for today
const mockGamesForToday = [
  createMockGame('game1', 'Lakers', 'Celtics', todayISOString),
  createMockGame('game2', 'Warriors', 'Nets', todayISOString),
  createMockGame('game3', 'Bulls', 'Heat', todayISOString)
];

// Mock the store implementation
const mockStore = {
  getCurrentScore: vi.fn().mockReturnValue(0),
  numberOfGuessesForMatches: vi.fn().mockReturnValue(0),
  addGuess: vi.fn(),
  date: new Date(),
  setDate: vi.fn(),
  reset: vi.fn(),
  resetGuessesForCurrentDate: vi.fn(),
  selectedSport: 'both',
  setSelectedSport: vi.fn(),
  setGamesByDate: vi.fn(),
  getGamesForSelectedDate: vi.fn().mockReturnValue(mockGamesForToday),
  selectedDate: todayDateString,
  setSelectedDate: vi.fn(),
  gamesByDate: new Map([[todayDateString, mockGamesForToday]]),
  getGuessesForDate: vi.fn().mockReturnValue([])
};

describe('GuessTheLine Basic Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useStore.mockImplementation((selector) => selector(mockStore));
  });

  it('should display the correct number of matchups based on the data provided', () => {
    render(<GuessTheLine initialGames={mockGamesForToday} />);
    
    // Check that we have 3 matchups
    const matchups = screen.getAllByTestId('matchup');
    expect(matchups).toHaveLength(3);
  });

  it('should display "No games available" when there are no games', () => {
    // Override the mock store for this test
    const emptyStore = {
      ...mockStore,
      gamesByDate: new Map([[todayDateString, []]]),
      getGamesForSelectedDate: vi.fn().mockReturnValue([])
    };
    useStore.mockImplementation((selector) => selector(emptyStore));
    
    render(<GuessTheLine initialGames={[]} />);
    
    expect(screen.getByText('No games available for this date')).toBeInTheDocument();
  });
  
  it('should filter games based on selected sport', () => {
    // Create a mixed set of NBA and WNBA games
    const mixedGames = [
      ...mockGamesForToday,
      createMockGame('game4', 'Liberty', 'Aces', todayISOString)
    ];
    
    // Add WNBA flag to the fourth game
    mixedGames[3].home.isWNBA = true;
    mixedGames[3].away.isWNBA = true;
    
    // Test with all games (both NBA and WNBA)
    const mixedStore = {
      ...mockStore,
      gamesByDate: new Map([[todayDateString, mixedGames]]),
      getGamesForSelectedDate: vi.fn().mockReturnValue(mixedGames)
    };
    useStore.mockImplementation((selector) => selector(mixedStore));
    
    const { unmount } = render(<GuessTheLine initialGames={mixedGames} />);
    
    // Initially all 4 games should be visible
    expect(screen.getAllByTestId('matchup')).toHaveLength(4);
    
    // Clean up the first render
    unmount();
    
    // Now test with NBA filter
    const nbaGames = mixedGames.filter(game => !game.home.isWNBA);
    const nbaOnlyStore = {
      ...mockStore,
      selectedSport: 'nba',
      gamesByDate: new Map([[todayDateString, mixedGames]]),
      getGamesForSelectedDate: vi.fn().mockReturnValue(nbaGames)
    };
    useStore.mockImplementation((selector) => selector(nbaOnlyStore));
    
    // Re-render with NBA filter
    render(<GuessTheLine initialGames={mixedGames} />);
    
    // Should only show NBA games (3)
    expect(screen.getAllByTestId('matchup')).toHaveLength(3);
  });
});