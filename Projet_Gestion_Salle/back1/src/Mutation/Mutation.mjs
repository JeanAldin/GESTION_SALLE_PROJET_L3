import { genSalt } from 'bcrypt';
import { hash } from 'bcrypt';
import { compare } from 'bcrypt';

import jwt from 'jsonwebtoken';
export const Mutation ={

  /*client */


  insertclient: (parent, {addclientInput}, { pool }, info) => {
        console.log("efa tonga aty  client") 
    const { id_types_cli,nom_cli, nif,stat,contact,fonction_cont,ville,tel,email } = addclientInput; // Récupération des données d'entrée
    const query = 'INSERT INTO  client (id_types_cli,nom_cli, nif,stat,contact,fonction_cont,ville,tel,email ) VALUES ($1, $2,$3,$4, $5,$6,$7, $8,$9) '; 
    const values = [id_types_cli,nom_cli, nif,stat,contact,fonction_cont,ville,tel,email ];
  
    return new Promise((resolve, reject) => {
      pool.query(query, values, (error, results) => {
        if (error) {
          reject(error);
          console.log(error)
          return;
        }
        // Renvoyer l'ID de l'enregistrement inséréupdatePerson(id:Int !,updatePersonInput: PersonUpdateInput !):Person!
        resolve({ id_types_cli,nom_cli, nif,stat,contact,fonction_cont,ville,tel,email  });
      });
    });
  },

 updateclient: (parent, {updateclientInput}, { pool }, info) => {
const { id_cli, id_types_cli,nom_cli, nif,stat,contact,fonction_cont,vile,tel,email } = updateclientInput; // Récupération des données d'entrée
const query = 'UPDATE client SET id_types_cli = $1, nom_cli = $2,nif= $3, stat = $4 ,contact= $5,fonction_cont = $6,ville= $7, tel = $8,email=$9  WHERE id_cli = $10'; 
const values = [id_types_cli,nom_cli, nif,stat,contact,fonction_cont,vile,tel,email , id_cli ];

return new Promise((resolve, reject) => {
pool.query(query, values, (error, results) => {
  if (error) {
    reject(error);
    return;
  }
  // Vérifier si une ligne a été modifiée avec succès
  if (results.affectedRows === 0) {
    reject(new Error(`Aucune entrée trouvée avec l'ID ${id}`));
    return;
  }
  // Renvoyer l'ID de l'enregistrement modifié
  resolve({ id, Nom, Prenom });
});
});
},


deleteclient: (parent, {id_cli}, { pool}, info) => {
// Récupération de l'ID de l'entrée à supprimerconst id  = id.input;
const query = 'DELETE FROM client WHERE id_cli = $1';
const values = [id_cli];

return new Promise((resolve, reject) => {
  pool.query(query, values, (error, results) => {
    if (error) {
      reject(error);
      return;
    }
    // Vérifier si une ligne a été supprimée avec succès
    if (results.affectedRows === 0) {
      reject(new Error(`Aucune entrée trouvée avec l'ID ${id}`));
      return;
    }
    // Renvoyer l'ID de l'enregistrement supprimé
    resolve({ id_cli });
  });
});
},
  
  
 /* facture */
 insertfacture: (parent, {addfactureInput}, { pool }, info) => {
         
  const { id_cli,id_res,date_fact,montant,nombre_jour} = addfactureInput; // Récupération des données d'entrée
  const query2 = 'INSERT INTO  facture (id_cli,id_res,date_fact,montant,nombre_jour) VALUES ($1, $2,$3,$4,$5) '; 
  const values2 = [ id_cli,id_res,date_fact,montant,nombre_jour];

  return new Promise((resolve, reject) => {
    pool.query(query, values, (error, results) => {
      if (error) {
        reject(error);
        return;
      }
      // Renvoyer l'ID de l'enregistrement inséréupdatePerson(id:Int !,updatePersonInput: PersonUpdateInput !):Person!
      resolve({ id, Nom, Prenom  });
    });
  });
},

updatefacture: (parent, {updatefactureInput}, { pool }, info) => {
const { id_fact,id_cli,id_res,date_fact,montant,nombre_jour } = updatefactureInput; // Récupération des données d'entrée
const query = 'UPDATE facture SET id_cli = $1, id_res= $2,date_fact=$3,montant=$4,nombre_jour=$5, WHERE id_fact = $6'; 
const values = [ id_cli,id_res,date_fact,montant,nombre_jour, id_fact];

return new Promise((resolve, reject) => {
pool.query(query, values, (error, results) => {
if (error) {
  reject(error);
  return;
}
// Vérifier si une ligne a été modifiée avec succès
if (results.affectedRows === 0) {
  reject(new Error(`Aucune entrée trouvée avec l'ID ${id_fact}`));
  return;
}
// Renvoyer l'ID de l'enregistrement modifié
resolve({ id, Nom, Prenom });
});
});
},


deletefacture: (parent, {id_fact}, { pool}, info) => {
// Récupération de l'ID de l'entrée à supprimerconst id  = id.input;
const query = 'DELETE FROM facture WHERE id_fact = $1';
const values = [id_fact];

return new Promise((resolve, reject) => {
pool.query(query, values, (error, results) => {
  if (error) {
    reject(error);
    return;
  }
  // Vérifier si une ligne a été supprimée avec succès
  if (results.affectedRows === 0) {
    reject(new Error(`Aucune entrée trouvée avec l'ID ${id_fact}`));
    return;
  }
  // Renvoyer l'ID de l'enregistrement supprimé
  resolve({ id_fact });
});
});
},



/* reservation  */
insertreservation: (parent, {addreservationInput}, { pool }, info) => {
  console.log(" efa tonga aty Reservation")

  const {id_cli,id_salle,prix_jour,id_user,date_res,debut_date,fin_date} = addreservationInput; // Récupération des données d'entrée
  console.log("donne ",id_cli,id_salle,prix_jour,id_user,date_res,debut_date,fin_date)
 
  const debutDate = new Date(debut_date);
  const finDate = new Date(fin_date);

  // Calcul de la différence en millisecondes
  const differenceMs = finDate - debutDate;
 // Conversion de la différence en jours
const differenceJours = differenceMs / (1000 * 60 * 60 * 24);
const value =differenceJours +1    
const montant1 = value*prix_jour
const query = 'INSERT INTO  reservation ( id_cli,id_salle,id_user,date_res,debut_date,fin_date,nb_jour) VALUES ($1, $2,$3,$4, $5,$6,$7) '; 
  const query1 = 'INSERT INTO  calendre ( id_cli,id_salle,id_user,date_res,debut_date,fin_date,nb_jour) VALUES ($1, $2,$3,$4, $5,$6,$7) '; 
  const query2 = 'INSERT INTO  facture (id_cli,id_res,date_fact,montant,nombre_jour) VALUES ($1, $2,$3,$4,$5) '; 
  const values2 = [ id_cli,1,date_res,montant1,value];

  const values = [ id_cli,id_salle,id_user,date_res,debut_date,fin_date,value];

  return new Promise((resolve, reject) => {
    pool.query(query, values, (error, results) => {
      if (error) {
        reject(error);
        return;
      }
    
      // Renvoyer l'ID de l'enregistrement inséréupdatePerson(id:Int !,updatePersonInput: PersonUpdateInput !):Person!
      resolve({  id_cli,id_salle,id_user,date_res,debut_date,fin_date});
    });
    pool.query(query1, values, (error, results) => {
      if (error) {
        reject(error);
        return;
      } })

      pool.query(query2, values2, (error, results) => {
        if (error) {
          reject(error);
          return;
        } })   
  });
},




deletereservation: (parent, {id_res}, { pool}, info) => {
// Récupération de l'ID de l'entrée à supprimerconst id  = id.input;
const query = 'DELETE FROM reservation WHERE id_res=$1'
const values = [id_res];
return new Promise((resolve, reject) => {
pool.query(query, values, (error, results) => {
  if (error) {
    reject(error);
    return;
  }
  // Vérifier si une ligne a été supprimée avec succès
  if (results.affectedRows === 0) {
    reject(new Error(`Aucune entrée trouvée avec l'ID ${id}`));
    return;
  }
  // Renvoyer l'ID de l'enregistrement supprimé
  resolve({ id_res });
});
});
},



/* role_user */

insertrole_user: (parent, {addrole_userInput}, { pool }, info) => {
         
  const { design_role } = addrole_userInput; // Récupération des données d'entrée
  const query = 'INSERT INTO  role_user (design_role) VALUES ($1) '; 
  const values = [ design_role];

  return new Promise((resolve, reject) => {
    pool.query(query, values, (error, results) => {
      if (error) {
        reject(error);
        return;
      }
      // Renvoyer l'ID de l'enregistrement inséréupdatePerson(id:Int !,updatePersonInput: PersonUpdateInput !):Person!
      resolve({ design_role  });
    });
  });
},

updaterole_user: (parent, {updaterole_userInput}, { pool }, info) => {
const { id_role, design_role} = updatedesign_roleInput; // Récupération des données d'entrée
const query = 'UPDATE role_user SET design_role= $1 WHERE id_role = $3'; 
const values = [design_role,id_role];

return new Promise((resolve, reject) => {
pool.query(query, values, (error, results) => {
if (error) {
  reject(error);
  return;
}
// Vérifier si une ligne a été modifiée avec succès
if (results.affectedRows === 0) {
  reject(new Error(`Aucune entrée trouvée avec l'ID ${id}`));
  return;
}
// Renvoyer l'ID de l'enregistrement modifié
resolve({ id, Nom, Prenom });
});
});
},


deleterole_user: (parent, {id_role}, { pool}, info) => {
// Récupération de l'ID de l'entrée à supprimerconst id  = id.input;
const query = 'DELETE FROM role_user WHERE id_role = $1';
const values = [id_role];

return new Promise((resolve, reject) => {
pool.query(query, values, (error, results) => {
  if (error) {
    reject(error);
    return;
  }
  // Vérifier si une ligne a été supprimée avec succès
  if (results.affectedRows === 0) {
    reject(new Error(`Aucune entrée trouvée avec l'ID ${id_role}`));
    return;
  }
  // Renvoyer l'ID de l'enregistrement supprimé
  resolve({ id_role });
});
});
},


/* salle */
insertsalle: (parent, {addsalleInput}, { pool }, info) => {
         
  const { libelle,etat,prix_jour } = addsalleInput; // Récupération des données d'entrée
  const query = 'INSERT INTO  salle (libelle,etat, prix_jour) VALUES ($1, $2,$3) '; 
  const values = [ libelle,etat,prix_jour];

  return new Promise((resolve, reject) => {
    pool.query(query, values, (error, results) => {
      if (error) {
        reject(error);
        return;
      }
      // Renvoyer l'ID de l'enregistrement inséréupdatePerson(id:Int !,updatePersonInput: PersonUpdateInput !):Person!
      resolve({ libelle,etat,prix_jour   });
    });
  });
},

    updatesalle: (parent, {updatesalleInput}, { pool }, info) => {
const {  id_salle,libelle,etat,prix_jour } = updatesalleInput; // Récupération des données d'entrée
const query = 'UPDATE salle SET libelle = $1, etat= $2,prix_jour=$3 WHERE id_salle = $4'; 
const values = [libelle,etat,prix_jour,id_salle ];

return new Promise((resolve, reject) => {
pool.query(query, values, (error, results) => {
if (error) {
  reject(error);
  return;
}
// Vérifier si une ligne a été modifiée avec succès
if (results.affectedRows === 0) {
  reject(new Error(`Aucune entrée trouvée avec l'ID ${id}`));
  return;
}
// Renvoyer l'ID de l'enregistrement modifié
resolve({ id_salle, libelle,etat,prix_jour });
});
});
},


deletesalle: (parent, {id_salle}, { pool}, info) => {
// Récupération de l'ID de l'entrée à supprimerconst id  = id.input;
const query = 'DELETE FROM salle WHERE id_salle = $1';
const values = [id_salle];

return new Promise((resolve, reject) => {
pool.query(query, values, (error, results) => {
  if (error) {
    reject(error);
    return;
  }
  // Vérifier si une ligne a été supprimée avec succès
  if (results.affectedRows === 0) {
    reject(new Error(`Aucune entrée trouvée avec l'ID ${id}`));
    return;
  }
  // Renvoyer l'ID de l'enregistrement supprimé
  resolve({ id_salle });
});
});
},

/* types_client */

inserttypes_client: (parent, {addtypes_clientInput}, { pool }, info) => {
         
  const {design_types } = addtypes_clientInput; // Récupération des données d'entrée
  const query = 'INSERT INTO  types_client (design_types) VALUES ($1) '; 
  const values = [design_types];

  return new Promise((resolve, reject) => {
    pool.query(query, values, (error, results) => {
      if (error) {
        reject(error);
        return;
      }
      // Renvoyer l'ID de l'enregistrement inséréupdatePerson(id:Int !,updatePersonInput: PersonUpdateInput !):Person!
      resolve({  design_types  });
     });
   });
 },

 deletetypes_client: (parent, {id_types_cli}, { pool}, info) => {
   // Récupération de l'ID de l'entrée à supprimerconst id = id.input;
   const query = 'DELETE FROM types_client WHERE id_types_cli = $1';
   const values = [id_types_cli];
   return new Promise((resolve, reject) => {
   pool.query(query, values, (error, results) => {
   if (error) {
   reject(error);
   return;
   }
   // Vérifier si une ligne a été supprimée avec succès
   if (results.affectedRows === 0) {
   reject(new Error(`Aucune entrée trouvée avec l'ID ${id_types_cli}`));
   return;
   }
   // Renvoyer l'ID de l'enregistrement supprimé
   resolve({ id_types_cli });
   });
   });
   },


  /* user */
  
  insertuser: (parent, {adduserInput}, { pool }, info) => {
  
  const { id_role,design_user,mdp } = adduserInput; // Récupération des données d'entrée
  return new Promise((resolve, reject) => {
    // Génération du sel
    genSalt(5, (err, salt) => {
      if (err) {
        console.error('Erreur lors de la génération du sel :', err);
        reject(err); // Rejeter la promesse en cas d'erreur
        return;
      }

      // Chiffrement du mot de passe avec le sel généré
      hash(mdp, salt, (err, hashedPassword) => {
        if (err) {
          console.error('Erreur lors du chiffrement du mot de passe :', err);
          reject(err); // Rejeter la promesse en cas d'erreur
          return;
        }
console.log(hashedPassword);
        const query = 'INSERT INTO "USER" (id_role,design_user,mdp) VALUES ($1,$2,$3)';
        const values = [id_role, design_user, hashedPassword];

        // Exécution de la requête SQL
        pool.query(query, values, (error, results) => {
          if (error) {
            console.error('Erreur lors de l\'insertion de l\'utilisateur :', error);
            reject(error); // Rejeter la promesse en cas d'erreur
            return;
          }

          // Renvoyer les données de l'utilisateur inséré
          resolve({ id_role, design_user, mdp: hashedPassword });
        });
      });
    });
  });
    
          
  },

 updateuser: (parent, {updateuserInput}, { pool }, info) => {
const { id, Nom, Prenom } = updateuserInput; // Récupération des données d'entrée
const query = 'UPDATE student SET Nom = $1, Prenom = $2 WHERE id = $3'; 
const values = [Nom, Prenom, id];

return new Promise((resolve, reject) => {
pool.query(query, values, (error, results) => {
  if (error) {
    reject(error);
    return;
  }
  // Vérifier si une ligne a été modifiée avec succès
  if (results.affectedRows === 0) {
    reject(new Error(`Aucune entrée trouvée avec l'ID ${id}`));
    return;
  }
  // Renvoyer l'ID de l'enregistrement modifié
  resolve({ id_role,design_user,mdp  });
});
});
},


deleteuser: (parent, {id_user}, { pool}, info) => {
// Récupération de l'ID de l'entrée à supprimerconst id  = id.input;
const query = 'DELETE FROM user WHERE id_user = $1';
const values = [id_user];

return new Promise((resolve, reject) => {
  pool.query(query, values, (error, results) => {
    if (error) {
      reject(error);
      return;
    }
    // Vérifier si une ligne a été supprimée avec succès
    if (results.affectedRows === 0) {
      reject(new Error(`Aucune entrée trouvée avec l'ID ${id_user}`));
      return;
    }
    // Renvoyer l'ID de l'enregistrement supprimé
    resolve({ id_user });
  });
});

},


/*    login auth*/

login: (parent, {verifylogin}, { pool }, info) => {
  const privatekey = `-----BEGIN RSA PRIVATE KEY-----
  MIICXAIBAAKBgHADPYT68MKS1vH1+pcg9ldthT3HUdA8uDJgVT0sh/T+C0EGrLai
  acBcXfbquPTtCTH5CokIeCaeYQJhC2bqJXwMRHJAf2I/S+cQOy/cRMFSde8+Gfs3
  dfcZKhr5BYA2Q2II5QsGfx3l6de+kHcHC2k/rJWnIUF23lx9YP9ODEQlAgMBAAEC
  gYAXvzgdpy2/sm3LYkC8JYrUQi3LSSR5J0ZNt8qaa4RvViSApq+bEJem5m4tWNnZ
  Yx9d7tRi9N60IUOjw3stWFqVyBDp6x/9qz3RYkJQR1kAtiO5ssb4meDR9EqDzxUO
  Ju70F4GK61ls0CS83qcGj5bHax7BMoaOAFWBsTlOj5+VCQJBALAVPTf6pbKcX4WC
  rtG/iLinGZckpIvNo9M5Ps5gjKd1AJz6Z2tfZRvZWoVftgwm18IpZ+6TEbxhibYs
  bleDW0cCQQCi2cnCzJSLS3gQMtZuB6I634fjdFYtA2LEStjSE6oKmnB8IzJZHlG`
  ;

  const publickey = `-----BEGIN PUBLIC KEY-----
  MIGeMA0GCSqGSIb3DQEBAQUAA4GMADCBiAKBgHADPYT68MKS1vH1+pcg9ldthT3H
  UdA8uDJgVT0sh/T+C0EGrLaiacBcXfbquPTtCTH5CokIeCaeYQJhC2bqJXwMRHJA
  f2I/S+cQOy/cRMFSde8+Gfs3dfcZKhr5BYA2Q2II5QsGfx3l6de+kHcHC2k/rJWn
  IUF23lx9YP9ODEQlAgMBAAE=
  -----END PUBLIC KEY-----`;

  const { id_role, design_user, mdp } = verifylogin;
  const query = 'SELECT  mdp FROM "USER" WHERE design_user = $1 AND id_role = $2';
  const values = [design_user, id_role];
  
  return new Promise((resolve, reject) => {
    
    pool.query(query, values, (error, results) => {
      if (error) {
        reject(error);
        return;
      }
     
      
     /* if (results && results[0] && results[0].mdp) {*/
        compare(mdp, results.rows[0].mdp, (err, isMatch) => {
          if (err) {
            console.error(err);
            reject(error);
          
            return;
           
          } 
          
          if (isMatch) {
            const token = jwt.sign({ id_role }, privatekey);
            resolve({ token });
            console.log('Authentification réussie');
          } else {
            reject("erreur de mot de passe incorrect");
          
          }
        /*  } */ /*else {
        reject("Utilisateur non trouvé ou mot de passe non défini");
        console.log('Utilisateur non trouvé ou mot de passe non défini');
      }*/
    })
    });
  });
}




}


/**
 *  mot login 
 
 login: (parent, {verifylogin}, { pool}, info) => {

  const privatekey =`-----BEGIN RSA PRIVATE KEY-----
  MIICXAIBAAKBgHADPYT68MKS1vH1+pcg9ldthT3HUdA8uDJgVT0sh/T+C0EGrLai
  acBcXfbquPTtCTH5CokIeCaeYQJhC2bqJXwMRHJAf2I/S+cQOy/cRMFSde8+Gfs3
  dfcZKhr5BYA2Q2II5QsGfx3l6de+kHcHC2k/rJWnIUF23lx9YP9ODEQlAgMBAAEC
  gYAXvzgdpy2/sm3LYkC8JYrUQi3LSSR5J0ZNt8qaa4RvViSApq+bEJem5m4tWNnZ
  Yx9d7tRi9N60IUOjw3stWFqVyBDp6x/9qz3RYkJQR1kAtiO5ssb4meDR9EqDzxUO
  Ju70F4GK61ls0CS83qcGj5bHax7BMoaOAFWBsTlOj5+VCQJBALAVPTf6pbKcX4WC
  rtG/iLinGZckpIvNo9M5Ps5gjKd1AJz6Z2tfZRvZWoVftgwm18IpZ+6TEbxhibYs
  bleDW0cCQQCi2cnCzJSLS3gQMtZuB6I634fjdFYtA2LEStjSE6oKmnB8IzJZHlG`
  ;
  const publickey=`-----BEGIN PUBLIC KEY-----
  MIGeMA0GCSqGSIb3DQEBAQUAA4GMADCBiAKBgHADPYT68MKS1vH1+pcg9ldthT3H
  UdA8uDJgVT0sh/T+C0EGrLaiacBcXfbquPTtCTH5CokIeCaeYQJhC2bqJXwMRHJA
  f2I/S+cQOy/cRMFSde8+Gfs3dfcZKhr5BYA2Q2II5QsGfx3l6de+kHcHC2k/rJWn
  IUF23lx9YP9ODEQlAgMBAAE=
  -----END PUBLIC KEY-----`

  const { id_role,design_user,mdp } = verifylogin;
  // Récupération de l'ID de l'entrée à supprimerconst id  = id.input;
  const query = 'SELECT id_user, design_user, mdp FROM "USER" WHERE design_user = $1 AND id_role=$2';
  const values = [design_user,id_role];
  
  return new Promise((resolve, reject) => {
    pool.query(query, values, (error, results) => {
      if (error) {
        reject(error);
        return;
      }
      compare(mdp, results[0].mdp,(err, isMatch) => {
        if (err) {
          // Gestion des erreurs liées à bcrypt
          console.error(err);
         reject (error)
          return
          
        } if (isMatch) {
          // Si les mots de passe correspondent, générer un jeton JWT
          const token = jwt.sign({ id_role }, privatekey);

          // Envoyer le jeton comme réponse
          resolve({ token});
          console.log('Authentification réussie');
        
        } else {
          // Si les mots de passe ne correspondent pas
         
          reject("erreur de mot de passe incorrect")
          console.log('Mot de passe incorrect');
      }
      })
      // Renvoyer l'ID de l'enregistrement supprimé
     
    });
  })
}






 */













 
 
 
 
 
 /*  
 
  return new Promise((resolve, reject) => {
   genSalt(5,(err,salt) => {
      if (err) {
        console.error('Erreur lors de la génération du sel :', err);
        // Gérez l'erreur
      } else {
        // Chiffrez le mot de passe avec le sel généré
        hash(mdp , salt, (err, hash) => {
          if (err) {
            console.error('Erreur lors du chiffrement du mot de passe :', err);
            // Gérez l'erreur
          } else {
            const query = 'INSERT INTO  user ( id_role,design_user,mdp) VALUES ($1, $2,$3) '; 
            const values = [id_role,design_user, hash];
            
              pool.query(query, values, (error, results) => {
                if (error) {
                  reject(error);
                  return;
                }
                // Renvoyer l'ID de l'enregistrement inséréupdatePerson(id:Int !,updatePersonInput: PersonUpdateInput !):Person!
                resolve({  id_role,design_user,mdp });
              });
            }
            });
          
        }) 
      })
     
        
 
 
 
 
 
 
 
 
 
 
 
 
 */