from extensions import db
from flask_login import UserMixin
from datetime import datetime

class User(UserMixin, db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    role = db.Column(db.String(20), nullable=False)  # 'HR', 'Manager', 'Employee'
    created_by = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=True)  # Admin who created this user
    updated_by = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=True)  # Admin who last updated this user
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    deleted_at = db.Column(db.DateTime, nullable=True)

    # Relationships
    owned_goals = db.relationship('Goal', foreign_keys='Goal.owner_id', back_populates='owner', lazy=True)
    owned_competencies = db.relationship('Competency', foreign_keys='Competency.owner_id', back_populates='owner', lazy=True)
    owned_documents = db.relationship('PerformanceDocument', foreign_keys='PerformanceDocument.user_id', back_populates='user', lazy=True)
    owned_evaluations = db.relationship('Evaluation', foreign_keys='Evaluation.user_id', back_populates='user', lazy=True)
    received_notifications = db.relationship('Notification', foreign_keys='Notification.recipient_id', back_populates='recipient', lazy=True)
    created_users = db.relationship('User', foreign_keys=[created_by], remote_side=[id])
    updated_users = db.relationship('User', foreign_keys=[updated_by], remote_side=[id])

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'role': self.role,
            'created_by': self.created_by,
            'updated_by': self.updated_by,
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat(),
            'deleted_at': self.deleted_at.isoformat() if self.deleted_at else None
        }