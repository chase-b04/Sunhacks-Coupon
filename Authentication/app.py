from flask import Flask, render_template, request, redirect, url_for, flash, session
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
@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        latitude = request.form['latitude']
        longitude = request.form['longitude']

        # Hash the password
        hashed_pw = hashpw(password.encode('utf-8'), gensalt())

        # Save to database
        conn = get_db_connection()
        if conn is None:
            flash('Database connection failed.')
            return redirect(url_for('register'))
        try:
            cursor = conn.cursor()
            cursor.execute("INSERT INTO users (username, password, latitude, longitude) VALUES (%s, %s, %s, %s)",
                           (username, hashed_pw, latitude, longitude))
            conn.commit()
        except mysql.connector.IntegrityError:
            flash('Username already exists. Try a different one.')
            return redirect(url_for('register'))
        finally:
            cursor.close()
            conn.close()

        flash('Registration successful! You can now login.')
        return redirect(url_for('login'))

    return render_template('register.html')


# Login Route
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']

        # Check credentials
        conn = get_db_connection()
        if conn is None:
            flash('Database connection failed.')
            return redirect(url_for('login'))
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM users WHERE username = %s", (username,))
        user = cursor.fetchone()
        cursor.close()
        conn.close()

        if user is None or not checkpw(password.encode('utf-8'), user['password'].encode('utf-8')):
            flash('Invalid username or password.')
            return redirect(url_for('login'))

        # Set session if login is successful
        session['username'] = username
        flash('Logged in successfully!')
        return redirect(url_for('dashboard'))

    return render_template('login.html')


# Dashboard Route (after login)
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

    return f'Welcome, {session["username"]}! Your location is Latitude: {user["latitude"]}, Longitude: {user["longitude"]}.'

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