import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { providePrimeNG } from 'primeng/config';
import { provideAnimations } from '@angular/platform-browser/animations';
import Aura from '@primeuix/themes/aura';

import { routes } from './app.routes';


export const appConfig: ApplicationConfig = {

  providers: [
     provideAnimations(),

    provideBrowserGlobalErrorListeners(),

    provideRouter(routes),

    providePrimeNG({
      theme:{
        preset:Aura
      }
    })

  ]

};