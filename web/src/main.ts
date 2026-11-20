import { bootstrapApplication } from '@angular/platform-browser';
import { App } from '@root/app';
import { appConfig } from '@root/app.config';

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
