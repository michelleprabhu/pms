import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface ReviewPeriod {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  overallRating: number;
}

@Component({
  selector: 'app-employee-ratings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employee-ratings.html',
  styleUrls: ['./employee-ratings.css']
})
export class EmployeeRatingsComponent {
  isSidebarCollapsed = false;
  employeeName = 'Sarah Johnson';

  completedReviewPeriods: ReviewPeriod[] = [
    { id: 1, name: 'Q4 2024', startDate: 'Oct 1, 2024', endDate: 'Dec 31, 2024', overallRating: 4.2 },
    { id: 2, name: 'Q3 2024', startDate: 'Jul 1, 2024', endDate: 'Sep 30, 2024', overallRating: 4.5 },
    { id: 3, name: 'Q2 2024', startDate: 'Apr 1, 2024', endDate: 'Jun 30, 2024', overallRating: 4.1 },
    { id: 4, name: 'Q1 2024', startDate: 'Jan 1, 2024', endDate: 'Mar 31, 2024', overallRating: 4.3 },
    { id: 5, name: 'Annual 2023', startDate: 'Jan 1, 2023', endDate: 'Dec 31, 2023', overallRating: 4.4 }
  ];

  constructor(private router: Router) {}

  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

  navigateToDashboard() {
    this.router.navigate(['/employee-dashboard']);
  }

  navigateToSelfEvaluation() {
    this.router.navigate(['/employee-self-evaluation']);
  }

  navigateToRatings() {
    this.router.navigate(['/employee-ratings']);
  }

  viewRatingDetails(reviewPeriodId: number) {
    this.router.navigate(['/employee-ratings-details'], { queryParams: { id: reviewPeriodId } });
  }

  signOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}
