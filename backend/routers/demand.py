from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database import get_db
from models.product import Product
from services.demand_service import analyze_product_demand


router = APIRouter(
    prefix="/demand",
    tags=["Demand Analysis"]
)


# Existing demand analysis endpoint
@router.get("/analyze/{product_id}")
def analyze_demand(
    product_id: int,
    db: Session = Depends(get_db)
):

    product = (
        db.query(Product)
        .filter(Product.id == product_id)
        .first()
    )

    if not product:
        raise HTTPException(
            status_code=404,
            detail="Product not found"
        )

    result = analyze_product_demand(product)

    return result


# New prediction endpoint for frontend
@router.get("/predict/{product_id}")
def predict_demand(
    product_id: int,
    db: Session = Depends(get_db)
):

    product = (
        db.query(Product)
        .filter(Product.id == product_id)
        .first()
    )

    if not product:
        raise HTTPException(
            status_code=404,
            detail="Product not found"
        )

    # Use your existing demand analysis service
    result = analyze_product_demand(product)

    # Return frontend-friendly data
    return {
        "product_id": product.id,
        "product_name": product.name,
        "current_stock": product.current_stock,
        "reorder_level": product.reorder_level,
        "predicted_demand": result.get(
            "predicted_demand",
            product.current_stock
        ),
        "recommendation": result.get(
            "recommendation",
            "Stock level is sufficient"
        )
    }