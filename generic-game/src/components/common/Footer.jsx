import {Link, NavLink} from "react-router-dom";
import {useAuth} from "../../hooks";

export const Footer = () => {
  const { user, authenticated, established } = useAuth();

  return <footer className="border border-top p-4">
    <div className="container mx-auto">
      <section className="flex justify-between">
        <header>
          <h1>
            <Link
              to={"/"}
              title="Homepage"
              className="uppercase"
            >
              WORD GAME
            </Link>
          </h1>
          <p className="text-xs">Crafted by Pixellab</p>
        </header>

        <ul>
          {authenticated && established &&
            <li>
              <NavLink
                to="/profile"
                title={`Hello, ${user.firstName}! Go to profile`}
                className="font-bold"
                activeClassName="text-red-500"
              >
                Profile
              </NavLink>
            </li>
          }
          <li>
            <NavLink
              to="/play"
              title="Play Now"
              className="font-bold"
              activeClassName="text-red-500"
            >
              Play
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/ranks"
              title="See users"
              className={(isActive) => {
                return `${isActive ? 'text-red-500' : ''} font-bold`
              }}
            >
              Ranks
            </NavLink>
          </li>

        </ul>
      </section>
    </div>
  </footer>
};

export default Footer;
