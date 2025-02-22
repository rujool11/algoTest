import os
from dotenv import load_dotenv
from pymongo import MongoClient

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")
if not MONGO_URI:
    raise Exception("MONGO_URI is not set")

client = MongoClient(MONGO_URI)
db = client['test']

problems_collection = db['problems']

dummy_problems = [
    # Easy Problems
    {
        "name": "Two Sum",
        "description": "Given an array of integers, return indices of the two numbers that add up to a specific target.",
        "sampleInput": "nums = [2, 7, 11, 15], target = 9",
        "sampleOutput": "[0, 1]",
        "difficulty": "Easy"
    },
    {
        "name": "Reverse String",
        "description": "Write a function that reverses a given string.",
        "sampleInput": '"hello"',
        "sampleOutput": '"olleh"',
        "difficulty": "Easy"
    },
    # Medium Problems
    {
        "name": "Longest Substring Without Repeating Characters",
        "description": "Given a string, find the length of the longest substring without repeating characters.",
        "sampleInput": '"abcabcbb"',
        "sampleOutput": "3",
        "difficulty": "Medium"
    },
    {
        "name": "Combination sum",
        "description": "Given an array of distinct integers candidates and a target integer target, return a list of all unique combinations of candidates where the chosen numbers sum to target",
        "sampleInput": " candidates = [2,3,6,7], target = 7",
        "sampleOutput": "[[2,2,3],[7]]",
        "difficulty": "Medium"
    }, 
    # Hard Problems
    {
        "name": "N Queens",
        "description": "The n-queens puzzle is the problem of placing n queens on an n x n chessboard such that no two queens attack each other. \nGiven an integer n, return all distinct solutions to the n-queens puzzle. You may return the answer in any order.",
        "sampleInput": "n = 4",
        "sampleOutput": '[Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]',
        "difficulty": "Hard"

    }
]


result = problems_collection.insert_many(dummy_problems)
print("Inserted problem IDs:", result.inserted_ids)
client.close()