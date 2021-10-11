import {Component} from "react";

class Characters extends Component {

  renderCharacters() {
    if(!this.props.characters.length) {
      return (
        <p>No characters found.</p>
      )
    }

    return this.props.characters.map((character, index) => {
      return (
        <article key={index} className="col-6 col-md-3 p-4 mb-2 d-flex flex-column">
          <header>
            <h3 className="text-start">
              {character.name}
            </h3>
          </header>

          <section className="d-flex justify-content-start">
            <button
              className="btn btn-info"
              type="button"
              title="View Character Details"
            >
              Details
            </button>
          </section>
        </article>
      )
    });
  }

  render() {
    return (
      <section className="row">
        {this.renderCharacters()}
      </section>
    )
  }
}

export default Characters;
