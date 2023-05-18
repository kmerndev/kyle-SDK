import { LotrClient } from '../index';
import axios from 'axios';

jest.mock('axios');
beforeEach(() => {
  jest.restoreAllMocks();
});

describe('SDK', () => {
  let apiClient;
  beforeEach(() => {
    apiClient = new LotrClient({apiKey: 'FrjQYHGnOm8QKJrO4P1V'});
  });
  test('should fetch movies list', async () => {
    const mockMoviesResponse = {
      docs: [
        {
          _id: '5cd95395de30eff6ebccde5c',
          name: 'The Fellowship of the Ring',
          runtimeInMinutes: 178,
          budgetInMillions: 93,
          boxOfficeRevenueInMillions: 871.5,
          academyAwardNominations: 13,
          academyAwardWins: 4,
          rottenTomatoesScore: 91
        },
        {
          _id: '5cd95395de30eff6ebccde5d',
          name: 'The Return of the King',
          runtimeInMinutes: 201,
          budgetInMillions: 94,
          boxOfficeRevenueInMillions: 1120,
          academyAwardNominations: 11,
          academyAwardWins: 11,
          rottenTomatoesScore: 95
        },
      ],
      total: 1,
      limit: 1000,
      page: 1,
      pages: 1
    };

    (axios.get as jest.Mock).mockResolvedValue({data: mockMoviesResponse});

    const moviesResponse = await apiClient.movies.getMovies();
    if ('docs' in moviesResponse) {
      expect(moviesResponse.docs).toBeDefined();
      expect(moviesResponse.docs.length).toBeGreaterThan(0);
      expect(moviesResponse.docs[0]).toHaveProperty('name');
    }
  });

  test('should get target movie by ID', async () => {
    const mockMovieResponse = {
      docs: [
        {
          _id: '5cd95395de30eff6ebccde5a',
          name: 'The Battle of the Five Armies',
          runtimeInMinutes: 144,
          budgetInMillions: 250,
          boxOfficeRevenueInMillions: 956,
          academyAwardNominations: 1,
          academyAwardWins: 0,
          rottenTomatoesScore: 60
        },
      ],
      total: 1,
      limit: 1000,
      offset: 0,
      page: 1,
    };
    (axios.get as jest.Mock).mockResolvedValue({data: mockMovieResponse});

    const id = '5cd95395de30eff6ebccde59';
    const movieResponse = await apiClient.movies.getMovieById(id);
    if ('docs' in movieResponse) {
      const movie = movieResponse.docs[0];
  
      expect(movie).toBeDefined();
      expect(movie).toHaveProperty('name');
    }
  });

  test('should get quote id', async () => {
    const mockQuoteResponse = {
      docs: [
        {
          _id: '5cd96e05de30eff6ebcce84b',
          dialog: "Well, I'm back.",
          movie: '5cd95395de30eff6ebccde5d',
          character: '5cd99d4bde30eff6ebccfd0d',
          id: '5cd96e05de30eff6ebcce84b'
        },
      ],
      total: 1,
      limit: 1000,
      offset: 0,
      page: 1,
    };

    (axios.get as jest.Mock).mockResolvedValue({data: mockQuoteResponse});
    const quoteId = '5cd96e05de30eff6ebcce84a';
    const quoteResponse = await apiClient.quotes.getQuoteById(quoteId);
    if ('docs' in quoteResponse) { 
      const quote = quoteResponse.docs[0];
      expect(quote).toBeDefined();
      expect(quote).toHaveProperty('dialog');
    }
  });

  test('should fetch quotes list', async () => {
    const mockQuoteResponse = {
      docs: [
        {
          _id: '5cd96e05de30eff6ebcce847',
          dialog: 'The last pages are for you Sam.',
          movie: '5cd95395de30eff6ebccde5d',
          character: '5cd99d4bde30eff6ebccfc15',
          id: '5cd96e05de30eff6ebcce847'
        },
      ],
      total: 1,
      limit: 1000,
      offset: 0,
      page: 1,
    };

    (axios.get as jest.Mock).mockResolvedValue({data: mockQuoteResponse});

    const quoteResponse = await apiClient.quotes.getQuotes();
    if ('docs' in quoteResponse) {
      const quote = quoteResponse.docs[0];
      expect(quote).toBeDefined();
      expect(quote).toHaveProperty('dialog');
    }
    
  });

  describe('getAllQuotesForMovie', () => {
    test('should fetch correct quotes', async () => {
      const mockQuoteResponse = {
        docs: [
          {
            _id: '5cd95395de30eff6ebccde5d',
            dialog: 'Deagol!',
            movie: '5cd95395de30eff6ebccde5d',
            character: '',
          },
        ],
        total: 1,
        limit: 1000,
        offset: 0,
        page: 1,
      };

      const movieId = '5cd95395de30eff6ebccde5d';
      (axios.get as jest.Mock).mockResolvedValue({data: mockQuoteResponse});

      const quoteResponse = await apiClient.movies.getAllMovieQuotes(
        movieId
      );

      expect(quoteResponse).toBeDefined();
      if ('docs' in quoteResponse) {
        expect(quoteResponse.docs[0]).toBeDefined();
      }
    });
  });
});
