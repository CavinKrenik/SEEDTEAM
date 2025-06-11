from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from models import db, Member
from auth import check_login
from role_assigner import assign_roles_and_description
import os
from werkzeug.utils import secure_filename

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = './uploads'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///backend/seed.db'

CORS(app)
db.init_app(app)

# ✅ Create database tables on startup
with app.app_context():
    db.create_all()

@app.route('/submit', methods=['POST'])
def submit():
    try:
        data = request.form
        required_fields = [
            'name', 'email', 'phone', 'type', 'authority',
            'profile', 'definition', 'strategy',
            'not_self_theme', 'incarnation_cross'
        ]

        # ✅ Validate all required fields
        for field in required_fields:
            if not data.get(field):
                return jsonify({"error": f"Missing field: {field}"}), 400

        # ✅ Handle chart upload
        chart = request.files.get('chart')
        filename = secure_filename(chart.filename) if chart else None
        if filename:
            chart.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))

        # ✅ Assign roles and description
        roles, description = assign_roles_and_description(
            data['type'],
            data['authority'],
            data['profile'],
            data['definition'],
            data['strategy'],
            data['not_self_theme'],
            data['incarnation_cross']
        )

        # ✅ Create and save new member
        member = Member(
            name=data['name'],
            email=data['email'],
            phone=data['phone'],
            type=data['type'],
            authority=data['authority'],
            profile=data['profile'],
            definition=data['definition'],
            strategy=data['strategy'],
            not_self_theme=data['not_self_theme'],
            incarnation_cross=data['incarnation_cross'],
            chart_filename=filename,
            roles=roles,
            description=description
        )
        db.session.add(member)
        db.session.commit()

        return jsonify({"success": True, "roles": roles, "description": description})

    except Exception as e:
        print("❌ Error in /submit:", str(e))
        return jsonify({"error": str(e)}), 500

@app.route('/login', methods=['POST'])
def login():
    creds = request.get_json()
    if check_login(creds['username'], creds['password']):
        return jsonify({"token": "admin-token"})
    return jsonify({"error": "Unauthorized"}), 401

@app.route('/members', methods=['GET'])
def get_members():
    if request.headers.get('Authorization') != "admin-token":
        return jsonify({"error": "Unauthorized"}), 401
    return jsonify([m.serialize() for m in Member.query.all()])

@app.route('/delete_member/<int:member_id>', methods=['DELETE'])
def delete_member(member_id):
    if request.headers.get('Authorization') != "admin-token":
        return jsonify({"error": "Unauthorized"}), 401
    member = Member.query.get(member_id)
    if not member:
        return jsonify({"error": "Member not found"}), 404
    db.session.delete(member)
    db.session.commit()
    return jsonify({"success": True})

@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

if __name__ == "__main__":
    app.run(debug=True)
