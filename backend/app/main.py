from fastapi import FastAPI
from app.database import engine, Base
from app.api.v1.endpoints import organization as org_router, contact as contact_router
from app.cors import setup_cors

Base.metadata.create_all(bind=engine)

app = FastAPI()

setup_cors(app)

app.include_router(org_router.router)
app.include_router(contact_router.router)

