const searchParams = new URLSearchParams(window.location.search);
const nomUrl = searchParams.get("id");

let afficherNumeroCommande = document.querySelector('#orderId');
afficherNumeroCommande.innerText = nomUrl;
