from flask import Flask, jsonify
import subprocess

app = Flask(__name__)

@app.route('/start-coupons', methods=['POST'])
def start_coupons():
    try:
        # Start the Docker container
        subprocess.run(['docker-compose', 'up', '-d'], check=True)
        return jsonify({'message': 'Safeway Coupons process started successfully!'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/stop-coupons', methods=['POST'])
def stop_coupons():
    try:
        # Stop the Docker container
        subprocess.run(['docker-compose', 'down'], check=True)
        return jsonify({'message': 'Safeway Coupons process stopped successfully!'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)