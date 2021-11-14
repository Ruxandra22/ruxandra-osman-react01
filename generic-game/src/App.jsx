import { Switch, BrowserRouter, Route } from 'react-router-dom';
import { initializeGoogleAuth } from './api';
import { Footer, Header } from './components/common';
import { HomePage, NotFoundPage, ProfilePage, RanksPage, PlayPage } from './pages';

// import { STH, STH } from './actions/types/ui';
// import {dispatchState} from './actions/creators/ui';

// async
initializeGoogleAuth();

export const App = () => {
  return (
    <BrowserRouter>
      <Header></Header>
      <main className="flex-grow">
        <Switch>
          <Route path="/" exact component={HomePage}/>
          <Route path="/profile" component={ProfilePage}/>
          <Route path="/ranks" component={RanksPage}/>
          <Route path="/play" component={PlayPage}/>
          <Route component={NotFoundPage}/>
        </Switch>
      </main>
      <Footer></Footer>
    </BrowserRouter>
  );
};

export default App;

// actions -> {type: '', payload: {}}  /types /creators
// reducers
