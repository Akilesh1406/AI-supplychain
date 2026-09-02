from pydantic import BaseModel


class ProductBase(BaseModel):
    name: str
    category: str
    current_stock: int
    reorder_level: int
    price: float


class ProductCreate(ProductBase):
    pass


class ProductResponse(ProductBase):
    id: int

    class Config:
        from_attributes = True