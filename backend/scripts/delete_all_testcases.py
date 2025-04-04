import os
from dotenv import load_dotenv
from pymongo import MongoClient

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI") 
if not MONGO_URI:
    raise Exception("MONGO_URI is not set")

client = MongoClient(MONGO_URI)
db = client["test"]
testcase_collection = db["testcases"]

def delete_all_testcases():
    result = testcase_collection.delete_many({})
    print(f"Deleted {result.deleted_count} documents from the 'testcases' collection.")

if __name__ == "__main__":
    delete_all_testcases()