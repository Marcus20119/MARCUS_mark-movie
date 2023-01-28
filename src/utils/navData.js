import Swal from 'sweetalert2';
import { supabase } from '~/supabase';

export const navSection = [
  {
    groupName: 'MENU',
    items: [
      {
        name: 'Home',
        iconClass: 'bx bxs-home',
        originLink: '/home',
        navigateLink: '/home/movies',
        needLogIn: false,
      },
      {
        name: 'Community',
        iconClass: 'bx bx-globe',
        originLink: '/community',
        navigateLink: '/community',
        needLogIn: false,
      },
      {
        name: 'Discover',
        iconClass: 'bx bxs-compass',
        originLink: '/discover',
        navigateLink: '/discover?category=movie&page=1',
        needLogIn: false,
      },
      {
        name: 'Awards',
        iconClass: 'bx bxs-award',
        originLink: '/awards',
        navigateLink: '/awards',
        needLogIn: true,
      },
      {
        name: 'Celebs',
        iconClass: 'bx bxs-user',
        originLink: '/person',
        navigateLink: '/person/popular?page=1',
        needLogIn: false,
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
        needLogIn: true,
      },
      {
        name: 'Watch List',
        iconClass: 'bx bxs-bookmark',
        originLink: '/top-rated',
        navigateLink: '/top-rated',
        needLogIn: true,
      },
      {
        name: 'Downloaded',
        iconClass: 'bx bxs-download',
        originLink: '/downloaded',
        navigateLink: '/downloaded',
        needLogIn: true,
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
        needLogIn: false,
      },
      {
        name: 'Movies',
        iconClass: 'bx bxs-film',
        originLink: '/movie',
        navigateLink: '/movie/now-playing?page=1',
        needLogIn: false,
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
        needLogIn: true,
      },
      {
        name: 'Log outs',
        iconClass: 'bx bx-log-out',
        originLink: '/log-out',
        navigateLink: '/home/movies',
        needLogIn: true,
        handleClick: async () => {
          await Swal.fire({
            title: 'Are you sure?',
            text: `You will immediately sign out!`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#FF3D71',
            cancelButtonColor: '#cccccc30',
            confirmButtonText: 'Sign out',
            scrollbarPadding: false,
          }).then(async result => {
            if (result.isConfirmed) {
              // Loading pop-up
              Swal.fire({
                title: 'Loading...',
                text: 'Please wait',
                imageUrl: '/imgs/loading-gif.gif',
                imageHeight: '60px',
                showConfirmButton: false,
                allowOutsideClick: false,
                scrollbarPadding: false,
              });
              await supabase.auth.signOut();
              await Swal.fire({
                title: 'Deleted!',
                text: 'Your file has been deleted.',
                icon: 'success',
                scrollbarPadding: false,
                confirmButtonColor: '#FF3D71',
              });
            }
          });
        },
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

export const navPerson = [
  {
    name: 'Popular',
    path: '/person/popular?page=1',
  },
  {
    name: 'Search',
    path: '/person/search?query=&page=1',
  },
];
