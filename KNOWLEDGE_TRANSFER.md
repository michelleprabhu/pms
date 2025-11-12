# Performance Management System (PMS) - Knowledge Transfer Document

## Table of Contents
1. [System Overview](#system-overview)
2. [HR Module](#hr-module)
3. [Manager Module](#manager-module)
4. [Employee Module](#employee-module)
5. [Technical Architecture](#technical-architecture)
6. [Navigation Flows](#navigation-flows)

---

## System Overview

The Performance Management System (PMS) is built with:
- **Frontend**: Angular 19 (Standalone Components)
- **Backend**: Node.js/Express
- **Styling**: Custom CSS with maroon (#8B2E3E) as the primary accent color
- **Icons**: Font Awesome
- **Authentication**: JWT-based with localStorage

### Key Features
- Role-based access (HR, Manager, Employee)
- Score card management
- Performance evaluations
- Self-evaluation for employees
- Goal, Competency, and Value tracking
- Review period management
- Approval workflows

---

## HR Module

### 1. Login Page (`/login`)
**Path**: `frontend/src/app/auth/login/`

**Features**:
- iDUELA logo display
- Email and password input
- "Remember me" checkbox
- "Sign In" button
- "Forgot Password?" link

**Functionality**:
- Validates credentials
- Stores JWT token in localStorage
- Redirects to `/hr-dashboard` on successful login

---

### 2. HR Dashboard (`/hr-dashboard`)
**Path**: `frontend/src/app/hr-dashboard/`

**Layout**:
- **Sidebar** (collapsible):
  - iDUELA logo (full logo when expanded, small logo when collapsed)
  - Navigation items:
    - Dashboard (active)
    - Score Cards
    - Evaluation
    - Review Periods (Settings section)
    - Eligibility Profile (Settings section)
    - Sign Out
  - Toggle button (hamburger menu)

- **Top Bar**:
  - Sidebar toggle button
  - Page name: "Performance Management System"
  - User info: "HR Admin" with user icon

- **Main Content**:
  - **Metric Cards** (4 cards in a grid):
    1. **Total Employees**: Shows count, percentage trend, and description
    2. **Pending Reviews**: Shows count and trend
    3. **Active Score Cards**: Shows count and trend
    4. **Completion Rate**: Shows percentage and trend
  
  - **Performance Trends Chart**:
    - Animated SVG area chart
    - Two trend lines: Goal Completion (maroon) and Engagement (dark blue)
    - Grid lines and axis labels
    - Legend showing both metrics
    - "View Details" button

**Navigation**:
- Click "Score Cards" → Goes to `/score-cards`
- Click "Evaluation" → Goes to `/evaluation-periods`
- Click "Review Periods" → Goes to `/review-period`
- Click "Sign Out" → Logs out and goes to `/login`

---

### 3. Review Periods (`/review-period`)
**Path**: `frontend/src/app/review-period/`

**Features**:

**View Mode** (Default):
- **Active Periods Table**:
  - Columns: S.No, Name, Start Date, End Date, Status
  - Status badge: Green background for "Active"
  - Action buttons: View, Edit, Delete
  
- **Inactive Periods Table**:
  - Same columns as Active Periods
  - Status badge: Gray background for "Inactive"

- **"Add +" Button**: Top right corner
  - Click to show the form

**Form Mode** (After clicking "Add +"):
- Form fields:
  - Period Name (text input)
  - Start Date (date picker)
  - End Date (date picker)
  - Description (textarea)
  - Status (Active/Inactive dropdown)
- **Buttons**:
  - "Cancel" → Returns to view mode
  - "Save" → Saves the review period and returns to view mode

---

### 4. Score Cards (`/score-cards`)
**Path**: `frontend/src/app/score-cards/`

**Features**:

**Main Table**:
- Columns: S.No, Employee Name (clickable), Review Period, Created On, Created By, Status (dropdown), Approval
- **Status Column**: 
  - Dropdown with "Active" and "Completed" options
  - Changes reflect in Score Card Details
- **Approval Column**:
  - If Created By = HR: Shows "Approved" badge (green)
  - If Created By ≠ HR: Shows "Approve" and "Reject" buttons
  - After approval/rejection, shows corresponding badge

**Action Buttons** (Top right):
1. **"Add Goal" Button**:
   - Opens modal form to add a new goal
   - Form fields: Goal Name, Description, Weight, Status

2. **"Start Score Card Process" Button**:
   - Opens tabbed modal form
   - **Tabs**: Goals, Competencies, Values
   
   **Goals Tab**:
   - Employee selection dropdown
   - Review period selection
   - Suggested goals checklist
   - "Add Goal" section (can add custom goals)
   
   **Competencies Tab**:
   - List of suggested competencies
   - "Add Competency" section with title and description inputs
   
   **Values Tab**:
   - List of suggested values
   - "Add Value" section with title and description inputs
   
   - **Form Buttons**: "Cancel" and "Assign"

**Navigation**:
- Click employee name → Goes to `/score-card-details?id={scoreCardId}`

---

### 5. Score Card Details (`/score-card-details?id={id}`)
**Path**: `frontend/src/app/score-card-details/`

**Features**:

**Employee Details Card** (Horizontal layout):
- Employee Name
- Review Period
- Status
- Created On

**Tabs** (Goals, Competencies, Values):

**Goals Tab**:
- Table columns:
  - S.No
  - Goal Name
  - Description
  - Success Criteria (explains what success looks like)
  - Weight %
  - Review Period
  - Start Date
  - End Date
- Total Weight shown at bottom
- Success Criteria column has proper indentation

**Competencies Tab**:
- Table columns:
  - S.No
  - Competency Name
  - Description
  - Min Proficiency Level
  - Max Proficiency Level

**Values Tab**:
- Table columns:
  - S.No
  - Value Name
  - Description

**Styling**:
- No icons in tab content
- No green/gray ovals around status
- Clean, professional table layout
- Font size matches dashboard (20px for headings)

**Navigation**:
- "Back to Score Cards" button → Returns to `/score-cards`

---

### 6. Evaluation Periods (`/evaluation-periods`)
**Path**: `frontend/src/app/evaluation-periods/`

**Purpose**: Intermediate page to select a review period before viewing employee evaluations

**Features**:

**Active Review Periods Section**:
- Displayed as **Cards** (grid layout)
- Each card shows:
  - Period name (e.g., "Q4 2024")
  - Status badge (Active)
  - Date range with calendar icon
  - Employee count with users icon
  - "View Employees" button
- Cards are clickable (entire card is clickable)

**Completed Review Periods Section**:
- Displayed as **Table**
- Columns: S.No, Review Period, Start Date, End Date, Employees, Status, Action
- Status badge: "Completed" (blue background)
- "View" button in Action column
- Entire row is clickable

**Navigation**:
- Click any period (card or row) → Goes to `/evaluation?periodId={periodId}`
- Shows only employees under that review period

---

### 7. Evaluation (Employee List) (`/evaluation?periodId={id}`)
**Path**: `frontend/src/app/evaluation/`

**Features**:

**Page Header**:
- "Back to Review Periods" button → Returns to `/evaluation-periods`
- Page title: "Employee Evaluations"

**Employee Table**:
- Displayed in a white card with shadow
- Columns: S.No, Employee Name, Review Period, Created On, Created By, Status
- **All employees shown have "Completed" status** (only completed score cards appear here)
- **Entire row is clickable** (not just employee name)

**Navigation**:
- Click any row → Goes to `/evaluation-details?id={employeeId}`

---

### 8. Evaluation Details (`/evaluation-details?id={id}`)
**Path**: `frontend/src/app/evaluation-details/`

**Purpose**: HR performs final evaluation by providing ratings and comments

**Features**:

**Page Header**:
- "Back to Evaluations" button (black with white text) → Returns to `/evaluation`

**Employee Info Card** (Horizontal layout):
- Employee Name
- Review Period
- Status
- Created On

**Tabs** (Goals, Competencies, Values):
- Tabs positioned at the top
- Maroon accent color for active tab

**Goals Tab**:
- Table columns:
  - S.No
  - Goal Name
  - Weight %
  - Employee Comments (greyed out/read-only)
  - Employee Rating (greyed out/read-only)
  - Manager Comments (greyed out/read-only)
  - Manager Rating (greyed out/read-only)
  - HR Comments (white input - HR can edit)
  - HR Rating (input 1-5 - HR can edit)
- **Rating Summary** at top right:
  - Total Weight
  - Weighted Average Rating (calculated from HR ratings)
- Table is well-aligned, text sits inside boxes properly

**Competencies Tab**:
- Table columns:
  - S.No
  - Competency
  - Description
  - Min Proficiency Level
  - Max Proficiency Level
  - Employee Comments (greyed out)
  - Employee Rating (greyed out)
  - Manager Comments (greyed out)
  - Manager Rating (greyed out)
  - HR Comments (editable)
  - HR Rating (editable)
- Average Rating shown at top

**Values Tab**:
- Table columns:
  - S.No
  - Value
  - Employee Comments (greyed out)
  - Employee Rating (greyed out)
  - Manager Comments (greyed out)
  - Manager Rating (greyed out)
  - HR Comments (editable)
  - HR Rating (editable)
- Average Rating shown at top

**Action Buttons**:
- "Cancel" button (black with white text) → Returns to evaluation list
- "Save Evaluation" button (maroon) → Saves HR ratings and comments

**Color Scheme**:
- Primary maroon (#8B2E3E) for active tabs and primary actions
- Black buttons for secondary actions (back, cancel)
- Greyed out fields for read-only data

---

## Manager Module

### 1. Manager Dashboard (`/manager-dashboard`)
**Path**: `frontend/src/app/manager-dashboard/`

**Similar to HR Dashboard with differences**:

**Sidebar Navigation**:
- Dashboard (active)
- Score Cards
- Evaluation
- Sign Out (no Settings section)

**Top Bar**:
- User info shows: "Manager" instead of "HR Admin"

**Metric Cards** (Manager-specific data):
1. **Team Members**: Count of team members
2. **Pending Evaluations**: Evaluations awaiting manager input
3. **Active Goals**: Active goals for team
4. **Team Performance**: Average team performance score

**Chart**: Same performance trends chart with team-specific data

**Navigation**:
- Click "Score Cards" → Goes to `/manager-score-cards`
- Click "Evaluation" → Goes to `/manager-evaluation-periods`

---

### 2. Manager Score Cards (`/manager-score-cards`)
**Path**: `frontend/src/app/manager-score-cards/`

**Features**:
- **Same layout and functionality as HR Score Cards**
- Shows score cards for manager's team members
- All buttons work the same way:
  - "Add Goal" button
  - "Start Score Card Process" button
  - Approve/Reject functionality
  - Status dropdown

**Navigation**:
- Click employee name → Goes to `/manager-score-card-details?id={scoreCardId}`

---

### 3. Manager Score Card Details (`/manager-score-card-details?id={id}`)
**Path**: `frontend/src/app/manager-score-card-details/`

**Features**:
- **Identical to HR Score Card Details**
- Shows Goals, Competencies, and Values tabs
- Read-only view (manager views what was assigned)
- Same table structure and styling

**Navigation**:
- "Back to Score Cards" button → Returns to `/manager-score-cards`

---

### 4. Manager Evaluation Periods (`/manager-evaluation-periods`)
**Path**: `frontend/src/app/manager-evaluation-periods/`

**Features**:
- **Similar to HR Evaluation Periods**
- Page title: "Team Evaluations - Select Review Period"
- Employee count shows as "Team Members" instead of "Employees"
- Shows review periods for manager's team

**Navigation**:
- Click any period → Goes to `/manager-evaluation?periodId={periodId}`

---

### 5. Manager Evaluation (Team List) (`/manager-evaluation?periodId={id}`)
**Path**: `frontend/src/app/manager-evaluation/`

**Features**:

**Page Header**:
- "Back to Review Periods" button
- Page title: "Team Member Evaluations"

**Employee Table**:
- Same structure as HR evaluation list
- Shows only the manager's team members
- Entire row is clickable

**Navigation**:
- Click any row → Goes to `/manager-evaluation-details?id={employeeId}`

---

### 6. Manager Evaluation Details (`/manager-evaluation-details?id={id}`)
**Path**: `frontend/src/app/manager-evaluation-details/`

**Purpose**: Manager provides ratings and comments for their team members

**Features**:

**Key Differences from HR**:
- **Employee Comments and Ratings**: Greyed out (read-only)
- **Manager Comments**: WHITE/EDITABLE (manager fills these)
- **Manager Ratings**: EDITABLE (manager fills these)
- **HR Comments and Ratings**: Greyed out (read-only)

**Goals Tab**:
- Manager can edit:
  - Manager Comments (white input field)
  - Manager Rating (input 1-5)
- Employee and HR fields are greyed out

**Competencies Tab**:
- Same structure as goals
- Manager provides their assessment

**Values Tab**:
- Same structure as goals
- Manager provides their assessment

**Action Buttons**:
- "Cancel" → Returns to team list
- "Save Evaluation" → Saves manager ratings and comments

**Navigation Flow**:
- Manager evaluates → Employee sees completed evaluations → HR does final evaluation

---

## Employee Module

### 1. Employee Dashboard (`/employee-dashboard`)
**Path**: `frontend/src/app/employee-dashboard/`

**Layout**:

**Sidebar Navigation**:
- Dashboard (active)
- My Score Cards
- Self Evaluation
- Ratings
- Sign Out

**Top Bar**:
- User info shows: "Sarah Johnson" (employee name)

**Metric Cards** (Employee-specific):
1. **Active Goals**: Count of goals (between 1-10), percentage trend
2. **Pending Reviews**: Reviews waiting for employee input
3. **Completed Goals**: Goals successfully achieved this year
4. **Overall Rating**: Average performance score (e.g., 4.2/5.0)

**Chart**: Performance trends showing employee's individual progress

---

### 2. Employee Score Cards (`/employee-score-cards`)
**Path**: `frontend/src/app/employee-score-cards/`

**Features**:

**Two Sections**:

1. **Active Score Cards**:
   - Table with columns: S.No, Review Period, Assigned By, Start Date, End Date, Status
   - Status badge: Green for "Active"
   - Rows are clickable

2. **Completed Score Cards**:
   - Same table structure
   - Status badge: Blue for "Completed"
   - Rows are clickable

**Navigation**:
- Click any row → Goes to `/employee-score-card-details?id={scoreCardId}`

---

### 3. Employee Score Card Details (`/employee-score-card-details?id={id}`)
**Path**: `frontend/src/app/employee-score-card-details/`

**Features**:

**Employee Details Card**:
- Employee Name
- Review Period
- Assigned By
- Status
- Start Date
- End Date

**Tabs** (Goals, Competencies, Values):

**Goals Tab**:
- **Goals are categorized by type**:
  - **Personal Goals** (separate table)
  - **Development Goals** (separate table)
  
- Each table shows:
  - S.No
  - Goal Name
  - Description
  - Success Criteria
  - Status
  - Weight %
  - Review Period
  - Start Date
  - End Date
  
- Total Weight shown at bottom of Development Goals table

**Competencies Tab**:
- Large table with all assigned competencies
- Columns: S.No, Competency, Description, Min Proficiency Level, Max Proficiency Level

**Values Tab**:
- Table with all assigned values
- Columns: S.No, Value, Description

**Purpose**: Employee views what goals/competencies/values were assigned to them

**Navigation**:
- "Back to My Score Cards" button → Returns to `/employee-score-cards`

---

### 4. Self Evaluation (`/employee-self-evaluation`)
**Path**: `frontend/src/app/employee-self-evaluation/`

**Features**:

**Two Sections**:

1. **Active Review Periods**:
   - Displayed as cards (like HR/Manager)
   - Shows periods where employee can self-evaluate
   - Each card shows period name, dates, and status
   - Clickable cards

2. **Completed Review Periods**:
   - Displayed as table
   - Shows periods where self-evaluation is already completed
   - Columns: S.No, Review Period, Start Date, End Date, Status

**Navigation**:
- Click **Active** period → Goes to `/employee-self-evaluation-details?id={periodId}` (editable)
- Click **Completed** period → Goes to `/employee-self-evaluation-details?id={periodId}` (read-only with pre-filled comments)

**Key Behavior**:
- For **Active** periods: Employee can add comments and ratings
- For **Completed** periods: Comments are already filled (read-only)

---

### 5. Self Evaluation Details (`/employee-self-evaluation-details?id={id}`)
**Path**: `frontend/src/app/employee-self-evaluation-details/`

**Purpose**: Employee provides self-assessment comments and ratings

**Features**:

**Page Header**:
- "Back to Self Evaluation" button

**Employee Info Card**:
- Employee Name
- Review Period
- Status
- Created On

**Tabs** (Goals, Competencies, Values):

**For Active Periods** (Employee can edit):

**Goals Tab**:
- Table columns:
  - S.No
  - Goal Name
  - Weight %
  - Employee Comments (WHITE - employee fills this)
  - Employee Rating (INPUT - employee provides 1-5 rating)
- Manager and HR columns are empty (not yet evaluated)

**Competencies Tab**:
- Employee provides:
  - Employee Comments (editable)
  - Employee Rating (editable)

**Values Tab**:
- Employee provides:
  - Employee Comments (editable)
  - Employee Rating (editable)

**For Completed Periods** (Read-only):
- All employee comments and ratings are pre-filled
- Fields are greyed out (cannot edit)

**Action Buttons**:
- "Cancel" → Returns to self-evaluation list
- "Submit Self Evaluation" → Saves employee's assessment

---

### 6. Ratings (`/employee-ratings`)
**Path**: `frontend/src/app/employee-ratings/`

**Purpose**: Employee views completed evaluations with all ratings from Employee, Manager, and HR

**Features**:

**Page Title**: "Completed Review Periods"

**Table**:
- Columns:
  - S.No
  - Review Period
  - Start Date
  - End Date
  - Overall Rating (weighted average of goals, competencies, values)
- Entire row is clickable

**Navigation**:
- Click any row → Goes to `/employee-ratings-details?id={periodId}`

---

### 7. Ratings Details (`/employee-ratings-details?id={id}`)
**Path**: `frontend/src/app/employee-ratings-details/`

**Purpose**: Employee views final consolidated ratings with comments from all three parties

**Features**:

**Employee Info Card**:
- Employee Name
- Review Period
- Status
- Overall Rating

**Tabs** (Goals, Competencies, Values):

**Goals Tab**:
- **All fields are read-only (greyed out)**
- Table columns:
  - S.No
  - Goal Name
  - Weight %
  - Employee Comments (filled)
  - Employee Rating (filled)
  - Manager Comments (filled)
  - Manager Rating (filled)
  - HR Comments (filled)
  - HR Rating (filled)
- Shows Total Weight and Weighted Average Rating

**Competencies Tab**:
- Shows all three perspectives:
  - Employee assessment
  - Manager assessment
  - HR assessment
- All read-only

**Values Tab**:
- Shows all three perspectives
- All read-only

**Star Rating Visualization**:
- Ratings may be displayed as stars (★★★★☆)

**Purpose**: Complete transparency - employee sees how they rated themselves, how their manager rated them, and how HR rated them

**Navigation**:
- "Back to Ratings" button → Returns to `/employee-ratings`

---

## Technical Architecture

### Frontend Structure

```
frontend/src/app/
├── auth/
│   └── login/                    # Login page
├── hr-dashboard/                 # HR dashboard
├── review-period/                # Review period management
├── score-cards/                  # HR score cards list
├── score-card-details/           # HR score card details
├── evaluation-periods/           # HR evaluation period selection
├── evaluation/                   # HR employee evaluation list
├── evaluation-details/           # HR evaluation details (HR inputs)
├── manager-dashboard/            # Manager dashboard
├── manager-score-cards/          # Manager score cards list
├── manager-score-card-details/   # Manager score card details
├── manager-evaluation-periods/   # Manager evaluation period selection
├── manager-evaluation/           # Manager team evaluation list
├── manager-evaluation-details/   # Manager evaluation details (Manager inputs)
├── employee-dashboard/           # Employee dashboard
├── employee-score-cards/         # Employee score cards list
├── employee-score-card-details/  # Employee score card details (view only)
├── employee-self-evaluation/     # Employee self evaluation periods
├── employee-self-evaluation-details/  # Self evaluation form
├── employee-ratings/             # Completed evaluations list
└── employee-ratings-details/     # Final ratings view (all 3 perspectives)
```

### Component Structure

Each component typically has:
- `.ts` file: TypeScript logic
- `.html` file: HTML template
- `.css` file: Component-specific styles

### Key Interfaces

```typescript
interface ScoreCard {
  id: number;
  employeeName: string;
  reviewPeriod: string;
  createdOn: string;
  createdBy: string;
  status: 'Active' | 'Completed';
  approvalStatus?: 'Pending' | 'Approved' | 'Rejected';
}

interface Goal {
  id: number;
  name: string;
  description: string;
  successCriteria: string;
  weight: number;
  type?: string;  // For employee: 'Personal Goal' or 'Development Goal'
  employeeComments?: string;
  employeeRating?: number;
  managerComments?: string;
  managerRating?: number;
  hrComments?: string;
  hrRating?: number;
}

interface Competency {
  id: number;
  name: string;
  description: string;
  minProficiency: string;
  maxProficiency: string;
  employeeComments?: string;
  employeeRating?: number;
  managerComments?: string;
  managerRating?: number;
  hrComments?: string;
  hrRating?: number;
}

interface Value {
  id: number;
  name: string;
  description?: string;
  employeeComments?: string;
  employeeRating?: number;
  managerComments?: string;
  managerRating?: number;
  hrComments?: string;
  hrRating?: number;
}

interface ReviewPeriod {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  status: 'Active' | 'Inactive' | 'Completed';
  employeeCount?: number;
}
```

### Routing Configuration

All routes are defined in `frontend/src/app/app.routes.ts`:

```typescript
export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: Login },
  
  // HR Routes
  { path: 'hr-dashboard', component: HrDashboard },
  { path: 'review-period', component: ReviewPeriod },
  { path: 'score-cards', component: ScoreCards },
  { path: 'score-card-details', component: ScoreCardDetails },
  { path: 'evaluation-periods', component: EvaluationPeriodsComponent },
  { path: 'evaluation', component: EvaluationComponent },
  { path: 'evaluation-details', component: EvaluationDetailsComponent },
  
  // Manager Routes
  { path: 'manager-dashboard', component: ManagerDashboard },
  { path: 'manager-score-cards', component: ManagerScoreCardsComponent },
  { path: 'manager-score-card-details', component: ManagerScoreCardDetailsComponent },
  { path: 'manager-evaluation-periods', component: ManagerEvaluationPeriodsComponent },
  { path: 'manager-evaluation', component: ManagerEvaluationComponent },
  { path: 'manager-evaluation-details', component: ManagerEvaluationDetailsComponent },
  
  // Employee Routes
  { path: 'employee-dashboard', component: EmployeeDashboard },
  { path: 'employee-score-cards', component: EmployeeScoreCardsComponent },
  { path: 'employee-score-card-details', component: EmployeeScoreCardDetailsComponent },
  { path: 'employee-self-evaluation', component: EmployeeSelfEvaluationComponent },
  { path: 'employee-self-evaluation-details', component: EmployeeSelfEvaluationDetailsComponent },
  { path: 'employee-ratings', component: EmployeeRatingsComponent },
  { path: 'employee-ratings-details', component: EmployeeRatingsDetailsComponent }
];
```

---

## Navigation Flows

### HR Complete Flow

```
Login
  ↓
HR Dashboard
  ↓
  ├─→ Score Cards
  │     ↓
  │     ├─→ Add Goal (Modal)
  │     ├─→ Start Score Card Process (Modal with tabs)
  │     └─→ Click Employee Name → Score Card Details
  │                                      ↓
  │                                   View Goals/Competencies/Values (Read-only)
  │
  ├─→ Evaluation
  │     ↓
  │   Evaluation Periods (Select Review Period)
  │     ↓
  │   Evaluation List (Employees in that period)
  │     ↓
  │   Evaluation Details (HR provides ratings)
  │     ↓
  │   Save → Back to list
  │
  └─→ Review Periods
        ↓
      View/Add/Edit/Delete Periods
```

### Manager Complete Flow

```
Login
  ↓
Manager Dashboard
  ↓
  ├─→ Score Cards (Same as HR)
  │     ↓
  │   Manager Score Card Details
  │
  └─→ Evaluation
        ↓
      Manager Evaluation Periods (Select Review Period)
        ↓
      Team Evaluation List (Team members in that period)
        ↓
      Manager Evaluation Details (Manager provides ratings)
        ↓
      Save → Back to list
```

### Employee Complete Flow

```
Login
  ↓
Employee Dashboard
  ↓
  ├─→ My Score Cards
  │     ↓
  │   Active Score Cards (view)
  │   Completed Score Cards (view)
  │     ↓
  │   Employee Score Card Details (View goals by category)
  │
  ├─→ Self Evaluation
  │     ↓
  │   Active Periods (can evaluate)
  │   Completed Periods (view only)
  │     ↓
  │   Self Evaluation Details (Employee provides ratings)
  │     ↓
  │   Submit → Back to list
  │
  └─→ Ratings
        ↓
      Completed Review Periods (with overall ratings)
        ↓
      Ratings Details (View all 3 perspectives: Employee/Manager/HR)
```

### Evaluation Workflow (Complete Cycle)

```
1. HR/Manager: Create Score Card
   ├─→ Assign Goals (Personal + Development)
   ├─→ Assign Competencies
   └─→ Assign Values
     ↓
2. Employee: Self Evaluation
   ├─→ View assigned goals/competencies/values
   ├─→ Provide comments
   └─→ Provide self-ratings (1-5)
     ↓
3. Manager: Manager Evaluation
   ├─→ View employee comments and ratings (read-only)
   ├─→ Provide manager comments
   └─→ Provide manager ratings (1-5)
     ↓
4. HR: Final Evaluation
   ├─→ View employee and manager comments/ratings (read-only)
   ├─→ Provide HR comments
   └─→ Provide HR ratings (1-5)
     ↓
5. Score Card Status → "Completed"
     ↓
6. Employee: View Ratings
   └─→ See all three perspectives with final overall rating
```

---

## Key Design Patterns

### 1. Collapsible Sidebar
- All dashboards have a collapsible sidebar
- Toggle with hamburger menu icon
- Logo changes size based on collapsed state
- Navigation text hidden when collapsed

### 2. Consistent Color Scheme
- **Primary**: Maroon (#8B2E3E) - Active tabs, primary buttons
- **Secondary**: Black (#1a1a1a) - Back buttons, cancel buttons
- **Success**: Green - Active status, approved status
- **Info**: Blue - Completed status
- **Greyed Out**: Read-only fields (#e9ecef background, #6c757d text)

### 3. Status Badges
- Circular badges with background colors
- Active: Green background
- Completed: Blue background
- Inactive: Gray background
- Approved: Green
- Rejected: Red

### 4. Tabbed Interfaces
- Used for Goals/Competencies/Values
- Active tab: Maroon bottom border
- Hover state: Light gray background
- Content animates on tab change

### 5. Modal Forms
- Overlay with semi-transparent background
- White modal with rounded corners
- Close button (X) in top right
- Cancel and Save/Submit buttons at bottom

### 6. Clickable Rows
- Entire table rows are clickable
- Hover effect: Light gray background
- Cursor changes to pointer
- Smooth transition

### 7. Back Buttons
- Consistent placement: Top left of page content
- Black background, white text
- Arrow icon on left
- Returns to previous page in flow

---

## Important Implementation Notes

### 1. Authentication
- JWT token stored in `localStorage` with key `'token'`
- User info stored with key `'user'`
- Sign out clears both and redirects to login

### 2. Query Parameters
- Review Period ID: `?periodId={id}`
- Employee/Evaluation ID: `?id={id}`
- Used for passing data between routes

### 3. State Management
- Uses Angular Router for navigation
- Component state with properties (isSidebarCollapsed, activeTab, etc.)
- Router state for passing complex objects

### 4. Form Handling
- Reactive Forms for complex forms
- FormsModule (`ngModel`) for simple inputs
- Two-way data binding for editable fields

### 5. Conditional Rendering
- `*ngIf` for showing/hiding elements
- `[class.active]` for conditional CSS classes
- `*ngFor` for lists and tables

### 6. Read-only vs Editable Fields

**Read-only (Greyed out)**:
```html
<td class="comments-cell greyed-out">{{ item.employeeComments }}</td>
<td class="rating-cell greyed-out">{{ item.employeeRating }}</td>
```

**Editable (White)**:
```html
<td class="comments-cell">
  <textarea [(ngModel)]="item.hrComments"></textarea>
</td>
<td class="rating-cell">
  <input type="number" [(ngModel)]="item.hrRating" min="1" max="5" step="0.1" />
</td>
```

### 7. Weighted Average Calculation
```typescript
getWeightedAverageRating(): string {
  const weightedSum = this.goals
    .filter(goal => goal.hrRating !== null)
    .reduce((sum, goal) => sum + (goal.hrRating! * goal.weight), 0);
  
  const totalWeight = this.goals
    .filter(goal => goal.hrRating !== null)
    .reduce((sum, goal) => sum + goal.weight, 0);
  
  if (totalWeight === 0) return 'N/A';
  return (weightedSum / totalWeight).toFixed(2);
}
```

---

## Future Enhancements (Not Yet Implemented)

1. **Backend Integration**: Currently using mock data
2. **Real-time Notifications**: For new assignments, evaluations
3. **File Attachments**: For evidence/documentation
4. **Email Notifications**: Status changes, deadlines
5. **Reports & Analytics**: Performance trends, team comparisons
6. **Multi-language Support**: i18n
7. **Mobile Responsive**: Optimize for mobile devices
8. **Export to PDF**: For evaluations and reports
9. **Comments Thread**: Discussion between employee/manager/HR
10. **Goal Progress Tracking**: Update progress percentage

---

## Testing Checklist

### HR Module
- [ ] Login and logout
- [ ] Dashboard metric cards display correctly
- [ ] Chart animation works
- [ ] Create/edit/delete review periods
- [ ] Create score cards with goals/competencies/values
- [ ] Approve/reject score cards
- [ ] Navigate through evaluation periods → employee list → details
- [ ] Provide HR ratings and save

### Manager Module
- [ ] Manager dashboard loads with correct data
- [ ] Score cards display team members only
- [ ] Score card details are accessible
- [ ] Navigate through evaluation periods → team list → details
- [ ] Provide manager ratings (employee/HR fields read-only)
- [ ] Save manager evaluation

### Employee Module
- [ ] Employee dashboard shows personal metrics
- [ ] View active and completed score cards
- [ ] Goals categorized by Personal/Development
- [ ] Self evaluation for active periods (editable)
- [ ] Self evaluation for completed periods (read-only)
- [ ] View ratings with all three perspectives
- [ ] Overall rating calculation is correct

---

## Troubleshooting

### Common Issues

1. **Sidebar not collapsing**
   - Check `isSidebarCollapsed` property
   - Verify `toggleSidebar()` method is called
   - Check CSS transitions

2. **Navigation not working**
   - Verify route is defined in `app.routes.ts`
   - Check component imports
   - Verify `router.navigate()` parameters

3. **Modal not closing**
   - Check `showModal` boolean
   - Verify close button calls correct method
   - Check z-index and overlay

4. **Table alignment issues**
   - Check CSS `table-layout` property
   - Verify column widths
   - Check padding and borders

5. **Read-only fields are editable**
   - Verify `greyed-out` class is applied
   - Check CSS for background-color
   - Verify status condition (Active vs Completed)

---

## Contact & Support

For technical questions or issues:
- Review this knowledge transfer document
- Check component `.ts` files for logic
- Refer to Angular documentation for framework questions
- Review CSS files for styling issues

---

**Document Version**: 1.0  
**Last Updated**: November 12, 2025  
**Author**: AI Assistant (Claude)  
**Project**: Performance Management System (PMS)

