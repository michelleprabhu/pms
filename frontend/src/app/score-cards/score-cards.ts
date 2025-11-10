import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface ScoreCard {
  employeeName: string;
  reviewPeriod: string;
  createdOn: string;
  createdBy: string;
  status: string;
  approvalStatus: string;
}

@Component({
  selector: 'app-score-cards',
  imports: [CommonModule, FormsModule],
  templateUrl: './score-cards.html',
  styleUrl: './score-cards.css',
})
export class ScoreCards {
  isSidebarCollapsed = false;
  showGoalForm = false;
  showProcessForm = false;
  processFormActiveTab: string = 'goals';
  
  scoreCards: ScoreCard[] = [
    // Q3 2024
    {
      employeeName: 'Sarah Johnson',
      reviewPeriod: 'Q3 2024',
      createdOn: 'Jul 15, 2024',
      createdBy: 'HR Admin',
      status: 'Active',
      approvalStatus: 'Approved'
    },
    {
      employeeName: 'Michael Chen',
      reviewPeriod: 'Q3 2024',
      createdOn: 'Jul 16, 2024',
      createdBy: 'HR Admin',
      status: 'Active',
      approvalStatus: 'Approved'
    },
    {
      employeeName: 'Emily Rodriguez',
      reviewPeriod: 'Q3 2024',
      createdOn: 'Jul 17, 2024',
      createdBy: 'Manager',
      status: 'Active',
      approvalStatus: 'Pending'
    },
    {
      employeeName: 'Christopher Lee',
      reviewPeriod: 'Q3 2024',
      createdOn: 'Jul 18, 2024',
      createdBy: 'Manager',
      status: 'Active',
      approvalStatus: 'Pending'
    },
    // Q4 2024
    {
      employeeName: 'David Thompson',
      reviewPeriod: 'Q4 2024',
      createdOn: 'Oct 5, 2024',
      createdBy: 'HR Admin',
      status: 'Active',
      approvalStatus: 'Approved'
    },
    {
      employeeName: 'Jessica Williams',
      reviewPeriod: 'Q4 2024',
      createdOn: 'Oct 6, 2024',
      createdBy: 'Manager',
      status: 'Active',
      approvalStatus: 'Pending'
    },
    {
      employeeName: 'Kevin Martinez',
      reviewPeriod: 'Q4 2024',
      createdOn: 'Oct 8, 2024',
      createdBy: 'HR Admin',
      status: 'Active',
      approvalStatus: 'Approved'
    },
    // Annual 2024
    {
      employeeName: 'Robert Martinez',
      reviewPeriod: 'Annual 2024',
      createdOn: 'Jan 10, 2024',
      createdBy: 'HR Admin',
      status: 'Active',
      approvalStatus: 'Approved'
    },
    {
      employeeName: 'Amanda Brown',
      reviewPeriod: 'Annual 2024',
      createdOn: 'Jan 12, 2024',
      createdBy: 'HR Admin',
      status: 'Active',
      approvalStatus: 'Approved'
    },
    {
      employeeName: 'Patricia Davis',
      reviewPeriod: 'Annual 2024',
      createdOn: 'Jan 15, 2024',
      createdBy: 'Manager',
      status: 'Active',
      approvalStatus: 'Pending'
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

  navigateToEvaluation() {
    this.router.navigate(['/evaluation']);
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

  showAddGoalForm() {
    this.showGoalForm = true;
  }

  closeAddGoalForm() {
    this.showGoalForm = false;
  }

  showStartProcessForm() {
    this.showProcessForm = true;
  }

  closeStartProcessForm() {
    this.showProcessForm = false;
  }

  updateScoreCardStatus(scoreCard: ScoreCard) {
    console.log(`Updated status for ${scoreCard.employeeName} to ${scoreCard.status}`);
    // In a real app, you would save this to the backend
  }

  setProcessFormTab(tab: string) {
    this.processFormActiveTab = tab;
  }

  approveScoreCard(scoreCard: ScoreCard) {
    scoreCard.approvalStatus = 'Approved';
    console.log(`Approved score card for ${scoreCard.employeeName}`);
    // In a real app, you would save this to the backend
  }

  rejectScoreCard(scoreCard: ScoreCard) {
    scoreCard.approvalStatus = 'Rejected';
    console.log(`Rejected score card for ${scoreCard.employeeName}`);
    // In a real app, you would save this to the backend
  }
}

