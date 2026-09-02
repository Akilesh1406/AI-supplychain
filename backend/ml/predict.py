import joblib
import os


MODEL_PATH = os.path.join(
    "ml",
    "demand_model.pkl"
)


model = joblib.load(MODEL_PATH)


def predict_demand(day):

    prediction = model.predict(
        [[day]]
    )

    return round(
        float(prediction[0]),
        2
    )