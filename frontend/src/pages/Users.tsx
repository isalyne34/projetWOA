import { useEffect, useState } from 'react';
import { API_URL } from '../config/app';
import UserItem from '../components/UserItem';
import Layout from '../layout/layout';

export default function Users() {
   const [users, setUser] = useState([]);

   useEffect(() => {
      async function fetchUsers() {
         const response = await fetch(`${API_URL}/users`);
         const data = await response.json();
         setUser(data);
      }

      fetchUsers();
   }, []);

   return (
      <Layout>
         <div>
            <h1>Users</h1>
            {users.map((user: any) => {
               return <UserItem user={user} />;
            })}
         </div>
      </Layout>
   );
}
