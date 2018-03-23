Endpoints available

CRUD-capable
/api/users/

{
    username
    password
    first_name
    last_name
}

/api/groups/

{
    name
    description
    members
}

{
    "name": "x",
    "description": "x",
    "members": [{"user":1, "role":"dev"},{"user":2, "role":"dev"}]
}

How to run the backend:

Requirements:
1. Python 3.6
2. pipenv

To run the server (in command-line):
1. pipenv install
2. pipenv shell
3. python manage.py makemigrations
4. python manage.py migrate
5. python manage.py createsuperuser (Only have to do this once and follow the prompts)
6. python manage.py runserver

From here you can go to:
1. localhost:8000/admin (Logging in with superuser account) to view everything available
2. Django REST API UI using an endpoint mentioned above (e.g. localhost:8000/api/users)