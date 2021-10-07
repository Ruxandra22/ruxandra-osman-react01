import {Component, Fragment} from "react";
import Search from "./components/Search";

const baseUrl = 'https://swapi.dev/api/films';

class App extends Component {

  state = {
    films: [],
    busy: false,
    errorMessage: '',
  };

  getFilms() {
    this.setState({
      busy: true,
    });

    // promise chaining
    fetch(baseUrl).then((response) => {
      if(response.status === 404) {
        throw new Error('404');
      }

      return response.json();
    }).then(({ results }) => {
      this.setState({
        films: results,
        busy: false,
      })
    }).catch(() => {
      this.setState({
        errorMessage: 'An error has occured',
        busy: false,
      })
    })
  }

  renderFilms() {
    return this.state.films.map((film) => {
      return (
        <p key={film.episode_id}>{film.title}</p>
      )
    })
  }

  renderMainScreen() {
    if (this.state.busy) {
      // another syntax for Fragment
      return <>...loading</>
    }

    if (!this.state.busy && this.state.errorMessage) {
      return <>{this.state.errorMessage}</>
    }
    return this.renderFilms();
  }

  componentDidMount() {
    this.getFilms();
  }

  render() {
    return (
      <Fragment>
        <header className="navbar-expand-md navbar-dark fixed-top bg-dark">
          <nav className="container d-flex justify-content-between">
            <h1 className="display-6 text-warning">Swapi Cinema</h1>
            <Search/>
          </nav>
        </header>

        <main className="container mt-5 pt-5">
          {this.renderMainScreen()}
        </main>
      </Fragment>
    )
  }
}

export default App;
