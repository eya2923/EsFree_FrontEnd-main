import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllTemplatesFrontComponent } from './FrontOffice/all-templates-front/all-templates-front.component';
import { AllTemplatesBackComponent } from './BackOffice/all-templates-back/all-templates-back.component';
import { EventListComponent } from './BackOffice/viewsBack/event/event-list/event-list.component';
import { EventListFrontComponent } from './FrontOffice/viewsFront/event/event-list-front/event-list-front.component';
import { EventAddFrontComponent } from './FrontOffice/viewsFront/event/event-add-front/event-add-front.component';
import { EventDetailFrontComponent } from './FrontOffice/viewsFront/event/event-detail-front/event-detail-front.component';
import { EventCalendarComponent } from './FrontOffice/viewsFront/event/event-calendar/event-calendar.component';
import { ParticipationListComponent } from './BackOffice/viewsBack/event/participation-list/participation-list.component';
import { EventListUserComponent } from './FrontOffice/viewsFront/event/event-list-user/event-list-user.component';
import { ParticipationListFrontComponent } from './FrontOffice/viewsFront/event/participation-list-front/participation-list-front.component';
import { StatEventComponent } from './BackOffice/viewsBack/event/stat-event/stat-event.component';
import { PubitemComponent } from './BackOffice/viewsBack/marketplace/pubitem/pubitem.component';
import { CartComponent } from './BackOffice/viewsBack/marketplace/cart/cart.component';
import { MarketComponent } from './FrontOffice/viewsFront/marketplace/market/market.component';
import { ItemdetailComponent } from './FrontOffice/viewsFront/marketplace/itemdetail/itemdetail.component';
import { MyitemspComponent } from './FrontOffice/viewsFront/marketplace/myitems/myitemp.component';
import { CartfComponent } from './FrontOffice/viewsFront/marketplace/cartf/cartf.component';
import { ChartpubComponent } from './BackOffice/viewsBack/marketplace/chartpub/chartpub.component';
import { ContratLocationlistComponent } from './BackOffice/viewsBack/contratLocation/contrat-locationlist/contrat-locationlist.component';
import { MaisonlistComponent } from './FrontOffice/viewsFront/maison/maisonlist/maisonlist.component';
import { MaisonlistbackComponent } from './BackOffice/viewsBack/maison/maisonlist/maisonlist.component';
import { MaisondetailComponent } from './FrontOffice/viewsFront/maison/maisondetail/maisondetail.component';
import { MaisondetailbackComponent } from './BackOffice/viewsBack/maison/maisondetailback/maisondetailback.component';

//import { ContratLocationAddComponent } from './FrontOffice/viewsFront/colocation/contratLocation/contrat-location-add/contrat-location-add.component';
//import { CollocationListComponent } from './FrontOffice/viewsFront/colocation/collocation-list/collocation-list.component';
import { CovoiturageComponent } from './BackOffice/viewsBack/covoiturage/covoiturage.component';
import { AddCovoiturageComponent } from './FrontOffice/viewsFront/covoiturage/add-covoiturage/add-covoiturage.component';
import { ListCovoiturageComponent } from './FrontOffice/viewsFront/covoiturage/list-covoiturage/list-covoiturage.component';
import { AvisComponent } from './BackOffice/viewsBack/avis/avis.component'; 
import { DetailCovoiturageComponent } from './FrontOffice/viewsFront/covoiturage/detail-covoiturage/detail-covoiturage.component';
import { MyCovoituragesComponent } from './FrontOffice/viewsFront/covoiturage/my-covoiturages/my-covoiturages.component';


import { ItemListComponent } from './BackOffice/viewsBack/lostandfound/item-list/item-list.component';
import { ItemListUsersComponent } from './FrontOffice/viewsFront/lostandfound/item-list-users/item-list-users.component';
import { PubDiscussComponent } from './FrontOffice/viewsFront/lostandfound/pub-discuss/pub-discuss.component';
import { MyitemsComponent } from './FrontOffice/viewsFront/lostandfound/myitems/myitems.component';
import { CollocationListComponent } from './FrontOffice/viewsFront/colocation/collocation-list/collocation-list.component';
import { CollocationAddComponent } from './FrontOffice/viewsFront/colocation/collocation-add/collocation-add.component';
import { LoginComponent } from './Login/login/login.component';

import { GUserComponent } from './BackOffice/viewsBack/user/g-user/g-user.component';
import { SignuppComponent } from './Login/signupp/signupp.component';
import { ProfileComponent } from './Login/profile/profile.component';
import { authGuard } from './Service/auth.guard';
import { ForgetpwdComponent } from './Login/forgetpwd/forgetpwd.component';
import { GameListComponent } from './FrontOffice/viewsFront/raba3/game-list/game-list.component';
import { SessionListComponent } from './FrontOffice/viewsFront/raba3/session-list/session-list.component';
import { UserSessionsComponent } from './FrontOffice/viewsFront/raba3/user-sessions/user-sessions.component';
import { StatsComponent } from './FrontOffice/viewsFront/raba3/stats/stats.component';
import { GameAddComponent } from './BackOffice/viewsBack/raba3/game-add/game-add.component';
import { GameListBComponent } from './BackOffice/viewsBack/raba3/game-list-b/game-list-b.component';
import { GameEditComponent } from './BackOffice/viewsBack/raba3/game-edit/game-edit.component';
import { SessionListBComponent } from './BackOffice/viewsBack/raba3/session-list-b/session-list-b.component';
import { HomeComponent } from './FrontOffice/viewsFront/home/home/home.component';
import { HomebComponent } from './BackOffice/viewsBack/homeb/homeb.component';


const routes: Routes = [
  
      {path:"",
      component:LoginComponent
      },
      {path:"signup",
      component:SignuppComponent
      },
      {path:"forgetpwd",
      component:ForgetpwdComponent
      },
  
  
      {
    path:"user",
    component : AllTemplatesFrontComponent,canActivate:[authGuard],
    children:[

   
      {path:"eventlist", component:EventListFrontComponent},
      { path: "addevent", component: EventAddFrontComponent },
      { path: "eventdetail/:idEvent", component: EventDetailFrontComponent },
      { path: "eventcalendar", component: EventCalendarComponent },
      { path: "listparticipationuser", component: ParticipationListComponent },
      { path: "myevents", component: EventListUserComponent },
      { path: "myparticipations", component: ParticipationListFrontComponent },
      {path:"listCovoiturage",component:ListCovoiturageComponent},
      {path:"addCovoiturage",component:AddCovoiturageComponent},
      {path:"DetailCov/:id_cov",component:DetailCovoiturageComponent},
      {path:"Mycov",component:MyCovoituragesComponent},
      // {path:"collocationList", component:CollocationListComponent},
     // {path:"collocationadd", component:CollocationAddComponent}

      // hné l components mta3 l frontOffice lkol
      {path:"market", component:MarketComponent},
      {path:"itemdetail/:id_pub", component:ItemdetailComponent},
      {path:"myitems", component:MyitemspComponent},
      {path:"cartf", component: CartfComponent},
      //{path:"collocationList", component:CollocationListComponent},
      {path:"maisonlist", component:MaisonlistComponent},
      {path:"contratlocationlist", component:ContratLocationlistComponent},
      { path: 'afficherMaison/:id', component: MaisondetailComponent },
      {path:"profile",  component:ProfileComponent ,  canActivate:[authGuard]},
     
      // hné l components mta3 l frontOffice lkol
   
    
      {path:"itemList", component:ItemListUsersComponent},
      {path:"itemList/PubDiscuss/:id", component:PubDiscussComponent},
      {path:"myitems/:id", component:MyitemsComponent},
      {path:"raba3", component:GameListComponent},
      {path:"sessionList/:idJeux", component:SessionListComponent},
      {path:"userSessions/:name", component:UserSessionsComponent},
      {path:"stats", component:StatsComponent},
      {path:"home", component:HomeComponent}


      // hné l components mta3 l frontOffice lkol
   ]
   },
 
  
   {
    path:"admin",
    component : AllTemplatesBackComponent ,canActivate:[authGuard],
    children:[

      // hné l components mta3 l backOffice lkol 
     { path:"eventlist", component:EventListComponent},
     { path: "participationlist", component: ParticipationListComponent },
     { path: "statevents", component: StatEventComponent },
      {path:"Pubitem",component:PubitemComponent},
      {path:"Cart",component:CartComponent},
      {path:"chart",component:ChartpubComponent},
      {path:"itemList", component:ItemListComponent},

      {path:"maisonlist", component:MaisonlistbackComponent},
      { path: 'afficherMaison/:id', component: MaisondetailbackComponent },
      {path:"contrats", component:ContratLocationlistComponent},
      {path:"users", component:GUserComponent,  canActivate:[authGuard]},
      {path:"profile",
      component:ProfileComponent,  canActivate:[authGuard]
      },
      {path:"gameAdd", component:GameAddComponent},
      {path:"gameListB", component:GameListBComponent},
      {path:"gameEdit", component:GameEditComponent},
      {path:"sessionListB", component:SessionListBComponent},
      {path:"homeB", component:HomebComponent},


      
    

      // hné l components mta3 l backOffice lkol 

    {path:"covoiturage",component:CovoiturageComponent},
    {path:"avisBack",component:AvisComponent}
   
   ]
   }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

 
}

