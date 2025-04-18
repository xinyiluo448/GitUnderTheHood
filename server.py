from flask import Flask, render_template, request, session, redirect, url_for
import json

app = Flask(__name__)
app.secret_key = 'gitunderthehood'

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

@app.route('/quiz/<int:page>', methods=["GET", "POST"])
def quiz(page):
	total_pages = len(questions)
	question = next((q for q in questions if q['page'] == page), None)
	
	if not question:
		return "Question not found", 404
	
	if 'best_quiz_page' not in session:
		# TODO: fix this when correct answer checking is implemented
		session['best_quiz_page'] = 1
	
	# When user clicks "next", update best_quiz_page
	if request.method == "POST":
		if page > session['best_quiz_page']:
			session['best_quiz_page'] = page
		
		return redirect(url_for('quiz', page=page + 1))

	return render_template(
		'quiz.html', 
		question=question, 
		total_pages=total_pages, 
		best_quiz_page=session['best_quiz_page']
	)

# Add a redo button to clear session data (which contains best_quiz_page)
@app.route('/redo_quiz')
def redo_quiz():
    session.clear()
    return redirect(url_for('quiz', page=1))


if __name__ == '__main__':
   app.run(debug = True, port=5001)