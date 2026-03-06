export function modalReview(cart, total) {
    const modal = document.querySelector('.modal-con');
    console.log(cart)

    const orderSummary = cart.length ? cart.map(c => {
        return `
            <div class="summary-order">
                <div>
                    <p>${c.name} (${c.qty}x)</p>
                </div>
                <div>
                    <span>${c.price} each</span>
                </div>
            </div>
        `
    }).join("") : "No orders...";

    modal.innerHTML = `
    <div class="modal">
      <div class="modal-title">
        <h2>Review & Payment Method</h2>
      </div>
      <div class="modal-body">
        <div class="modal-order-summary">
            <h4>Order Summary</h4>
            ${orderSummary}
            <div class="summary-total">
                <span>Total</span>
                <span>₱ ${total.toFixed(2)}</span>
            </div>   
        </div>
      </div>

      <div class="modal-payment">
        <h4>Select Payment Method</h4>
         <div class="payment-methods">

            <label class="payment-card">
              <input type="radio" name="payment" value="gcash">
              <img src="../imgs/gcash.jpg"class="payment-logo gcash" alt="GCash">
              <p>GCash</p>
            </label>

            <label class="payment-card">
              <input type="radio" name="payment" value="cash">
              <img src="../imgs/cash.jpg" class="payment-logo gcash"  alt="Cash">
              <p>Cash on Counter</p>
            </label>

          </div>
      </div>
      <div class="modal-btn">
        <button id="confirm-payment">Confirm payment</button>
        <button id="modal-close">Cancel</button>
      </div>
    </div> 
    `
}