import {useAuth, useStats} from "../hooks";
import {Loader} from "../components/ui";
import {useDispatch} from "react-redux";
import {requestSignIn} from "../actions/creators/auth";
import {UserStats} from "../components/profile";

export const HomePage = () => {
  const dispatch = useDispatch();
  const {authenticated, established} = useAuth();
  const stats = useStats();

  return <div className="p-4 container mx-auto">
    <h1>Welcome to Word Game</h1>
    {
      !established ? <Loader/>: authenticated ? (
          <UserStats {...stats} className='mt-8' entryClassName="p-5"/>
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
