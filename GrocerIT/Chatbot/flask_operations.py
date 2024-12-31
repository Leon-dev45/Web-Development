import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import re
from Mailing import Mailer
from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app)
mailing = Mailer()

def clean_data(x):
    return re.sub('[\W_]+', ' ', str.lower(x).replace("'s", " is")).strip()

count = CountVectorizer(stop_words="english")
df = pd.read_csv("chats.csv")
questions = df['question']

def generate_response(ques):
    df = pd.read_csv("chats.csv")
    questions = df['question']
    questions.loc[len(questions)] = ques
    cleaned = questions.apply(clean_data)
    count_matrix = count.fit_transform(cleaned)
    similar = cosine_similarity(count_matrix[-1], count_matrix[:-1])
    flat_score = list(enumerate(similar.flatten()))
    sim_scores_sort = sorted(flat_score, key=lambda x: x[1], reverse=True)
    top_chat = sim_scores_sort[0]
    if (top_chat[1] > 0.3):
        return df['response'][top_chat[0]]
    else:
        return ""
    

@app.route("/get_chatbot", methods=["POST"])
def get_chats():
    data = request.get_json()['question']
    answer = generate_response(data)
    return answer

@app.route("/contact_us", methods=["POST"])
def mail_send():
    data = request.get_json()
    try:
        mailing.sendMail(data['email'], data['message'])
        return "Mail Send Successfully"
    except Exception as e:
        print(e)
        return "Wrong Email"


if __name__ == "__main__":
    app.run(debug=True, port=8080)
    
