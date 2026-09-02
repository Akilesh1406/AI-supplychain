from sqlalchemy import Column, Integer, String, Float, UniqueConstraint

from database import Base


class Supplier(Base):

    __tablename__ = "suppliers"

    __table_args__ = (
        UniqueConstraint(
            "name",
            "location",
            name="unique_supplier_name_location"
        ),
    )

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    name = Column(
        String,
        nullable=False
    )

    location = Column(
        String,
        nullable=False
    )

    reliability_score = Column(
        Float,
        default=0
    )

    delivery_days = Column(
        Integer,
        default=0
    )