// Cette fonction permet de completer la ligne par des espaces si ils manquent
export const justifyLine = (line: string): string => {
    // On sépare les lignes dans un tableau "words"
    const words = line.split(" ");

    // Vérification si il n'ya qu'un seul mot dans la ligne
    if (words.length === 1) return line;
  
    // Calcul de nombre des espaces restant
    let nbTotalSpaces = 80 - line.length;

    // On calcule le nombre d'espace restand par le nombre de mot dans cette ligne
    // Afin de mettre des espaces d'une manière équivalente entre les mots
    let nbSpacesPerWord = Math.floor(nbTotalSpaces / (words.length - 1));
    
    // Les espaces restantes de la division, on les ajoutes du début jusqu'à la fin du nbExtraSpaces
    let nbExtraSpaces = nbTotalSpaces % (words.length - 1);
  
    let justifiedLine = "";

    // TODO : améliorer cette logique pour qu'elle corresponde au résultat requis
        // Idée : créer un tableau contenant une valeur (soit 1 soit 0)
            // Si la valeur est différente de zéro, on ajoute un espace à cet index
            // Sinon, on continue
        
        // Comment savoir les positions contenant 1?
            // On doit choisir un algorithme spécifique qui ajoute les esapces selon une certaine logique à voir.
    // Initialisation du tableau pour les espaces supplémentaires
    let extraSpaceArray = new Array(words.length - 1).fill(0); // Tableau avec des 0 de taille (words.length - 1)
    
    if (nbExtraSpaces > 0) {
        let step = Math.floor((words.length - 1) / nbExtraSpaces); // Calcul du step
        
        // Distribution des 1 dans le tableau
        let index = 0;
        while (nbExtraSpaces > 0) {
            extraSpaceArray[index] = 1;
            index += step; // Avancer de "step" positions
            nbExtraSpaces--;
        }
    }

    // On boucle pour construire la ligne avec les espaces justifiés
    words.forEach((word, index) => {
        justifiedLine += (justifiedLine ? " " : "") + word;

        if (index < words.length - 1) {
            // Ajouter les espaces de base d'une façon
            justifiedLine += " ".repeat(nbSpacesPerWord);
            
            // Ajouter un espace supplémentaire si le tableau contient 1
            if (extraSpaceArray[index] === 1) {
                justifiedLine += " ";
            }
        }
    });

    return justifiedLine;
};