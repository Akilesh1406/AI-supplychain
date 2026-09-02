from ml.predict import predict_demand


def analyze_product_demand(product):

    # Predict demand based on the next day
    predicted_demand = predict_demand(20)

    current_stock = product.current_stock

    if current_stock <= predicted_demand:
        recommendation = "REORDER NOW"

    elif current_stock <= predicted_demand * 1.5:
        recommendation = "PLAN TO REORDER SOON"

    else:
        recommendation = "STOCK LEVEL IS HEALTHY"

    return {
        "product_id": product.id,
        "product_name": product.name,
        "current_stock": current_stock,
        "predicted_demand": predicted_demand,
        "recommendation": recommendation
    }