import {Link} from "react-router-dom";
import {ImUser} from "react-icons/all";
import {useAuth, useUsers} from "../../hooks";

export const Users = () => {

  const { entities: users } = useUsers();

  const { user, authenticated, established } = useAuth();

  if (Object.entries(users).length <= 0) {
    return <>No users</>;
  }

  return (
    <ul className="border rounded-md shadow">
      { authenticated && established &&
        Object.values(users).map(({id: userId, stats}) => {
          return <li className={`border-b p-3 ${userId === user.id ? 'bg-green-100' : ''}`} key={userId}>
            <Link
              to={`${userId === user.id ? '/profile' : `/ranks/${userId}`}`}
              className="flex justify-between items-center"
            >
              <ImUser/>

              <span className="truncate inline-block w-32">
                  {userId}
                </span>

              <span>
                  Games played: {stats.gamesPlayed}
                </span>
            </Link>
          </li>
        })
      }
    </ul>
  )
};

export default Users;
