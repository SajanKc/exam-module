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

  public getActiveQuestionsOfQuiz(qid: number): Observable<Question[]> {
    return this.httpClient.get<Question[]>(
      this.baseUrl + this.apiUrlEndPoint + '/quiz/' + qid
    );
  }

  public getQuestionById(qId: number): Observable<any> {
    console.log('ID S', qId);
    return this.httpClient.get<any>(
      this.baseUrl + this.apiUrlEndPoint + '/' + qId
    );
  }

  public addQuestionOfQuiz(question: any): Observable<any> {
    return this.httpClient.post<any>(
      this.baseUrl + this.apiUrlEndPoint,
      question
    );
  }

  public updateQuestion(qId: number, question: any) {
    return this.httpClient.put(
      this.baseUrl + this.apiUrlEndPoint + '/' + qId,
      question
    );
  }

  public deleteQuestion(qId: number) {
    return this.httpClient.delete(
      this.baseUrl + this.apiUrlEndPoint + '/' + qId
    );
  }

  public submitQuizAnswer(questions: any) {
    return this.httpClient.post(
      this.baseUrl + this.apiUrlEndPoint + '/submit-quiz',
      questions
    );
  }
}
