from flask_sqlalchemy import SQLAlchemy
import json

db = SQLAlchemy()

class Member(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120))
    email = db.Column(db.String(120))
    phone = db.Column(db.String(50))
    type = db.Column(db.String(50))
    authority = db.Column(db.String(50))
    profile = db.Column(db.String(20))
    definition = db.Column(db.String(50))
    strategy = db.Column(db.String(100))
    not_self_theme = db.Column(db.String(100))
    incarnation_cross = db.Column(db.String(120))
    roles = db.Column(db.Text)  # Stored as JSON string
    description = db.Column(db.Text)
    chart_filename = db.Column(db.String(200))

    def __init__(
        self,
        name,
        email,
        phone,
        type,
        authority,
        profile,
        definition,
        strategy,
        not_self_theme,
        incarnation_cross,
        roles,
        description,
        chart_filename=None
    ):
        self.name = name
        self.email = email
        self.phone = phone
        self.type = type
        self.authority = authority
        self.profile = profile
        self.definition = definition
        self.strategy = strategy
        self.not_self_theme = not_self_theme
        self.incarnation_cross = incarnation_cross
        self.roles = json.dumps(roles)  # Store list as JSON
        self.description = description
        self.chart_filename = chart_filename

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "phone": self.phone,
            "type": self.type,
            "authority": self.authority,
            "profile": self.profile,
            "definition": self.definition,
            "strategy": self.strategy,
            "not_self_theme": self.not_self_theme,
            "incarnation_cross": self.incarnation_cross,
            "roles": json.loads(self.roles) if self.roles else [],
            "description": self.description,
            "chart_filename": self.chart_filename
        }
