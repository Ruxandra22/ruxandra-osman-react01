import {Component, Fragment} from "react";
import Search from "./components/Search";
import Characters from "./components/Characters";
import Character from "./components/Character";

const baseUrl = 'https://swapi.dev/api/people';

class App extends Component {

  state = {
    characters: [],
    busy: true,
    errorMessage: '',
    selectedCharacter: null,
    hasSearchResults: false,
  }

  getCharacters() {
    this.setState({
      busy: true,
    });

    return fetch(baseUrl).then((response) => {
      if(response.status === 404) {
        throw new Error('404 Not Found');
      }
      return response.json();
    }).then(({results}) => {
      this.setState({
        characters: results,
        busy: false,
      })
    }).catch((error) => {
      this.setState({
        busy: false,
        errorMessage: 'An error has occurred',
      })
    })
  }

  clearSearchResults = () => {
    this.getCharacters().then(() => {
      this.setState({
        hasSearchResults: false,
      })
    })
  }

  renderCharacters() {
    return(
      <>
        <h2 className="text-info">Star Wars Characters</h2>
        <Characters
          characters={this.state.characters}
          selectCharacter={(character) => {
            this.setState({
              selectedCharacter: character,
            })
          }}
        />
        {this.state.hasSearchResults &&
          <button
            className="btn btn-outline-info"
            title="See all characters"
            type="button"
            onClick={this.clearSearchResults}
          >
            See all characters
          </button>
        }
      </>
    )
  }

  renderCharacter() {
    return (
      <Character
        character={this.state.selectedCharacter}
        deselectCharacter={() => {
          this.setState({
            selectedCharacter: null,
          })
        }}
      >
      </Character>
    )
  }

  renderMain() {
    return this.state.selectedCharacter ? this.renderCharacter() : this.renderCharacters();
  }

  setSearchResult = (characters) => {
    this.setState({
      characters,
      selectedCharacter: null,
      hasSearchResults: true,
    })
  }

  componentDidMount() {
    this.getCharacters();
  }

  render() {
    return (
      <Fragment>
        <header className="navbar-expand-md navbar-dark fixed-top bg-dark">
          <nav className="container d-flex justify-content-between">
            <h1
              className="display-6"
              onClick={() => {
                this.setState({
                  selectedCharacter: null,
                })
                this.getCharacters();
              }}
              style={{cursor: "pointer"}}
            >
              Movie Characters
            </h1>
            <Search
              onSearchResults={this.setSearchResult}
            />
          </nav>
        </header>

        <main className="container mt-5 pt-5 text-dark">
          {this.renderMain()}
        </main>
      </Fragment>
    )
  }
}

export default App;
