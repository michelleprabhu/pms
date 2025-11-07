import { Component, OnInit } from '@angular/core';
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
  selector: 'app-score-card-details',
  imports: [CommonModule],
  templateUrl: './score-card-details.html',
  styleUrl: './score-card-details.css',
})
export class ScoreCardDetails implements OnInit {
  isSidebarCollapsed = false;
  activeTab: string = 'goals';
  scoreCard: ScoreCard | null = null;

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.scoreCard = navigation.extras.state['scoreCard'];
    }
  }

  ngOnInit() {
    // If no score card data, redirect back to score cards list
    if (!this.scoreCard) {
      this.navigateToScoreCards();
    }
  }

  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

  navigateToDashboard() {
    this.router.navigate(['/hr-dashboard']);
  }

  navigateToScoreCards() {
    this.router.navigate(['/score-cards']);
  }

  navigateToReviewPeriod() {
    this.router.navigate(['/review-period']);
  }

  signOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}

