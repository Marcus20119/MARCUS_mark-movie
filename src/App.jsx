import { Fragment } from 'react';
import MainSection from './components/MainSection';
import NavSection from './components/NavSection';
import SearchSection from './components/SearchSection';

function App() {
  return (
    <Fragment>
      <div className="app-layout">
        <NavSection />
        <MainSection />
        <SearchSection />
      </div>
    </Fragment>
  );
}

export default App;
