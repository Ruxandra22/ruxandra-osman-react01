import {Button} from "../ui";
import {useSelector} from "react-redux";

export const ProfileForm = () => {
  const { mainColor, secondaryColor, eyeColor } = useSelector(({ profile }) => {
    const { creature } = profile;
    return creature;
  });

  const onSubmit = (event) => {
    event.preventDefault();
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="mb-4 flex justify-between">
        <label htmlFor="mainColor">Main Color</label>
        <input type="color" name="mainColor" id="mainColor" value={mainColor}/>
      </div>

      <div className="mb-4 flex justify-between">
        <label htmlFor="secondaryColor">Secondary Color</label>
        <input type="color" name="secondaryColor" id="secondaryColor" value={secondaryColor}/>
      </div>

      <div className="mb-4 flex justify-between">
        <label htmlFor="eyeColor">Eye Color</label>
        <input type="color" name="eyeColor" id="eyeColor" value={eyeColor}/>
      </div>

      <div className="text-center">
        <Button
          type="submit"
          title="Save"
        >
          Save
        </Button>
      </div>
    </form>
  )
};

export default ProfileForm;
