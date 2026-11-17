import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig, App } from '@root/routeur';
bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
