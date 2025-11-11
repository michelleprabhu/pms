import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface ScoreCard {
  id: number;
  reviewPeriod: string;
  assignedBy: string;
  startDate: string;
  endDate: string;
  status: string;
}

@Component({
  selector: 'app-employee-score-cards',
  imports: [CommonModule],
  templateUrl: './employee-score-cards.html',
  styleUrl: './employee-score-cards.css',
})
export class EmployeeScoreCardsComponent {
  isSidebarCollapsed = false;
  employeeName = 'Sarah Johnson';

  activeScoreCards: ScoreCard[] = [
    { id: 1, reviewPeriod: 'Q4 2024', assignedBy: 'HR Admin', startDate: 'Oct 1, 2024', endDate: 'Dec 31, 2024', status: 'Active' },
    { id: 2, reviewPeriod: 'Q3 2024', assignedBy: 'Manager', startDate: 'Jul 1, 2024', endDate: 'Sep 30, 2024', status: 'Active' },
    { id: 3, reviewPeriod: 'Annual 2024', assignedBy: 'HR Admin', startDate: 'Jan 1, 2024', endDate: 'Dec 31, 2024', status: 'Active' }
  ];

  completedScoreCards: ScoreCard[] = [
    { id: 4, reviewPeriod: 'Q2 2024', assignedBy: 'HR Admin', startDate: 'Apr 1, 2024', endDate: 'Jun 30, 2024', status: 'Completed' },
    { id: 5, reviewPeriod: 'Q1 2024', assignedBy: 'Manager', startDate: 'Jan 1, 2024', endDate: 'Mar 31, 2024', status: 'Completed' },
    { id: 6, reviewPeriod: 'Annual 2023', assignedBy: 'HR Admin', startDate: 'Jan 1, 2023', endDate: 'Dec 31, 2023', status: 'Completed' }
  ];

  constructor(private router: Router) {}

  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

  navigateToDashboard() {
    this.router.navigate(['/employee-dashboard']);
  }

  navigateToScoreCards() {
    this.router.navigate(['/employee-score-cards']);
  }

  viewScoreCardDetails(scoreCardId: number) {
    this.router.navigate(['/employee-score-card-details'], { queryParams: { id: scoreCardId } });
  }

  signOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}

