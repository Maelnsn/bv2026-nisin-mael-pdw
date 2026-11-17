import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/root/routeur/app.config';
import { App } from './app/root/routeur/app';

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
