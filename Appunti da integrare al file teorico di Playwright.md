#APPUNTI

## Cos'è una Promise?

Una Promise è un oggetto che rappresenta il risultato (futuro) di un'operazione asincrona.
In pratica, è come dire: "Sto facendo qualcosa che richiederà tempo (es. leggere un file, aspettare una risposta dal server, caricare una pagina). Ti prometto che ti darò un risultato appena sarà pronto."

### Una Promise ha 3 stati:
**pending** → in attesa

**fulfilled** → completata con successo

**rejected** → fallita con un errore

### Quando una funzione restituisce una Promise?
Quasi tutte le funzioni asincrone, come:

fetch() per fare richieste HTTP

page.goto() in Playwright

fs.promises.readFile() per leggere file

locator.innerText() in Playwright

## Come trattare i campi soggetti a iframe con Plywright

Cosa sta succedendo:

```javascript
page.locator('iframe[title="Iframe per il numero di carta"]').fill("1234567890123456")
```

sta tentando di scrivere direttamente nell’iframe, ma un iframe non è un campo di input – è un contenitore per un'altra pagina HTML.

### Soluzione con Playwright:
- Accedi all’iframe

- Recupera il campo all’interno

- Esegui fill() sull’input interno

**Soluzione**
```javascript

// 1. Recupera il frame (puoi usare il titolo o il selettore CSS)
const frame = await page.frameLocator('iframe[title="Iframe per il numero di carta"]');

// 2. Seleziona l'input all'interno del frame e fai il fill
await frame.locator('input').fill('1234567890123456');
```
Se ci sono più input (es. numero carta, scadenza, CVC), dovrai trovare i selettori giusti per ciascuno.

### Perché usare frameLocator()?
***page.frameLocator()*** è il modo ufficiale e consigliato da Playwright per interagire con elementi dentro iframe.

È più stabile di page.frame(...) perché supporta chaining dei metodi come locator().fill()

### Bonus: se vuoi farlo per tutti i campi Adyen

Adyen solitamente ha più iframe: uno per ogni campo (cardNumber, expiryDate, cvc, ...). Dovrai trattarli uno a uno:

```javascript

await page.frameLocator('iframe[title="Iframe per il numero di carta"]').locator('input').fill('1234123412341234');
await page.frameLocator('iframe[title="Iframe per la data di scadenza"]').locator('input').fill('0330');
await page.frameLocator('iframe[title="Iframe per il codice di sicurezza (CVC)"]').locator('input').fill('123');
```

**Ricorda!** I titoli possono variare a seconda della lingua o configurazione: controlla l’attributo title nel DOM per ogni iframe.



