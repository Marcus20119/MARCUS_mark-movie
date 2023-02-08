export const apiKey = 'ca5bec6407d971b84c656385ba10351d';
export const api = {
  getPoster(poster_path, width = 'w500') {
    return `https://image.tmdb.org/t/p/${width}${poster_path}`;
  },
  getBackdrop(backdrop_path, width = 'original') {
    return `https://image.tmdb.org/t/p/${width}${backdrop_path}`;
  },
  getPopular(type = 'movie', page = 1) {
    return `https://api.themoviedb.org/3/${type}/popular?api_key=${apiKey}&language=en-US&page=${page}`;
  },
  getTopRated(type = 'movie', page = 1) {
    return `https://api.themoviedb.org/3/${type}/top_rated?api_key=${apiKey}&language=en-US&page=${page}`;
  },
  getSearch(query = '', type = 'movie', page = 1) {
    return `https://api.themoviedb.org/3/search/${type}?api_key=${apiKey}&language=en-US&query=${query}&page=${page}`;
  },
  getSearchMulti(query = '', page = 1) {
    return `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&language=en-US&query=${query}&page=${page}`;
  },
  getDetail(id = '', type = 'movie') {
    return `https://api.themoviedb.org/3/${type}/${id}?api_key=${apiKey}&language=en-US`;
  },
  getMovieCredits(id = '', type = 'movie') {
    return `https://api.themoviedb.org/3/${type}/${id}/credits?api_key=${apiKey}&language=en-US`;
  },
  getThumbnail(key = '', type = 'hqdefault') {
    return `https://img.youtube.com/vi/${key}/${type}.jpg`;
  },
  getTrailer(id = '', type = 'movie') {
    return `https://api.themoviedb.org/3/${type}/${id}/videos?api_key=${apiKey}&language=en-US`;
  },
  getRecommend(id = '', type = 'movie', page = 1) {
    return `https://api.themoviedb.org/3/${type}/${id}/recommendations?api_key=${apiKey}&language=en-US&page=${page}`;
  },
  getPersonCredits(id = '', type = 'movie') {
    return `https://api.themoviedb.org/3/person/${id}/${type}_credits?api_key=${apiKey}&language=en-US`;
  },
  getDiscover(category = '', query = '') {
    return `https://api.themoviedb.org/3/discover/${category}?api_key=${apiKey}${query}`;
  },
  movie: {
    getNowPlaying(page = 1) {
      return `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=${page}`;
    },
    getUpComing(page = 1) {
      return `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US&page=${page}`;
    },
  },
  tv: {
    getAiringToday(page = 1) {
      return `https://api.themoviedb.org/3/tv/airing_today?api_key=${apiKey}&language=en-US&page=${page}`;
    },
    getOnTheAir(page = 1) {
      return `https://api.themoviedb.org/3/tv/on_the_air?api_key=${apiKey}&language=en-US&page=${page}`;
    },
  },
};
export const genres = {
  movie: [
    {
      id: 28,
      name: 'Action',
    },
    {
      id: 12,
      name: 'Adventure',
    },
    {
      id: 16,
      name: 'Animation',
    },
    {
      id: 35,
      name: 'Comedy',
    },
    {
      id: 80,
      name: 'Crime',
    },
    {
      id: 99,
      name: 'Documentary',
    },
    {
      id: 18,
      name: 'Drama',
    },
    {
      id: 10751,
      name: 'Family',
    },
    {
      id: 14,
      name: 'Fantasy',
    },
    {
      id: 36,
      name: 'History',
    },
    {
      id: 27,
      name: 'Horror',
    },
    {
      id: 10402,
      name: 'Music',
    },
    {
      id: 9648,
      name: 'Mystery',
    },
    {
      id: 10749,
      name: 'Romance',
    },
    {
      id: 878,
      name: 'Science Fiction',
    },
    {
      id: 10770,
      name: 'TV Movie',
    },
    {
      id: 53,
      name: 'Thriller',
    },
    {
      id: 10752,
      name: 'War',
    },
    {
      id: 37,
      name: 'Western',
    },
  ],
  tv: [
    {
      id: 10759,
      name: 'Action',
    },
    {
      id: 16,
      name: 'Animation',
    },
    {
      id: 35,
      name: 'Comedy',
    },
    {
      id: 80,
      name: 'Crime',
    },
    {
      id: 99,
      name: 'Documentary',
    },
    {
      id: 18,
      name: 'Drama',
    },
    {
      id: 10751,
      name: 'Family',
    },
    {
      id: 10762,
      name: 'Kids',
    },
    {
      id: 9648,
      name: 'Mystery',
    },
    {
      id: 10763,
      name: 'News',
    },
    {
      id: 10764,
      name: 'Reality',
    },
    {
      id: 10765,
      name: 'Sci-Fi & Fantasy',
    },
    {
      id: 10766,
      name: 'Soap',
    },
    {
      id: 10767,
      name: 'Talk',
    },
    {
      id: 10768,
      name: 'War & Politics',
    },
    {
      id: 37,
      name: 'Western',
    },
  ],
};
export const countries = [
  {
    name: 'United States',
    id: 'US',
  },
  {
    name: 'United Kingdom',
    id: 'GB',
  },
  {
    name: 'Korea',
    id: 'KP',
  },
  {
    name: 'France',
    id: 'FR',
  },
  {
    name: 'Canada',
    id: 'CA',
  },
  {
    name: 'Hong Kong',
    id: 'HK',
  },
  {
    name: 'Japan',
    id: 'JP',
  },
  {
    name: 'China',
    id: 'CN',
  },
  {
    name: 'Taiwan',
    id: 'TW',
  },
  {
    name: 'India',
    id: 'IN',
  },
  {
    name: 'Thailand',
    id: 'TH',
  },
  {
    name: 'Australia',
    id: 'AU',
  },
  {
    name: 'Vietnam',
    id: 'VN',
  },
  {
    name: 'German',
    id: 'DE',
  },
  {
    name: 'Sweden',
    id: 'SE',
  },
  {
    name: 'Mexico',
    id: 'MX',
  },
  {
    name: 'Philippines',
    id: 'PH',
  },
  {
    name: 'CZech Republic',
    id: 'CZ',
  },
];
