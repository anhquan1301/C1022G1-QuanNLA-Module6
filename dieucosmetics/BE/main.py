from fastapi import FastAPI
import uvicorn

from config.db import create_database

app = FastAPI()
create_database()
def start():
    uvicorn.run(app, host="127.0.0.1", port=8000)

if __name__ == "__main__":
    start()