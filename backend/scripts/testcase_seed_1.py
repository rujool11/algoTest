import os
from dotenv import load_dotenv
from pymongo import MongoClient

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")
if not MONGO_URI:
    raise Exception("MONGO_URI is not set")

client = MongoClient(MONGO_URI)
db = client["test"]

problems_collection = db["problems"]
testcases_collection = db["testcases"]

#  testcases for each problem in problem_seed_1
test_cases = {
    "Two Sum": [
        {"input": "5\n1 2 3 4 5\n3", "output": "0 1"},
        {"input": "2\n3 3\n6", "output": "0 1"},
        {"input": "3\n3 2 4\n6", "output": "1 2"},
        {"input": "4\n2 7 11 15\n9", "output": "0 1"},
        {"input": "5\n1 2 3 4 5\n9", "output": "3 4"},
        {"input": "6\n-3 90 3 4 -1 2\n0", "output": "0 2"},
        {"input": "5\n10 20 30 50 100\n50", "output": "1 2"},
        {"input": "4\n19 20 38 60\n80", "output": "1 3"},
        {"input": "6\n11 22 33 44 55 66 \n33", "output": "0 1"},
        {"input": "3\n11 2 30 \n32", "output": "1 2"}
    ],
    "Reverse String": [
        {"input": "hello", "output": "olleh"},
        {"input": "x", "output": "x"},
        {"input": "racecar", "output": "racecar"},
        {"input": "apple", "output": "elppa"},
        {"input": "cake", "output": "ekac"},
        {"input": "problem", "output": "melborp"},
        {"input": "kangaroo", "output": "ooragnak"},
        {"input": "dresden", "output": "nedserd"},
        {"input": "lotus", "output": "sutol"},
        {"input": "banana", "output": "ananab"}
    ],
    "Largest Element in Array": [
        {"input": "5\n1 3 7 2 5", "output": "7"},
        {"input": "3\n9 3 2", "output": "9"},
        {"input": "8\n1 9 3 89 3 4 9 80", "output": "89"},
        {"input": "5\n89 89 -89 89 0", "output": "89"},
        {"input": "4\n10 20 30 40", "output": "40"},
        {"input": "1\n9", "output": "9"},
        {"input": "2\n4 5", "output": "5"}
    ],
    "Valid Anagram": [
        {"input": "cat\nact", "output": "true"},
        {"input": "dusty\nstudy", "output": "true"},
        {"input": "night\nthing", "output": "true"},
        {"input": "listen\nsilent", "output": "true"},
        {"input": "desert\nprtert", "output": "false"},
        {"input": "chess\nmessy", "output": "false"},
        {"input": "car\ncart", "output": "false"}
    ],
    "Letter Combinations of a Phone Number": [
        {"input": "23", "output": "ad ae af bd be bf cd ce cf"},
        {"input": "2", "output": "a b c"},
        {"input": "4", "output": "g h i"},
        {"input": "7", "output": "p q r s"},
        {"input": "9", "output": "w x y z"}
    ],
    "House Robber II": [
        {"input": "4\n1 2 3 1", "output": "4"},
        {"input": "3\n1 2 3", "output": "3"},
        {"input": "3\n2 3 2", "output": "3"},
        {"input": "2\n1 1", "output": "1"},
        {"input": "2\n1 2", "output": "2"}
    ],
    "Merge Sort": [
        {"input": "5\n5 3 8 1 2", "output": "1 2 3 5 8"},
        {"input": "4\n3 4 2 1", "output": "1 2 3 4"},
        {"input": "4\n89 200 21 10", "output": "10 21 89 200"},
        {"input": "6\n-3 -4 -1 89 -89 0", "output": "-89 -4 -3 -1 0 89"},
        {"input": "4\n10 9 8 7", "output": "7 8 9 10"},
        {"input": "5\n2 4 6 8 10", "output": "2 4 6 8 10"}
    ],
    "Super Egg Drop": [
        {"input": "1 2", "output": "2"},
        {"input": "2 6", "output": "3"},
        {"input": "3 14", "output": "4"},
        {"input": "1 1", "output": "1"},
        {"input": "1 3", "output": "3"}
    ],
    "N Queens": [
        {"input": "1", "output": "Q"},
        {"input": "4", "output": ". Q . .  \n. . . Q  \nQ . . .  \n. . Q ."},
        {"input": "5", "output": "Q . . . .  \n. . . Q .  \n. Q . . .  \n. . . . Q  \n. . Q . ."},
        {"input": "6", "output": ". Q . . . .  \n. . . Q . .  \n. . . . . Q  \nQ . . . . .  \n. . Q . . .  \n. . . . Q ."},
        {"input": "8", "output": ". Q . . . . . .  \n. . . . Q . . .  \n. . . . . . . Q  \n. . . . . Q . .  \n. . . . . . Q .  \nQ . . . . . . .  \n. . Q . . . . .  \n. . . Q . . . ."}
    ]
}

# insert test cases for each problem 
for problem_name, cases in test_cases.items():
    # find problem by name
    problem = problems_collection.find_one({"name": problem_name})
    if not problem:
        print(f"Problem '{problem_name}' not found in database.")
        continue

    problem_id = problem["_id"]
    test_case_docs = []
    for case in cases:
        doc = {
            "problemId": problem_id,
            "input": case["input"],
            "output": case["output"]
        }
        test_case_docs.append(doc)


    # insert testcases
    result = testcases_collection.insert_many(test_case_docs)
    print(f"Inserted {len(result.inserted_ids)} test cases for '{problem_name}'")

client.close()
