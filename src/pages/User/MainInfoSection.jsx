import { Fragment } from 'react';

const MainInfoSection = ({ userRow }) => {
  return (
    <Fragment>
      <h1 className="text-white opacity-80 text-3xl font-bold">
        {userRow.username}
      </h1>
    </Fragment>
  );
};

export default MainInfoSection;
