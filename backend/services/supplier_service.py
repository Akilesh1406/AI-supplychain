def calculate_supplier_score(supplier):
    reliability_score = supplier.reliability_score * 10

    delivery_score = max(
        0,
        100 - (supplier.delivery_days * 10)
    )

    final_score = (
        reliability_score * 0.7
        + delivery_score * 0.3
    )

    return round(final_score, 2)


def get_best_supplier(suppliers):

    if not suppliers:
        return None

    best_supplier = None
    best_score = -1

    for supplier in suppliers:

        score = calculate_supplier_score(supplier)

        if score > best_score:
            best_score = score
            best_supplier = supplier

    return {
        "supplier": best_supplier,
        "score": best_score
    }


# Rank all suppliers from best to worst
def rank_suppliers(suppliers):

    if not suppliers:
        return []

    ranked_suppliers = []

    for supplier in suppliers:

        score = calculate_supplier_score(supplier)

        ranked_suppliers.append({
            "supplier": supplier,
            "score": score
        })

    ranked_suppliers.sort(
        key=lambda item: item["score"],
        reverse=True
    )

    return ranked_suppliers