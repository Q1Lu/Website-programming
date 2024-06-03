from flask import Flask, render_template, url_for
from flask import request
from configparser import ConfigParser
import os

# Config Parser
config = ConfigParser()
config.read("config.ini")

os.environ["GOOGLE_API_KEY"] = config["Gemini"]["API_KEY"]
from langchain_google_genai import ChatGoogleGenerativeAI

llm = ChatGoogleGenerativeAI(model="gemini-pro")
# gemini-1.5-flash-latest (new version)

app = Flask(__name__)


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/call_llm", methods=["POST"])
def call_llm():
    if request.method == "POST":
        print("POST!")
        data = request.form
        print(data)
        result = llm.invoke("請用20字暗示玩家右上角有番茄") # 向大型語言模型請求
        result2 = llm.invoke("請用20字恭喜玩家通關")
        
        return {
            "message1":result.content,
            "message2":result2.content
        }
    
