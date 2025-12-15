# Setup steps

1. Create VENV

```
python -m venv venv
```

2. Activate VENV (warning: this is necesary everytime you open the terminal)

```
source venv/bin/activate
```

3. Install requirements

```
pip install --upgrade pip
pip install -r requirements.txt
```

3. Apply migrations, this will create the database

```
python manage.py migrate
```

4. Now you can use as a black database or load the fixtures
4.1. Load Fixtures

```
python manage.py loaddata fixtures
```

4.2. Create a admin user (only if you want to access the admin)

```
python3 manage.py createsuperuser
```

5. Start server

```
python3 manage.py runserver
```
