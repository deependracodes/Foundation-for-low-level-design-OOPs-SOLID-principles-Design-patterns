enum OrderStatus {
  PENDING = "PENIDNG",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED"
}

let order_status = OrderStatus.COMPLETED; // valid
order_status = OrderStatus.CANCELLED; // valid
console.log(order_status)
// order_status= "packed" // invalid 