package org.example.Error;

import org.openqa.selenium.NotFoundException;

public class ContactNotFoundException extends NotFoundException {

    public ContactNotFoundException() {
        super("Il contatto non esiste nella rubrica");
    }

}
