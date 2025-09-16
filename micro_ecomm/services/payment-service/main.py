from fastapi import FastAPI
import redis

app = FastAPI()
r = redis.Redis(host='localhost', port=6379, db=0)

@app.get("/")
def read_root():
    return {"message": "Hello Cart Service"}