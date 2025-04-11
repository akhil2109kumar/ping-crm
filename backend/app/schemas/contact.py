from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

# Base schema with shared fields
class ContactBase(BaseModel):
    first_name: str  # Required
    last_name: str   # Required
    email: Optional[EmailStr] = None
    phone: Optional[str] = None
    address: Optional[str] = None
    city: Optional[str] = None
    region: Optional[str] = None
    country: Optional[str] = None
    postal_code: Optional[str] = None
    organization_id: Optional[int] = None  # ForeignKey can be optional

# For creation
class ContactCreate(ContactBase):
    pass

# For response
class Contact(ContactBase):
    id: int
    created_at: datetime
    updated_at: datetime
    deleted_at: Optional[datetime] = None

    class Config:
        orm_mode = True
