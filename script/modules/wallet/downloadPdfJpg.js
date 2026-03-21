export function downloadPDF() {
  const receipt = document.querySelector(".receipt-box");

  receipt.classList.add("black-white");

  html2canvas(receipt, { scale: 2 }).then((canvas) => {
    const imgData = canvas.toDataURL("image/png");
    const pdf = new window.jspdf.jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("AU_FoodieCo_Receipt.pdf");

    receipt.classList.remove("black-white");
  });
}

export function downloadJPG() {
  const receipt = document.querySelector(".receipt-box");
  receipt.classList.add("black-white");

  html2canvas(receipt, { scale: 2 }).then((canvas) => {
    const link = document.createElement("a");
    link.download = "AU_FoodieCo_Receipt.jpg";
    link.href = canvas.toDataURL("image/jpeg", 1.0);
    link.click();

    receipt.classList.remove("black-white");
  });
}