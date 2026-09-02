import pandas as pd
from sklearn.linear_model import LinearRegression
import joblib


data = pd.read_csv("ml/data/sales.csv")


X = data[["day"]]
y = data["sales"]


model = LinearRegression()


model.fit(X, y)


joblib.dump(
    model,
    "ml/demand_model.pkl"
)


print("AI demand prediction model trained successfully")