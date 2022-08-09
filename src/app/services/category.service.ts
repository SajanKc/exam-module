import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category } from '../model/category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  // Load all categories
  public categories(): Observable<Category> {
    return this.http.get<Category>(`${environment.baseUrl}/category`);
  }

  // Add Category
  public addCategory(category: any) {
    return this.http.post(`${environment.baseUrl}/category`, category);
  }
}
