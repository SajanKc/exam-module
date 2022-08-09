import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Question } from '../model/question.model';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  apiUrlEndPoint: string = '/question';
  baseUrl: string = environment.baseUrl;

  constructor(private httpClient: HttpClient) {}

  public getQuestionsOfQuiz(qid: number): Observable<Question[]> {
    return this.httpClient.get<Question[]>(
      this.baseUrl + this.apiUrlEndPoint + '/quiz/all/' + qid
    );
  }

  public addQuestionOfQuiz(question: any): Observable<any> {
    return this.httpClient.post<any>(
      this.baseUrl + this.apiUrlEndPoint,
      question
    );
  }
}
