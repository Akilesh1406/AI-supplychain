from sqlalchemy import Column, Integer, String, Float

from database import Base


class Product(Base):

    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String, nullable=False)

    category = Column(String, nullable=False)

    current_stock = Column(Integer, default=0)

    reorder_level = Column(Integer, default=10)

    price = Column(Float, default=0)