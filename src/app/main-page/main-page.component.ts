import {Component} from '@angular/core';
import {UserInfo} from "../interfaces/user-info.interface";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})

export class MainPageComponent {
  userInfo: UserInfo[] = [
    {
      userName: 'dsdsmas',
      gender: 'Male',
      dateOfBirthday: '2/23/2022',
      education: 'Backend',
      startDateOfEducation: '2/24/2022',
      endDateOfEducation: '2/25/2022'
    },
    {
      userName: 'dasdasdas',
      gender: 'Male',
      dateOfBirthday: '2/23/2022',
      education: 'Backend',
      startDateOfEducation: '2/24/2022',
      endDateOfEducation: '2/25/2022'
    },
  ];
}
