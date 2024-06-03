import pandas as pd   #資料分析
from flask import Flask, render_template
app = Flask(__name__)

@app.route('/')
def formPage(): # frompage原本為表單
    df = pd.read_csv(
        "https://www.taifex.com.tw/data_gov/taifex_open_data.asp?data_name=DailyForeignExchangeRates",
        encoding="cp950",
    )
    df.isnull().sum()   #先檢查資料有無空
    df.drop(df.iloc[:, 5:], axis=1, inplace=True)
    df.drop(df.iloc[:, 2:4], axis=1, inplace=True)
    df.columns = ["date", "usd-twd", "usd-jpy"]
    usd_twd_column = df["usd-twd"]  # 先存儲被刪除的列
    df["twd-jpy"] = df["usd-twd"] / df["usd-jpy"]
    df.drop(df.iloc[:, 1:3], axis=1, inplace=True) #刪除不需要的資料
    df['date'] = pd.to_datetime(df['date'], format='%Y%m%d')
    df['date'] = df["date"].astype(str)
    result = df.to_json(orient="records")   # 轉成json格式 
    df["usd-twd"] = usd_twd_column   #恢復 "usd-twd" 列
    result_usd_twd = df[["date", "usd-twd"]].to_json(orient="records")
    return render_template("index.html", exchangeData=result,exchangeData2=result_usd_twd) #將後端的code 再帶到前端去執行

if __name__ == '__main__':
    app.run()