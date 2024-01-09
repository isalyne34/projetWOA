import { useEffect, useState } from 'react';
import { API_URL } from '../config/app';

export default function CardPartage(props: { id_utilisateur: number; numTrip: number }) {
    console.log('id_utilisateur', props.id_utilisateur);
    console.log('numTrip', props.numTrip);
    //utilisateur type
    const defaultUtilisateur = {
        id_utilisateur: 0,
        prenom: '',
        nom: '',
        email: '',
    };
    //recuperer l'utilisateur dont l'id est id_utilisateur dans la base de données située dans API_URL
    const [utilisateur, setUtilisateur] = useState(defaultUtilisateur);
    useEffect(() => {
        fetch(`${API_URL}/users/${props.id_utilisateur}`)
            .then((response) => response.json())
            .then((data) => setUtilisateur(data))
            .catch((error) => console.error('Erreur:', error));
    }, []);
    console.log('utilisateur', utilisateur);


    // recuperer le partage des dépenses en fonction du nombre d'utilisateurs
    const [partage, setPartage] = useState(0);
    useEffect(() => {
        fetch(`${API_URL}/voyage/${props.numTrip}/partage`)
            .then((response) => response.json())
            .then((data) => setPartage(data))
            .catch((error) => console.error('Erreur:', error));
    });

    //recuperer le total des depenses pour un utilisateur dans un voyage
    const [totalUtilisateur, setTotalUtilisateur] = useState(0);
    useEffect(() => {
        fetch(`${API_URL}/voyage/${props.numTrip}/totalDepensesUtilisateur/${props.id_utilisateur}`)
            .then((response) => response.json())
            .then((data) => setTotalUtilisateur(data))
            .catch((error) => console.error('Erreur:', error));
    });

    const montant = partage - totalUtilisateur;

    
    return (
        <div className="card">
            <div className="card-body">
                {/* Nom et prenom */}
                <p>
                    {utilisateur.prenom} {utilisateur.nom}
                </p>
                <p>Montant : {montant}</p>


                {/*  ce qu'il doit a qui */}
                <p>
                </p>
            </div>
        </div>
    );
}
        
