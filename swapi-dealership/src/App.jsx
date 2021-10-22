import { useReducer } from 'react';
import Screen from './components/Screen';
import { AppContext, appState, appStateReducer } from './contexts/AppContext';
import Search from './legacy/Search';
import FooterNav from "./components/FooterNav";
import AppLogo from "./components/AppLogo";

const App = () => {
  const [state, dispatch] = useReducer(appStateReducer, appState);
  const contextValue = {
    state: state,
    dispatch: dispatch,
  };

  const { currentScreen } = state;

  return (
    <AppContext.Provider value={contextValue}>
      <header className="navbar-dark fixed-top bg-dark border-bottom border-warning">
        <nav className="container d-flex justify-content-between">
            <AppLogo/>

          <Search></Search>
        </nav>
      </header>

      <main className="container mt-7 mb-4">
        <Screen screen={currentScreen}></Screen>
        <AppLogo/>
      </main>

      <footer className="container mb-4">
        <FooterNav/>
      </footer>
    </AppContext.Provider>
  );
};

export default App;
