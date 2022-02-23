import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {UsernameValidator} from "../username-validator.component";
import {UserInfo} from "../../interfaces/user-info.interface";

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})

export class CreateUserComponent implements OnInit {
  createUserForm: FormGroup;
  isOpened = false;
  userNameAlreadyExist: string[] = [];
  @Input() userInfo: UserInfo[] = [];

  gender: string[] = [
    "Male",
    "Female",
  ];

  education: string[] = [
    "Backend",
    "Frontend",
    "Design",
    "Project Management",
    "Quality Assurance",
    "Business Analytic",
  ];

  constructor(private userService: UserService) {
  }

  get isNotValidForm(): boolean {
    const dateOfBirthday = new Date(this.createUserForm.get('dateOfBirthday').value)
    const startDateOfEducation = new Date(this.createUserForm.get('startDateOfEducation').value)
    const endDateOfEducation = new Date(this.createUserForm?.get('endDateOfEducation').value)
    const educationValue = this.createUserForm.get('education').value
    if (educationValue === 'Frontend' || educationValue === 'Backend') {
      return !this.createUserForm.valid
        || dateOfBirthday > (startDateOfEducation) ||
        startDateOfEducation < (dateOfBirthday)
    } else {
      return !this.createUserForm.valid
        || dateOfBirthday > (startDateOfEducation || endDateOfEducation) ||
        startDateOfEducation < (dateOfBirthday) ||
        startDateOfEducation > endDateOfEducation;
    }
  }

  ngOnInit(): void {
    this.initCreateUserForm();
    this.createUserSetValidation();
    this.getUserName(this.userInfo);
  }


  getUserName(userInfo: UserInfo[]): void {
    userInfo.forEach((arrayItem) => {
      return this.userNameAlreadyExist.push(arrayItem.userName);
    })
  }

  initCreateUserForm(): void {
    this.createUserForm = new FormGroup({
      userName: new FormControl('', {
        validators: [Validators.required, Validators.minLength(5), Validators.maxLength(15)],
        asyncValidators: [UsernameValidator.createValidator(this.userService, this.userNameAlreadyExist)],
      }),
      gender: new FormControl('', {
        validators: [Validators.required]
      }),
      dateOfBirthday: new FormControl('', {
        validators: [Validators.required]
      }),
      education: new FormControl('', {
        validators: [Validators.required]
      }),
      startDateOfEducation: new FormControl('', {
        validators: [Validators.required]
      }),
      endDateOfEducation: new FormControl('', {
        validators: [Validators.required]
      }),
    })
  };

  submit(): void {
    this.userInfo.push(this.createUserForm.value)
    this.closeModalWindow();
  }

  openModalOpen(): void {
    this.isOpened = true;
  }

  closeModalWindow(): void {
    this.isOpened = false;
    this.createUserForm.reset();
  }

  showValidationsErrors(control: AbstractControl): boolean {
    return control.touched && control.invalid;
  }

  showControlErrors(control: AbstractControl | null, ...errorCodes: string[]): boolean {
    return errorCodes.some((errorCode) => control?.hasError(errorCode) && control.touched);
  }

  private createUserSetValidation(): void {
    this.createUserForm
      .get('education')
      ?.valueChanges
      .subscribe({
        next: (education) => {
          if (education === 'Frontend' || education === 'Backend') {
            this.createUserForm.get('endDateOfEducation').clearValidators()
            this.createUserForm.get('endDateOfEducation')?.updateValueAndValidity();
          }
        },
      });
  }
}
