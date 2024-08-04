from typing import Union
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

import pymysql.cursors
import gen_id

app = FastAPI()
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def db_connect():
    condb = pymysql.connect(
        host = '10.22.198.61',
        user = 'kasemwards',
        password = 'KasemWards2024',
        db = 'kasemwards'
    )
    return condb


class Product_receipt(BaseModel):
    data: list


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/instock")
async def instock():
    connect = db_connect()
    connect.commit()
    with connect.cursor(pymysql.cursors.DictCursor) as cur:
        sql = '''
            SELECT inventory.id, products.code, products.name, inventory.quantity, products.unit
            FROM inventory
            JOIN products ON inventory.prod_id = products.id
            WHERE inventory.store_id = 1
        '''
        cur.execute(sql)
        result = cur.fetchall()
    connect.close()

    title = ['รหัสยา', 'ชื่อยา', 'จำนวนคงเหลือ', 'หน่วย']

    return {"title": title, "instock": result}


@app.get("/medic_detail")
async def medic_detail():
    connect = db_connect()
    connect.commit()
    with connect.cursor(pymysql.cursors.DictCursor) as cur:
        sql = 'SELECT id, code, name, unit FROM products ORDER BY code'
        cur.execute(sql)
        result = cur.fetchall()
    connect.close()

    return {"medic": result}


@app.post("/product_receive")
async def product_receive(data: Product_receipt):
    print(data)
    value = ((item['id'], item['qty']) for item in data.data)
    return {'status': 'pass'}