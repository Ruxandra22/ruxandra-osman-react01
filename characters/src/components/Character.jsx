import {Component} from "react";

const characterDetails = [
  'height',
  'mass',
  'hair_color',
  'skin_color',
  'eye_color',
  'birth_year',
  'gender',
];

class Character extends Component {

  getCharacterDetails() {
    return characterDetails.map((detail, index) => {
      return (
        <tr key={index}>
          <td>{this.editApparance(detail)}</td>
          <td className="bg-dark text-info">
            {this.props.character[detail]}
          </td>
        </tr>
      )
    })
  }

  editApparance(detail) {
    let editedDetail = detail;
    if (detail.includes('_')) {
      editedDetail = detail.replace('_', ' ');
    }
    return editedDetail.charAt(0).toUpperCase() + editedDetail.slice(1);
  }

  render() {
    return (
      <article className="row">
        <div className="col-12 d-flex mb-4 justify-content-between align-items-center">
          <h2>{this.props.character.name}</h2>
          <button
            className="btn btn-info align-self-center"
            title="Back"
            type="button"
            onClick={() => {
              this.props.deselectCharacter()
            }}
          >
            Back
          </button>
        </div>

        <div className="col-12 col-md-8 mt-4 mt-md-0">

          <table className="table table-stripped table-dark">
            <tbody>
              <tr>
                <td>Character Name</td>
                <td>{this.props.character.name}</td>
              </tr>
              {this.getCharacterDetails()}
            </tbody>
          </table>
        </div>
      </article>
    )
  }
}

export default Character;
