const actualites = [
    {
        titre: "L’Atelier Secret des Couleurs",
        description: "Un espace pour peindre librement, laisser parler sa créativité et profiter d’un moment de détente !" +
            " À travers une création simple et un geste spontané, chacun peut explorer les couleurs à son rythme.",
        image: "assets/image/news/atelier-peinture.jpeg",
        alt: "Atelier Secret des couleurs",
        date: "du mardi au vendredi, de 9h à 20h / Le samedi de 9h à 12h",
        lieu: "",
        lienInfo: "",
        lienInscription: "",
        emailInscription: "",
        telephoneInscription: "",
        tarif: "0,50€ à 2€",
        visible: true
    },
    {
        titre: "Aide aux devoirs & Atelier artistique",
        description: "Après l’école, un temps pour apprendre, créer et s’épanouir ! " +
            "Les enfants bénéficient d’un accompagnement aux devoirs, puis peuvent explorer leur créativité à travers des activités artistiques dans une ambiance conviviale. " +
            "Goûter disponible sur place : gourmandise et boissons à 0,50€",
        image: "assets/image/news/devoirs-oct.jpeg",
        alt: "Aide au devoirs & Atelier artistique les mardis et vendredis",
        date: "les mardis et vendredis, de 16h45 à 18h30",
        lieu: "",
        lienInfo: "",
        lienInscription: "",
        emailInscription: "contact@artmovible.fr",
        telephoneInscription: "06 59 15 97 39",
        tarif: "15€ par pers. et par séance",
        visible: true
    },
    {
        titre: "Troisième actualité de test",
        description: "Une troisième actualité pour tester la navigation.",
        image: "https://placehold.co/1600x1200?text=Actualite+3",
        alt: "Image temporaire de la troisième actualité",
        date: "25 octobre 2026",
        lieu: "Artmovible",
        lienInfo: "",
        lienInscription: "",
        emailInscription: "inscription@exemple.fr",
        telephoneInscription: "",
        tarif: "",
        visible: false
    }
];

// Éléments HTML
const rubrique = document.getElementById("actualites");
const carrousel = document.getElementById("actualites-carrousel");

// Actualités à afficher
const actualitesVisibles = actualites.filter(
    (actualite) => actualite.visible
);

if (rubrique && carrousel && actualitesVisibles.length > 0) {

    const total = actualitesVisibles.length;
    let indexActuel = 0;

    // Permet au CSS de connaître le nombre d'actualités
    carrousel.dataset.count = String(total);

    // Conteneur des cartes
    const scene = document.createElement("div");
    scene.className = "actualites-scene";

    // Pagination
    const pagination = document.createElement("div");
    pagination.className = "actualites-pagination";
    pagination.setAttribute("role", "group");
    pagination.setAttribute("aria-label", "Choisir une actualité");

    const boutonsPagination = [];

    // Créer une carte pour chaque actualité
    const cartes = actualitesVisibles.map(creerCarteActualite);

    // Aperçus latéraux utilisés avec 3 actualités
    const apercuPrecedent = document.createElement("img");
    apercuPrecedent.className =
        "actualites-apercu actualites-apercu-precedent";
    apercuPrecedent.alt = "";
    apercuPrecedent.setAttribute("aria-hidden", "true");
    apercuPrecedent.hidden = total < 3;

    const apercuSuivant = document.createElement("img");
    apercuSuivant.className =
        "actualites-apercu actualites-apercu-suivant";
    apercuSuivant.alt = "";
    apercuSuivant.setAttribute("aria-hidden", "true");
    apercuSuivant.hidden = total < 3;

    // Construire la scène
    scene.append(
        apercuPrecedent,
        ...cartes.map((carte) => carte.element),
        apercuSuivant
    );

    carrousel.replaceChildren(scene);

    // Créer la pagination uniquement s'il y a plusieurs actualités
    if (total > 1) {
        actualitesVisibles.forEach((actualite, index) => {
            const bouton = document.createElement("button");
            bouton.type = "button";
            bouton.textContent = String(index + 1).padStart(2, "0");

            bouton.setAttribute(
                "aria-label",
                `Afficher : ${actualite.titre}`
            );

            bouton.addEventListener("click", () => {
                allerAActualite(index);
            });

            pagination.append(bouton);
            boutonsPagination.push(bouton);
        });

        carrousel.after(pagination);
    }

    // Créer une carte et tous ses éléments
    function creerCarteActualite(actualite, index) {
        const carte = document.createElement("article");
        carte.className = "actualite-carte";

        const visuel = document.createElement("div");
        visuel.className = "actualite-visuel";

        const image = document.createElement("img");
        image.className = "actualite-image";
        image.src = actualite.image;
        image.alt = actualite.alt || actualite.titre;

        visuel.append(image);

        const titre = document.createElement("h3");
        titre.textContent = actualite.titre;

        const description = document.createElement("p");
        description.className = "actualite-description";
        description.id = `actualite-description-${index}`;
        description.textContent = actualite.description;

        const boutonSuite = document.createElement("button");
        boutonSuite.type = "button";
        boutonSuite.className = "actualite-voir-plus";
        boutonSuite.textContent = "Lire la suite";
        boutonSuite.hidden = true;
        boutonSuite.setAttribute("aria-expanded", "false");
        boutonSuite.setAttribute("aria-controls", description.id);

        boutonSuite.addEventListener("click", () => {
            const ouvert = description.classList.toggle("is-expanded");

            boutonSuite.textContent =
                ouvert ? "Réduire" : "Lire la suite";

            boutonSuite.setAttribute(
                "aria-expanded",
                String(ouvert)
            );
        });

        // Informations pratiques
        const informations = document.createElement("p");
        informations.className = "actualite-informations";

        const details = [
            actualite.date,
            actualite.lieu,
            actualite.tarif
        ].filter(Boolean);

        informations.textContent = details.join(" · ");
        informations.hidden = details.length === 0;

        // Liens facultatifs
        const liens = document.createElement("div");
        liens.className = "actualite-liens";

        function ajouterLien(adresse, texte, classe) {
            const lien = document.createElement("a");
            lien.href = adresse;
            lien.textContent = texte;
            lien.className = classe;
            liens.append(lien);
        }

        if (actualite.lienInfo) {
            ajouterLien(
                actualite.lienInfo,
                "En savoir plus",
                "bouton bouton-secondaire"
            );
        }

        if (actualite.lienInscription) {
            ajouterLien(
                actualite.lienInscription,
                "S'inscrire",
                "bouton bouton-principal"
            );
        }

        if (actualite.emailInscription) {
            ajouterLien(
                `mailto:${actualite.emailInscription}`,
                `Par e-mail : ${actualite.emailInscription}`,
                "actualite-contact"
            );
        }

        if (actualite.telephoneInscription) {
            const numero = actualite.telephoneInscription.replace(
                /[^\d+]/g,
                ""
            );

            ajouterLien(
                `tel:${numero}`,
                `Par téléphone : ${actualite.telephoneInscription}`,
                "actualite-contact"
            );
        }

        // Flèches et navigation tactile
        if (total > 1) {
            const precedent = document.createElement("button");
            precedent.type = "button";
            precedent.className = "actualites-fleche";
            precedent.textContent = "‹";
            precedent.setAttribute(
                "aria-label",
                "Actualité précédente"
            );

            const suivant = document.createElement("button");
            suivant.type = "button";
            suivant.className = "actualites-fleche";
            suivant.textContent = "›";
            suivant.setAttribute(
                "aria-label",
                "Actualité suivante"
            );

            precedent.addEventListener("click", () => {
                changerActualite(-1);
            });

            suivant.addEventListener("click", () => {
                changerActualite(1);
            });

            visuel.append(precedent, suivant);

            let departX = null;
            let departY = null;

            image.addEventListener("pointerdown", (evenement) => {
                if (evenement.pointerType !== "touch") return;

                departX = evenement.clientX;
                departY = evenement.clientY;
            });

            image.addEventListener("pointerup", (evenement) => {
                if (departX === null) return;

                const distanceX = evenement.clientX - departX;
                const distanceY = evenement.clientY - departY;

                departX = null;
                departY = null;

                if (
                    Math.abs(distanceX) < 50 ||
                    Math.abs(distanceX) <= Math.abs(distanceY)
                ) {
                    return;
                }

                changerActualite(distanceX < 0 ? 1 : -1);
            });

            image.addEventListener("pointercancel", () => {
                departX = null;
                departY = null;
            });
        }

        carte.append(
            visuel,
            titre,
            description,
            boutonSuite,
            informations,
            liens
        );

        return {
            element: carte,
            description,
            boutonSuite
        };
    }

    // Naviguer avec les flèches
    function changerActualite(sens) {
        const focusSurFleche =
            document.activeElement?.classList.contains("actualites-fleche");

        const nouvelIndex = (indexActuel + sens + total) % total;
        allerAActualite(nouvelIndex);

        if (focusSurFleche) {
            const fleches = cartes[indexActuel].element.querySelectorAll(
                ".actualites-fleche"
            );

            fleches[sens < 0 ? 0 : 1]?.focus();
        }
    }

    // Sélectionner une actualité
    function allerAActualite(index) {
        // Replier la description de l'ancienne actualité
        const ancienneCarte = cartes[indexActuel];

        ancienneCarte.description.classList.remove("is-expanded");
        ancienneCarte.boutonSuite.textContent = "Lire la suite";
        ancienneCarte.boutonSuite.setAttribute(
            "aria-expanded",
            "false"
        );

        indexActuel = index;
        afficherActualite();
    }

    // Mettre à jour l'affichage
    function afficherActualite() {
        cartes.forEach((carte, index) => {
            carte.element.classList.toggle(
                "is-active",
                index === indexActuel
            );
        });

        // Actualités voisines pour le carrousel à 3
        if (total >= 3) {
            const indexPrecedent = (indexActuel - 1 + total) % total;
            const indexSuivant = (indexActuel + 1) % total;

            apercuPrecedent.src =
                actualitesVisibles[indexPrecedent].image;

            apercuSuivant.src =
                actualitesVisibles[indexSuivant].image;
        }

        // Mettre à jour la pagination
        boutonsPagination.forEach((bouton, index) => {
            const actif = index === indexActuel;

            bouton.classList.toggle("is-active", actif);
            bouton.setAttribute("aria-pressed", String(actif));
        });

        requestAnimationFrame(mettreAJourBoutonsSuite);
    }

    // Afficher "Lire la suite" uniquement si nécessaire
    function mettreAJourBoutonsSuite() {
        cartes.forEach((carte) => {
            if (getComputedStyle(carte.element).display === "none") {
                return;
            }

            if (carte.description.classList.contains("is-expanded")) {
                return;
            }

            carte.boutonSuite.hidden =
                carte.description.scrollHeight <=
                carte.description.clientHeight + 1;
        });
    }

    // Recalculer lorsque la largeur de l'écran change
    window.addEventListener("resize", () => {
        requestAnimationFrame(mettreAJourBoutonsSuite);
    });

    // Affichage initial
    rubrique.hidden = false;
    afficherActualite();
    if (document.fonts) {
        document.fonts.ready.then(() => {
            requestAnimationFrame(mettreAJourBoutonsSuite);
        });
    }
}