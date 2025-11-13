import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface ReviewPeriod {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  status: string;
  employeeCount: number;
}

interface EligibilityProfile {
  id: number;
  name: string;
  description: string;
  department: string;
  positionCriteria: string;
  goalsWeightage: number;
  competenciesWeightage: number;
  valuesWeightage: number;
  matchingEmployees: number;
  selected?: boolean;
}

@Component({
  selector: 'app-planning',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './planning.html',
  styleUrls: ['./planning.css']
})
export class PlanningComponent {
  isSidebarCollapsed = false;
  showStartPlanningModal = false;
  showSuccessPopup = false;
  isGenerating = false;
  selectedPeriod: ReviewPeriod | null = null;
  totalWeightage = 100;

  weightageConfig = {
    goals: 60,
    competencies: 25,
    values: 15
  };

  activeReviewPeriods: ReviewPeriod[] = [
    { id: 1, name: 'Q1 2025', startDate: 'Jan 1, 2025', endDate: 'Mar 31, 2025', status: 'Active', employeeCount: 50 }
  ];

  completedReviewPeriods: ReviewPeriod[] = [
    { id: 3, name: 'Q3 2024', startDate: 'Jul 1, 2024', endDate: 'Sep 30, 2024', status: 'Completed', employeeCount: 248 },
    { id: 4, name: 'Q2 2024', startDate: 'Apr 1, 2024', endDate: 'Jun 30, 2024', status: 'Completed', employeeCount: 240 },
    { id: 5, name: 'Q1 2024', startDate: 'Jan 1, 2024', endDate: 'Mar 31, 2024', status: 'Completed', employeeCount: 235 },
    { id: 6, name: 'Annual 2023', startDate: 'Jan 1, 2023', endDate: 'Dec 31, 2023', status: 'Completed', employeeCount: 220 }
  ];

  eligibilityProfiles: EligibilityProfile[] = [
    {
      id: 1,
      name: 'Executive Leadership Profile',
      description: 'C-level executives and senior leadership team',
      department: 'All',
      positionCriteria: 'CEO|CFO|CTO|COO|VP|Vice President',
      goalsWeightage: 40,
      competenciesWeightage: 35,
      valuesWeightage: 25,
      matchingEmployees: 8,
      selected: false
    },
    {
      id: 2,
      name: 'Manager Profile',
      description: 'All employees in managerial positions across departments',
      department: 'All',
      positionCriteria: 'Manager|Director|Lead|Head',
      goalsWeightage: 50,
      competenciesWeightage: 30,
      valuesWeightage: 20,
      matchingEmployees: 45,
      selected: false
    },
    {
      id: 3,
      name: 'Software Developer Profile',
      description: 'Engineering team developers and programmers',
      department: 'Engineering',
      positionCriteria: 'Engineer|Developer|Programmer|Software',
      goalsWeightage: 60,
      competenciesWeightage: 25,
      valuesWeightage: 15,
      matchingEmployees: 120,
      selected: false
    },
    {
      id: 4,
      name: 'Senior Software Engineer Profile',
      description: 'Senior and principal engineers with leadership responsibilities',
      department: 'Engineering',
      positionCriteria: 'Senior Engineer|Principal Engineer|Staff Engineer|Architect',
      goalsWeightage: 55,
      competenciesWeightage: 30,
      valuesWeightage: 15,
      matchingEmployees: 35,
      selected: false
    },
    {
      id: 5,
      name: 'Sales Team Profile',
      description: 'All sales department employees including reps and managers',
      department: 'Sales',
      positionCriteria: 'All',
      goalsWeightage: 70,
      competenciesWeightage: 20,
      valuesWeightage: 10,
      matchingEmployees: 42,
      selected: false
    },
    {
      id: 6,
      name: 'Sales Representatives Profile',
      description: 'Individual contributor sales representatives',
      department: 'Sales',
      positionCriteria: 'Sales Representative|Sales Associate|Account Executive',
      goalsWeightage: 75,
      competenciesWeightage: 15,
      valuesWeightage: 10,
      matchingEmployees: 28,
      selected: false
    },
    {
      id: 7,
      name: 'Business Analyst Profile',
      description: 'Business and data analysts across all departments',
      department: 'All',
      positionCriteria: 'Analyst|Analytics|Data Analyst|Business Analyst',
      goalsWeightage: 55,
      competenciesWeightage: 30,
      valuesWeightage: 15,
      matchingEmployees: 32,
      selected: false
    },
    {
      id: 8,
      name: 'Marketing Team Profile',
      description: 'Marketing department employees including specialists and managers',
      department: 'Marketing',
      positionCriteria: 'All',
      goalsWeightage: 60,
      competenciesWeightage: 25,
      valuesWeightage: 15,
      matchingEmployees: 18,
      selected: false
    },
    {
      id: 9,
      name: 'Human Resources Profile',
      description: 'HR department including recruiters, specialists, and managers',
      department: 'HR',
      positionCriteria: 'All',
      goalsWeightage: 50,
      competenciesWeightage: 35,
      valuesWeightage: 15,
      matchingEmployees: 12,
      selected: false
    },
    {
      id: 10,
      name: 'Finance & Accounting Profile',
      description: 'Finance department including accountants, controllers, and analysts',
      department: 'Finance',
      positionCriteria: 'All',
      goalsWeightage: 50,
      competenciesWeightage: 35,
      valuesWeightage: 15,
      matchingEmployees: 15,
      selected: false
    },
    {
      id: 11,
      name: 'Operations Team Profile',
      description: 'Operations department including coordinators and managers',
      department: 'Operations',
      positionCriteria: 'All',
      goalsWeightage: 55,
      competenciesWeightage: 30,
      valuesWeightage: 15,
      matchingEmployees: 22,
      selected: false
    },
    {
      id: 12,
      name: 'Product Management Profile',
      description: 'Product managers and product owners',
      department: 'Product',
      positionCriteria: 'Product Manager|Product Owner|Product Lead',
      goalsWeightage: 60,
      competenciesWeightage: 25,
      valuesWeightage: 15,
      matchingEmployees: 14,
      selected: false
    }
  ];

  constructor(private router: Router) {}

  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

  navigateToDashboard() {
    this.router.navigate(['/hr-dashboard']);
  }

  navigateToReviewPeriods() {
    this.router.navigate(['/review-period']);
  }

  navigateToPlanning() {
    this.router.navigate(['/planning']);
  }

  navigateToScoreCards() {
    this.router.navigate(['/score-cards']);
  }

  navigateToEvaluation() {
    this.router.navigate(['/evaluation-periods']);
  }

  viewPlanningEmployees(periodId: number) {
    this.router.navigate(['/planning/employees'], { queryParams: { periodId: periodId } });
  }

  signOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  // Modal methods
  openStartPlanningModal(period: ReviewPeriod) {
    this.selectedPeriod = period;
    this.showStartPlanningModal = true;
    // Reset selections
    this.eligibilityProfiles.forEach(p => p.selected = false);
    this.weightageConfig = { goals: 60, competencies: 25, values: 15 };
    this.calculateTotal();
  }

  closeStartPlanningModal() {
    this.showStartPlanningModal = false;
    this.selectedPeriod = null;
  }

  toggleProfileSelection(profile: EligibilityProfile) {
    profile.selected = !profile.selected;
  }

  calculateTotal() {
    this.totalWeightage = 
      Number(this.weightageConfig.goals) + 
      Number(this.weightageConfig.competencies) + 
      Number(this.weightageConfig.values);
  }

  getSelectedProfilesCount(): number {
    return this.eligibilityProfiles.filter(p => p.selected).length;
  }

  getTotalEmployees(): number {
    return this.eligibilityProfiles
      .filter(p => p.selected)
      .reduce((total, profile) => total + profile.matchingEmployees, 0);
  }

  canGenerate(): boolean {
    return this.getSelectedProfilesCount() > 0 && this.totalWeightage === 100 && !this.isGenerating;
  }

  getGenerateButtonTooltip(): string {
    if (this.getSelectedProfilesCount() === 0) {
      return 'Select at least one profile';
    }
    if (this.totalWeightage !== 100) {
      return 'Weightages must total 100%';
    }
    return '';
  }

  generateScoreCards() {
    if (!this.canGenerate()) {
      return;
    }

    this.isGenerating = true;

    // Simulate generation process (2 seconds delay)
    setTimeout(() => {
      this.isGenerating = false;
      this.closeStartPlanningModal();
      this.showSuccessPopup = true;

      // Auto-dismiss after 3 seconds
      setTimeout(() => {
        this.closeSuccessPopup();
      }, 3000);
    }, 2000);
  }

  closeSuccessPopup() {
    this.showSuccessPopup = false;
  }
}

