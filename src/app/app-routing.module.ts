import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCategoryComponent } from './pages/admin/add-category/add-category.component';
import { AddQuestionComponent } from './pages/admin/add-question/add-question.component';
import { AddQuizComponent } from './pages/admin/add-quiz/add-quiz.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { UpdateQuestionComponent } from './pages/admin/update-question/update-question.component';
import { UpdateQuizComponent } from './pages/admin/update-quiz/update-quiz.component';
import { UsersComponent } from './pages/admin/users/users.component';
import { ViewCategoryComponent } from './pages/admin/view-category/view-category.component';
import { ViewQuizQuestionsComponent } from './pages/admin/view-quiz-questions/view-quiz-questions.component';
import { ViewQuizComponent } from './pages/admin/view-quiz/view-quiz.component';
import { WelcomeComponent } from './pages/admin/welcome/welcome.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SignupComponent } from './pages/signup/signup.component';
import { InstructionsComponent } from './pages/user/instructions/instructions.component';
import { LoadQuizComponent } from './pages/user/load-quiz/load-quiz.component';
import { StartComponent } from './pages/user/start/start.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { AdminGuard } from './services/admin.guard';
import { NormalGuard } from './services/normal.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
  },
  {
    path: 'signup',
    component: SignupComponent,
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full',
  },
  {
    path: 'admin-dashboard',
    component: DashboardComponent,
    canActivate: [AdminGuard],
    children: [
      {
        path: '',
        component: WelcomeComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'users',
        component: UsersComponent,
      },
      {
        path: 'category',
        component: ViewCategoryComponent,
      },
      {
        path: 'add-category',
        component: AddCategoryComponent,
      },
      {
        path: 'quiz',
        component: ViewQuizComponent,
      },
      {
        path: 'add-quiz',
        component: AddQuizComponent,
      },
      {
        path: 'update-quiz/:quizId',
        component: UpdateQuizComponent,
      },
      {
        path: 'view-questions/:quizId/:title',
        component: ViewQuizQuestionsComponent,
      },
      {
        path: 'add-question/:qId/:qTitle',
        component: AddQuestionComponent,
      },
      {
        path: 'update-question/:qId/:qTitle',
        component: UpdateQuestionComponent,
      },
    ],
  },
  {
    path: 'user-dashboard',
    component: UserDashboardComponent,
    canActivate: [NormalGuard],
    children: [
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: ':cId',
        component: LoadQuizComponent,
      },
      {
        path: 'instructions/:quizId',
        component: InstructionsComponent,
      },
    ],
  },
  {
    path: 'start/:quizId',
    component: StartComponent,
    canActivate: [NormalGuard],
  },
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
