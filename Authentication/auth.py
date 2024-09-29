from flask import Flask, render_template, request, redirect, url_for, flash, session, jsonify
import mysql.connector
from mysql.connector import Error
from bcrypt import hashpw, gensalt, checkpw

app = Flask(__name__)
app.secret_key = 'your_secret_key'  # Required for session management

# Database connection function for MySQL
def get_db_connection():
    try:
        conn = mysql.connector.connect(
            host='localhost',  # Change if your MySQL is hosted elsewhere
            user='root',       # Replace with your MySQL username
            password='your_mysql_password',  # Replace with your MySQL password
            database='your_database_name'  # Replace with your MySQL database name
        )
        return conn
    except Error as e:
        print(f"Error: {e}")
        return None

# Register Route
def register():
    data = request.json
    username = data['username']
    password = data['password']
    latitude = data['latitude']
    longitude = data['longitude']

    # Hash the password
    hashed_pw = hashpw(password.encode('utf-8'), gensalt())

    # Save to database
    conn = get_db_connection()
    if conn is None:
        return jsonify({'message': 'Database connection failed.'}), 500
    try:
        cursor = conn.cursor()
        cursor.execute("INSERT INTO users (username, password, latitude, longitude) VALUES (%s, %s, %s, %s)",
                       (username, hashed_pw, latitude, longitude))
        conn.commit()
        return jsonify({'message': 'Registration successful!'}), 200
    except mysql.connector.IntegrityError:
        return jsonify({'message': 'Username already exists. Try a different one.'}), 400
    finally:
        cursor.close()
        conn.close()

# Login Route
@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    username = data['username']
    password = data['password']

    # Check credentials
    conn = get_db_connection()
    if conn is None:
        return jsonify({'message': 'Database connection failed.'}), 500
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM users WHERE username = %s", (username,))
    user = cursor.fetchone()
    cursor.close()
    conn.close()

        if user is None or not checkpw(password.encode('utf-8'), user['password'].encode('utf-8')):
        return jsonify({'message': 'Invalid username or password.'}), 401

    # Set session if login is successful
    session['username'] = username
    return jsonify({'message': 'Logged in successfully!', 'username': username}), 200


@app.route('/dashboard')
def dashboard():
    if 'username' not in session:
        flash('Please login first.')
        return redirect(url_for('login'))
    
    # Retrieve user's location from database
    conn = get_db_connection()
    if conn is None:
        flash('Database connection failed.')
        return redirect(url_for('login'))
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT latitude, longitude FROM users WHERE username = %s", (session['username'],))
    user = cursor.fetchone()
    cursor.close()
    conn.close()

    if user:
        return jsonify({
            'message': f'Welcome, {session["username"]}!',
            #'latitude': user['latitude'],
            #'longitude': user['longitude']
        })
    else:
        return jsonify({'message': 'User not found.'}), 404

# Logout Route
@app.route('/logout')
def logout():
    session.pop('username', None)
    flash('You have been logged out.')
    return redirect(url_for('login'))

@app.route('/')  # This handles the root URL
def index():
    return redirect(url_for('login'))

# Handle favicon error
@app.route('/favicon.ico')
def favicon():
    return '', 204

if __name__ == '__main__':
    app.run(debug=True)
