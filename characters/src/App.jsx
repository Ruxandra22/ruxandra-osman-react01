import {Component, Fragment} from "react";
import Search from "./components/Search";
import Characters from "./components/Characters";

const baseUrl = 'https://swapi.dev/api/people';

class App extends Component {

  state = {
    characters: [],
    busy: true,
    errorMessage: '',
  }

  getCharacters() {
    this.setState({
      busy: true,
    });

    fetch(baseUrl).then((response) => {
      if(response.status === 404) {
        throw new Error('404 Not Found');
      }
      return response.json();
    }).then(({results}) => {
      console.log(results);
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

  renderCharacters() {
    return(
      <>
        <h2 className="text-info">Star Wars Characters</h2>
        <Characters characters={this.state.characters}/>
      </>
    )
  }

  renderMain() {
    return this.renderCharacters();
  }

  setSearchResult = (characters) => {
    this.setState({
      characters,
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
            <h1 className="display-6">Movie Characters</h1>
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
