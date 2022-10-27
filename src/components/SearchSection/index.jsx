import { useState } from 'react';
import MovieCardX from '../Common/Movie/CardX';

const SearchSection = () => {
  const [isFocus, setIsFocus] = useState(false);
  const data = {
    adult: false,
    backdrop_path: '/d6MhreFdMHONqX3iZlJGCF8UkIt.jpg',
    genre_ids: [28, 12, 14],
    id: 436270,
    original_language: 'en',
    original_title: 'Black Adam',
    overview:
      'Nearly 5,000 years after he was bestowed with the almighty powers of the Egyptian gods—and imprisoned just as quickly—Black Adam is freed from his earthly tomb, ready to unleash his unique form of justice on the modern world.',
    popularity: 4416.78,
    poster_path: '/3zXceNTtyj5FLjwQXuPvLYK5YYL.jpg',
    release_date: '2022-10-19',
    title: 'Black Adam',
    video: false,
    vote_average: 7.1,
    vote_count: 501,
  };
  return (
    <div className="relative">
      <div className="fixed top-0 bottom-0 right-0 left-[80%] gap-[40px] flex flex-col py-[24px] px-[20px] bg-transparent text-[rgba(255,_255,_255,_0.4)]">
        <div className="relative w-full">
          <input
            className="block w-full pl-3 pr-9 py-2 rounded-xl border-[2px] border-[rgba(255,_255,_255,_0.1)] bg-transparent placeholder:text-[rgba(255,_255,_255,_0.1)] focus:border-[rgba(255,_255,_255,_0.4)]"
            type="text"
            placeholder="Find your movie"
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
          />
          <i
            className={`bx bx-search absolute right-3 top-1/2 -translate-y-1/2 text-lg ${
              isFocus
                ? 'text-[rgba(255,_255,_255,_0.4)]'
                : 'text-[rgba(255,_255,_255,_0.1)]'
            }`}
          ></i>
        </div>
        <MovieCardX movieData={data} />
      </div>
    </div>
  );
};

export default SearchSection;
