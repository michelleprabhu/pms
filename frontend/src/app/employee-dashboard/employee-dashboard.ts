import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-dashboard',
  imports: [CommonModule],
  templateUrl: './employee-dashboard.html',
  styleUrl: './employee-dashboard.css',
})
export class EmployeeDashboard {
  isSidebarCollapsed = false;
  employeeName = 'Sarah Johnson';

  constructor(private router: Router) {}

  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

  navigateToScoreCards() {
    this.router.navigate(['/employee-score-cards']);
  }

  signOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}
