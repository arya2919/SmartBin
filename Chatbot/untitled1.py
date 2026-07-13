import nltk
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from sklearn.naive_bayes import MultinomialNB
from sklearn.feature_extraction.text import TfidfVectorizer
import pandas as pd
from flask import Flask, request, jsonify
from waitress import serve

# Load and prepare the data
train_data = pd.read_csv('train_data.csv')
nltk.download('stopwords')
print("Stopwords downloaded and ready to use.")
stop_words = set(stopwords.words('english'))

def preprocess_text(text):
    tokens = word_tokenize(text)
    tokens = [t for t in tokens if t.lower() not in stop_words]
    return ' '.join(tokens)

train_data['query'] = train_data['query'].apply(preprocess_text)
train_data['response'] = train_data['response'].apply(preprocess_text)

# Train the model
vectorizer = TfidfVectorizer()
X = vectorizer.fit_transform(train_data['query'])
y = train_data['response']
model = MultinomialNB()
model.fit(X, y)

# Define the chatbot function
def chatbot(query):
    query = preprocess_text(query)
    query_vector = vectorizer.transform([query])
    prediction = model.predict(query_vector)
    return prediction[0]

# Initialize the Flask app
app = Flask(__name__)

# Route for the main page with a link to the chatbot
@app.route('/')
def index():
    return '''
        <h1>Welcome to the Flask App!</h1>
        <p>This is the main page of your Flask application.</p>
        <a href="/chatbot_page">Go to Chatbot</a>
    '''

# Route for the chatbot page with the form
@app.route('/chatbot_page')
def chatbot_page():
    return '''
        <h1>Chatbot Interface</h1>
        <form method="POST" action="/chatbot">
            <label for="query">Enter your query:</label>
            <input type="text" id="query" name="query">
            <input type="submit" value="Submit">
        </form>
        <br><a href="/">Back to Home</a>
    '''

# Route for the chatbot API and form submissions
@app.route('/chatbot', methods=['POST'])
def chatbot_endpoint():
    if request.is_json:  # Handle JSON request (API call)
        query = request.json['query']
    else:  # Handle form submission
        query = request.form['query']

    response = chatbot(query)
    if request.is_json:
        return jsonify({'response': response})
    else:
        # Display the response on the webpage
        return f"<h2>Chatbot response: {response}</h2><br><a href='/chatbot_page'>Ask another question</a><br><a href='/'>Back to Home</a>"

if __name__ == '__main__':
    print("Starting Flask app with Waitress...")
    app.run(debug=True, host='0.0.0.0', port=8000)
    print("Flask app is running.")
