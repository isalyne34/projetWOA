import { ReactNode } from 'react';
import './layout.css';

export interface LayoutProps {
   children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
   return (
      <div>
         <Header />
         {children}
         <Footer />
      </div>
   );
}

function Header() {
   return (
      <div className="header">
         <div className="btn-group">
            <button type="button" className="btn btn-secondary dropdown-toggle bi bi-list" data-bs-toggle="dropdown" data-bs-display="static" aria-expanded="false">
               Menu
            </button>
            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-lg-start">
               <li>
                  <button className="dropdown-item" type="button">
                     Mes voyages
                  </button>
               </li>
               <li>
                  <button className="dropdown-item" type="button">
                     autres
                  </button>
               </li>
            </ul>
         </div>
         <div className="container">
            <div className="row text-center">
               <div className="col-8 test">
                  <h1 className="titre fw-bolder text-primary display-1">ShareAll</h1>
               </div>

               <div className="col-4">
                  <div className="container-fluid">
                     <figure className="figure">
                        <img src="img/img4.jpg" className="rounded-circle img-rectangle" alt="Photo profil" height="150" />
                        <figcaption className="figure-caption text-center">Prenom</figcaption>
                     </figure>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}

function Footer() {
   return (
      <div className="footer">

         <div className="py-4">
            <div className="container text-center">
               <p className="text-muted mb-0 py-2">Projet réalisé par Isalyne LLINARES--RAMES</p>
            </div>
         </div>
      </div>
   );
}
