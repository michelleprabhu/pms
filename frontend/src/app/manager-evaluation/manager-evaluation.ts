import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manager-evaluation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './manager-evaluation.html',
  styleUrls: ['./manager-evaluation.css']
})
export class ManagerEvaluationComponent {
  isSidebarCollapsed = false;

  evaluations = [
    { id: 1, employeeName: 'John Doe', reviewPeriod: 'Q4 2024', createdOn: '2024-10-01', createdBy: 'HR Admin', status: 'Completed' },
    { id: 2, employeeName: 'Jane Smith', reviewPeriod: 'Q4 2024', createdOn: '2024-10-05', createdBy: 'HR Admin', status: 'Completed' },
    { id: 3, employeeName: 'Mike Johnson', reviewPeriod: 'Q4 2024', createdOn: '2024-10-10', createdBy: 'HR Admin', status: 'Completed' },
    { id: 4, employeeName: 'Sarah Williams', reviewPeriod: 'Q3 2024', createdOn: '2024-07-15', createdBy: 'HR Admin', status: 'Completed' },
    { id: 5, employeeName: 'David Brown', reviewPeriod: 'Q3 2024', createdOn: '2024-07-20', createdBy: 'HR Admin', status: 'Completed' }
  ];

  constructor(private router: Router) {}

  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

  navigateToDashboard() {
    this.router.navigate(['/manager-dashboard']);
  }

  navigateToScoreCards() {
    this.router.navigate(['/manager-score-cards']);
  }

  navigateToEvaluation() {
    this.router.navigate(['/manager-evaluation']);
  }

  viewEvaluationDetails(evaluationId: number) {
    this.router.navigate(['/manager-evaluation-details'], { queryParams: { id: evaluationId } });
  }

  signOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}

