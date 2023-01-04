const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "./contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
};

const getContactById = async (contactId) => {
  const data = await listContacts();
  const contactByID = await data.find((item) => item.id === contactId.toString());
  return contactByID;
};

const removeContact = async (contactId) => {
  const data = await listContacts();
  const indx = await data.findIndex((item) => item.id === contactId.toString());
  if (indx === -1) {
    return null;
  }
  const removeItem = data.splice(indx, 1);
  const newContacts = await data.filter((item) => item.id !== contactId);
  await fs.writeFile(contactsPath, JSON.stringify(newContacts));

  return removeItem;
};

const addContact = async (body) => {
  const id = nanoid();
  const newContact = {
    id,
    ...body,
  };
  console.log(`new`, newContact);
  const data = await listContacts();
  data.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(data));
  return newContact;
};

const updateContact = async (contactId, body) => {
  const newContact = {
    ...body,
  };
  const data = await listContacts();
  data.forEach((element) => {
    if (element.id === contactId) {
      element = newContact;
    }
  });
  await fs.writeFile(contactsPath, JSON.stringify(data));
  return newContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
