import CreerDepense from "./creerDepense";
import CreerMembreComponent from "./creerMembrecontent";

export default function ListeDepenses(voyage: any) {
    return (
        <div>
            <p>Depense</p>
            
            {/* tableau des differentes Depenses */}
            <CreerDepense></CreerDepense>
         <CreerMembreComponent></CreerMembreComponent>
        </div>
    );
}