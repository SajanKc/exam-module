import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  constructor(private http: HttpClient) {}

  public quizzes() {
    return this.http.get(`${environment.baseUrl}/quiz`);
  }

  public addQuiz(quiz: any) {
    return this.http.post(`${environment.baseUrl}/quiz`, quiz);
  }

  public deleteQuiz(id: number) {
    return this.http.delete(`${environment.baseUrl}/quiz/` + id);
  }
}
