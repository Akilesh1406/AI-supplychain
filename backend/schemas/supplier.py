from pydantic import BaseModel


class SupplierBase(BaseModel):
    name: str
    location: str
    reliability_score: float
    delivery_days: int


class SupplierCreate(SupplierBase):
    pass


class SupplierResponse(SupplierBase):
    id: int

    class Config:
        from_attributes = True