#!/usr/bin/env python3
"""
Seed script to create test users for the Performance Management System
"""
from app import app, db
from models.user import User
from werkzeug.security import generate_password_hash

def create_test_users():
    """Create test users if they don't exist"""
    
    with app.app_context():
        # Test users data
        test_users = [
            {
                'username': 'admin',
                'email': 'admin@pms.com',
                'password': 'admin123',
                'role': 'HR'
            },
            {
                'username': 'hr',
                'email': 'hr@pms.com',
                'password': 'hr123',
                'role': 'HR'
            },
            {
                'username': 'manager',
                'email': 'manager@pms.com',
                'password': 'manager123',
                'role': 'Manager'
            },
            {
                'username': 'employee',
                'email': 'employee@pms.com',
                'password': 'employee123',
                'role': 'Employee'
            }
        ]
        
        print("Creating test users...")
        
        for user_data in test_users:
            # Check if user already exists
            existing_user = User.query.filter_by(email=user_data['email']).first()
            
            if existing_user:
                print(f"✓ User {user_data['email']} already exists")
            else:
                # Create new user
                new_user = User(
                    username=user_data['username'],
                    email=user_data['email'],
                    password=generate_password_hash(user_data['password']),
                    role=user_data['role']
                )
                db.session.add(new_user)
                print(f"✓ Created user: {user_data['email']} (Role: {user_data['role']}, Password: {user_data['password']})")
        
        # Commit all changes
        db.session.commit()
        
        print("\n" + "="*60)
        print("Test Users Summary:")
        print("="*60)
        print("Admin/HR User:  admin@pms.com / admin123")
        print("HR User:        hr@pms.com / hr123")
        print("Manager User:   manager@pms.com / manager123")
        print("Employee User:  employee@pms.com / employee123")
        print("="*60)
        print("\nYou can now login with any of these credentials!")

if __name__ == '__main__':
    create_test_users()


