import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

interface Goal {
  name: string;
  description: string;
  successCriteria: string;
  status: string;
  weight: number;
  reviewPeriod: string;
  startDate: string;
  endDate: string;
}

interface Competency {
  name: string;
  description: string;
  minLevel: number;
  maxLevel: number;
}

interface Value {
  name: string;
  description: string;
}

@Component({
  selector: 'app-employee-score-card-details',
  imports: [CommonModule],
  templateUrl: './employee-score-card-details.html',
  styleUrl: './employee-score-card-details.css',
})
export class EmployeeScoreCardDetailsComponent implements OnInit {
  isSidebarCollapsed = false;
  activeTab: string = 'goals';
  employeeName = 'Sarah Johnson';
  scoreCardId: number = 1;
  reviewPeriod: string = 'Q4 2024';
  assignedBy: string = 'HR Admin';
  startDate: string = 'Oct 1, 2024';
  endDate: string = 'Dec 31, 2024';
  status: string = 'Active';
  
  goals: Goal[] = [
    {
      name: 'Increase Sales Revenue',
      description: 'Achieve 20% growth in quarterly sales',
      successCriteria: 'Revenue increases by $500K and meets or exceeds 20% growth target with documented customer acquisitions',
      status: 'In Progress',
      weight: 30,
      reviewPeriod: 'Q4 2024',
      startDate: 'Oct 1, 2024',
      endDate: 'Dec 31, 2024'
    },
    {
      name: 'Improve Customer Satisfaction',
      description: 'Increase CSAT score to 4.5/5',
      successCriteria: 'CSAT survey results show consistent scores of 4.5 or higher across all customer touchpoints for 3 consecutive months',
      status: 'In Progress',
      weight: 25,
      reviewPeriod: 'Q4 2024',
      startDate: 'Oct 1, 2024',
      endDate: 'Dec 31, 2024'
    },
    {
      name: 'Complete Product Launch',
      description: 'Successfully launch new product line',
      successCriteria: 'Product is live in production, all features are functional, user documentation is published, and 100+ active users within first month',
      status: 'Not Started',
      weight: 20,
      reviewPeriod: 'Q4 2024',
      startDate: 'Oct 15, 2024',
      endDate: 'Dec 31, 2024'
    },
    {
      name: 'Team Development',
      description: 'Conduct training sessions for team members',
      successCriteria: 'Complete 8 training sessions with 90%+ attendance and positive feedback scores above 4/5 from participants',
      status: 'In Progress',
      weight: 15,
      reviewPeriod: 'Q4 2024',
      startDate: 'Oct 1, 2024',
      endDate: 'Dec 15, 2024'
    },
    {
      name: 'Process Improvement',
      description: 'Streamline workflow processes',
      successCriteria: 'Process efficiency improved by 25%, documented procedures created, and team adoption rate of 80% or higher',
      status: 'Not Started',
      weight: 10,
      reviewPeriod: 'Q4 2024',
      startDate: 'Nov 1, 2024',
      endDate: 'Dec 31, 2024'
    }
  ];

  competencies: Competency[] = [
    {
      name: 'Software Development',
      description: 'Proficiency in coding, debugging, and software design patterns',
      minLevel: 3,
      maxLevel: 5
    },
    {
      name: 'Code Review & Quality',
      description: 'Ability to conduct thorough code reviews and maintain code quality standards',
      minLevel: 3,
      maxLevel: 5
    },
    {
      name: 'System Design & Architecture',
      description: 'Design scalable and maintainable system architectures',
      minLevel: 3,
      maxLevel: 5
    },
    {
      name: 'DevOps & CI/CD',
      description: 'Knowledge of deployment pipelines, containerization, and cloud platforms',
      minLevel: 2,
      maxLevel: 5
    },
    {
      name: 'Database Management',
      description: 'Proficiency in SQL/NoSQL databases, query optimization, and data modeling',
      minLevel: 3,
      maxLevel: 5
    },
    {
      name: 'API Development',
      description: 'Design and implement RESTful APIs and microservices',
      minLevel: 3,
      maxLevel: 5
    },
    {
      name: 'Testing & QA',
      description: 'Unit testing, integration testing, and test automation',
      minLevel: 3,
      maxLevel: 5
    },
    {
      name: 'Version Control (Git)',
      description: 'Proficiency in Git workflows, branching strategies, and collaboration',
      minLevel: 4,
      maxLevel: 5
    },
    {
      name: 'Agile Methodologies',
      description: 'Understanding of Scrum, Kanban, and agile development practices',
      minLevel: 3,
      maxLevel: 5
    },
    {
      name: 'Problem Solving',
      description: 'Analytical thinking and debugging complex technical issues',
      minLevel: 4,
      maxLevel: 5
    },
    {
      name: 'Communication',
      description: 'Clear technical communication with team members and stakeholders',
      minLevel: 3,
      maxLevel: 5
    },
    {
      name: 'Leadership & Mentoring',
      description: 'Ability to mentor junior developers and lead technical initiatives',
      minLevel: 2,
      maxLevel: 5
    }
  ];

  values: Value[] = [
    {
      name: 'Integrity',
      description: 'Demonstrates honesty and strong moral principles'
    },
    {
      name: 'Innovation',
      description: 'Brings creative solutions and new ideas'
    },
    {
      name: 'Collaboration',
      description: 'Works well with team members and stakeholders'
    },
    {
      name: 'Customer Focus',
      description: 'Prioritizes customer needs and satisfaction'
    },
    {
      name: 'Accountability',
      description: 'Takes ownership of work and commitments'
    },
    {
      name: 'Continuous Learning',
      description: 'Actively seeks to improve skills and knowledge'
    }
  ];

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.scoreCardId = +params['id'] || 1;
      // In a real application, you would fetch score card data based on this.scoreCardId
    });
  }

  getTotalWeight(): number {
    return this.goals.reduce((total, goal) => total + goal.weight, 0);
  }

  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

  navigateToDashboard() {
    this.router.navigate(['/employee-dashboard']);
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

