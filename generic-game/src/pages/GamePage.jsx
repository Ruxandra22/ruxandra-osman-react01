import {Creature} from "../components/profile";
import {Button} from "../components/ui";
import {Authorize} from "../components/auth";
import {useDispatch, useSelector} from "react-redux";
import {gameEnded, gameStarted} from "../actions/creators/game";
import {patchGameLost, patchGameWon} from "../actions/creators/profile";
import {useEffect} from "react";

export const GamePage = () => {
  const dispatch = useDispatch();

  // game is the name of the reducer from the reducers file
  const { playing } = useSelector(({ game }) => {
    return game;
  });

  useEffect(() => {
    return () => {
      dispatch(gameEnded());
    }
  }, [dispatch]);

  return (
    <div className="p-4 container flex mx-auto">
      <Authorize>
        <div className="w-full md:w-8/12 mb-2 px-5 flex items-center justify-around">
          {playing ?
            <>
              <Button
                title="Win Game"
                type="button"
                onClick={() => {
                  dispatch(patchGameWon());
                  dispatch(gameEnded());
                }}
              >
                Win Game
              </Button>

              <Button
                title="Lose Game"
                type="button"
                skin="dangerInverted"
                onClick={() => {
                  dispatch(gameEnded());
                }}
              >
                Lose Game
              </Button>

              <Button
                title="Quit"
                type="button"
                skin="danger"
                onClick={() => {
                  dispatch(gameEnded());
                }}
              >
                Quit
              </Button>
            </> :
            <Button
              title="Start Game"
              type="button"
              onClick={() => {
                dispatch(patchGameLost());
                dispatch(gameStarted());
              }}
            >
              Start Game
            </Button>
          }
        </div>

        <div className="w-full md:w-4/12 flex flex-col items-center justify-center">
          <Creature/>
        </div>
      </Authorize>


    </div>
  )
}

export default GamePage;
