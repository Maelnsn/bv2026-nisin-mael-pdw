import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig, App } from '@root/';

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
