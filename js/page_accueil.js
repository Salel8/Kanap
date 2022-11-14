/*on récupère les données du fichier json*/
const reponse = fetch("http://localhost:3000/api/products").then((response)=> response.json()

).then((produits)=>{
  /*on se place à l'endroit où l'on doit ajouter les fiches et on les ajoute*/
  const sectionFiches = document.getElementById("items");

  /*on boucle pour avoir une répétion dynamique*/
  for (let i=0; i < produits.length; i++){

    /*on crée nos éléments*/
    const imageElement = document.createElement("img");
    imageElement.src = produits[i].imageUrl;
    imageElement.setAttribute("alt", produits[i].altTxt);

    const nomElement = document.createElement("h3");
    nomElement.innerText = produits[i].name;
    nomElement.classList.add("productName");

    const descriptionElement = document.createElement("p");
    descriptionElement.innerText = produits[i].description;
    descriptionElement.classList.add("productDescription");

    const article = document.createElement("article");
    article.appendChild(imageElement);
    article.appendChild(nomElement);
    article.appendChild(descriptionElement);

    /*on crée un lien pour aller dans la page produit*/
    const lien = document.createElement("a");
    lien.setAttribute("href", "./product.html?id=" + produits[i]._id);
    lien.appendChild(article);

    /*on affiche chaque produit dans le DOM*/
    sectionFiches.appendChild(lien);
  }



});
