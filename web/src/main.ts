import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from '@root/routeur/app.config';
import { App } from '@root/routeur/app';

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
