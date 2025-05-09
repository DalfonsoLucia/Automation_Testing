import mysql.connector
from Tests.Test_DB.ConfigTest import db_connection


###GET a product from DB
def test_get_product(db_connection):
    connection, cursor = db_connection

    cursor.execute("""SELECT * FROM test_products WHERE name = 'Test Product'""")

    result = cursor.fetchone()

    _, name, price, quantity = result
    print(result)

    assert (name, float(price), quantity) == ('Test Product', 10.99, 5)


###GET ALL products from DB
def test_get_all_product(db_connection):
    connection, cursor = db_connection

    cursor.execute("""SELECT * FROM test_products""")

    results = cursor.fetchall()
    print(results)

    found = False
    for row in results:
        id, name, price, quantity = row
        # Verifica se la riga ha l'id che ti aspetti (ad esempio, id = 4)
        if id == 4:
            found = True
            break

    assert found, "Expected product not found in result set"
    assert len(results) > 0, "No products found"


###POST a product from DB
def test_insert_product(db_connection):
    connection, cursor = db_connection

    cursor.execute("""
            INSERT INTO test_products (name, price, quantity) 
            VALUES ('Test Product_4', 10.99, 5)
        """)

    connection.commit()
    cursor.execute("SELECT name, price, quantity FROM test_products WHERE name = 'Test Product_4'")
    result = cursor.fetchone()

    name, price, quantity = result
    print(result)

    assert (name, float(price), quantity) == ('Test Product_4', 10.99, 5)


###UPDATE a product from DB
def test_update_product(db_connection):
    connection, cursor = db_connection

    cursor.execute("""
        INSERT INTO test_products (name, price, quantity) 
        VALUES ('Update Test_3', 20.00, 10)
    """)
    connection.commit()

    cursor.execute("""
        UPDATE test_products SET price = 25.00 WHERE name = 'Update Test_3'
    """)
    connection.commit()

    cursor.execute("SELECT price FROM test_products WHERE name = 'Update Test_3'")
    result = cursor.fetchone()

    assert result[0] == 25.00


###DELETE a product from DB
def test_delete_product(db_connection):
    connection, cursor = db_connection

    cursor.execute("""
        INSERT INTO test_products (name, price, quantity) 
        VALUES ('Delete Me_1', 5.00, 1)
    """)
    connection.commit()

    cursor.execute("DELETE FROM test_products WHERE name = 'Delete Me_1'")
    connection.commit()

    cursor.execute("SELECT * FROM test_products WHERE name = 'Delete Me_1'")
    result = cursor.fetchone()

    assert result is None
