export default function Voyage({ trip }: any) {
   return (
      <div className="card">
         <div className="card-body">
            <img src="assets/img_{trip.id}.jpeg" />
            <h5 className="card-title">{trip.titre}</h5>
            <p className="card-text">{trip.description}</p>
            <a href={`./Voyage/${trip.id}`} className="btn btn-primary">
               Voir
            </a>
         </div>
      </div>
   );
}
