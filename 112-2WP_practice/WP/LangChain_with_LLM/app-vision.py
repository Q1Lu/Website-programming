import requests
from IPython.display import Image

image_url = "https://i.ibb.co/KyNtMw5/IMG-20240321-172354614-AE.jpg"
content = requests.get(image_url).content
Image(content)


from configparser import ConfigParser
import os

# Set up config parser
config = ConfigParser()
config.read("config.ini")

# Set up Google Gemini API key
os.environ["GOOGLE_API_KEY"] = config["Gemini"]["API_KEY"]

from langchain_core.messages import HumanMessage
from langchain_google_genai import ChatGoogleGenerativeAI

llm = ChatGoogleGenerativeAI(model="gemini-pro-vision") #用來看圖的
# example
image_url = "https://i.ibb.co/KyNtMw5/IMG-20240321-172354614-AE.jpg"

image_url = "1.jpg"
image_url2 = "2.jpeg"

# image_url = "images.jpeg"
user_question = "請問這兩張圖的衣服顏色分別是？"
user_question += " 請使用繁體中文回答。"
message = HumanMessage(
    content=[
        {
            "type": "text",
            "text": user_question,
        },  # You can optionally provide text parts
        {"type": "image_url", "image_url": image_url}, #圖片
        {"type": "image_url", "image_url": image_url2},
    ]
)
result = llm.invoke([message])
print("問：", user_question)  #再看一次題目
print("答：", result.content.lstrip(" ")) #lstrip 把前面空格刪掉
if "http" in image_url:
    content = requests.get(image_url).content
else:
    content = image_url
Image(content)