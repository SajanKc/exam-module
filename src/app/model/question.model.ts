import { Quiz } from './quiz.model';

export class Question {
  qid: number | undefined;
  content: string | undefined;
  image: string | undefined;
  option1: string | undefined;
  option2: string | undefined;
  option3: string | undefined;
  option4: string | undefined;
  answer: string | undefined;
  // quiz: Quiz;
}
