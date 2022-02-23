import {NgModule} from '@angular/core';

import {BrowserModule} from "@angular/platform-browser";
import {UserTableComponent} from "./user-table.component";
import {GridModule} from "@progress/kendo-angular-grid";

@NgModule({
  declarations: [
    UserTableComponent
  ],
  imports: [
    BrowserModule,
    GridModule
  ],
  exports: [
    UserTableComponent
  ]
})
export class UserTableModule {
}
