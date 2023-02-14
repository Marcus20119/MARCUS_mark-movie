import { useRef, useState } from 'react';
import queryString from 'query-string';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import { countries, genres } from '~/utils';
import { useEffect } from 'react';
import { useResponsive } from '~/hooks';

const FilterBar = ({ paramData, currentPage, setCurrentPage }) => {
  const filterTabs = [
    {
      label: 'Category:',
      query: 'category',
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
        ...genres[paramData.category],
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
        { name: '2023', id: '2023' },
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
  const navigateTo = useNavigate();

  const { page, ...initialState } = paramData;
  const [queries, setQueries] = useState(initialState);
  const selectionWrapRef = useRef();

  // Chặn useEffect trong lần render đầu tiên
  const didMountRef = useRef(false);
  useEffect(() => {
    if (didMountRef.current) {
      navigateTo(
        `/discover?${queryString.stringify(queries)}&page=${currentPage}`
      );
    }
    didMountRef.current = true;
  }, [currentPage, navigateTo, queries]);

  const resetOptions = () => {
    if (selectionWrapRef.current) {
      const selections = Array.from(selectionWrapRef.current.children);
      selections.forEach((selection, index) => {
        const selectionTag = selection.querySelector('select');
        if (index > 0) {
          selectionTag.value = '';
        } else {
          selectionTag.value = 'movie';
        }
      });
    }
  };
  const handleSetQueries = (query, value) => {
    if (value) {
      setQueries(prevState => {
        return { ...prevState, [query]: value };
      });
    } else {
      setQueries(prevState => {
        const nextState = { ...prevState };
        delete nextState[query];
        return nextState;
      });
    }
    setCurrentPage(1);
  };
  const handleResetQueries = () => {
    setQueries({ category: 'movie' });
    setCurrentPage(1);
    resetOptions();
  };

  const { isMobile, isTablet, isLaptop } = useResponsive();

  return (
    <div className="flex justify-between items-center gap-3 w-full px-4 pb-3 pt-[10px] bg-[rgba(255,_255,_255,_0.06)] rounded-md">
      <div
        ref={selectionWrapRef}
        className={`grid  gap-4 w-[90%] ${isLaptop && 'grid-cols-6'} ${
          isTablet && 'grid-cols-3'
        }`}
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
                className="relative w-full px-2 py-1 rounded-md cursor-pointer focus:shadow-select"
                name={tab.query}
                id={`#discoverFilterTab${index}`}
                defaultValue={paramData[tab.query] || ''}
                onChange={e => {
                  handleSetQueries(tab.query, e.target.value);
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
      </div>
      <button
        className="self-end px-4 py-1 rounded-md bg-[var(--primary-color)] text-white font-bold tracking-wider opacity-90 hover:opacity-100"
        onClick={handleResetQueries}
      >
        Reset
      </button>
    </div>
  );
};

FilterBar.propTypes = {
  paramData: PropTypes.object.isRequired,
  currentPage: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
};

export default FilterBar;
