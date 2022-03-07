import { Component, Input } from '@angular/core';
import { UserInfo } from "../../interfaces/user-info.interface";


@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})

export class UserTableComponent {
  @Input() userInfo: UserInfo[] = [];

  public removeUser({ dataItem }) {
    return this.userInfo = this.userInfo.filter((item) => item.userName !== dataItem.userName);
  }
}
