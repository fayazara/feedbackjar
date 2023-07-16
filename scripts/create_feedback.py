import requests
import json
import sys
import random

sample_data = [
    {
        "feedback": "This feature is not working properly",
        "userEmail": "user1@example.com",
        "userName": "Alice Smith",
        "category": "Bug",
        "status": "Open"
    },
    {
        "feedback": "I have an idea for a new feature",
        "userEmail": "user2@example.com",
        "userName": "Bob Johnson",
        "category": "Idea",
        "status": "Assigned"
    },
    {
        "feedback": "The app is crashing frequently",
        "userEmail": "user3@example.com",
        "userName": "Emma Davis",
        "category": "Bug",
        "status": "Closed"
    },
    {
        "feedback": "We need better performance optimization",
        "userEmail": "user4@example.com",
        "userName": "Michael Brown",
        "category": "Improvement",
        "status": "Open"
    },
    {
        "feedback": "Missing a key feature in the dashboard",
        "userEmail": "user5@example.com",
        "userName": "Sophia Wilson",
        "category": "Bug",
        "status": "Assigned"
    }
]


def create_feedback(data, project_id):

    reqUrl = "http://localhost:3000/api/projects/%s/feedbacks" % project_id

    headersList = {
        "Accept": "*/*",
        "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36",
        "Content-Type": "application/json"
    }

    payload = json.dumps(data)

    response = requests.request(
        "POST", reqUrl, data=payload,  headers=headersList)

    print(response.text)


def process_data(number_of_records):
    fbk = 0
    for i in range(0, number_of_records):
        for data in sample_data:
            fbk += 1
            project_id = random.randint(1, 2)
            create_feedback(data, project_id)

            print('fbk', fbk)


if __name__ == "__main__":
    if len(sys.argv) > 1:
        number_of_records = sys.argv[1]
        process_data(int(number_of_records))
    else:
        print("Enter a number to pass number_of_records to create")
