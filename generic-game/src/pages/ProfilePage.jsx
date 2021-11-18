import {useEffect} from "react";
import {useHistory} from "react-router-dom";
import {useAuth} from "../hooks";
import {ProfileForm} from "../components/profile";

export const ProfilePage = () => {
  const history = useHistory();
  const { authenticated, established } = useAuth();

  useEffect(() => {
    if (!authenticated && established) {
      history.push('/');
    }
  }, [authenticated, history, established]);

  return (
    <div className="container mx-auto p-4">
      <header>
        <h1></h1>
      </header>

      <section className="flex justify-between flex-wrap mt-8">
        <div className="w-full md:w-8/12">
          {/*create UserProfile component and populate it with info from the store */}
        </div>
      </section>

      <section className="mt-4 md:w-1/4 md:mt-12 mx-auto">
        <ProfileForm/>
      </section>
    </div>
  )
};

export default ProfilePage;
