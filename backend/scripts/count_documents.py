import os
from dotenv import load_dotenv
from pymongo import MongoClient

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")
if not MONGO_URI: 
    raise Exception("MONGO_URI is not set")

client = MongoClient(MONGO_URI)
db = client['test']

submissions_collection = db['submissions']
users_collection = db['users']
testcases_collection = db['testcases']
problems_collection = db['problems']

def count_documents():
    submissions_count = submissions_collection.count_documents({})
    users_count = users_collection.count_documents({})
    testcases_count = testcases_collection.count_documents({})
    problems_count = problems_collection.count_documents({})
    
    print(f"Documents in 'submissions' collection: {submissions_count}")
    print(f"Documents in 'users' collection: {users_count}")
    print(f"Documents in 'testcases' collection: {testcases_count}")
    print(f"Documents in 'problems' collection: {problems_count}")

if __name__ == "__main__":
    count_documents()
