from fastapi import APIRouter

from services.inventory_service import (
    get_inventory_status,
    get_inventory_recommendation
)


router = APIRouter(
    prefix="/inventory",
    tags=["Inventory AI"]
)


@router.get("/analyze")
def analyze_inventory(
    current_stock: int,
    reorder_level: int
):

    status = get_inventory_status(
        current_stock,
        reorder_level
    )

    recommendation = get_inventory_recommendation(
        current_stock,
        reorder_level
    )

    return {
        "current_stock": current_stock,
        "reorder_level": reorder_level,
        "status": status,
        "recommendation": recommendation
    }