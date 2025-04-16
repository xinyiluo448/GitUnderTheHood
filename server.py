from flask import Flask, render_template, request, jsonify, redirect, url_for

app = Flask(__name__)

@app.route('/')
def homepage():
	return render_template('base.html')

@app.route('/learn')
def learn():
	return render_template('base.html')

@app.route('/quiz')
def quiz():
	return render_template('base.html')

if __name__ == '__main__':
   app.run(debug = True, port=5001)