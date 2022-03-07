import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from "@angular/forms";
import { UserService } from "../../services/user.service";
import { UsernameValidator } from "../username-validator.component";
import { UserInfo } from "../../interfaces/user-info.interface";

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})

export class CreateUserComponent implements OnInit {
  createUserForm: FormGroup;
  isOpened = false;
  userNameAlreadyExist: string[] = [];

  minStartDateOfEducation: Date;
  maxStartDateOfEducation: Date;

  minEndDateOfEducation: Date;
  maxDateOfBirthday: Date;

  @Input() userInfo: UserInfo[] = [];

  gender: { label: string; value: string }[] = [
    { label: "Male", value: 'male' },
    { label: "Female", value: 'female' },
  ];

  education: { label: string; value: string }[] = [
    { label: "Backend", value: 'backend' },
    { label: "Frontend", value: 'frontend' },
    { label: "Design", value: 'design' },
    { label: "Project Management", value: 'projectManagement' },
    { label: "Quality Assurance", value: 'qualityAssurance' },
    { label: "Business Analytic", value: 'businessAnalytic' },
  ];

  constructor(private userService: UserService) {
  }

  validationOfStartDateEducation(): void {
    this.minStartDateOfEducation = this.createUserForm.get('dateOfBirthday').value;
    this.maxStartDateOfEducation = this.createUserForm.get('endDateOfEducation').value;
  }

  validationOfEndDateEducation(): void {
    this.minEndDateOfEducation = this.createUserForm.get('startDateOfEducation').value;
  }

  validationOfDateOfBirthday(): void {
    this.maxDateOfBirthday = this.createUserForm.get('startDateOfEducation').value;
  }

  get isNotValidForm(): boolean {
    const dateOfBirthday = new Date(this.createUserForm.get('dateOfBirthday').value)
    const startDateOfEducation = new Date(this.createUserForm.get('startDateOfEducation').value)
    const endDateOfEducation = new Date(this.createUserForm?.get('endDateOfEducation').value)
    const educationValue = this.createUserForm.getRawValue().education.value;

    this.validationOfStartDateEducation();
    this.validationOfEndDateEducation();
    this.validationOfDateOfBirthday();
    if (educationValue === 'frontend' || educationValue === 'backend') {
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
    const transformedCreateUserForm = {
      ...this.createUserForm.value,
      gender: this.createUserForm.getRawValue().gender.value,
      education: this.createUserForm.getRawValue().education.value
    }
    this.userInfo.push(transformedCreateUserForm);
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
          if (education?.value === 'frontend' || education?.value === 'backend') {
            this.createUserForm.get('endDateOfEducation').clearValidators()
            this.createUserForm.get('endDateOfEducation')?.updateValueAndValidity();
          }
        },
      });
  }
}
