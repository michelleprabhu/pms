import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface Goal {
  id: number;
  name: string;
  type: string;
  weight: number;
  employeeComments: string;
  employeeRating: number | null;
}

interface Competency {
  id: number;
  name: string;
  description: string;
  minProficiency: string;
  maxProficiency: string;
  employeeComments: string;
  employeeRating: number | null;
}

interface Value {
  id: number;
  name: string;
  employeeComments: string;
  employeeRating: number | null;
}

@Component({
  selector: 'app-employee-self-evaluation-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employee-self-evaluation-details.html',
  styleUrls: ['./employee-self-evaluation-details.css']
})
export class EmployeeSelfEvaluationDetailsComponent implements OnInit {
  isSidebarCollapsed = false;
  activeTab: string = 'goals';
  employeeName = 'Sarah Johnson';
  reviewPeriodId: number = 1;

  reviewPeriodInfo = {
    name: 'Q4 2024',
    startDate: 'Oct 1, 2024',
    endDate: 'Dec 31, 2024',
    status: 'Active'
  };

  goals: Goal[] = [
    { id: 1, name: 'Complete Q4 Sales Target', type: 'Personal Goal', weight: 30, employeeComments: '', employeeRating: null },
    { id: 2, name: 'Develop New Client Relationships', type: 'Personal Goal', weight: 25, employeeComments: '', employeeRating: null },
    { id: 3, name: 'Improve Team Collaboration', type: 'Development Goal', weight: 20, employeeComments: '', employeeRating: null },
    { id: 4, name: 'Complete Product Training', type: 'Development Goal', weight: 15, employeeComments: '', employeeRating: null },
    { id: 5, name: 'Reduce Customer Complaints', type: 'Personal Goal', weight: 10, employeeComments: '', employeeRating: null }
  ];

  competencies: Competency[] = [
    { id: 1, name: 'Communication', description: 'Effective verbal and written communication', minProficiency: 'Basic', maxProficiency: 'Expert', employeeComments: '', employeeRating: null },
    { id: 2, name: 'Leadership', description: 'Ability to guide and motivate team members', minProficiency: 'Intermediate', maxProficiency: 'Expert', employeeComments: '', employeeRating: null },
    { id: 3, name: 'Problem Solving', description: 'Analytical thinking and solution development', minProficiency: 'Basic', maxProficiency: 'Advanced', employeeComments: '', employeeRating: null },
    { id: 4, name: 'Technical Skills', description: 'Proficiency in relevant tools and technologies', minProficiency: 'Intermediate', maxProficiency: 'Expert', employeeComments: '', employeeRating: null }
  ];

  values: Value[] = [
    { id: 1, name: 'Integrity', employeeComments: '', employeeRating: null },
    { id: 2, name: 'Innovation', employeeComments: '', employeeRating: null },
    { id: 3, name: 'Customer Focus', employeeComments: '', employeeRating: null },
    { id: 4, name: 'Accountability', employeeComments: '', employeeRating: null }
  ];

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.reviewPeriodId = +params['id'] || 1;
    });
  }

  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  getGoalsByType(type: string): Goal[] {
    return this.goals.filter(goal => goal.type === type);
  }

  getWeightedAverageRating(): string {
    const weightedSum = this.goals
      .filter(goal => goal.employeeRating !== null)
      .reduce((sum, goal) => sum + (goal.employeeRating! * goal.weight), 0);
    
    const totalWeight = this.goals
      .filter(goal => goal.employeeRating !== null)
      .reduce((sum, goal) => sum + goal.weight, 0);
    
    if (totalWeight === 0) return 'N/A';
    return (weightedSum / totalWeight).toFixed(2);
  }

  calculateAverageRating(items: (Competency | Value)[]): string {
    const ratedItems = items.filter(item => item.employeeRating !== null);
    if (ratedItems.length === 0) return 'N/A';
    const totalRating = ratedItems.reduce((sum, item) => sum + item.employeeRating!, 0);
    return (totalRating / ratedItems.length).toFixed(2);
  }

  saveSelfEvaluation() {
    console.log('Saving self evaluation:', {
      reviewPeriodId: this.reviewPeriodId,
      goals: this.goals,
      competencies: this.competencies,
      values: this.values
    });
    alert('Self evaluation saved successfully!');
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

  signOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}

