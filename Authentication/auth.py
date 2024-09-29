from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_mysqldb import MySQL
from werkzeug.security import generate_password_hash, check_password_hash
import os

auth = Flask(__name__)
CORS(auth)

# MySQL configurations
auth.config['MYSQL_HOST'] = 'localhost'
auth.config['MYSQL_USER'] = 'your_mysql_user'
auth.config['MYSQL_PASSWORD'] = 'your_mysql_password'
auth.config['MYSQL_DB'] = 'your_database_name'

mysql = MySQL(auth)

@auth.route('/index', methods=['POST'])
def signup():
    data = request.json
    username = data['email']
    password = generate_password_hash(data['password'])
    latitude = data.get('latitude')
    longitude = data.get('longitude')

    cursor = mysql.connection.cursor()
    cursor.execute('INSERT INTO users (username, password, latitude, longitude) VALUES (%s, %s, %s, %s)', 
                   (username, password, latitude, longitude))
    mysql.connection.commit()
    cursor.close()

    return jsonify({'message': 'User registered successfully'}), 201

@auth.route('/index', methods=['POST'])
def login():
    data = request.json
    username = data['email']
    password = data['password']

    cursor = mysql.connection.cursor()
    cursor.execute('SELECT password FROM users WHERE username = %s', (username,))
    user = cursor.fetchone()
    cursor.close()

    if user and check_password_hash(user[0], password):
        return jsonify({'message': 'Login successful'}), 200
    else:
        return jsonify({'message': 'Invalid credentials'}), 401

if __name__ == '__main__':
    auth.run(debug=True)
