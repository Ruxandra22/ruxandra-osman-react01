import {useEffect} from "react";
import {useHistory} from "react-router-dom";
import {useAuth} from "../hooks";
import {ProfileForm} from "../components/profile";
import {FiMail, FiUserCheck} from "react-icons/all";
import {Button} from "../components/ui";
import {useDispatch} from "react-redux";
import {requestDeleteUserStats} from "../actions/creators/auth";

export const ProfilePage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { user, authenticated, established } = useAuth();

  useEffect(() => {
    if (!authenticated && established) {
      history.push('/');
    }
  }, [authenticated, history, established]);

  return (
    <div className="container mx-auto p-4">
      <header>
        <h1 className="text-3xl bold">
          Profile
        </h1>
      </header>

      {user &&
        <section className="flex justify-between flex-wrap mt-8">
          <div className="w-full md:w-8/12">
            <h2 className="text-xl bold">
              User info
            </h2>
            <div className="flex flex-col md:flex-row justify-between mt-8">
              <picture className="mr-8 inline-block rounded-full self-center overflow-hidden shadow mb-4 md:mb-0">
                <img src={user.avatar} alt={`${user.firstName} ${user.lastName}`}/>
              </picture>
              <ul className="border rounded-md shadow flex-grow">
                <li className="border-b p-3 flex">
                  <FiUserCheck className="mr-2"/>
                  {`${user.firstName} ${user.lastName}`}
                </li>
                <li className="border-b p-3 flex">
                  <FiMail className="mr-2"/>
                  {user.email}
                </li>
              </ul>
            </div>
          </div>
        </section>
      }

      {established ? (
        <section className="mt-4 md:w-1/4 md:mt-12 mx-auto">
          <ProfileForm/>
        </section>
      ) : (
        '...logging you in'
      )}

      <section className="grid justify-items-center mt-32">
        <Button
          skin="danger"
          type="button"
          title="Delete my account"
          onClick={() => {
            dispatch(requestDeleteUserStats(user))
          }}
        >
         Delete my account
        </Button>
      </section>
    </div>
  )
};

export default ProfilePage;
