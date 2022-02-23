import {Component, Input} from '@angular/core';
import {UserInfo} from "../../interfaces/user-info.interface";


@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})

export class UserTableComponent {
  @Input() userInfo: UserInfo[] = [];
}
