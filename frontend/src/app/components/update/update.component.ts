import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  employeeId!: number;
  employeeDetails: any = { firstName: '', lastName: '', emailId: '' };
  successMessage: string = '';
  errorMessage: string = '';
  updateForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.employeeId = params['id'];
      this.getEmployeeDetails();
    });

    this.updateForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      emailId: ['', [Validators.required, Validators.email]]
      // Add more fields for other employee details and validators as needed
    });
  }

  getEmployeeDetails(): void {
    this.employeeService.getEmployeeById(this.employeeId).subscribe(
      (data: any) => {
        this.employeeDetails = data;
        this.updateForm.patchValue(data); // Patching the retrieved data to form fields
      },
      (error: any) => {
        console.error('Error fetching employee details:', error);
      }
    );
  }

  updateEmployee(): void {
    if (this.updateForm.valid) {
      const updatedEmployee = {
        id: this.employeeId,
        ...this.updateForm.value
      };

      this.employeeService.updateEmployee(updatedEmployee).subscribe(
        (data: any) => {
          this.successMessage = 'Employee updated successfully!';
          this.errorMessage = '';
        },
        (error: any) => {
          this.errorMessage = 'Failed to update employee.';
          this.successMessage = '';
        }
      );
    } else {
      this.errorMessage = 'Please provide valid details.';
      this.successMessage = '';
    }
  }

  getFirstNameErrorMessage(): string {
    const firstNameField = this.updateForm.get('firstName');
    return firstNameField?.hasError('required') ? 'First Name is required' : '';
  }

  getLastNameErrorMessage(): string {
    const lastNameField = this.updateForm.get('lastName');
    return lastNameField?.hasError('required') ? 'Last Name is required' : '';
  }

  getEmailErrorMessage(): string {
    const emailField = this.updateForm.get('emailId');
    return emailField?.hasError('required') ? 'Email is required' :
      emailField?.hasError('email') ? 'Enter a valid email address' : '';
  }
}
