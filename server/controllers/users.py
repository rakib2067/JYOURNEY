from werkzeug.exceptions import BadRequest

users = [
    {'id': 1, 'username': 'user1', "password": "test_password1"},
    {'id': 2, 'username': 'user2', "password": "test_password2"},
    {'id': 3, 'username': 'user3', "password": "test_password3"},
]

# GET
def index(req):
     return [user for user in users], 200

# POST
def create(req):
    new_user = req.get_json()
    new_user['id'] = sorted([user['id'] for user in users])[-1] + 1
    users.append(new_user)
    return new_user, 201
