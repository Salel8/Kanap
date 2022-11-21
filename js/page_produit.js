/*on récupère la dernière partie de l'url correspondant à l'id*/
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

/*on crée un objet pour stocker les informations de la commande*/
let quantiteProduit=0;
let couleurProduit="";
let commandeJson = {
  id : nomUrl,
  quantite : quantiteProduit,
  couleur : couleurProduit
};
/*on récupère les informations*/
const selectElementName = document.querySelector('#colors');

selectElementName.addEventListener('change', (event) => {
  if(!event.target.value){
    alert("Merci de sélectionner une couleur");
  }
  else{
    couleurProduit=event.target.value;
    return couleurProduit;
  }
});

const selectElementFor = document.querySelector('#quantity');

selectElementFor.addEventListener('change', (event) => {
  if(event.target.value==0){
    alert("Merci de sélectionner une quantité comprise entre 1 et 100");
  }
  else{
    quantiteProduit=0;
    if (event.target.value<=100 && event.target.value>0){
      quantiteProduit=parseInt(event.target.value);
    }

    return quantiteProduit;
  }
});

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
          if(card[i].quantite + quantiteProduit>100){
            card[i].quantite = 100;
            window.alert("Article ajouté au Panier à la quantité maximale de 100");
          } else{
            card[i].quantite = parseInt(card[i].quantite + quantiteProduit);
            window.alert("Article ajouté au Panier");
          }


          localStorage.removeItem('card');

          let objLineaNew = JSON.stringify(card);
          localStorage.setItem("card",objLineaNew);
          this.numeroDoublon = 1;

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
    window.alert("Veuillez sélectionner la couleur du produit et sa quantité comprise entre 1 et 100");
  }



});
