import stage, { clearStage } from "./stage.js";
import { clearMessages } from "./notification-bar.js";
import { render as renderAddContact} from "./add-contact.js";

const addContactButton = document.querySelector('.add-contact-button');

addContactButton.addEventListener('click', () => {
  clearStage();
  clearMessages();

  stage.append(renderAddContact());
});

export default addContactButton;
