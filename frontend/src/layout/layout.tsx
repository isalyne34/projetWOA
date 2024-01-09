import { ReactNode } from 'react';
import './layout.css';

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
   return (
      <div className="header">
         <div className="text-center">
            <h1 className="titre fw-bolder  display-1">ShareAll</h1>
         </div>
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
