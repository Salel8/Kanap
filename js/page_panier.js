/*on récupère ce qu'il y a dans le localStorage*/
let objLinea = localStorage.getItem('card');
let card = JSON.parse(objLinea);

let prixTotal = 0;
let quantiteTotal = 0;
let nouveau_prix = 0;
let a=0;

if (card==null || card==undefined){
  const total_quantite = document.getElementById("totalQuantity");
  total_quantite.innerText = quantiteTotal;

  const total_prix = document.getElementById("totalPrice");
  total_prix.innerText = prixTotal;
} else{
  for( let i = 0; i < card.length; i++){
    const reponse = fetch("http://localhost:3000/api/products/" + card[i].id).then((response)=> response.json()
    ).then((produit)=>{
      /*on crée nos éléments*/
      ///////
      const imageElement = document.createElement("img");
      imageElement.src = produit.imageUrl;
      imageElement.setAttribute("alt", produit.altTxt);

      const nomElement = document.createElement("h2");
      nomElement.innerText = produit.name;

      const prixElement = document.createElement("p");
      prixElement.innerText = produit.price + " €";

      const couleurElement = document.createElement("p");
      couleurElement.innerText = card[i].couleur;

      const quantiteElement = document.createElement("p");
      quantiteElement.innerText = card[i].quantite;

      const inputQuantity = document.createElement("input");
      inputQuantity.setAttribute("type", "number");
      inputQuantity.classList.add("itemQuantity");
      inputQuantity.setAttribute("name", "itemQuantity");
      inputQuantity.setAttribute("min", "1");
      inputQuantity.setAttribute("max", "100");
      inputQuantity.setAttribute("value", card[i].quantite);

      inputQuantity.addEventListener('change', (event)=> {
        if (event.target.value<=100 && event.target.value>0){
          differenceArticle = event.target.value - card[i].quantite;
          differencePrix = differenceArticle * produit.price;

          card[i].quantite = event.target.value;
          inputQuantity.setAttribute("value", event.target.value);
          inputQuantity.parentNode.querySelector('p').innerText = event.target.value;

          localStorage.removeItem('card');

          let objLineaNew = JSON.stringify(card);
          localStorage.setItem('card',objLineaNew);

          prixTotal = prixTotal + differencePrix;
          total_prix.innerText = prixTotal;

          quantiteTotal = quantiteTotal + differenceArticle;
          total_quantite.innerText = quantiteTotal;
        }
        else{
          alert("Merci de sélectionner une quantité comprise entre 1 et 100");
        }
      });

      const deleteElement = document.createElement("p");
      deleteElement.innerText = "Supprimer";
      deleteElement.classList.add("deleteItem");
      deleteElement.addEventListener('click', function (event) {
        confirmation = confirm("Êtes-vous sur de vouloir supprimer cet article ?");

        if (confirmation == true){
          differenceArticle = parseInt(card[i].quantite);
          differencePrix = differenceArticle * produit.price;
          let eltASupprimmer = event.target.closest('.cart__item');
          let cartItems = eltASupprimmer.closest('#cart__items');

          cartItems.removeChild(eltASupprimmer);
          let elementQuonSupprime = card.splice(i, 1);

          if (card.length === 0) {
            localStorage.removeItem('card');
          } else {
            localStorage.removeItem('card');

            let objLineaNew = JSON.stringify(card);
            localStorage.setItem('card', objLineaNew);
          }
          prixTotal = prixTotal - differencePrix;
          total_prix.innerText = prixTotal;

          quantiteTotal = quantiteTotal - differenceArticle;
          total_quantite.innerText = quantiteTotal;
        }

      });

      ////////
      const divElementContenuParametreQuantite = document.createElement("div");
      divElementContenuParametreQuantite.classList.add("cart__item__content__settings__quantity");
      divElementContenuParametreQuantite.appendChild(quantiteElement);
      divElementContenuParametreQuantite.appendChild(inputQuantity);

      const divElementContenuParametreSupprimer = document.createElement("div");
      divElementContenuParametreSupprimer.classList.add("cart__item__content__settings__delete");
      divElementContenuParametreSupprimer.appendChild(deleteElement);

      /////////
      const divElementContenuDescription = document.createElement("div");
      divElementContenuDescription.classList.add("cart__item__content__description");
      divElementContenuDescription.appendChild(nomElement);
      divElementContenuDescription.appendChild(couleurElement);
      divElementContenuDescription.appendChild(prixElement);

      const divElementContenuParametre = document.createElement("div");
      divElementContenuParametre.classList.add("cart__item__content__settings");
      divElementContenuParametre.appendChild(divElementContenuParametreQuantite);
      divElementContenuParametre.appendChild(divElementContenuParametreSupprimer);

      /////////
      const divElementImage = document.createElement("div");
      divElementImage.classList.add("cart__item__img");
      divElementImage.appendChild(imageElement);

      const divElementContenu = document.createElement("div");
      divElementContenu.classList.add("cart__item__content");
      divElementContenu.appendChild(divElementContenuDescription);
      divElementContenu.appendChild(divElementContenuParametre);

      ////////
      const article = document.createElement("article");
      article.classList.add("cart__item");
      article.setAttribute("data-id", card[i].id);
      article.setAttribute("data-color", card[i].couleur);
      article.appendChild(divElementImage);
      article.appendChild(divElementContenu);

      ////////
      const section = document.getElementById("cart__items");
      section.appendChild(article);

      ///////
      const total_quantite = document.getElementById("totalQuantity");
      quantiteTotal = quantiteTotal + parseInt(card[i].quantite);
      total_quantite.innerText = quantiteTotal;

      const total_prix = document.getElementById("totalPrice");
      prixTotal = prixTotal + produit.price * card[i].quantite;
      total_prix.innerText = prixTotal;
    });
  };
}

/*on recupere les infos du formulaire*/
const selectFirstName = document.querySelector('#firstName');
const selectLastName = document.querySelector('#lastName');
const selectAdress = document.querySelector('#address');
const selectCity = document.querySelector('#city');
const selectEmail = document.querySelector('#email');

const masque1 = /[^A-Za-zÀ-ÿ- ]/;    // tout sauf des lettres espace et tiret milieu
const masque2 = /[^a-zA-ZÀ-ÿ0-9- ]/;   // tout sauf lettres chiffres espace et tiret milieu
const masque3 = /[@]/;   // il doit y avoir un @
const masque4 = /[.]/;   // il doit y avoir un point
const masque5 = /[a-zA-ZÀ-ÿ0-9-_]/;    // il doit y avoir une lettre ou un chiffre

let contact = {
  firstName : "",
  lastName : "",
  address : "",
  city : "",
  email : ""
};


selectFirstName.addEventListener('change', function (event) {
  if (masque1.test(event.target.value)){
    const firstNameError = document.querySelector('#firstNameErrorMsg');
    firstNameError.innerText = "Veuillez écrire votre Prénom (chiffres et caractères spéciaux interdits)";
    contact.firstName = "";
  }
  else{
    const firstNameError = document.querySelector('#firstNameErrorMsg');
    firstNameError.innerText = "";
    contact.firstName = event.target.value;
  }
});


selectLastName.addEventListener('change', function (event) {
  if (masque1.test(event.target.value)){
    const lastNameError = document.querySelector('#lastNameErrorMsg');
    lastNameError.innerText = "Veuillez écrire votre Nom (chiffres et caractères spéciaux interdits)";
    contact.lastName = "";
  }
  else{
    const lastNameError = document.querySelector('#lastNameErrorMsg');
    lastNameError.innerText = "";
    contact.lastName = event.target.value;
  }
});

selectAdress.addEventListener('change', function (event) {
  if (masque2.test(event.target.value)){
    const adressError = document.querySelector('#addressErrorMsg');
    adressError.innerText = "Veuillez écrire votre adresse (caractère spéciaux interdits)";
    contact.address = "";
  }
  else{
    const adressError = document.querySelector('#addressErrorMsg');
    adressError.innerText = "";
    contact.address = event.target.value;
  }
});


selectCity.addEventListener('change', function (event) {
  if (masque1.test(event.target.value)){
    const cityError = document.querySelector('#cityErrorMsg');
    cityError.innerText = "Veuillez indiquer votre ville (chiffres et caractères spéciaux interdits)";
    contact.city = "";
  }
  else{
    const cityError = document.querySelector('#cityErrorMsg');
    cityError.innerText = "";
    contact.city = event.target.value;
  }
});


selectEmail.addEventListener('change', function (event) {
  if (masque3.test(event.target.value) && masque4.test(event.target.value) && masque5.test(event.target.value)){
    const mailError = document.querySelector('#emailErrorMsg');
    mailError.innerText = "";
    contact.email = event.target.value;
  }
  else{
    const mailError = document.querySelector('#emailErrorMsg');
    mailError.innerText = "Veuillez indiquer une adresse mail valide";
    contact.email = "";
  }
});


////Recuperer le numero de commande

document.querySelector('#order').addEventListener('click', function(event){
  event.preventDefault();
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json')
  if (contact.firstName!='' && contact.lastName!='' && contact.address!='' && contact.city!='' && contact.email!='' && card!=null && card.length!=0){
    const products = card.map((product) => product.id);
    var myInit = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify({contact, products})
    };
    fetch('http://localhost:3000/api/products/order', myInit ).then((response) => response.json()).then(data => {
      window.location.replace("./confirmation.html?id=" + data.orderId);
    })
  }
  else{
    window.alert("Veillez à ce que le panier ne soit pas vide et à remplir le formulaire entièrement !");
  }
})
