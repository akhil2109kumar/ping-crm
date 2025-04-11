from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

# Base schema with shared fields
class OrganizationBase(BaseModel):
    name: str  # Required (nullable=False)
    email: Optional[EmailStr] = None
    phone: Optional[str] = None
    address: Optional[str] = None
    city: Optional[str] = None
    region: Optional[str] = None
    country: Optional[str] = None
    postal_code: Optional[str] = None

# For creation
class OrganizationCreate(OrganizationBase):
    pass

# For response
class Organization(OrganizationBase):
    id: int
    created_at: datetime
    updated_at: datetime
    deleted_at: Optional[datetime] = None

    class Config:
        orm_mode = True
