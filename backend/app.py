from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from groq import Groq
from dotenv import load_dotenv
from models import db, User
import os

# Load environment variables
load_dotenv()

# Create Flask app
app = Flask(__name__)

# Enable CORS
CORS(app)

# Database configuration
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///users.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

# Initialize extensions
db.init_app(app)
bcrypt = Bcrypt(app)

# Groq client
client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)

# Create database tables
with app.app_context():
    db.create_all()

# Home route
@app.route("/")
def home():
    return jsonify({
        "message": "Backend is running"
    })

# Signup route
# 

@app.route("/signup", methods=["POST"])
def signup():

    try:

        data = request.get_json()

        print("DATA RECEIVED:", data)

        username = data.get("username")
        email = data.get("email")
        password = data.get("password")

        existing_user = User.query.filter_by(
            email=email
        ).first()

        print("EXISTING USER:", existing_user)

        if existing_user:
            return jsonify({
                "message": "User already exists"
            }), 400

        hashed_password = bcrypt.generate_password_hash(
            password
        ).decode("utf-8")

        new_user = User(
            username=username,
            email=email,
            password=hashed_password
        )

        print("NEW USER CREATED")

        db.session.add(new_user)

        print("ADDED TO SESSION")

        db.session.commit()

        print("COMMITTED TO DATABASE")

        return jsonify({
            "message": "Signup successful"
        })

    except Exception as e:

        print("ERROR:", str(e))

        db.session.rollback()

        return jsonify({
            "message": str(e)
        }), 500

# Login route
@app.route("/login", methods=["POST"])
def login():

    data = request.get_json()

    email = data.get("email")
    password = data.get("password")

    user = User.query.filter_by(
        email=email
    ).first()

    if not user:

        return jsonify({
            "message": "User not found"
        }), 401

    if not bcrypt.check_password_hash(
        user.password,
        password
    ):

        return jsonify({
            "message": "Wrong password"
        }), 401

    return jsonify({
        "message": "Login successful",
        "username": user.username
    })


# Chat route
@app.route("/chat", methods=["POST"])
def chat():

    data = request.get_json()

    user_message = data.get("message")

    try:

        completion = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {
                    "role": "system",
                    "content": "You are a friendly AI chatbot. Give short, natural, human-readable answers."
                },
                {
                    "role": "user",
                    "content": user_message
                }
            ],
            temperature=0.7,
            max_completion_tokens=300,
            top_p=1
        )

        reply = completion.choices[0].message.content

        return jsonify({
            "reply": reply
        })

    except Exception as e:

        return jsonify({
            "reply": str(e)
        }), 500


# Show all users (for debugging)
@app.route("/users")
def users():

    users = User.query.all()

    return jsonify([
        {
            "id": user.id,
            "username": user.username,
            "email": user.email
        }
        for user in users
    ])


# Database path (for debugging)
@app.route("/db-path")
def db_path():

    return jsonify({
        "path": os.path.abspath("users.db")
    })


# Run server
if __name__ == "__main__":
    app.run(debug=True)