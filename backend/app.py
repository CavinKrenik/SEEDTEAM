from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from models import db, Member
from auth import check_login
from role_assigner import assign_roles_and_description  # 🔁 NEW
import os
from werkzeug.utils import secure_filename

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = './uploads'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///seed.db'
CORS(app)
db.init_app(app)

# ✅ Flask 3 compatibility — create tables on app startup
with app.app_context():
    db.create_all()

@app.route('/submit', methods=['POST'])
def submit():
    data = request.form
    chart = request.files.get('chart')
    filename = secure_filename(chart.filename) if chart else None
    if filename:
        chart.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))

    # 🔁 Use full logic from role_assigner.py
    roles, description = assign_roles_and_description(
        hd_type=data.get('type'),
        authority=data.get('authority'),
        profile=data.get('profile'),
        definition=data.get('definition'),
        strategy=data.get('strategy'),
        not_self_theme=data.get('not_self_theme'),
        incarnation_cross=data.get('incarnation_cross')
    )

    member = Member(
        name=data['name'],
        email=data['email'],
        phone=data['phone'],
        type=data['type'],
        authority=data['authority'],
        profile=data['profile'],
        chart_filename=filename,
        roles=roles,
        description=description
    )
    db.session.add(member)
    db.session.commit()

    return jsonify({"success": True, "roles": roles, "description": description})

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

@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

if __name__ == "__main__":
    app.run(debug=True)
