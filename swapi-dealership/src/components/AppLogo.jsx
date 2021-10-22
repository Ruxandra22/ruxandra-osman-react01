import {useContext} from "react";
import {AppContext} from "../contexts/AppContext";

export const AppLogo = () => {
  const { dispatch } = useContext(AppContext);

  const cleanUpState = () => {
    dispatch({
      type: 'setSearchResults',
      payload: [],
    });

    dispatch({
      type: 'setSelected',
      payload: null,
    });
  }

  const navigateHome = () => {
    dispatch({
      type: 'setScreen',
      payload: 'home',
    })

    cleanUpState();
  }

  return (
    <h1 className="display-6 text-warning"
      onClick={navigateHome}
      style={{cursor: 'pointer'}}
    >
      Swapi Vehicles
    </h1>
  )
}

export default AppLogo;
