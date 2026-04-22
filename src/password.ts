import { FormGroup } from '@angular/forms';
export function password1(pass: string, cpass: string) {
    return (formGroup: FormGroup) => {
        console.log(pass,cpass)
        const password = formGroup.controls[pass];
        const cpassword = formGroup.controls[cpass];
        if (cpassword.errors && !cpassword.errors['mustMatch']) {
            return;
        }
        if (password.value !== cpassword.value) {
            cpassword.setErrors({ password1: true });
        } else {
            cpassword.setErrors(null);
        }

    };
}