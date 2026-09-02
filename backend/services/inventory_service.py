def get_inventory_status(current_stock, reorder_level):

    if current_stock <= 0:
        return "OUT_OF_STOCK"

    elif current_stock <= reorder_level:
        return "LOW_STOCK"

    else:
        return "IN_STOCK"


def get_inventory_recommendation(
    current_stock,
    reorder_level
):

    if current_stock <= 0:
        return "URGENT: Reorder immediately"

    elif current_stock <= reorder_level:
        return "Low inventory. Place a new order soon."

    else:
        return "Inventory level is healthy."