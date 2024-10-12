import { Request, Response } from 'express';
import { justifyLine } from '../utils/justify';

export const justifyText = (req: Request, res: Response) => {
    const text = req.body.text;
    
    try {
        // On vérifie les doubles retour lignes pour qu'on les transformes à une seule retour ligne.
        const inputLines = text.split(/\n\n/);
        const justifiedLines: string[] = [];

        inputLines.forEach((line: string) => {
            const inputWords = line.split(/\s+/);  // On met les mots dans un tableau afin de les mettre dans des lignes de longueur max = 80
            let currentLine = "";
            const lines: string[] = [];

            inputWords.forEach((word: string) => {
                if ((currentLine + word).length + 1 <= 80) {
                    // Si il y a de l'espace pour ce mot, on l'ajoute
                    currentLine += (currentLine ? " " : "") + word;
                } else {
                    // Sinon, on l'ajoute dans la nouvelle ligne
                    lines.push(justifyLine(currentLine));
                    currentLine = word;
                }
            });

            // On ajoute la dernière ligne
            if (currentLine) lines.push(justifyLine(currentLine));

            justifiedLines.push(lines.join("\n"));
        });

        // Puisque le résultat final est un tableau, on applique join une dernière fois
        const justifiedText = justifiedLines.join("\n");

        res.set('Content-Type', 'text/plain');
        res.send(justifiedText);
    } catch (error) {
        res.status(400).send("Bad text content.");
    }
};