import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface ScoreCard {
  employeeName: string;
  reviewPeriod: string;
  createdOn: string;
  createdBy: string;
  status: string;
}

@Component({
  selector: 'app-score-cards',
  imports: [CommonModule],
  templateUrl: './score-cards.html',
  styleUrl: './score-cards.css',
})
export class ScoreCards {
  isSidebarCollapsed = false;
  
  scoreCards: ScoreCard[] = [
    {
      employeeName: 'Sarah Johnson',
      reviewPeriod: 'Q3 2024',
      createdOn: 'Jul 15, 2024',
      createdBy: 'HR Admin',
      status: 'Active'
    },
    {
      employeeName: 'Michael Chen',
      reviewPeriod: 'Q3 2024',
      createdOn: 'Jul 16, 2024',
      createdBy: 'HR Admin',
      status: 'Active'
    },
    {
      employeeName: 'Emily Rodriguez',
      reviewPeriod: 'Q3 2024',
      createdOn: 'Jul 17, 2024',
      createdBy: 'Manager',
      status: 'Active'
    },
    {
      employeeName: 'David Thompson',
      reviewPeriod: 'Q4 2024',
      createdOn: 'Oct 5, 2024',
      createdBy: 'HR Admin',
      status: 'Active'
    },
    {
      employeeName: 'Jessica Williams',
      reviewPeriod: 'Q4 2024',
      createdOn: 'Oct 6, 2024',
      createdBy: 'Manager',
      status: 'Active'
    },
    {
      employeeName: 'Robert Martinez',
      reviewPeriod: 'Yearly 2024',
      createdOn: 'Jan 10, 2024',
      createdBy: 'HR Admin',
      status: 'Active'
    },
    {
      employeeName: 'Amanda Brown',
      reviewPeriod: 'Yearly 2024',
      createdOn: 'Jan 12, 2024',
      createdBy: 'HR Admin',
      status: 'Active'
    },
    {
      employeeName: 'Christopher Lee',
      reviewPeriod: 'Q3 2024',
      createdOn: 'Jul 18, 2024',
      createdBy: 'Manager',
      status: 'Active'
    }
  ];

  constructor(private router: Router) {}

  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

  navigateToDashboard() {
    this.router.navigate(['/hr-dashboard']);
  }

  navigateToReviewPeriod() {
    this.router.navigate(['/review-period']);
  }

  signOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  getInitials(name: string): string {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  }

  viewScoreCardDetails(scoreCard: ScoreCard) {
    this.router.navigate(['/score-card-details'], {
      state: { scoreCard }
    });
  }
}

