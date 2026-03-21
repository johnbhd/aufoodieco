import { modalReview } from "./modalReview.js";
import { checkoutOrder } from "./cart.js";
import { modalQrCode} from "./qrCode/modalQrCode.js"
import { toastSuccess, toastError } from "../utils/utils.js";

export function reviewPaymentOrders(cart, total) {
    const orderSection = document.querySelector('.order-section');

    if (window.matchMedia("(max-width: 768px)").matches) {
        orderSection.style.display = 'none';
    }

    modalReview(cart, total);

    const modal = document.querySelector('.modal-con');
    const closeModal = document.getElementById('modal-close');
    const confirmPayment = document.getElementById('confirm-payment');

    // Remove previous listeners if any
    const newConfirm = confirmPayment.cloneNode(true);
    confirmPayment.parentNode.replaceChild(newConfirm, confirmPayment);

    modal.style.display = "flex";

    newConfirm.addEventListener('click', () => {
        const selectedPayment = document.querySelector('input[name="payment"]:checked');

        if(!selectedPayment) {
            toastError("Please select a payment method");
            return; // stop execution
        }

        const value = selectedPayment.value;
        console.log("Selected payment:", value);

        if(value === "gcash") {
           modalQrCode(cart, total, "gcash");
           return;
        }

        // Valid payment selected
        modal.style.display = "none";
        checkoutOrder(cart, total, "cash");

    });

    closeModal.addEventListener('click', () => {
        modal.style.display = "none";
    });
}

