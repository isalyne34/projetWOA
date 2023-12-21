export default function DescripDepense({ depense, partage }: any) {
   return (
      <>
         <h2>{depense.titre}</h2>
         <p>
            Payé par {partage.id_user}le {depense.date}
         </p>
         <h2>Montant : {depense.montant}</h2>
         <p>Pour 3 membres, dont moi:</p>
         <div>
            <div>
               <p>Membre1 (moi)</p>
            </div>
            <div>
               <p>41,00€</p>
            </div>
         </div>
         <div>
            <div>
               <p>Membre2</p>
            </div>
            <div>
               <p>41,00€</p>
            </div>
         </div>
         <div>
            <div>
               <p>Membre3</p>
            </div>
            <div>
               <p>41,00€</p>
            </div>
         </div>
      </>
   );
}
