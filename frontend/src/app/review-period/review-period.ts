import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ReviewPeriodService } from '../../services/review-period.service';

@Component({
  selector: 'app-review-period',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './review-period.html',
  styleUrl: './review-period.css',
})
export class ReviewPeriod {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);
  private reviewPeriodService = inject(ReviewPeriodService);

  isSidebarCollapsed = false;
  showForm = false;
  reviewPeriodForm: FormGroup;
  isSubmitting = false;
  errorMessage = '';
  successMessage = '';

  constructor() {
    this.reviewPeriodForm = this.fb.group({
      periodName: ['', Validators.required],
      periodType: ['', Validators.required],
      financialPeriod: [''],
      description: [''],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      status: ['Draft', Validators.required]
    });
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

  signOut() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  showAddForm() {
    this.showForm = true;
  }

  closeForm() {
    this.showForm = false;
    this.reviewPeriodForm.reset({ status: 'Draft' });
    this.errorMessage = '';
    this.successMessage = '';
  }

  onSubmit() {
    if (this.reviewPeriodForm.invalid) {
      this.errorMessage = 'Please fill in all required fields.';
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';
    this.successMessage = '';

    const formValue = this.reviewPeriodForm.value;
    
    const statusMapping: { [key: string]: string } = {
      'Draft': 'Draft',
      'Active': 'Open',
      'Completed': 'Closed'
    };

    const payload = {
      period_name: formValue.periodName,
      period_type: formValue.periodType,
      financial_period: formValue.financialPeriod || null,
      description: formValue.description || '',
      start_date: formValue.startDate,
      end_date: formValue.endDate,
      status: statusMapping[formValue.status] || 'Draft'
    };

    this.reviewPeriodService.createReviewPeriod(payload).subscribe({
      next: (response) => {
        this.isSubmitting = false;
        this.successMessage = 'Review Period created successfully!';
        console.log('Review Period created:', response);
        
        setTimeout(() => {
          this.closeForm();
        }, 2000);
      },
      error: (error) => {
        this.isSubmitting = false;
        console.error('Error creating Review Period:', error);
        this.errorMessage = error.error?.error || 'Failed to create Review Period. Please try again.';
      }
    });
  }
}
