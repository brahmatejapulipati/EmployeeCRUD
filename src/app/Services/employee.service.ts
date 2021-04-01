import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../Models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  jsonUrl: string = 'http://localhost:3004/employeeData/'

  constructor(private http: HttpClient) { }

  postData(employee: Employee) {
    this.http.post(this.jsonUrl, employee).subscribe();
  }

  putData(employee: Employee, id: number) {
    this.http.put(this.jsonUrl + id, employee).subscribe();
  }

  getData() {
    return this.http.get<Employee>(this.jsonUrl);
  }

  deleteData(id: number) {
    this.http.delete(this.jsonUrl + id).subscribe();
  }

}
