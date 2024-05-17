export const Query ={
    getclient: (parent, args, { pool }, info) => {
        const query = `SELECT * FROM CLIENT AS a 
        JOIN TYPES_CLIENT AS b 
        ON a.id_types_cli = b.id_types_cli`;
        return new Promise((resolve, reject) => {
          pool.query(query, (error, results) => {
            if (error) {
              reject(error); 
              return ;
            }
          
           
            // Assurez-vous que des données sont retournées
      if (results.rows.length === 0) {
        resolve([]); // Aucune donnée trouvée, retourner un tableau vide
        return;
      }

      // Récupérer toutes les lignes de résultats
      const client = results.rows.map(row => ({
        id_cli:row.id_cli,
     
        design_types: row.design_types,
        nom_cli: row.nom_cli,
        nif: row.nif,
        stat:row.stat,
        contact:row.contact,
        fonction_cont:row.fonction_cont,
        ville:row.ville,
        tel: row.tel,
        email:row.email
      }));

      resolve(client);
    });
  });
           
},
  

 /* facture */
 
 getfacture: (parent, args, { pool }, info) => {
    const query = `SELECT *
    FROM FACTURE AS e
    JOIN RESERVATION AS a ON e.id_res = a.id_res
    JOIN SALLE AS b ON a.id_salle = b.id_salle
    JOIN CLIENT AS y ON a.id_cli = y.id_cli`;
    return new Promise((resolve, reject) => {
      pool.query(query, (error, results) => {
        if (error) {
          reject(error); 
          return ;
        }
      
       
        // Assurez-vous que des données sont retournées
  if (results.rows.length === 0) {
    resolve([]); // Aucune donnée trouvée, retourner un tableau vide
    return;
  }

  // Récupérer toutes les lignes de résultats
  const facture = results.rows.map(row => ({
    id_fact:row.id_fact,
    nom_cli: row.id_cli,
    libelle: row.libelle,
    prix_jour: row.prix_jour,
    date_fact: row.date_fact,
    debut_date: row.debut_date,
    fin_date:row.fin_date,
    montant:row.montant,
    nombre_jour: row.nombre_jour,
    ville: row.ville,
    tel: row.tel,
    email: row.email
  }));

  resolve(facture);
});
});
      /*+ resolve(results);*/
      
   
  },

  /* CALENDRE */
            
  getcalendre: (parent, args, { pool }, info) => {
    const query = `SELECT * FROM CALENDRE AS a 
   JOIN SALLE AS c ON a.id_salle = c.id_salle`;
    return new Promise((resolve, reject) => {
      pool.query(query, (error, results) => {
        if (error) {
          reject(error); 
          return ;
        }
      
       
        // Assurez-vous que des données sont retournées
  if (results.rows.length === 0) {
    resolve([]); // Aucune donnée trouvée, retourner un tableau vide
    return;
  }

  // Récupérer toutes les lignes de résultats
  const reservation = results.rows.map(row => ({
 
    title: row.libelle,
    start:row.debut_date,
    end:row.fin_date,
  }));

  resolve(reservation);
});
});
    
       
  },
  /* RESERVATION */
  getreservation: (parent, args, { pool }, info) => {
    const query = `SELECT * FROM RESERVATION AS a 
    JOIN CLIENT AS b ON a.id_cli = b.id_cli 
    JOIN "USER" AS k ON a.id_user = k.id_user 
    JOIN SALLE AS c ON a.id_salle = c.id_salle`;
    return new Promise((resolve, reject) => {
      pool.query(query, (error, results) => {
        if (error) {
          reject(error); 
          return ;
        }
      
       
        // Assurez-vous que des données sont retournées
 /* if (results.rows.length === 0) {
    resolve([]); // Aucune donnée trouvée, retourner un tableau vide
    return;
  }*/

  // Récupérer toutes les lignes de résultats
  const reservation = results.rows.map(row => ({
    id_res:row.id_res,
    nom_cli: row.nom_cli,
    libelle: row.libelle,
    design_user: row.design_user,
    date_res:row.date_res,
    debut_date:row.debut_date,
    fin_date:row.fin_date,
    nb_jour:row.nb_jour
  }));

  resolve(reservation);
});
});
    
       
  },

/* get date  */
getDate: (parent, args, { pool }, info) => {
  const query = 'select * from calendre';
  return new Promise((resolve, reject) => {
    pool.query(query, (error, results) => {
      if (error) {
        reject(error); 
        return ;
      }
    
     
      // Assurez-vous que des données sont retournées
if (results.rows.length === 0) {
  resolve([]); // Aucune donnée trouvée, retourner un tableau vide
  return;
}

// Récupérer toutes les lignes de résultats
const role_user = results.rows.map(row => ({
  debut_date:row.debut_date,
  fin_date: row.fin_date
}));

resolve(role_user);
});
});
     
  
},

  /* role _user */

  getrole_user: (parent, args, { pool }, info) => {
    const query = 'select * from role_user';
    return new Promise((resolve, reject) => {
      pool.query(query, (error, results) => {
        if (error) {
          reject(error); 
          return ;
        }
      
       
        // Assurez-vous que des données sont retournées
  if (results.rows.length === 0) {
    resolve([]); // Aucune donnée trouvée, retourner un tableau vide
    return;
  }

  // Récupérer toutes les lignes de résultats
  const role_user = results.rows.map(row => ({
    id_role:row.id_role,
    design_role: row.design_role
  }));

  resolve(role_user);
});
});
       
    
  },




          
  /* salle */
  
  getsalle: (parent, args, { pool }, info) => {
    const query = 'select * from salle';
    return new Promise((resolve, reject) => {
      pool.query(query, (error, results) => {
        if (error) {
          reject(error); 
          return ;
        }
      
       
        // Assurez-vous que des données sont retournées
  if (results.rows.length === 0) {
    resolve([]); // Aucune donnée trouvée, retourner un tableau vide
    return;
  }

  // Récupérer toutes les lignes de résultats
  const salle = results.rows.map(row => ({
    id_salle: row.id_salle,
    libelle: row.libelle,
    etat: row.etat,
    prix_jour:row.prix_jour
  }));

  resolve(salle);
});
});
     
  }, 


  getsalle1: (parent, args, { pool }, info) => {
    const query = 'select * from salle';
    return new Promise((resolve, reject) => {
      pool.query(query, (error, results) => {
        if (error) {
          reject(error); 
          return ;
        }
      
       
        // Assurez-vous que des données sont retournées
  if (results.rows.length === 0) {
    resolve([]); // Aucune donnée trouvée, retourner un tableau vide
    return;
  }

  // Récupérer toutes les lignes de résultats
  const salle = results.rows.map(row => ({
    id_salle: row.id_salle,
    libelle: row.libelle,
    etat: row.etat,
    prix_jour:row.prix_jour
  }));

  resolve(salle);
});
});
     
  }, 




  /* types_client */

  gettypes_client: (parent, args, { pool }, info) => {
    const query = 'select * from types_client';
    return new Promise((resolve, reject) => {
      pool.query(query, (error, results) => {
        if (error) {
          reject(error); 
          return ;
        }
      
       
        // Assurez-vous que des données sont retournées
  if (results.rows.length === 0) {
    resolve([]); // Aucune donnée trouvée, retourner un tableau vide
    return;
  }

  // Récupérer toutes les lignes de résultats
  const types_client = results.rows.map(row => ({
    id_types_cli: row.id_types_cli,
    design_types: row.design_types
 
  }));

  resolve(types_client);
});
});
       
  },






  /* user */
        
  getuser: (parent, args, { pool }, info) => {
    const query = `SELECT id_user, design_user, design_role
    FROM "USER" AS a
    JOIN ROLE_USER AS b ON a.id_role = b.id_role`;
    return new Promise((resolve, reject) => {
      pool.query(query, (error, results) => {
        if (error) {
          reject(error); 
          return ;
        }
      
       
        // Assurez-vous que des données sont retournées
  if (results.rows.length === 0) {
    resolve([]); // Aucune donnée trouvée, retourner un tableau vide
    return;
  }

  // Récupérer toutes les lignes de résultats
  const user = results.rows.map(row => ({
    id_user: row.id_user,
    id_role: row.id_role,
    design_user: row.design_user,
    mdp:row.mdp
  }));

  resolve(user);
});
});
       
  }

  
  

  
    





}