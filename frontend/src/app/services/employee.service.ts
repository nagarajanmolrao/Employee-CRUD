import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = 'http://localhost:8765/api/v1/employees';

  constructor(private http: HttpClient) { }

  getEmployees(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getEmployeeById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  updateEmployee(updatedEmployee: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${updatedEmployee.id}`, updatedEmployee);
  }

  createEmployee(employeeData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, employeeData);
  }

  deleteEmployee(employeeId: number): Observable<any> {
    const deleteUrl = `${this.apiUrl}/${employeeId}`;
    return this.http.delete<any>(deleteUrl);
  }

}
