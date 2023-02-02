SELECT * FROM order_items oi
JOIN order_item_notes oin
ON oi.product_id = oin.product_id AND oi.order_id = oin.order_Id;