from flask import Flask, render_template, jsonify

# from flask_cors import CORS # enable cross origin access on all routes, from any origin


# from flask_sqlalchemy import SQLAlchemy

# initialize the flask app
app = Flask(__name__)
# CORS(app) #wrap the app with the CORS module


@app.route('/')
def home():
     return jsonify({'message': 'Hello from the JYOURNEY server!'}), 200
#     return render_template('index.html')

# run the app
if __name__ == "__main__":
    app.run(debug=True)
