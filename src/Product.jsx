import { useState } from "react";
import "./App.css";

export default function App() {
  const [pid, setPid] = useState("");
  const [pname, setPname] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [invoice, setInvoice] = useState(null);

  const handlePrintInvoice = (e) => {
    e.preventDefault();

    const numPrice = Number(price) || 0;
    const numQty = Number(quantity) || 0;
    const total = numPrice * numQty;

    // Adjust discount slabs & GST rate to match your exact requirement
    let discountRate = 0.15;
    if (total >= 50000) {
      discountRate = 0.31;
    } else if (total >= 20000) {
      discountRate = 0.21;
    }

    const discountAmount = total * discountRate;
    const taxableAmount = total - discountAmount;
    const gstAmount = taxableAmount * 0.18;
    const finalBill = taxableAmount + gstAmount;

    setInvoice({
      pid,
      pname,
      price: numPrice.toFixed(2),
      quantity: numQty,
      total: total.toFixed(2),
      discountAmount: discountAmount.toFixed(2),
      gstAmount: gstAmount.toFixed(2),
      finalBill: finalBill.toFixed(2),
    });
  };

  return (
    <div className="container">
      <h2>Create a React JS Application for Product Invoice</h2>

      <div className="main">
        <form className="form-box" onSubmit={handlePrintInvoice}>
          <h3>Product Details</h3>

          <div className="row">
            <label htmlFor="pid">PID:</label>
            <input
              id="pid"
              type="text"
              value={pid}
              onChange={(e) => setPid(e.target.value)}
              required
            />
          </div>

          <div className="row">
            <label htmlFor="pname">PNAME:</label>
            <input
              id="pname"
              type="text"
              value={pname}
              onChange={(e) => setPname(e.target.value)}
              required
            />
          </div>

          <div className="row">
            <label htmlFor="price">PRICE:</label>
            <input
              id="price"
              type="number"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>

          <div className="row">
            <label htmlFor="quantity">QUANTITY:</label>
            <input
              id="quantity"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
            />
          </div>

          <div className="row button-row">
            <button type="submit">Print Invoice</button>
          </div>

          {/* Invoice shown right below the Print Invoice button */}
          {invoice && (
            <div className="bill" style={{ marginTop: "20px" }}>
              <hr />
              <p>
                <span>Product ID</span>
                <strong>{invoice.pid}</strong>
              </p>
              <p>
                <span>Product Name</span>
                <strong>{invoice.pname}</strong>
              </p>
              <p>
                <span>Price</span>
                <strong>₹{invoice.price}</strong>
              </p>
              <p>
                <span>Quantity</span>
                <strong>{invoice.quantity}</strong>
              </p>
              <p>
                <span>Total</span>
                <strong>₹{invoice.total}</strong>
              </p>
              <p>
                <span>Discount</span>
                <strong>- ₹{invoice.discountAmount}</strong>
              </p>
              <p>
                <span>GST</span>
                <strong>+ ₹{invoice.gstAmount}</strong>
              </p>
              <h2>
                <span>Final Bill</span>
                <span>₹{invoice.finalBill}</span>
              </h2>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}