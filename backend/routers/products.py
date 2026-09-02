from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database import get_db
from models.product import Product
from schemas.product import ProductCreate, ProductResponse


router = APIRouter(
    prefix="/products",
    tags=["Products"]
)


@router.get("/", response_model=list[ProductResponse])
def get_products(db: Session = Depends(get_db)):
    products = db.query(Product).all()
    return products


@router.post("/", response_model=ProductResponse)
def create_product(
    product: ProductCreate,
    db: Session = Depends(get_db)
):
    new_product = Product(
        name=product.name,
        category=product.category,
        current_stock=product.current_stock,
        reorder_level=product.reorder_level,
        price=product.price
    )

    db.add(new_product)
    db.commit()
    db.refresh(new_product)

    return new_product


@router.delete("/{product_id}")
def delete_product(
    product_id: int,
    db: Session = Depends(get_db)
):
    product = db.query(Product).filter(
        Product.id == product_id
    ).first()

    if not product:
        raise HTTPException(
            status_code=404,
            detail="Product not found"
        )

    db.delete(product)
    db.commit()

    return {
        "message": "Product deleted successfully"
    }