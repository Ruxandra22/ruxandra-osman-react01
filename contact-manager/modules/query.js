import {contacts} from "./data.js";

export const findContact = (needle = 'query') => {
  return contacts.filter((contact) => {
    const values = Object.values(contact);
    // [1, 'Larry', 'Larryson' ...]

    const haystack = values.reduce((string, value) => {
      if (typeof value === 'string') {
        string += value.toLowerCase();
      }
      return string;
    }, '');

    // haystack will contain 'larrylarrysonlarry@yahoo.com'
    if (haystack.includes(needle)) {
      return true;
    }

    return false;
  });
}

export const getContact = (contactId) => {
  contactId = Number(contactId);

  // find stops at the first found id
  return contacts.find(({ id }) => {
    return contactId === id
  });
}

export const deleteContact = (contactId) => {
  let contactIndex = -1;
  contactId = Number(contactId);

  for (let i = 0; i < contacts.length; i++) {
    const { id } = contacts[i];

    if (id === contactId) {
      contactIndex = i;
    }
  }

  if (contactIndex >= 0) {
    contacts.splice(contactIndex, 1);
  }
}

export const editContact = (contactId, payload) => {
  let contactIndex = -1;
  contactId = Number(contactId);

  for (let i = 0; i < contacts.length; i++) {
    const contact = contacts[i];
    const id = contact.id;

    if ( id === contactId) {
      contactIndex = i;
    }

    if (contactIndex >= 0) {
      payload.id = Number(payload.id);
      contacts[contactIndex] = payload;
    }
  }
};

export const addContact = (contact) => {
  contacts.push(contact);
};
