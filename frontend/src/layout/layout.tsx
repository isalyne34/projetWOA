import { ReactNode, useEffect, useState } from 'react';
import './layout.css';
import { API_URL } from '../config/app';
import CreerVoyage from '../components/creerVoyage';
import { Dropdown, Nav, NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';

interface Voyage {
   id_voyage: number;
   titre: string;
   description: string;
   depenses: [];
}

export interface LayoutProps {
   children: ReactNode;
}
export default function Layout({ children }: LayoutProps) {
   return (
      <div className="body-content">
         <Header />
         <div className="fzfzf">{children}</div>
         <Footer />
      </div>
   );
}

function Header() {
   const [voyages, setVoyage] = useState([]);

   useEffect(() => {
      async function fetchVoyage() {
         const response = await fetch(`${API_URL}/voyages`);
         const data = await response.json();
         setVoyage(data);
      }

      fetchVoyage();
   }, []);
   console.log(voyages);
   return (
      <div className="header">
         <div>
            <img className="logo w-50" src="/assets/logoShareAll.png" />
         </div>

         <Nav defaultActiveKey="/" className=" justify-content-between align-items-center">
            <Nav.Item>
               <Nav.Link>
                  <Link to={`/`}>
                     <button type="button" className="btn button btn-primary">
                        {' '}
                        Accueil
                     </button>
                  </Link>
               </Nav.Link>
            </Nav.Item>

            <Nav.Item>
               <Dropdown>
                  <Dropdown.Toggle id="dropdown-basic">Mes ShareAll</Dropdown.Toggle>

                  <Dropdown.Menu>
                     {voyages.map((voyage: Voyage) => (
                        <Link key={voyage.id_voyage} to={`/voyage/${voyage.id_voyage}`}>
                           <span className="dropdown-item">{voyage.titre} </span>
                        </Link>
                     ))}
                  </Dropdown.Menu>
               </Dropdown>
            </Nav.Item>

            <Nav.Item>
               <Nav.Link>
                  {' '}
                  <CreerVoyage />
               </Nav.Link>
            </Nav.Item>
            <Nav.Item>
               <Nav.Link>
                  <Link to={`/aide`}>
                     <button type="button" className="btn button btn-primary">
                        {' '}
                        Aide
                     </button>
                  </Link>
               </Nav.Link>
            </Nav.Item>
         </Nav>
      </div>
   );
}

function Footer() {
   return (
      <div className="footer">
         <div className=" text-center">
            <p className="text ">Projet réalisé par Isalyne LLINARES--RAMES & d'autres contributeurs ...</p>
         </div>
      </div>
   );
}
