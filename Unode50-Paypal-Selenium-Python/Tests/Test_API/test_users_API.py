import json
import requests


###GET
def test_get_user_by_id():
    url = "https://jsonplaceholder.typicode.com/users/1"
    response = requests.get(url)

    ### Verify Status Code
    assert response.status_code == 200

    ### Verify Headers
    assert response.headers["Content-Type"] == "application/json; charset=utf-8"

    # Verify response structure
    data = response.json()
    assert isinstance(data, dict)
    assert "id" in data
    assert "name" in data
    assert "username" in data
    print(data)


###GET ALL
def test_get_all_users():
    url = "https://jsonplaceholder.typicode.com/users/"
    response = requests.get(url)

    ### Verify Status Code
    assert response.status_code == 200

    ### Verify Headers
    assert response.headers["Content-Type"] == "application/json; charset=utf-8"

    data = response.json()

    assert isinstance(data, list)

    for user in data:
        assert isinstance(user, dict), f"L'elemento {user} non è un dizionario"
    assert "id" in user, f"ID mancante nell'utente {user}"
    assert "name" in user, f"Name mancante nell'utente {user}"
    assert "username" in user, f"Username mancante nell'utente {user}"
    results_json = json.dumps(data, indent=4)
    print(results_json)


###POST
def test_create_user():
    url = "https://jsonplaceholder.typicode.com/users"
    new_user = {
        "id": 11,
        "name": "Elliot Reid",
        "username": "Elly",
        "email": "Ell@april.biz",
        "address": {
            "street": "Blv. Sunset",
            "suite": "Apt. 560",
            "city": "New York",
            "zipcode": "92998-3874",
            "geo": {
                "lat": "-37.3159",
                "lng": "81.1496"
            }
        },
        "phone": "1-770-736-8031 x56450",
        "website": "hildegard.org",
        "company": {
            "name": "Secret-Heart",
            "catchPhrase": "Multi-layered client-server neural-net",
            "bs": "harness real-time e-markets"
        }
    }
    response = requests.post(url, json=new_user)

    assert response.status_code == 201
    assert response.headers["Content-Type"] == "application/json; charset=utf-8"

    data = response.json()
    assert "id" in data
    assert data["name"] == "Elliot Reid"
    assert data["username"] == "Elly"
    results_json = json.dumps(data, indent=4)
    print(results_json)


###PUT
def test_update_user():
    url = "https://jsonplaceholder.typicode.com/users/1"
    user_id = 1
    update_user = {
        "name": "Elliot Reid",
        "username": "Elly",
        "email": "Ell@april.biz",
        "address": {
            "street": "Blv. Sunset",
            "suite": "Apt. 560",
            "city": "New York",
            "zipcode": "92998-3874",
            "geo": {
                "lat": "-37.3159",
                "lng": "81.1496"
            }
        },
        "phone": "1-770-736-8031 x56450",
        "website": "hildegard.org",
        "company": {
            "name": "Secret-Heart",
            "catchPhrase": "Multi-layered client-server neural-net",
            "bs": "harness real-time e-markets"
        },
    }
    response = requests.put(url, json=update_user)

    assert response.status_code == 200
    assert response.headers["Content-Type"] == "application/json; charset=utf-8"

    data = response.json()
    assert data["id"] == user_id
    assert data["name"] == update_user["name"]
    assert data["username"] == update_user["username"]
    results_json = json.dumps(data, indent=4)
    print(results_json)


###DELETE
def test_delete_user():
    user_id = 10
    url = f"https://jsonplaceholder.typicode.com/users/{user_id}"

    response_get = requests.get(url)

    if response_get.status_code != 200:
        print(f"L'utente con ID {user_id} non esiste.")
        return

    response_delete = requests.delete(url)

    assert response_delete.status_code == 200
    assert response_delete.text == "{}"

    print(f"Utente eliminato con successo")
