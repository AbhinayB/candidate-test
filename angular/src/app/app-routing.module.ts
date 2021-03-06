import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RuglistComponent } from './components/ruglist/ruglist.component';
import { AddRugComponent } from './components/add-rug/add-rug.component';
import { FullpageComponent } from './components/fullpage/fullpage.component';
import { EditrugComponent } from './components/editrug/editrug.component';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { NoUrlFoundComponent } from './components/no-url-found/no-url-found.component';
const appRoutes:Routes=[
{path:'',component: RuglistComponent},
{path:'ruglist',component: RuglistComponent},
{path:'addrug',component: AddRugComponent},
{path:'fullpage/:id',component: FullpageComponent},
{path: 'editrug/:id',component: EditrugComponent},
{path: '**',component: NoUrlFoundComponent}
]


@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  exports: [RouterModule],
  bootstrap: [AppComponent]
})

export class AppRoutingModule {
}
