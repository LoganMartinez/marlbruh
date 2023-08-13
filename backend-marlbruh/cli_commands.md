-- run server: 
  - python manage.py runserver

-- Need to do after making model changes:
  -  build db schema: 
    > python manage.py makemigrations <appname>
  -  apply changes to db:
    > python manage.py migrate

-- Get a closer look at what's happening during migrations: 
  - show sql code of a given migration 
    > python manage.py sqlmigrate <appname> <version>
  - check for problems without performing a migration
    > python manage.py check

-- CLI
  - invoke python shell while setting django environment variables:
    > python manage.py shell

-- Admin stuff
  - create admin user
    > python manage.py createsuperuser