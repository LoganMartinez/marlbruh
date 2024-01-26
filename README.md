# marlbruh

## Welcome to Marlbruh
This project is a website I made for my me and my housemates. It includes many apps such as:

### Chore Page
- Allows creation and allocation of chores to users
- Can filter chores and mark chores as complete

### Pic-le
- Simple social media page
- Can share pictures, like, and comment

### Bookclub page
- Can view book and leave comments on passages for other users to see
- Keeps track of book progress, and comments for chapters you haven't read yet will be hidden to protect from spoilers
- Includes built-in language dictionary for reading books in other languages

## Dev setup

### frontend setup

- install nodejs
- go to frontend-marlbruh directory
- npm install
- npm run dev

### backend setup

- go to backend-marlbruh directory
- python3 -m venv venv
- source ./venv/bin/activate
- python3 -m pip install -r requirements.txt
- python3 manage.py migrate
- python3 manage.py runserver
