import mysql.connector

###CONNECTION
connection = mysql.connector.connect(
    host="localhost",
    port="3306",
    user="root",
    password="Password1234!!",
    database="unode50"
)
print("Connessione stabilita:", connection)

###CREATE DB
if connection is None:
    print("Errore: Connessione non stabilita. Chiama connectionDB() prima di creare il database.")

mycursor = connection.cursor()
mycursor.execute("CREATE DATABASE IF NOT EXISTS test_unoDe50")
connection.commit()
print("Database creato con successo")


###CREATE TABLE
mycursor.execute("""
  CREATE TABLE IF NOT EXISTS test_products (
     id INT AUTO_INCREMENT PRIMARY KEY,
   name VARCHAR(255) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
     quantity INT NOT NULL
  )
""")
connection.commit()
print("Table products creata con successo")

###POST
mycursor.execute("""
 INSERT INTO products (name, price, quantity)
  VALUES
    ('Silver Ring', 49.99, 100),
   ('Silver Bracelet', 79.99, 50),
    ('Silver Necklace', 99.99, 30);
""")
connection.commit()
print("Table popolata con successo")

###GET ALL
mycursor.execute("SELECT * FROM products;")

results = mycursor.fetchall()

if results:
    print(results[0])  # Stampa solo il nome
else:
    print("Nessun risultato trovato")
print(results)

###GET
mycursor.execute("SELECT * FROM products WHERE id = 1;")

results = mycursor.fetchone()

if results:
    print(results[0])  # Stampa solo il nome
else:
    print("Nessun risultato trovato")
print(results)

###UPDATE
mycursor.execute("""UPDATE products SET name = 'Gold Ring' WHERE name = 'Silver Ring' AND id = 4;""")
connection.commit()

mycursor.execute("SELECT * FROM products WHERE name = 'Gold Ring';")
results = mycursor.fetchone()

if results:
    print("Nuovo nome del prodotto:", results[0])  # Stampa solo il nome
else:
    print("Nessun risultato trovato")
print(results)

###DELETE
mycursor.execute("""DELETE from products WHERE name = 'Silver Necklace' AND id = 45;""")
connection.commit()

mycursor.execute("SELECT * FROM products;")
results = mycursor.fetchone()

if results:
    print("Nuovo nome del prodotto:", results[0])  # Stampa solo il nome
else:
    print("Nessun risultato trovato")
print(results)

connection.close()
