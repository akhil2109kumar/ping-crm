Setup for backend
# Create a virtual environment named 'venv' to isolate project dependencies
python -m venv venv

# Activate the virtual environment (for Linux/macOS)
source venv/bin/activate  

# Activate the virtual environment (for Windows)
venv\Scripts\activate     

# Install all required Python packages from the requirements.txt file
pip install -r requirements.txt

# Apply any existing Alembic database migrations (bring DB schema to latest state)
alembic upgrade head

# (Optional) Generate a new Alembic migration based on changes in SQLAlchemy models
alembic revision --autogenerate -m "init"

# Apply the newly generated migration to the database
alembic upgrade head

# Start the FastAPI app with automatic reload on code changes
uvicorn app.main:app --reload


setup for frontend
# to install the package
npm install --global yarn

# to clone the repo
git clone https://github.com/akhil2109kumar/ping-crm.git
cd your-repository-name

# to install the dependencies using npm
npm install

# using yarn
yarn install

# to start the server
npm run dev
