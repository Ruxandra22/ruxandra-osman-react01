import {UserStats} from "../components/profile";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getUser} from "../actions/creators/auth";

export const RankPage = ({match}) => {

  const dispatch = useDispatch();
  const userId = match.params.id;

  const { established, user } = useSelector(({users}) => {
    return {
      established: users.established,
      user: users.entities[userId],
    }
  });

  useEffect(() => {
    dispatch(getUser(userId));
  }, [dispatch, userId]);

  // TODO: delete this
  if (!user) {
    return <></>
  }

  return (
    <div className="mx-auto p-4 container">
      <header>
        <h1 className="text-3xl bold">
          User rank
        </h1>
      </header>

      <section>
        {/*TODO: spinner until the stats are loaded (with established)*/}
        <UserStats {...user.stats}/>
      </section>
    </div>
  )
}

export default RankPage;
