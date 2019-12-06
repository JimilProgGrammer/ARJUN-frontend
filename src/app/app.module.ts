import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpModule, RequestOptions } from '@angular/http';
import { provideAuth }    from 'angular2-jwt';
import { DragScrollModule } from 'ngx-drag-scroll';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ApiCallerService } from './services/api-caller.service';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { LogoutComponent } from './logout/logout.component';
import { AuthInterceptor } from './auth-interceptor';
import { AuthRequestOptions } from './auth-request';
import { AuthErrorHandler } from './auth-error-handler';
import { AuthGuard } from './auth-guard';
import { AuthService } from './services/auth.service';
import { SearchPageComponent } from './search-page/search-page.component';
import { QuizComponent } from './quiz/quiz.component';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { TakeQuizComponent } from './take-quiz/take-quiz.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    WelcomeComponent,
    LogoutComponent,
    SearchPageComponent,
    QuizComponent,
    ChatbotComponent,
    UpdateProfileComponent,
    TakeQuizComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpModule,
    DragScrollModule
  ],
  providers: [ApiCallerService,
    AuthGuard,
    AuthService,
    // {
    //   provide: RequestOptions, 
    //   useClass: AuthRequestOptions
    // },
    // {
    //   provide: ErrorHandler, 
    //   useClass: AuthErrorHandler
    // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
