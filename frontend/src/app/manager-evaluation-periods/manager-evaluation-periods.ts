import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface ReviewPeriod {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  status: string;
  employeeCount: number;
}

@Component({
  selector: 'app-manager-evaluation-periods',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './manager-evaluation-periods.html',
  styleUrls: ['./manager-evaluation-periods.css']
})
export class ManagerEvaluationPeriodsComponent {
  isSidebarCollapsed = false;

  activeReviewPeriods: ReviewPeriod[] = [
    { id: 1, name: 'Q4 2024', startDate: 'Oct 1, 2024', endDate: 'Dec 31, 2024', status: 'Active', employeeCount: 12 },
    { id: 2, name: 'Annual 2024', startDate: 'Jan 1, 2024', endDate: 'Dec 31, 2024', status: 'Active', employeeCount: 12 }
  ];

  completedReviewPeriods: ReviewPeriod[] = [
    { id: 3, name: 'Q3 2024', startDate: 'Jul 1, 2024', endDate: 'Sep 30, 2024', status: 'Completed', employeeCount: 12 },
    { id: 4, name: 'Q2 2024', startDate: 'Apr 1, 2024', endDate: 'Jun 30, 2024', status: 'Completed', employeeCount: 11 },
    { id: 5, name: 'Q1 2024', startDate: 'Jan 1, 2024', endDate: 'Mar 31, 2024', status: 'Completed', employeeCount: 10 },
    { id: 6, name: 'Annual 2023', startDate: 'Jan 1, 2023', endDate: 'Dec 31, 2023', status: 'Completed', employeeCount: 10 }
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
    this.router.navigate(['/manager-evaluation-periods']);
  }

  viewPeriodEvaluations(periodId: number) {
    this.router.navigate(['/manager-evaluation'], { queryParams: { periodId: periodId } });
  }

  signOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}

