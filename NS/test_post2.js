const res = await fetch("http://localhost:8000/api/liquor_inventory", {
  method: "POST",
  headers: {
    "x-nishify-client": "pioneer_dev",
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    id: "test-id-123456",
    data: {
      sku: "TEST-123",
      brand: "Test Brand",
      type: "whiskey",
      abv_percentage: 40,
      stock_quantity: 10,
      warehouse_id: "17723194645240nlz2rf"
    }
  })
});
const text = await res.text();
console.log(res.status, text);
