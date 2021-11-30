import {useAuth, useStats} from "../hooks";
import {Button, Loader} from "../components/ui";
import {useDispatch} from "react-redux";
import {requestSignIn} from "../actions/creators/auth";
import {UserStats} from "../components/profile";
import {Link} from "react-router-dom";

export const HomePage = () => {
  const dispatch = useDispatch();
  const {authenticated, established} = useAuth();
  const stats = useStats();

  return <div className="p-4 container mx-auto">
    <h1>Welcome to Word Game</h1>
    {
      !established ? <Loader/>: authenticated ? (
        <>
          <UserStats {...stats} className='mt-8' entryClassName="p-5"/>
          <div className="mt-2 text-center">
            <Link to="/play">
              <Button
                title="Play now"
                type="button"
                element="span"
              >
                Play
              </Button>
            </Link>
          </div>
        </>
        ) :
        <div className="text-center">
          <button
            className="w-75 md:max-w-xl w-3/4 py-20 border rounded-md shadow hover:bg-gray-100"
            type="button"
            title="Login"
            onClick={() => {
              dispatch(requestSignIn());
            }}
          >
            Login to get started
          </button>
        </div>
    }
  </div>
}

export default HomePage;
