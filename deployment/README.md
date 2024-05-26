# Deployment instructions

## PostgreSQL

The backend needs a PostgreSQL database to run. To set up this database, you can use the bitnami's PostgreSQL helm chart:

```bash
helm repo add bitnami https://charts.bitnami.com/bitnami
```

Installing the helm char is as easy as:

```bash
helm install postgresql bitnami/postgresql --set global.postgresql.auth.username=postgres,global.postgresql.auth.password=postgres,global.postgresql.auth.database=postgres --set initdbScripts."init\.sql"="drop table if exists participe;drop table if exists depense;drop table if exists voyage;drop table if exists utilisateur;create table utilisateur(id_utilisateur SERIAL primary key\,prenom varchar(50)\,nom varchar(50)\,email varchar(100)\,id_voyage integer);create table voyage(id_voyage SERIAL primary key \,titre varchar(50)\,description varchar(100));create table depense(id_depense SERIAL  primary key \,titre varchar(50)\,description varchar(50)\,montant decimal\,date_crea date\,id_voyage integer\,id_utilisateur integer);"
```

If the backend crashes because of unfound tables, port forward the postgresql service and run the init script from there.

Then, since the deployement in local, you will need to do some tricks to get it running properly on your browser. For the frontend and the backend, we will:

-  Port forward the service to your machine
-  Change /etc/hosts to have proper domain names

First, apply the kustomizations:

```
cd deployment/frontend
kubectl apply -k .
```

```
cd deployment/backend
kubectl apply -k .
```

Next, port forward the two services:

kubectl port-forward service/frontend-service 40000:80
kubectl port-forward service/backend-service 50000:3000

Last thing to do is to setup the hosts, to mimic having a domain name.
In your /etc/hosts, add a line

```
127.0.0.1 api.example.com
```

This will redirect all calls to api.example.com to your local machine.

You should be able to go to localhost:40000 and start using the site.
