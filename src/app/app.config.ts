import { bootstrapApplication } from '@angular/platform-browser';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideIonicAngular } from '@ionic/angular/standalone';
import { HttpClientModule, provideHttpClient } from '@angular/common/http'; // Importar el módulo HTTP
import { AppComponent } from './app.component';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideIonicAngular({}),
    provideHttpClient(),
    HttpClientModule // Esto debe estar aquí para que HttpClient esté disponible
  ]
};

bootstrapApplication(AppComponent, appConfig);
