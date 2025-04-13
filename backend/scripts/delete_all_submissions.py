import os
from dotenv import load_dotenv
from pymongo import MongoClient

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")
if not MONGO_URI: 
    raise Exception("MONGO_URI is not set")

client = MongoClient(MONGO_URI)
db = client['test']

submissions_collections = db['submissions']

def delete_all_submissions():
    result = submissions_collections.delete_many({})
    print(f"Deleted {result.deleted_count} documents from the 'submissions' collection.")


if __name__ == "__main__":
    delete_all_submissions()