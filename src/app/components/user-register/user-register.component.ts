import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Iuser } from 'src/app/Models/iuser';
import { passwordMatch } from '../CustomValidators/PasswordMatch.Validatior';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { passwordMatchValidator, passwordComplexityValidator } from '../../password.validators'; // Import custom validators

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {
  
  userRegisterForm!: FormGroup;

  constructor(private fb: FormBuilder){ // form bulider de bdal form group we bdal new form control b3ml array 3altol


  }

 

  ngOnInit(): void {
    this.userRegisterForm = this.fb.group({

      fullName: ['',[Validators.required,Validators.pattern('[A-Za-z]{3,}')]],
      email: ['',[Validators.required, Validators.email]], // Add Validators.email here
      phoneNo: this.fb.array([this.fb.control('')]), // da 3ashan lw el customer 3ando kaza mobile no we 3aez ydef kaza wa7ed
    
      address : this.fb.group({
        city: [''],
        postalCode : [''], // [''] da m3nah ene post code da formcontol 
        street: ['']
        }),
      referral:[''],
      referralOther:[''],
      password: ['', [Validators.required, passwordComplexityValidator]],
      ConfirmPassword: ['', [Validators.required, confirmPasswordValidator]]
  });
}
  

  get fullName()  
  {
    return this.userRegisterForm.get('FullName');
  }
  get phoneNumbers()
  {
    return this.userRegisterForm.get('phoneNo') as FormArray;
  }
  get password()
  {
    return this.userRegisterForm.get('password');
  }
  get confirmPassword()
  {
    return this.userRegisterForm.get('ConfirmPassword');
  }
  

  addPhoneNo(event: any) {
    this.phoneNumbers.push(this.fb.control(''));
    event.target?.classList.add('d-none');
  }

//  updateReferralValidators(event: any) {
//   const selectedValue = event.target.value;
//   const referralCode = this.userRegisterForm.get('referralCode');

//   if (this.userRegisterForm.value('referral') === 'Yes') {
//     this.userRegisterForm.value('referral').setValidators([Validators.required]);
//   } else {
//     this.userRegisterForm.value('referral').clearValidators(); // Clear validators if not needed
//   }
  
//   // Update the control's state
//   this.userRegisterForm.value('referral').updateValueAndValidity();
// }


  fillform(){
    // in case of edit profile
    this.userRegisterForm.get('fullName')?.setValue('TEST');
  }

  submit()
  {
    let userModel: Iuser=this.userRegisterForm.value as Iuser;
    //                              another shape of it  let userModel: Iuser=<Iuser>this.userRegisterForm.value;
    // important : calling API  , Send userModel
    // we didnt have Api now so we send to consol.log
    console.log(userModel);
     
  }
}

// Custom validator for confirming password
export function confirmPasswordValidator(control: FormGroup): { [key: string]: boolean } | null {
  const password = control.get('password')?.value;
  const confirmPassword = control.get('ConfirmPassword')?.value;

  return password === confirmPassword ? null : { 'passwordMismatch': true };
}