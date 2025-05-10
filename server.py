from flask import Flask, render_template, request, session, redirect, url_for
import json

app = Flask(__name__)
app.secret_key = 'gitunderthehood'

def load_tutorial():
    with open("data/tutorial.json", 'r', encoding='utf-8') as f:
        return json.load(f)
tutorials = load_tutorial()

@app.route('/')
def homepage():
    best_quiz_page = session['best_quiz_page'] if 'best_quiz_page' in session else -1
    session.clear()
    session['best_quiz_page'] = best_quiz_page
    return render_template('home.html', current_section='home')

@app.route('/learn/<int:page>', methods=['GET', 'POST'])
def learn(page):
    total = len(tutorials)  # Total number of slides
    slide = next((s for s in tutorials if s['page'] == page), None)
    if not slide:
        return "Slide not found", 404

    # Track visited slides in session
    if 'visited_slides' not in session:
        session['visited_slides'] = []
    if page not in session['visited_slides']:
        session['visited_slides'].append(page)

    # Store the time the user enters the page
    if 'entry_times' not in session:
        session['entry_times'] = {}
    session['entry_times'][page] = session['entry_times'].get(page, request.args.get('entry_time', ''))

    if request.method == 'POST':
        if page < total:
            return redirect(url_for('learn', page=page + 1))
        else:
            return redirect(url_for('quiz', page=1))

    # Pass the current slide, page number, and total slides to the template
    return render_template('tutorial.html', slide=slide, page=page, total=total, current_section='learn')

def load_questions():
	with open("data/quiz.json", 'r', encoding='utf-8') as f:
		return json.load(f)

questions = load_questions()

@app.route('/quiz/<int:page>', methods=["GET", "POST"])
def quiz(page):
    total_pages = len(questions)  # Total number of quiz questions
    question = next((q for q in questions if q['page'] == page), None)
    
    if not question:
        return "Question not found", 404
    
    if 'best_quiz_page' not in session:
        session['best_quiz_page'] = -1
    
    # When user clicks "next", update best_quiz_page
    if request.method == "POST":
        if page > session['best_quiz_page']:
            session['best_quiz_page'] = page
        if page == total_pages:
            return redirect(url_for('quiz_result'))
        return redirect(url_for('quiz', page=page + 1))

    return render_template(
        'quiz.html', 
        question=question, 
        total_pages=total_pages, 
        best_quiz_page=session['best_quiz_page'],
        current_section='quiz',
        hint=question.get('hint', '')  # Pass the hint to the template
    )

# Add a redo button to clear session data (which contains best_quiz_page)
@app.route('/redo_quiz')
def redo_quiz():
    session.clear()
    return redirect(url_for('quiz', page=1))

@app.route("/quiz_result")
def quiz_result():
    return render_template("quiz_result.html", current_section='quiz')


if __name__ == '__main__':
   app.run(debug = True, port=5001)
