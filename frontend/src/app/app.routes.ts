import { Routes } from '@angular/router';
import { Login } from './auth/login/login';
import { HrDashboard } from './hr-dashboard/hr-dashboard';
import { ManagerDashboard } from './manager-dashboard/manager-dashboard';
import { EmployeeDashboard } from './employee-dashboard/employee-dashboard';
import { ReviewPeriod } from './review-period/review-period';
import { ScoreCards } from './score-cards/score-cards';
import { ScoreCardDetails } from './score-card-details/score-card-details';
import { EvaluationComponent } from './evaluation/evaluation';
import { EvaluationDetailsComponent } from './evaluation-details/evaluation-details';
import { EmployeeScoreCardsComponent } from './employee-score-cards/employee-score-cards';
import { EmployeeScoreCardDetailsComponent } from './employee-score-card-details/employee-score-card-details';
import { EmployeeSelfEvaluationComponent } from './employee-self-evaluation/employee-self-evaluation';
import { EmployeeSelfEvaluationDetailsComponent } from './employee-self-evaluation-details/employee-self-evaluation-details';
import { EmployeeRatingsComponent } from './employee-ratings/employee-ratings';
import { EmployeeRatingsDetailsComponent } from './employee-ratings-details/employee-ratings-details';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'hr-dashboard', component: HrDashboard },
  { path: 'review-period', component: ReviewPeriod },
  { path: 'score-cards', component: ScoreCards },
  { path: 'score-card-details', component: ScoreCardDetails },
  { path: 'evaluation', component: EvaluationComponent },
  { path: 'evaluation-details', component: EvaluationDetailsComponent },
  { path: 'manager-dashboard', component: ManagerDashboard },
  { path: 'employee-dashboard', component: EmployeeDashboard },
  { path: 'employee-score-cards', component: EmployeeScoreCardsComponent },
  { path: 'employee-score-card-details', component: EmployeeScoreCardDetailsComponent },
  { path: 'employee-self-evaluation', component: EmployeeSelfEvaluationComponent },
  { path: 'employee-self-evaluation-details', component: EmployeeSelfEvaluationDetailsComponent },
  { path: 'employee-ratings', component: EmployeeRatingsComponent },
  { path: 'employee-ratings-details', component: EmployeeRatingsDetailsComponent },
  { path: '**', redirectTo: '/login' }
];

