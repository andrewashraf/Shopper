// cross field customer validator

import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const passwordMatch : ValidatorFn = ( FrmGroup:AbstractControl ) : ValidationErrors|null=>
{
{
        let passControl=FrmGroup.get('password');
        let confirmPassControl=FrmGroup.get('confirmPassword');
        if( !passControl || !confirmPassControl || !passControl.value || !confirmPassControl.value )
        {
            return null;
        }
        let valErr = {'UnmatchedPassword' : {'pass': passControl?.value , 'Confirm' : confirmPassControl?.value}}
        return (passControl?.value==confirmPassControl?.value)? null : valErr; // hena b2ol ene ro7 shof el pass wel confirm lw nafs el value mat3mlshy 7aga
        {

        }
  
}
}
