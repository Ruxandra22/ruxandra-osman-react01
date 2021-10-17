import {Component} from "react";

const baseUrl = 'https://swapi.dev/api/people';

class Search extends Component {

  state = {
    busy: false,
    searchTerm: '',
  }

  onSubmit = (event) => {
    event.preventDefault();
    this.setState({
      busy: true,
    })

    const url = `${baseUrl}?search=${this.state.searchTerm}`;

    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then(({ results }) => {
        this.setState({
          busy: false,
          searchTerm: '',
        })
        this.props.onSearchResults(results);
      })
  }

  onInputChange = (event) => {
    this.setState({
      searchTerm: event.target.value,
    })
  }

  render() {
    return (
      <form className={this.props.customStyle} onSubmit={this.onSubmit}>
        <input
          type="text"
          className="form-control me-2 align-self-center"
          name="q"
          placeholder="Search..."
          value={this.state.searchTerm}
          onChange={this.onInputChange}
          required
        />

        <button
          type="submit"
          className="btn btn-outline-info"
          title="Search"
        >
          Search
        </button>
      </form>
    )
  }
}

export default Search;
