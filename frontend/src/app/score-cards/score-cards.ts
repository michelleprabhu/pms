import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface ScoreCard {
  employeeName: string;
  reviewPeriod: string;
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
  
  scoreCards: ScoreCard[] = [
    // Q1 2025 - Planning Phase
    {
      employeeName: 'John Doe',
      reviewPeriod: 'Q1 2025',
      status: 'Plan Started',
      approvalStatus: 'Approved'
    },
    {
      employeeName: 'Jane Smith',
      reviewPeriod: 'Q1 2025',
      status: 'Planning in Progress',
      approvalStatus: 'Approved'
    },
    {
      employeeName: 'Mike Johnson',
      reviewPeriod: 'Q1 2025',
      status: 'Pending Employee Acceptance',
      approvalStatus: 'Approved'
    },
    // Q4 2024 - Evaluation Phase
    {
      employeeName: 'David Thompson',
      reviewPeriod: 'Q4 2024',
      status: 'Pending Manager Evaluation',
      approvalStatus: 'Approved'
    },
    {
      employeeName: 'Jessica Williams',
      reviewPeriod: 'Q4 2024',
      status: 'Pending HR Evaluation',
      approvalStatus: 'Approved'
    },
    {
      employeeName: 'Kevin Martinez',
      reviewPeriod: 'Q4 2024',
      status: 'Evaluation Complete',
      approvalStatus: 'Approved'
    },
    // Q3 2024 - Completed
    {
      employeeName: 'Sarah Johnson',
      reviewPeriod: 'Q3 2024',
      status: 'Evaluation Complete',
      approvalStatus: 'Approved'
    },
    {
      employeeName: 'Michael Chen',
      reviewPeriod: 'Q3 2024',
      status: 'Evaluation Complete',
      approvalStatus: 'Approved'
    },
    {
      employeeName: 'Emily Rodriguez',
      reviewPeriod: 'Q3 2024',
      status: 'Evaluation Complete',
      approvalStatus: 'Approved'
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

  navigateToPlanning() {
    this.router.navigate(['/planning']);
  }

  navigateToEvaluation() {
    this.router.navigate(['/evaluation-periods']);
  }

  navigateToScoreCards() {
    this.router.navigate(['/score-cards']);
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
    // Use employee name to find ID - in real app, use actual ID
    const scoreCardId = this.scoreCards.indexOf(scoreCard) + 1;
    this.router.navigate(['/score-card-details'], {
      queryParams: { id: scoreCardId }
    });
  }

  updateScoreCardStatus(scoreCard: ScoreCard) {
    console.log(`Updated status for ${scoreCard.employeeName} to ${scoreCard.status}`);
    // In a real app, you would save this to the backend
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'Plan Started':
        return 'status-plan-started';
      case 'Planning in Progress':
        return 'status-planning-progress';
      case 'Pending Employee Acceptance':
        return 'status-pending-acceptance';
      case 'Plan Finalized':
        return 'status-plan-finalized';
      case 'Evaluation Started':
        return 'status-evaluation-started';
      case 'Pending Manager Evaluation':
        return 'status-pending-manager';
      case 'Pending HR Evaluation':
        return 'status-pending-hr';
      case 'Evaluation Complete':
        return 'status-evaluation-complete';
      default:
        return '';
    }
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

