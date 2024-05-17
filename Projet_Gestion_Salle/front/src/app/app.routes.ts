import { Routes } from '@angular/router';
import { authGuard } from './auth.guard';


export const routes: Routes = [
{
  title:'client',
  path:'client',
  loadComponent:()=> import('./component/client/client.component')

  },
  {
    title:'Deconnexion',
    path:'Deconnexion',
    loadComponent:()=> import( './component/deconnexion/deconnexion.component')

    },

    {
      title:'facture',
      path:'facture',
      loadComponent:()=> import('./component/facture/facture.component' )

      },



        {
          title:'home',
          path:'home',
          loadComponent:()=> import('./component/home/home.component'),
       /*   canActivate:[authGuard] */
          },
          {
            title:'reservation',
            path:'reservation',
            loadComponent:()=> import( './component/reservation/reservation.component')

            },

            {
              title:'salle',
              path:'salle',
              loadComponent:()=> import('./component/salle/salle.component')

              },
              {
                title:'user',
                path:'user',
                loadComponent:()=> import('./component/user/user.component')

                },
                {
                  title:'calendre',
                  path:'calendre',

                  loadComponent:()=> import('./component/calendre/calendre.component')

                  },

                  {
                    title:'calendre',
                    path:'calendre',
                    loadComponent:()=> import('./component/calendre/calendre.component')

                    },
                    {
                      title:'login',
                      path:'login',
                      loadComponent:()=> import('./component/login/login.component')

                      },
                   /*   {
                        title:'test',
                        path:'test',
                        loadComponent:()=> import('./component/test/test.component')

                        },*/

];


/*

 {
        title:'front',
        path:'',
        loadComponent:()=> import('./component/deconnexion/deconnexion.component' ),


        },


*/
