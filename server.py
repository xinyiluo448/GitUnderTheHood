from flask import Flask, render_template, request, jsonify, redirect, url_for
import json

app = Flask(__name__)

def load_questions():
	with open("data/quiz.json", 'r', encoding='utf-8') as f:
		return json.load(f)

questions = load_questions()

@app.route('/')
def homepage():
	return render_template('base.html')

@app.route('/learn')
def learn():
	return render_template('base.html')

@app.route('/quiz/<int:page>')
def quiz(page):
	total_pages = len(questions)
	question = next((q for q in questions if q['page'] == page), None)
	if not question:
		return "Question not found", 404
	return render_template('quiz.html', question=question, total_pages=total_pages)

if __name__ == '__main__':
   app.run(debug = True, port=5001)