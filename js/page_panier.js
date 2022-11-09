/*on récupère ce qu'il y a dans le localStorage*/
let objLinea = localStorage.getItem('card');
let card = JSON.parse(objLinea);

let prixTotal = 0;

for( let i = 0; i < card.length; i++){
    //nomCle = localStorage.key(i);



    const reponse = fetch("http://localhost:3000/api/products/" + card[i].id).then((response)=> response.json()

    ).then((produits)=>{

      /*on crée nos éléments*/
      ///////
      const imageElement = document.createElement("img");
      imageElement.src = produits.imageUrl;
      imageElement.setAttribute("alt", produits.altTxt);

      const nomElement = document.createElement("h2");
      nomElement.innerText = produits.name;

      const prixElement = document.createElement("p");
      prixElement.innerText = produits.price;

      const couleurElement = document.createElement("p");
      couleurElement.innerText = card[i].couleur;

      const quantiteElement = document.createElement("p");
      quantiteElement.innerText = card[i].quantite;

      const inputElement = document.createElement("input");
      inputElement.setAttribute("type", "number");
      inputElement.classList.add("itemQuantity");
      inputElement.setAttribute("name", "itemQuantity");
      inputElement.setAttribute("min", "1");
      inputElement.setAttribute("max", "100");
      inputElement.setAttribute("value", card[i].quantite);

      const deleteElement = document.createElement("p");
      deleteElement.innerText = "Supprimer";
      deleteElement.classList.add("deleteItem");

      ////////
      const divElementContenuParametreQuantite = document.createElement("div");
      divElementContenuParametreQuantite.classList.add("cart__item__content__settings__quantity");
      divElementContenuParametreQuantite.appendChild(quantiteElement);
      divElementContenuParametreQuantite.appendChild(inputElement);

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
      total_quantite.innerText = card.length;

      const total_prix = document.getElementById("totalPrice");
      prixTotal = prixTotal + produits.price;
      total_prix.innerText = prixTotal;


      /*Pour modifier la quantite*/
      const select = document.getElementsByClassName("itemQuantity")[i];
      /*let result = document.querySelector('#result');*/
      select.addEventListener('change', (event)=> {
          card[i].quantite = event.target.value;
          inputElement.setAttribute("value", event.target.value);

          localStorage.removeItem('card');

          let objLineaNew = JSON.stringify(card);
          localStorage.setItem('card',objLineaNew);
      });


      /*Pour supprimer*/
      for( let j = 0; j < card.length; j++){

        const selectDelete = document.getElementsByClassName("deleteItem")[j];

        selectDelete.addEventListener('click', function () {
            const r1 = selectDelete.closest('#cart__items');
            const eltASupprimmer = document.getElementsByClassName("cart__item")[j];
            r1.removeChild(eltASupprimmer);

            let elementSupprimer = card.splice(j,1);



            if (card.length===0){
              localStorage.removeItem('card');
            }
            else{
              localStorage.removeItem('card');

              let objLineaNew = JSON.stringify(card);
              localStorage.setItem('card',objLineaNew);
            };

          });



      };


    });


};

/*for (let i = 0; i< card.length; i++){




};*/




/*if (card===[]){
  localStorage.removeItem('card');
};*/


/*on recupere les infos du formulaire*/
const selectFirstName = document.querySelector('#firstName');
const selectLastName = document.querySelector('#lastName');
const selectAdress = document.querySelector('#address');
const selectCity = document.querySelector('#city');
const selectEmail = document.querySelector('#email');

const masque1 = /[^a-zA-Z]/;    // tout sauf des lettres espace et tiret milieu
const masque2 = /[^a-zA-Z0-9]/;   // tout sauf lettres chiffres espace et tiret milieu
const masque3 = /[@.]/;   // il doit y avoir un @ et un point

//let firstName="";
//let lastName="";
//let adress="";
//let city="";
//let mail="";

/*let commande = {
  firstName : firstName,
  name : lastName,
  adress : adress,
  city : city,
  email : mail
};*/

let contact = {
  firstName : "",
  lastName : "",
  adress : "",
  city : "",
  email : ""
};


selectFirstName.addEventListener('change', function (event) {
    contact.firstName = event.target.value;
    //let caseFirstNameRemplie = 0;
    if (masque1.test(contact.firstName)){
      const firstNameError = document.querySelector('#firstNameErrorMsg');
      firstNameError.innerText = "Veuillez écrire votre Prénom seulement avec des lettres";

    }
    else{
      const firstNameError = document.querySelector('#firstNameErrorMsg');
      firstNameError.innerText = "";
      caseFirstNameRemplie = 1;
    }

});


selectLastName.addEventListener('change', function (event) {
    contact.lastName = event.target.value;
    let caseLastNameRemplie = 0;
    if (masque1.test(contact.lastName)){
      const lastNameError = document.querySelector('#lastNameErrorMsg');
      lastNameError.innerText = "Veuillez écrire votre Nom seulement avec des lettres";

    }
    else{
      const lastNameError = document.querySelector('#lastNameErrorMsg');
      lastNameError.innerText = "";
      caseLastNameRemplie = 1;
    }

});

selectAdress.addEventListener('change', function (event) {
    contact.adress = event.target.value;
    let caseAdressRemplie = 0;
    if (masque2.test(contact.adress)){
      const adressError = document.querySelector('#addressErrorMsg');
      adressError.innerText = "Erreur, pas de caractère spécial";

    }
    else{
      const adressError = document.querySelector('#addressErrorMsg');
      adressError.innerText = "";
      caseAdressRemplie = 1;
    }

});


selectCity.addEventListener('change', function (event) {
    contact.city = event.target.value;
    let caseCityRemplie = 0;
    if (masque1.test(contact.city)){
      const cityError = document.querySelector('#cityErrorMsg');
      cityError.innerText = "Erreur, pas de caractère spécial";

    }
    else{
      const cityError = document.querySelector('#cityErrorMsg');
      cityError.innerText = "";
      caseCityRemplie = 1;
    }

});


selectEmail.addEventListener('change', function (event) {
    contact.email = event.target.value;
    let caseMailRemplie = 0;
    if (masque3.test(contact.email)){
      const mailError = document.querySelector('#emailErrorMsg');
      mailError.innerText = "";
      caseMailRemplie = 1;
    }
    else{
      const mailError = document.querySelector('#emailErrorMsg');
      mailError.innerText = "Erreur, pas de caractère spécial";
    }

});


////Recuperer le numero de commande

/*const numero_commande = fetch("http://localhost:3000/api/order", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: contact, card//JSON.stringify(contact), JSON.stringify(card)
}).then((response)=>response.json()).then((produits)=>{

  const lien = document.getElementById("order");
  lien.setAttribute("href", "./confirmation.html?id=" + produits);


});*/
