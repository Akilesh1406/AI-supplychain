from fastapi import APIRouter

from ml.predict import predict_demand


router = APIRouter(
    prefix="/ai",
    tags=["AI Prediction"]
)


@router.get("/predict-demand")
def demand_prediction(day: int):

    prediction = predict_demand(day)

    return {
        "day": day,
        "predicted_demand": prediction
    }