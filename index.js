const customCursor = document.getElementById("loading-cursor");

// Sélection de l'élément fluff-container
const fluffContainer = document.querySelector('.fluff-container');
const fluffStyle = fluffContainer.style;

// Fonction pour gérer l'intersection de l'élément fluff-container avec la fenêtre
const handleIntersection = (entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      fluffStyle.visibility = 'visible';
      fluffContainer.classList.add('appearfl');
    } else {
      fluffStyle.visibility = 'hidden';
      fluffContainer.classList.remove('appearfl');
    }
  });
};

// Options pour l'IntersectionObserver
const options = {
  root: null,
  rootMargin: '0px',
  threshold: 0.5
};

// Création et observation de l'IntersectionObserver pour fluff-container
const observer = new IntersectionObserver(handleIntersection, options);
observer.observe(fluffContainer);

// Initialise l'état de visibilité de l'élément fluff-container
fluffStyle.visibility = 'hidden';
const initialEntry = {
  isIntersecting: fluffContainer.getBoundingClientRect().top < window.innerHeight,
  target: fluffContainer
};
handleIntersection([initialEntry], observer);

// Ajout d'écouteurs d'événements pour les transitions et les interactions avec l'élément ayant l'ID "title"
document.addEventListener("DOMContentLoaded", () => {
  const title = document.getElementById("title");

  // Fonction pour gérer la fin de la transition d'opacité pour l'élément 'title'
  const handleTransitionEnd = event => {
    if (event.propertyName === "opacity") {
      title.classList.add("animation-finished");

      title.addEventListener("mouseover", () => {
        title.classList.add("hovered");
      });

      title.addEventListener("mouseout", () => {
        title.classList.remove("hovered");
      });
    }
  };
});

// Fonction pour basculer entre les traductions de texte
const toggleTranslation = () => {
  const textsFr = document.querySelectorAll(".text-fr");
  const textsEn = document.querySelectorAll(".text-en");
  const translationButton = document.getElementById("translation-button");

// Fonction pour basculer la classe entre 'text-active' et 'text-hidden'
const toggleClass = (element) => {
  element.classList.toggle("text-active");
  element.classList.toggle("text-hidden");
  };
  
  // Basculer la visibilité des textes en français et en anglais
  textsFr.forEach(toggleClass);
  textsEn.forEach(toggleClass);
  
  // Basculer la classe du bouton de traduction
  translationButton.classList.toggle("text-fr-active");
  };
  
  // Ajout d'écouteurs d'événements pour la barre de navigation et le curseur personnalisé
  window.addEventListener("load", () => {
  // Ajouter la classe "visible" à la barre de navigation
  document.querySelector(".custom-top").classList.add("visible");
  });
  
  document.addEventListener("DOMContentLoaded", () => {
  
    const showCustomCursor = () => {
      customCursor.style.display = "block";
    };
  
    const hideCustomCursor = () => {
      customCursor.style.display = "none";
    };
  
    // Fonction pour mettre à jour la position du curseur personnalisé
    const updateCursor = (e) => {
      customCursor.style.left = e.pageX + "px";
      customCursor.style.top = e.pageY + "px";
    };
  
    // Affiche le curseur personnalisé lors du déplacement de la souris avec debounce
    document.addEventListener("mousemove", debounce(updateCursor, 16)); // 16ms correspond à environ 60fps
  
    // Cache le curseur personnalisé lorsqu'il quitte la fenêtre
    document.addEventListener("mouseleave", hideCustomCursor);
  
    // Affiche le curseur personnalisé lorsqu'il entre dans la fenêtre
    document.addEventListener("mouseenter", showCustomCursor);
  });
  
  // Initialisation de Locomotive Scroll
  const scroll = new LocomotiveScroll({
  el: document.querySelector("[data-scroll-container]"),
  smooth: true,
  smoothMobile: true,
  });
  
  // Mise à jour de Locomotive Scroll lors du redimensionnement de la fenêtre
  new ResizeObserver(() => scroll.update()).observe(
  document.querySelector("[data-scroll-container]")
  );
  
  // Gestion du défilement vers les sections lors du clic sur les liens de navigation
  const links = document.querySelectorAll(".nav-link");
  links.forEach((link) => {
  link.addEventListener("click", (e) => {
  e.preventDefault();
  scroll.scrollTo(link.getAttribute("href"));
  });
  });
  
  // Gestion du preloader
  const loader = document.querySelector(".loader");
  window.addEventListener("load", vanish);
  function vanish() {
  loader.classList.add("disappear");
  }
  
  // Sélection des éléments de la barre de navigation et du titre
  const nav = document.querySelector("nav");
  const herot = document.querySelector(".hero-title-container");
  
  // Ajout des classes "appear" et "titleappear" après la fin de l'animation du preloader
  loader.addEventListener("animationend", () => {
  nav.classList.add("appear");
  herot.classList.add("titleappear");
  });
  
  // Gestion de l'ajout et de la suppression de la classe 'pointer-enabled' en fonction de la visibilité de l'élément
  let pointerEnabled = false;
  scroll.on("scroll", () => {
  const sectionImgd = document.querySelector(".section-imgd");

  if (sectionImgd.classList.contains("is-inview")) {
    if (!sectionImgd.classList.contains("pointer-enabled") && !pointerEnabled) {
    setTimeout(() => {
    sectionImgd.classList.add("pointer-enabled");
    console.log("Classe pointer-enabled ajoutée !");
    }, 1000);
    pointerEnabled = true;
    }
    } else {
    if (sectionImgd.classList.contains("pointer-enabled")) {
    sectionImgd.classList.remove("pointer-enabled");
    console.log("Classe pointer-enabled retirée !");
    pointerEnabled = false;
    }
    }
    });
    
// Fonction debounce pour éviter l'appel trop fréquent de la fonction
function debounce(func, wait, immediate) {
  let timeout;
  return function () {
    const context = this,
      args = arguments;
    const later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

// Fonction pour mettre à jour la position du curseur personnalisé
const updateCursor = (e) => {
  customCursor.style.left = e.pageX + "px";
  customCursor.style.top = e.pageY + "px";
};

// Affiche le curseur personnalisé lors du déplacement de la souris avec debounce
document.addEventListener("mousemove", debounce(updateCursor, 16)); // 16ms correspond à environ 60fps
