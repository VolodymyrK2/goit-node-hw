import fs from 'fs/promises';
import path from 'path';
import { nanoid } from 'nanoid'


const contactsPath = path.join('db', 'contacts.json');

/**
 * Read  JSON
 * @returns{Promise<array>}
 */

export async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath)
    return JSON.parse(data);
  }
  catch (err) {
    console.log(`Something went wrong...${err}`);
  }
}
/**
 * Returns an object with the given id
 * @param {*} contactId
 * @returns{Promise<object>} 
 */
export async function getContactById(contactId) {
  try {
    const contacts = await listContacts(contactsPath);
  const result = contacts.find(contact => contact.id === contactId);
  return result || null;
  }
 catch (err) {
    console.log(`Something went wrong...${err}`);
  }
}
/**
 * Remove an contact with the given id
 * @param {} contactId
 * @returns {Promise<object>} 
 */
export async function removeContact(contactId) {
  try {
   const contacts = await listContacts(contactsPath);

  const index = contacts.findIndex(contact => contact.id === contactId);
  if (index === -1) {
    return null;
  }

  const [result] = contacts.splice(index, 1);

  await fs.writeFile(contactsPath, JSON.stringify(contacts,null,2));
  return result;
 }
  
  catch (err) {
    console.log(`Something went wrong...${err}`);
  }
}

/**
 * Returns the added contact object
 * @param {name, email, phone} 
 * @returns{Promise<object>}
 */

export async function addContact(name, email, phone) {
  try {
    const contacts = await listContacts(contactsPath);

    const id = nanoid();
    const newContact = { id, name, email, phone };
    contacts.push(newContact);

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  
  return newContact;
  }
  
  catch (err) {
    console.log(`Something went wrong...${err}`);
  }
}
