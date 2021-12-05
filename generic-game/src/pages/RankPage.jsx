import {UserStats} from "../components/profile";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {getUser, getUsers} from "../actions/creators/auth";
import {useUsers} from "../hooks";
import {Loader} from "../components/ui";

export const RankPage = ({match}) => {

  const dispatch = useDispatch();
  const userId = match.params.id;

  const { entities: users, established} = useUsers();

  useEffect(() => {
    if (!established) {
      dispatch(getUsers());
    }
    dispatch(getUser(userId));
  }, [dispatch, userId, established]);

  return (
    <div className="mx-auto p-4 container">
      {established ? [
        <header>
          <h1 className="text-3xl bold">
            User rank
          </h1>
        </header>,

        <section className="mt-8">
          <UserStats {...users[userId].stats}/>
        </section>
      ]:
        <Loader/>
      }
    </div>
  )
}

export default RankPage;
