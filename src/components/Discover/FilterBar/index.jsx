import { useRef } from 'react';
import { countries, genres } from '~/config';

const DiscoverFilterBar = ({ category, setCategory, setQueries }) => {
  const filterTabs = [
    {
      label: 'Category:',
      options: [
        {
          name: 'Movie',
          id: 'movie',
        },
        {
          name: 'TV Show',
          id: 'tv',
        },
      ],
    },
    {
      label: 'Genre:',
      query: 'with_genres',
      options: [
        {
          name: 'All genre',
          id: '',
        },
        ...genres[category],
      ],
    },
    {
      label: 'Country:',
      query: 'with_origin_country',
      options: [
        {
          name: 'All countries',
          id: '',
        },
        ...countries,
      ],
    },
    {
      label: 'Year:',
      query: 'primary_release_year',
      options: [
        { name: 'All time', id: '' },
        { name: '2022', id: '2022' },
        { name: '2021', id: '2021' },
        { name: '2020', id: '2020' },
        { name: '2019', id: '2019' },
        { name: '2018', id: '2018' },
      ],
    },
    {
      label: 'Duration:',
      query: 'with_runtime.lte',
      options: [
        { name: 'All', id: '' },
        { name: '< 3 hours', id: '180' },
        { name: '< 2 hours', id: '120' },
        { name: '< 1 hours', id: '60' },
        { name: '< 30 minutes', id: '30' },
      ],
    },
    {
      label: 'Sort by:',
      query: 'sort_by',
      options: [
        { name: 'None', id: '' },
        { name: 'Popularity', id: 'popularity.desc' },
        { name: 'Release Date', id: 'release_date.desc' },
        { name: 'Vote Average', id: 'vote_count.desc' },
      ],
    },
  ];
  const selectionWrapRef = useRef();
  const buttonSubmit = useRef();
  const resetOptions = () => {
    if (selectionWrapRef.current) {
      const selections = Array.from(selectionWrapRef.current.children);
      selections.forEach((selection, index) => {
        if (index > 0) {
          const selectionTag = selection.querySelector('select');
          selectionTag.value = '';
        }
      });
    }
  };
  const handleSetQueries = (query, value) => {
    if (value) {
      setQueries(prevState => {
        return { ...prevState, [query]: `${query}=${value}` };
      });
    } else {
      setQueries(prevState => {
        const nextState = prevState;
        delete nextState[query];
        return nextState;
      });
    }
    // if (buttonSubmit.current) {
    //   console.log('buttonSubmit.current', buttonSubmit.current);
    //   buttonSubmit.current.click();
    // }
  };
  const handleSetCategory = value => {
    setCategory(value);
    setQueries({});
    resetOptions();
  };
  const handleResetQueries = () => {
    setCategory('movie');
    setQueries({});
    resetOptions();
  };

  return (
    <div className="flex justify-between items-center gap-3 w-full px-4 pb-3 pt-[10px] bg-[rgba(255,_255,_255,_0.06)] rounded-md">
      <form
        method="GET"
        ref={selectionWrapRef}
        className="grid grid-cols-6 gap-4 w-[90%] "
      >
        {filterTabs.map((tab, index) => (
          <div
            key={`discoverFilterTab${index}`}
            className="flex flex-col items-start gap-2 w-full"
          >
            <label
              className="text-white font-bold tracking-wider"
              htmlFor={`#discoverFilterTab${index}`}
            >
              {tab.label}
            </label>
            <div className="relative w-full">
              <select
                className="relative w-full px-2 py-1 rounded-md focus:shadow-select"
                name={tab.query}
                id={`#discoverFilterTab${index}`}
                onChange={e => {
                  if (index !== 0) {
                    handleSetQueries(tab.query, e.target.value);
                  } else {
                    handleSetCategory(e.target.value);
                  }
                }}
              >
                {tab.options.map((option, index) => (
                  <option key={`option${tab.label}${index}`} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </select>
              <i className="bx bx-chevron-down absolute right-[8px] top-1/2 -translate-y-1/2 text-lg pointer-events-none"></i>
            </div>
          </div>
        ))}
        <button
          ref={buttonSubmit}
          type="submit"
          hidden
          onClick={e => e.preventDefault()}
        ></button>
      </form>
      <button
        className="self-end px-4 py-1 rounded-md bg-[var(--primary-color)] text-white font-bold tracking-wider opacity-90 hover:opacity-100"
        onClick={handleResetQueries}
      >
        Reset
      </button>
    </div>
  );
};

export default DiscoverFilterBar;
