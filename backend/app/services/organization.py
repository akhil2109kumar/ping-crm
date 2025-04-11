from sqlalchemy.orm import Session
from app import models, schemas
from sqlalchemy import or_


def create_organization(db: Session, org: schemas.organization.OrganizationCreate):
    db_org = models.organization.Organization(**org.dict())
    db.add(db_org)
    db.commit()
    db.refresh(db_org)
    return db_org

def get_organization(db: Session, org_id: int):
    return db.query(models.organization.Organization).filter(models.organization.Organization.id == org_id).first()

def get_organizations(db: Session, skip: int = 0, limit: int = 10):
    return db.query(models.Organization).offset(skip).limit(limit).all()


def update_organization(db: Session, org_id: int, org_data: schemas.organization.OrganizationCreate):
    org = get_organization(db, org_id)
    if not org:
        return None
    for field, value in org_data.dict().items():
        setattr(org, field, value)
    db.commit()
    db.refresh(org)
    return org

def delete_organization(db: Session, org_id: int):
    org = get_organization(db, org_id)
    if org:
        db.delete(org)
        db.commit()
    return org

def search_organizations(db: Session, query: str):
    return db.query(models.Organization).filter(
        or_(
            models.Organization.name.ilike(f"%{query}%"),
            models.Organization.email.ilike(f"%{query}%"),
            models.Organization.city.ilike(f"%{query}%")
        )
    ).all()
