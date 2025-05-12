import pytest
import mysql.connector


@pytest.fixture
def db_connection():
    """Create DB connection"""
    connection = mysql.connector.connect(
        host="localhost",
        port="3306",
        user="root",
        password="Password1234!!",
        database="test_unoDe50"
    )
    cursor = connection.cursor()
    yield connection, cursor
    ###connection.rollback()  # annulla ogni modifica dopo ogni test
    cursor.close()
    connection.close()
