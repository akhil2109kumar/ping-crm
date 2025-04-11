from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app import schemas, services

router = APIRouter(prefix="/organizations", tags=["Organizations"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=schemas.organization.Organization)
def create(org: schemas.organization.OrganizationCreate, db: Session = Depends(get_db)):
    return services.organization.create_organization(db, org)

@router.get("/{org_id}", response_model=schemas.organization.Organization)
def read(org_id: int, db: Session = Depends(get_db)):
    org = services.organization.get_organization(db, org_id)
    if not org:
        raise HTTPException(status_code=404, detail="Organization not found")
    return org

@router.get("/", response_model=list[schemas.organization.Organization])
def read_organizations(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return services.organization.get_organizations(db, skip=skip, limit=limit)


@router.put("/{org_id}", response_model=schemas.organization.Organization)
def update(org_id: int, org_data: schemas.organization.OrganizationCreate, db: Session = Depends(get_db)):
    org = services.organization.update_organization(db, org_id, org_data)
    if not org:
        raise HTTPException(status_code=404, detail="Organization not found")
    return org

@router.delete("/{org_id}", response_model=schemas.organization.Organization)
def delete(org_id: int, db: Session = Depends(get_db)):
    org = services.organization.delete_organization(db, org_id)
    if not org:
        raise HTTPException(status_code=404, detail="Organization not found")
    return "Organization deleted successfully"

@router.get("/search/", response_model=list[schemas.organization.Organization])
def search_organizations(query: str, db: Session = Depends(get_db)):
    return services.organization.search_organizations(db, query)
