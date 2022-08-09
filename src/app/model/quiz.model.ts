import { Category } from './category.model';

export class Quiz {
  id: number | undefined;
  title: string | undefined;
  description: string | undefined;
  maxMarks: number | undefined;
  numberOfQuestions: number | undefined;
  active: boolean | undefined;
  category: Category = new Category();
}
