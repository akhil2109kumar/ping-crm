from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app import schemas, services

router = APIRouter(prefix="/contacts", tags=["Contacts"])

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=schemas.contact.Contact)
def create_contact(contact: schemas.contact.ContactCreate, db: Session = Depends(get_db)):
    """
    Create a new contact linked to an organization.
    """
    return services.contact.create_contact(db, contact)



@router.get("/{contact_id}", response_model=schemas.contact.Contact)
def read_contact(contact_id: int, db: Session = Depends(get_db)):
    db_contact = services.contact.get_contact(db, contact_id)
    if not db_contact:
        raise HTTPException(status_code=404, detail="Contact not found")
    return db_contact

@router.get("/", response_model=list[schemas.contact.Contact])
def read_contacts(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return services.contact.get_contacts(db, skip=skip, limit=limit)


@router.put("/{contact_id}", response_model=schemas.contact.Contact)
def update_contact(contact_id: int, contact_data: schemas.contact.ContactCreate, db: Session = Depends(get_db)):
    updated = services.contact.update_contact(db, contact_id, contact_data)
    if not updated:
        raise HTTPException(status_code=404, detail="Contact not found")
    return updated

@router.delete("/{contact_id}", response_model=schemas.contact.Contact)
def delete_contact(contact_id: int, db: Session = Depends(get_db)):
    deleted = services.contact.delete_contact(db, contact_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Contact not found")
    return "Contact deleted successfully"

@router.get("/search/", response_model=list[schemas.contact.Contact])
def search_contacts(query: str, db: Session = Depends(get_db)):
    return services.contact.search_contacts(db, query)
