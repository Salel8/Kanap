/*const urlcourante = document.location.href;*/

/*const queue_url = urlcourante.substring (urlcourante.lastIndexOf( "/" )+1 );*/

/*on récupère la dernière partie de l'url correspondant à l'id*/
/*const queue_url = urlcourante.substring (urlcourante.lastIndexOf( "/" )+17 );*/

/*on récupère les données du fichier json*/
/*const reponse = await fetch("http://localhost:3000/api/products");
const produits = await reponse.json();*/


const searchParams = new URLSearchParams(window.location.search);
const nomUrl = searchParams.get("id");

/*on récupère les données du fichier json*/
const reponse = fetch("http://localhost:3000/api/products/" + nomUrl).then((response)=> response.json()

).then((produits)=>{

  // nom de la page
  let selectionTitre = document.querySelector('title');
  selectionTitre.innerText = produits.name;

  /*on ajoute les détails du produit*/
  const sectionImage = document.getElementsByClassName("item__img")[0];
  const imageElement = document.createElement("img");
  imageElement.src = produits.imageUrl;
  imageElement.setAttribute("alt", produits.altTxt);
  sectionImage.appendChild(imageElement);

  const titreElement = document.getElementById("title");
  titreElement.innerText = produits.name;

  const prixElement = document.getElementById("price");
  prixElement.innerText = produits.price;

  const descriptionElement = document.getElementById("description");
  descriptionElement.innerText = produits.description;

  const sectionOption = document.getElementById("colors");
  for (let i = 0; i < produits.colors.length; i++) {
    const optionElement = document.createElement("option");
    optionElement.setAttribute("value", produits.colors[i]);
    optionElement.innerText = produits.colors[i];
    sectionOption.appendChild(optionElement);
  }



});



/*on cherche le numero du produit correspondant à l'id*/
/*let numero_produit=0;
while (produits[numero_produit]._id != queue_url){
  numero_produit+=1;
}*/

/*on crée un objet pour stocker les informations de la commande*/
let quantiteProduit=0;
let couleurProduit="";
let commandeJson = {
  id : nomUrl,
  quantite : quantiteProduit,
  couleur : couleurProduit
};
/*on récupère les informations*/
/*document.addEventListener("DOMContentLoaded", function() {
  document.querySelector('select[name="color-select"]').onchange=changeEventHandler;
  document.querySelector('select[for="itemQuantity"]').onchange=changeEventHandler;
}, false);

function changeEventHandler(event) {
  if(!event.target.value) alert("Please Select A Color");
  else couleurProduit=event.target.value;
}

function changeEventHandlers(event) {
  if(event.target.value==0) alert("Please Select A Quantity");
  else quantiteProduit=event.target.value;
}*/
//////
const selectElementName = document.querySelector('#colors');

selectElementName.addEventListener('change', (event) => {
  if(!event.target.value){
    alert("Please Select A Color");
  }
  else{
    couleurProduit=event.target.value;
    return couleurProduit;
  }
});

const selectElementFor = document.querySelector('#quantity');

selectElementFor.addEventListener('change', (event) => {
  if(event.target.value==0){
    alert("Please Select A Quantity");
  }
  else{
    quantiteProduit=parseInt(event.target.value);
    return quantiteProduit;
  }
});


/*on linéarise l'objet commande pour l'envoyer*/
/*let commandeLinearise = JSON.stringify(commandeJson);*/
/*on envoie l'objet dans le localStorage*/
/*localStorage.setItem(nomUrl+couleurProduit, commandeLinearise);*/

const card=[];
/*on utilise le localStorage pour stocker la matrice*/
boutonElement = document.getElementById("addToCart");
  boutonElement.addEventListener('click', ()=> {
    if (quantiteProduit!=0 && couleurProduit!=''){
      /*on vérifie qu'il n'y a pas de doublon dans le localStorage*/
      /////////
      //// si cardStorage existe pas

      let cardStorage = JSON.parse(localStorage.getItem('card'));

      if (cardStorage==null || cardStorage==undefined || cardStorage==[]){
        card.push({id: nomUrl, couleur: couleurProduit, quantite: quantiteProduit});

        let objLineaNew = JSON.stringify(card);
        localStorage.setItem("card",objLineaNew);

        window.alert("Article ajouté au Panier");
      }
      else{
        //// pour verifier qu'il n'y a pas de doublon

        let a=0;

        for (let i in cardStorage){
          card[i] = cardStorage[i];
          if (cardStorage[i].id == nomUrl && cardStorage[i].couleur == couleurProduit){
            card[i].quantite = card[i].quantite + quantiteProduit;

            localStorage.removeItem('card');

            let objLineaNew = JSON.stringify(card);
            localStorage.setItem("card",objLineaNew);
            this.numeroDoublon = 1;

            window.alert("Article ajouté au Panier");
          }
          else{
            a = a+1;
            if (a==cardStorage.length){
              card.push({id: nomUrl, couleur: couleurProduit, quantite: quantiteProduit});

              localStorage.removeItem('card');

              let objLineaNew = JSON.stringify(card);
              localStorage.setItem("card",objLineaNew);

              window.alert("Article ajouté au Panier");
            }
          }
        }

      }
    }
    else{
      window.alert("Veuillez sélectionner la couleur du produit et sa quantité");
    }



  });
