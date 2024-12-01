import json
from app import app

def test_process_query():
    """
    Test the /process_query endpoint and print the results.
    """
    # Set up the test client for the Flask app
    with app.test_client() as client:
        # Sample query to send to the endpoint
        test_query = {"query": "I want to play basketball for 1 hour on monday tuesday and friday"}

        # Send POST request to the endpoint
        response = client.post('/process_query', json=test_query)

        # Print the status code
        print("Status Code:", response.status_code)

        # Print the response data
        if response.status_code == 200:
            data = response.get_json()
            print("Schedules:")
            print(json.dumps(data, indent=4))
        else:
            print("Error Response:")
            print(response.get_json())

def test_process_query_no_query():
    """
    Test the /process_query endpoint without a query and print the results.
    """
    # Set up the test client for the Flask app
    with app.test_client() as client:
        # Send POST request without a query
        response = client.post('/process_query', json={})

        # Print the status code
        print("Status Code:", response.status_code)

        # Print the response data
        if response.status_code == 400:
            print("Error Response:")
            print(response.get_json())
        else:
            print("Unexpected Response:")
            print(response.get_json())

if __name__ == '__main__':
    print("Running test for valid query...")
    test_process_query()
    