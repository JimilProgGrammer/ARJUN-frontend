import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { LogoutComponent } from './logout/logout.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { TakeQuizComponent } from './take-quiz/take-quiz.component';

const routes: Routes = [
  { path:'', pathMatch:'full', redirectTo:'home' },
  { path:'home', component:HomeComponent },
  { path:'login', component:LoginComponent },
  { path:'signup', component:SignupComponent },
  { path:'welcome', component:WelcomeComponent },
  { path:'logout', component:LogoutComponent },
  { path:'searchPage', component:SearchPageComponent },
  { path:'updateProfile', component:UpdateProfileComponent },
  { path:'takeQuiz', component:TakeQuizComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
