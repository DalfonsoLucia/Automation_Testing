package org.example.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.Error.ContactNotFoundException;
import java.util.logging.Logger;

import java.util.HashMap;
import java.util.Map;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class AddressBook {

    Logger logger = Logger.getLogger(AddressBook.class.getName());

    private Map<String, User> contacts = new HashMap<>();

    public void addInitialContacts() {
        addContact(1, "Mario Rossi", "Via Roma 1", "1234567890");
        addContact(2,"Luigi Verdi", "Via Milano 2", "0987654321");
        addContact(3,"Giovanni Bianchi", "Via Napoli 3", "4567890123");
    }

    public void addContact(int id, String name, String address, String phoneNumber) {
        if (contacts.containsKey(String.valueOf(id))) {
            logger.info("Il contatto esiste già nella rubrica");
        } else {
            User user = new User(id, name, address, phoneNumber);
            contacts.put(String.valueOf(id), user);
            logger.info("Contatto aggiunto alla rubrica");
        }
    }

    public User getContact(int id) throws ContactNotFoundException {
        if (contacts.containsKey(String.valueOf(id))) {
            return contacts.get(String.valueOf(id));
        } else {
            logger.info("Contatto non presente");
            throw new ContactNotFoundException();
        }
    }

    public void removeContact(int id) throws ContactNotFoundException {
        if (contacts.containsKey(String.valueOf(id))) {
            contacts.remove(String.valueOf(id));
            logger.info("Rimosso il contatto " + id);
        } else {
            logger.info("Contatto non presente");
            throw new ContactNotFoundException();
        }
    }

    public void modifyContact(int id, String newName, String newAddress, String newPhoneNumber) throws ContactNotFoundException {
        if (contacts.containsKey(String.valueOf(id))) {
            User user = contacts.get(String.valueOf(id));
            user.setName(newName);
            user.setAddress(newAddress);
            user.setPhoneNumber(newPhoneNumber);
            logger.info("Il contatto è stato modificato");
        } else {
            logger.info("Contatto non presente");
            throw new ContactNotFoundException();
        }
    }

}

