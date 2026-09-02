from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database import get_db
from models.supplier import Supplier
from schemas.supplier import SupplierCreate, SupplierResponse


router = APIRouter(
    prefix="/suppliers",
    tags=["Suppliers"]
)


# Get all suppliers
@router.get("/", response_model=list[SupplierResponse])
def get_suppliers(
    db: Session = Depends(get_db)
):
    suppliers = db.query(Supplier).all()

    return suppliers


# Create supplier
@router.post("/", response_model=SupplierResponse)
def create_supplier(
    supplier: SupplierCreate,
    db: Session = Depends(get_db)
):

    # Check whether supplier already exists
    existing_supplier = db.query(Supplier).filter(
        Supplier.name == supplier.name,
        Supplier.location == supplier.location
    ).first()

    if existing_supplier:
        raise HTTPException(
            status_code=400,
            detail="Supplier already exists"
        )

    new_supplier = Supplier(
        name=supplier.name,
        location=supplier.location,
        reliability_score=supplier.reliability_score,
        delivery_days=supplier.delivery_days
    )

    db.add(new_supplier)
    db.commit()
    db.refresh(new_supplier)

    return new_supplier