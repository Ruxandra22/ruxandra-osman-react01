import {Component, Fragment} from "react";
import Search from "./components/Search";
import Films from "./components/Films";
import Film from "./components/Film";
import PurchaseFilm from "./components/PurchaseFilm";

const baseUrl = 'https://swapi.dev/api/films';

class App extends Component {

  state = {
    films: [],
    busy: true,
    errorMessage: '',
    hasSearchResults: false,
    selectedFilm: null,
    purchasing: false,
  };

  getFilms() {
    this.setState({
      busy: true,
    });

    // promise chaining
    return fetch(baseUrl).then((response) => {
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
        errorMessage: 'An error has occurred',
        busy: false,
      })
    })
  }

  clearSearchResults = () => {
    this.getFilms().then(() => {
      this.setState({
        hasSearchResults: false,
      })
    })
  }

  renderFilms() {
    return (
      <>
        <h2>Available films</h2>
        <Films
          films={this.state.films}
          selectFilm={(film) => {
            this.setState({
              selectedFilm: film,
            });
          }}
          purchaseFilm={(film) => {
            this.setState({
              selectedFilm: film,
              purchasing: true,
            })
          }}
        />
        {this.state.hasSearchResults ?
          <button
            className="btn btn-warning text-white"
            title="See all movies"
            type="button"
            onClick={this.clearSearchResults}
          >
            See all movies
          </button>
          :
          <></>
        }
      </>
    )
  }

  renderFilm() {
    return <Film
      film={this.state.selectedFilm}
      deselectFilm={() => {
        this.setState({
          selectedFilm: null,
        })
      }}
      purchaseFilm={() => {
        this.setState({
          purchasing: true,
        })
      }}
    />
  }

  renderMainScreen() {
    if (this.state.busy) {
      return <>...loading</>
    }

    if (!this.state.busy && this.state.errorMessage) {
      return <>{this.state.errorMessage}</>
    }

    if (this.state.purchasing) {
      return <PurchaseFilm
        film={this.state.selectedFilm}
        cancelPurchase={() => {
          this.setState({
            purchasing: false,
            selectedFilm: null,
          })
        }}
      />
    }

    return this.state.selectedFilm !== null ? this.renderFilm() : this.renderFilms();
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
            <Search
              onSearchResults={(films) => {
                this.setState({
                  films,
                  hasSearchResults: true,
                  selectedFilm: null,
                })
              }}
              placeholder={'Choose a SW movie'}
            />
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
