package Test;

import io.restassured.http.ContentType;
import io.restassured.response.Response;
import org.apache.http.HttpStatus;
import org.example.modelForAPI.UserJSONDTO;
import org.junit.jupiter.api.Test;
import java.util.List;
import java.util.logging.Logger;

import static io.restassured.RestAssured.given;
import static java.util.Optional.empty;
import static org.hamcrest.CoreMatchers.not;
import static org.hamcrest.CoreMatchers.notNullValue;

class TestAPIRestAssured {
    private static final Logger logger = Logger.getLogger(TestSelenium.class.getName());

    @Test
    void testPostman1() {

        // 1 - Get - Recuperare le informazioni dall'URL: https://jsonplaceholder.typicode.com/users
        Response response = given()
                .when()
                .get("https://jsonplaceholder.typicode.com/users");

        var respGet1 = response.asPrettyString(); // UTILE PER AVERE UN PUNTO DI DEBUG CON CIO' CHE ABBIAMO NELLA RESPONSE

        response
                .then()
                .assertThat()
                .statusCode(HttpStatus.SC_OK)
                .body(not(empty()))
                .body("id", notNullValue());
    }

    @Test
    void testPostman2() {

        // 1 - Get - Recuperare le informazioni dall'URL: https://jsonplaceholder.typicode.com/users
        Response response = given()
                .when()
                .get("https://jsonplaceholder.typicode.com/users");

        var respGet1 = response.asPrettyString(); // UTILE PER AVERE UN PUNTO DI DEBUG CON CIO' CHE ABBIAMO NELLA RESPONSE

        response
                .then()
                .assertThat()
                .statusCode(HttpStatus.SC_OK)
                .body(not(empty()))
                .body("id", notNullValue());

        // Converto la response in una lista di oggetti UserJSONDTO creata nel package Model
        List<UserJSONDTO> users = response.jsonPath().getList("", UserJSONDTO.class);

        //Recuperiamo l'utente con ID 1 dalla lista che vogliamo modificare
        UserJSONDTO userToModify = users.stream().filter(user -> user.getId() == 1).findFirst().orElse(null);

// CREIAMO UNA NUOVA LISTA DOVE AGGIUNGERE L'UTENTE MODIFICATO PERCHE' LA PRINCIPALE NON POSSIAMO MODIFICARLA
//        List<UserJSONDTO> userList = new ArrayList<>(users);

        //Aggiungiamo l'utente modificato con un nuovo ID alla lista degli utenti
        UserJSONDTO newUser = new UserJSONDTO();
        newUser.setId(users.size()+1);
        newUser.setName("Gianfilippo Bellissimo");
        newUser.setUsername(userToModify.getUsername());
        newUser.setEmail(userToModify.getEmail());
        newUser.setAddress(userToModify.getAddress());
        newUser.setPhone(userToModify.getPhone());
        newUser.setWebsite(userToModify.getWebsite());
        newUser.setCompany(userToModify.getCompany());

        // Eseguire una POST request all'endpoint https://jsonplaceholder.typicode.com/users con il nuovo oggetto utente
        Response postResponse = given()
                .contentType(ContentType.JSON)
                .body(newUser)
                .when()
                .post("https://jsonplaceholder.typicode.com/users");

        // Verificare che la risposta sia "Created" con il codice 201
        postResponse
                .then()
                .assertThat()
                .statusCode(HttpStatus.SC_CREATED)
                .body("id", notNullValue());


        System.out.println("Codice di stato della risposta: " + postResponse.getStatusCode());

        System.out.println("Contenuto di postResponse: \n" + postResponse.prettyPrint());

        // Estrarre l'ID dell'elemento appena creato dalla response
        String newUserId = postResponse.jsonPath().getString("id");
        System.out.println("New user ID created: " + newUserId);

// AGGIUNGIAMO L'ELEMENTO CREATO ALLA NUOVA LISTA
//        // Recuperare la response del POST request come oggetto UserJSONDTO
//        UserJSONDTO createdUser = postResponse.as(UserJSONDTO.class);
//
//        // Aggiungiamo l'utente creato alla lista degli utenti
//        users.add(createdUser);

//        userList.add(newUser);
//
//        // Utilizziamo la libreria "Jackson" per convertire il JSON in una stringa formattata
//        ObjectMapper mapper = new ObjectMapper();
//        mapper.enable(SerializationFeature.INDENT_OUTPUT);
//        ObjectWriter writer = mapper.writerWithDefaultPrettyPrinter();
//        String jsonListUsers = writer.writeValueAsString(userList);
//        System.out.println(jsonListUsers);

//        System.out.println(users);

    }

    @Test
    void testPostman3() {

        //Parametrizzare l'URL: https://jsonplaceholder.typicode.com/users dandogli valore "url"
        String url = "https://jsonplaceholder.typicode.com";
        String endpoint = "/users";

        given()
                .when()
                .get(url)
                .then()
                .statusCode(HttpStatus.SC_OK);

        //Nella barra di postman richiamare quindi "url"
        Response response = given()
                .when()
                .get(url + endpoint);

        //Controllare che i risultati siano stati recuperati
        var respParamGet = response.asPrettyString(); // UTILE PER AVERE UN PUNTO DI DEBUG CON CIO' CHE ABBIAMO NELLA RESPONSE
        System.out.println("url richiamato correttamente!: " + respParamGet);

    }

//    TEST 4 - POSTMAN VEDI SU POSTMAN
//    Creare una collection postman e come nome dargli "Test Postman"
//    Salvare nella collection i test 2 e 3 compresivi di check
//    Iterare la collection per 5 volte con un delay di 5000ms


}

