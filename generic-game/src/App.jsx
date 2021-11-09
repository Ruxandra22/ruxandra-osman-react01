import { Footer, Header } from './components/common';
import {useDispatch, useSelector} from "react-redux";
import {clickClicker, decrementClicker} from "./actions/creators/ui";
import {initializeGoogleAuth} from "./api";

initializeGoogleAuth();

export const App = () => {
  const clicker = useSelector((state => {
    const { ui } = state;

    return ui.clicker;
  }));
  const dispatch = useDispatch();


  return (
    <>
      <Header/>
      <main>
        <div>Value is: {clicker}</div>
        <button
          onClick={() => {
            dispatch(decrementClicker());
          }}
        >
          Decrement
        </button>
        <button
          onClick={() => {
            dispatch(clickClicker());
          }}
        >
          Test
        </button>
      </main>
      <Footer></Footer>
    </>
  )
};

export default App;
// actions -> {type: '', payload: {}}  /types /creators
// reducers
