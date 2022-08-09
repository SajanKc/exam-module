import { Category } from './category.model';

export class Quiz {
  qId: number | undefined;
  title: string | undefined;
  description: string | undefined;
  maxMarks: number | undefined;
  numberOfQuestions: number | undefined;
  active: boolean | undefined;
  // category: Category = new Category();
}
