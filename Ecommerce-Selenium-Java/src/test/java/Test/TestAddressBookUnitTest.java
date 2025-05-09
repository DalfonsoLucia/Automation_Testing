package Test;

import org.example.Model.AddressBook;
import org.example.Error.ContactNotFoundException;
import org.junit.Test;
import org.junit.jupiter.api.DisplayName;

import static org.junit.Assert.*;

public class TestAddressBookUnitTest {

    private final int ID = 4;

    private final String NAME = "Pippo Pippa";

    private final String NEW_ADDRESS = "Via le Dita dal Naso 5";

    private final String NEW_PHONE_NUMBER = "166 10 10 10";

    @Test
    @DisplayName("Controllare che l'aggiunta di un nuovo utente vada a buon fine")
    public void testAddContact() {

        AddressBook contacts = new AddressBook();
        contacts.addContact(ID,NAME, NEW_ADDRESS, NEW_PHONE_NUMBER);

        assertTrue(contacts.getContacts().containsKey("4"));
    }

    @Test
    @DisplayName("Controllare che la modifica dell'utente appena aggiunto vada a buon fine")
    public void testModifyContact() {

        AddressBook contacts = new AddressBook();
        contacts.addContact(ID,NAME, NEW_ADDRESS, NEW_PHONE_NUMBER);

        contacts.modifyContact(ID, NAME, NEW_ADDRESS, "166 123456");

        assertEquals("166 123456", contacts.getContact(ID).getPhoneNumber());

    }

//    @Test
//    @DisplayName("Controllare che la rimozione dell'utente appena modificato vada a buon fine")
//    public void testRemoveContact() {
//
//        AddressBook contacts = new AddressBook();
//        contacts.addContact(ID,NAME, NEW_ADDRESS, NEW_PHONE_NUMBER);
//
//        contacts.modifyContact(ID, NAME, NEW_ADDRESS, "166 123456");
//
//        contacts.removeContact(ID);
//
//        Exception exception = assertThrows(ContactNotFoundException.class, () -> {
//            contacts.getContact(ID);
//        });
//
//        assertTrue(exception.getMessage().contains("Il contatto non esiste nella rubrica"));
//
//    }

    @Test(expected = ContactNotFoundException.class)
    @DisplayName("Controllare che la rimozione dell'utente appena modificato vada a buon fine")
    public void testRemoveContact() {

        AddressBook contacts = new AddressBook();
        contacts.addContact(ID,NAME, NEW_ADDRESS, NEW_PHONE_NUMBER);

        contacts.modifyContact(ID, NAME, NEW_ADDRESS, "166 123456");

        contacts.removeContact(ID);

        contacts.getContact(ID);

    }

    @Test
    @DisplayName("Controllare che la modifica di un utente inesistente ritorni errore")
    public void testModifyNonExistentUserWithError() {

        AddressBook contacts = new AddressBook();

        contacts.addContact(ID,NAME, NEW_ADDRESS, NEW_PHONE_NUMBER);

        assertThrows(ContactNotFoundException.class, () -> {
            contacts.modifyContact(0, NAME, NEW_ADDRESS, "0854455987");
        });

    }

    @Test
    @DisplayName("Controllare che la rimozione di un utente inesistente ritorni errore")
    public void testRemoveContactNonExistentUserWithError() {

        AddressBook contacts = new AddressBook();

        contacts.addContact(ID,NAME, NEW_ADDRESS, NEW_PHONE_NUMBER);

        assertThrows(ContactNotFoundException.class, () -> {
            contacts.removeContact(0);
        });
    }

}
