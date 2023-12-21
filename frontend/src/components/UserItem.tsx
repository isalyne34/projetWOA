export default function UserItem({ user }: any) {
   return (
      <div className="card">
         <div className="card-body">
            <h5 className="card-title">{user.lastName}</h5>
            <h6 className="card-subtitle mb-2 text-muted">{user.email}</h6>
            <p className="card-text">{user.password}</p>
         </div>
      </div>
   );
}
