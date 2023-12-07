import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  successMessage: string = '';
  errorMessage: string = '';
  createForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService
  ) { }

  ngOnInit(): void {
    this.createForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      emailId: ['', [Validators.required, Validators.email]]
      // Add more fields for other employee details and validators as needed
    });
  }

  createEmployee(): void {
    if (this.createForm.valid) {
      const newEmployee = this.createForm.value;

      this.employeeService.createEmployee(newEmployee).subscribe(
        (data: any) => {
          this.successMessage = 'Employee created successfully!';
          this.errorMessage = '';
          this.createForm.reset(); // Clear the form after successful creation
        },
        (error: any) => {
          this.errorMessage = 'Failed to create employee.';
          this.successMessage = '';
        }
      );
    } else {
      this.errorMessage = 'Please provide valid details.';
      this.successMessage = '';
    }
  }

  getFirstNameErrorMessage(): string {
    const firstNameField = this.createForm.get('firstName');
    return firstNameField?.hasError('required') ? 'First Name is required' : '';
  }

  getLastNameErrorMessage(): string {
    const lastNameField = this.createForm.get('lastName');
    return lastNameField?.hasError('required') ? 'Last Name is required' : '';
  }

  getEmailErrorMessage(): string {
    const emailField = this.createForm.get('emailId');
    return emailField?.hasError('required') ? 'Email is required' :
      emailField?.hasError('email') ? 'Enter a valid email address' : '';
  }
}
