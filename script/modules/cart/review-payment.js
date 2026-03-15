import { modalReview } from "./modalReview.js";
import { checkoutOrder } from "./cart.js";

export function reviewPaymentOrders(cart, total) {
    const orderSection = document.querySelector('.order-section');
    
    if (window.matchMedia("(max-width: 768px)").matches) {
      orderSection.style.display = 'none';
    }
    
    modalReview(cart, total);

    const modal = document.querySelector('.modal-con');
    const closeModal = document.getElementById('modal-close');
    const confirmPayment = document.getElementById('confirm-payment');
    
    modal.style.display = "flex";
    
    confirmPayment.addEventListener('click', () => {
        const selectedPayment = document.querySelector('input[name="payment"]:checked');
        if(selectedPayment) {
            const value = selectedPayment.value;
            console.log(value); // gcash or cash

            if (value == "cash") {
                modal.style.display = "none"
                checkoutOrder(cart, total);
            }
        }else{
            alert("Please select a payment method");
        }

    })

    closeModal.addEventListener('click', () => {
        modal.style.display = "none";
    })

}