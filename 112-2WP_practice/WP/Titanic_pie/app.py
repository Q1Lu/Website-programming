import pandas as pd
from flask import Flask, render_template
app = Flask(__name__)

@app.route('/')
def formPage():
    df = pd.read_csv(
        "https://raw.githubusercontent.com/ryanchung403/dataset/main/train_data_titanic.csv",
        encoding="cp950",
    )

    survived_counts = df['Survived'].value_counts().to_dict()
    sex_counts = df['Sex'].value_counts().to_dict()
    embarked_counts = df['Embarked'].value_counts().to_dict()

    result = {
        'Survived': survived_counts,
        'Sex': sex_counts,
        'Embarked': embarked_counts
    }

    # 將 result 變量轉換為 JSON 字符串，而不是整個 DataFrame
    result_json = result
    result_json = df.to_json(orient="records")
    return render_template("index.html", Data = result_json)

if __name__ == '__main__':
    app.run()
