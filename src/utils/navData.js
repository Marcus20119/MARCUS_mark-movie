export const navSection = [
  {
    groupName: 'MENU',
    items: [
      {
        name: 'Home',
        iconClass: 'bx bxs-home',
        originLink: '/home',
        navigateLink: '/home/movies',
      },
      {
        name: 'Community',
        iconClass: 'bx bx-globe',
        originLink: '/community',
        navigateLink: '/community',
      },
      {
        name: 'Discover',
        iconClass: 'bx bxs-compass',
        originLink: '/discover',
        navigateLink: '/discover?category=movie&page=1',
      },
      {
        name: 'Awards',
        iconClass: 'bx bxs-award',
        originLink: '/awards',
        navigateLink: '/awards',
      },
      {
        name: 'Celebs',
        iconClass: 'bx bxs-user',
        originLink: '/person',
        navigateLink: '/person/general',
      },
    ],
  },
  {
    groupName: 'LIBRARY',
    items: [
      {
        name: 'Recent',
        iconClass: 'bx bxs-stopwatch',
        originLink: '/recent',
        navigateLink: '/recent',
      },
      {
        name: 'Watch List',
        iconClass: 'bx bxs-bookmark',
        originLink: '/top-rated',
        navigateLink: '/top-rated',
      },
      {
        name: 'Downloaded',
        iconClass: 'bx bxs-download',
        originLink: '/downloaded',
        navigateLink: '/downloaded',
      },
    ],
  },
  {
    groupName: 'CATEGORIES',
    items: [
      {
        name: 'TV Series',
        iconClass: 'bx bxs-tv',
        originLink: '/tv',
        navigateLink: '/tv/on-the-air?page=1',
      },
      {
        name: 'Movies',
        iconClass: 'bx bxs-film',
        originLink: '/movie',
        navigateLink: '/movie/now-playing?page=1',
      },
    ],
  },
  {
    groupName: 'GENERAL',
    items: [
      {
        name: 'Settings',
        iconClass: 'bx bxs-cog',
        originLink: '/settings',
        navigateLink: '/settings',
      },
      {
        name: 'Log outs',
        iconClass: 'bx bx-log-out',
        originLink: '/log-out',
        navigateLink: '/log',
      },
    ],
  },
];

export const navHome = [
  {
    name: 'TV Series',
    path: '/home/tv-series',
  },
  {
    name: 'Movies',
    path: '/home/movies',
  },
];

export const navMovie = [
  {
    name: 'Now Playing',
    path: '/movie/now-playing?page=1',
  },
  {
    name: 'Upcoming',
    path: '/movie/upcoming?page=1',
  },
  {
    name: 'Popular',
    path: '/movie/popular?page=1',
  },
  {
    name: 'Top Rated',
    path: '/movie/top-rated?page=1',
  },
  {
    name: 'Search',
    path: '/movie/search?query=&page=1',
  },
];

export const navTV = [
  {
    name: 'On The Air',
    path: '/tv/on-the-air?page=1',
  },
  {
    name: 'Airing Today',
    path: '/tv/airing-today?page=1',
  },
  {
    name: 'Popular',
    path: '/tv/popular?page=1',
  },
  {
    name: 'Top Rated',
    path: '/tv/top-rated?page=1',
  },
  {
    name: 'Search',
    path: '/tv/search?query=&page=1',
  },
];
