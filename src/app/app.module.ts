import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { DialogComponent } from './shared/dialog/dialog/dialog.component'

import { SnackBarComponent } from './shared/SnackBar/snack-bar/snack-bar.component';
import { Interceptor } from './service/app/interceptor.service';
import { LoaderComponent } from './shared/loader/loader.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


import { TitleStrategy } from '@angular/router';
import { TitleService } from './service/app/title.service';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { SocketioService } from './service/socketio.service';
import { ToastrModule } from 'ngx-toastr';

import { SharedModule } from './shared/shared.module';
import { MatModule } from './shared/mat.module';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { UsersEffects } from './Store/effects/users.effects';
import { UsersReducers } from './Store/reducers';

// AoT requires an exported function for factories
// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    DialogComponent,
    SnackBarComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
 
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
      // defaultLanguage: 'en',
    }),
    FontAwesomeModule,
    SharedModule,
    MatModule,

    StoreDevtoolsModule.instrument(),
    StoreModule.forRoot({ users: UsersReducers }),
    EffectsModule.forRoot([UsersEffects]),
    
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true },
    {
      provide: TitleStrategy,
      useClass: TitleService
    },
    {
      provide: LocationStrategy, useClass: HashLocationStrategy
    },
    SocketioService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
