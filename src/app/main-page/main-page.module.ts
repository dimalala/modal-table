import {NgModule} from '@angular/core';
import {MainPageComponent} from "./main-page.component";

import {BrowserModule} from "@angular/platform-browser";
import {CreateUserModule} from "../components/create-user/create-user.module";
import {UserTableModule} from "../components/user-table/user-table.module";

@NgModule({
  declarations: [
    MainPageComponent
  ],
  imports: [
    BrowserModule,
    CreateUserModule,
    UserTableModule
  ],
})
export class MainPageModule {
}
