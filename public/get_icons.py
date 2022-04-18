import urllib.request
import os
import pymysql.cursors
import time
import re
from multiprocessing import Pool


def get_icon(row):
    filename = re.sub("https?://", "", row["url"])
    urllib.request.urlretrieve(row["icon_path"], f"./img/icons/{filename}.png")
    time.sleep(1)
    return ""


if __name__ == "__main__":
    DB_HOST = os.getenv("host", "localhost")
    DB_PORT = int(os.getenv("port", "3306"))
    DB_USER = os.getenv("user")
    DB_PASS = os.getenv("password")
    DB_NAME = os.getenv("database")

    print(DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_NAME)

    connection = pymysql.connect(
        host=DB_HOST,
        port=DB_PORT,
        user=DB_USER,
        password=DB_PASS,
        database=DB_NAME,
        cursorclass=pymysql.cursors.DictCursor,
    )

    with connection:
        with connection.cursor() as cursor:
            q = "SELECT url, icon_path FROM similarweb_pages"
            cursor.execute(q)
            rs = cursor.fetchall()

    p = Pool(4)
    p.map(get_icon, rs)
