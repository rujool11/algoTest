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

problems = [
    {
        "name": "Two Sum",
        "description": "Given an array of integers and a target sum, return the indices of the two numbers that add up to the target. Assume there is exactly one solution, and you may not use the same element twice. You will be given the size of the array, followed by the members of the array, and finally the target sum. Be sure to check the sample input and output for formatting details.",
        "sampleInput": "5\n1 2 3 4 5\n3",
        "sampleOutput": "0 1",
        "difficulty": "Easy"
    },
    {
        "name": "Reverse String",
        "description": "Given a string, reverse it and return the reversed string.",
        "sampleInput": "hello",
        "sampleOutput": "olleh",
        "difficulty": "Easy"
    },
    {
        "name": "Largest Element in Array",
        "description": "Given an array of integers, find and return the largest element in the array. You will be given the size of the array, followed by the members of the array. Be sure to check sample input and output for formatting.",
        "sampleInput": "5\n1 3 7 2 5",
        "sampleOutput": "7",
        "difficulty": "Easy"
    },
    {
        "name": "Valid Anagram",
        "description": "Given two strings, determine if one is an anagram of the other. An anagram is formed by rearranging the letters of a word to produce a new word, using all original letters exactly once.",
        "sampleInput": "cat\nact",
        "sampleOutput": "true",
        "difficulty": "Easy"
    },
    {
        "name": "Letter Combinations of a Phone Number",
        "description": "Given a string containing digits from 0-9, return all possible letter combinations that the number could represent. The mapping follows the standard telephone keypad.",
        "sampleInput": "23",
        "sampleOutput": "ad ae af bd be bf cd ce cf",
        "difficulty": "Medium"
    },
    {
        "name": "House Robber II",
        "description": "Given an array of non-negative integers representing the amount of money in each house, determine the maximum amount that can be robbed without alerting the police. The houses are arranged in a circle, meaning the first and last houses are adjacent.",
        "sampleInput": "4\n1 2 3 1",
        "sampleOutput": "4",
        "difficulty": "Medium"
    },
    {
        "name": "Merge Sort",
        "description": "Given an array of integers, sort the array in ascending order using the Merge Sort algorithm. Do not use any inbuilt functions. Look at sample input and output for formatting.",
        "sampleInput": "5\n5 3 8 1 2",
        "sampleOutput": "1 2 3 5 8",
        "difficulty": "Medium"
    },
    {
        "name": "Super Egg Drop",
        "description": "Given K eggs and N floors, determine the minimum number of attempts needed to find the highest floor from which an egg can be dropped without breaking. Input is in the form k n without any other formatting.",
        "sampleInput": "2 6",
        "sampleOutput": "3",
        "difficulty": "Hard"
    }
]

if __name__ == "__main__":
    print("Inserting problems into the database...")
    result = problems_collection.insert_many(problems)
    print("Inserted problem IDs:", result.inserted_ids)
    client.close()
