import { NgModule } from '@angular/core';

import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ButtonsModule } from "@progress/kendo-angular-buttons";
import { WindowModule } from "@progress/kendo-angular-dialog";
import { ReactiveFormsModule } from "@angular/forms";
import { DropDownsModule } from "@progress/kendo-angular-dropdowns";
import { DateInputsModule } from "@progress/kendo-angular-dateinputs";
import { CreateUserComponent } from "./create-user.component";
import { UserService } from "../../services/user.service";

@NgModule({
  declarations: [
    CreateUserComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ButtonsModule,
    WindowModule,
    ReactiveFormsModule,
    DropDownsModule,
    DateInputsModule,
  ],
  providers: [UserService],
  exports: [
    CreateUserComponent
  ]
})
export class CreateUserModule {
}
