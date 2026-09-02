from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import get_db
from models.supplier import Supplier
from services.supplier_service import get_best_supplier


router = APIRouter(
    prefix="/supplier-recommendation",
    tags=["Supplier Recommendation"]
)


@router.get("/best")
def recommend_best_supplier(
    db: Session = Depends(get_db)
):

    suppliers = db.query(Supplier).all()

    result = get_best_supplier(suppliers)

    if result is None:
        return {
            "message": "No suppliers available"
        }

    supplier = result["supplier"]

    return {
        "supplier_id": supplier.id,
        "supplier_name": supplier.name,
        "location": supplier.location,
        "reliability_score": supplier.reliability_score,
        "delivery_days": supplier.delivery_days,
        "ai_supplier_score": result["score"],
        "recommendation": "BEST SUPPLIER"
    }