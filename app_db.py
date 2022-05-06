from flask import Flask, jsonify, request
from werkzeug import exceptions # werkzeug: WSGI web application library

# from flask_cors import CORS # enable cross origin access on all routes, from any origin


from flask_sqlalchemy import SQLAlchemy

from controllers import users

# initialize the flask app
app = Flask(__name__)
# CORS(app) #wrap the app with the CORS module

# app.config('SQLALCHEMY_DATABASE_URL') = 'postgresql://postgres:password@localhost/JYOURNEY'
db = SQLAlchemy(app)

# decorator
@app.route('/')
# route handler
def home():
     return jsonify({'message': 'Hello from the JYOURNEY server!'}), 200
     # return render_template('index.html')

@app.route('/api/users', methods=['GET', 'POST'])
def users_handler():
     # functions
     fns = {
          'GET' : users.index,
          'POST' : users.create
     }
     resp, code = fns[request.method](request)
     return jsonify(resp), code


@app.errorhandler(exceptions.NotFound)
def handle_404(err):
    return {'message': f'Oops! {err}'}, 404

@app.errorhandler(exceptions.BadRequest)
def handle_400(err):
    return {'message': f'Oops! {err}'}, 400

@app.errorhandler(exceptions.InternalServerError)
def handle_500(err):
    return {'message': f"It's not you, it's us"}, 500     


# run the app
if __name__ == "__main__":
    app.run(debug=True)
