import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EmployeeService } from 'src/app/Services/employee.service';
import { Employee } from 'src/app/Models/employee.model';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {

  employeeDetails: any;
  indexToDelete: number;
  employeeForm: FormGroup;
  selected: boolean = true;

  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
    this.employeeForm = new FormGroup({
      employeeId: new FormControl(Validators.required),
      firstname: new FormControl(null, Validators.required),
      lastname: new FormControl(null, Validators.required)
    });
  }

  onSubmit() {
    this.indexToDelete ? this.employeeService.putData(this.employeeForm.value, this.indexToDelete)
                      : this.employeeService.postData(this.employeeForm.value);
    this.employeeForm.reset();
  }

  onDisplay() {
    this.employeeService.getData().subscribe((response) => {
      this.employeeDetails = response;
    });
  }

  onDelete() {
    this.employeeService.deleteData(this.indexToDelete);
    this.onDisplay();
    this.employeeForm.reset();
    //To retrive data again
    this.employeeService.getData();
    this.indexToDelete = undefined;
  }

  onSelectRow(employee: Employee) {
    this.selected = false;
    console.log(employee);
    this.employeeForm.patchValue({
      employeeId: employee.employeeId,
      firstname: employee.firstname,
      lastname: employee.lastname,
    })
    this.indexToDelete = employee.id;
  }

  onCancel() {
    this.employeeForm.reset();
    this.selected = true;
  }

}
