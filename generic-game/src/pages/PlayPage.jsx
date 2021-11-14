import {useAuth} from "../hooks";
import {Loader} from "../components/ui";

export const PlayPage = () => {
  const { established, authenticated } = useAuth();

  return (
    <div className="p-4 mx-auto">
      {
        !established ? <Loader/> : authenticated ? 'This is the game you\'ll play' : 'Log in to play'
      }
    </div>
  )
}

export default PlayPage;
