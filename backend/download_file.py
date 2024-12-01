from flask import Flask, send_file, request, jsonify, Response

app = Flask(__name__)

# Path to the file you want to allow downloading
FILE_PATH = "user_schedule_csv/example_schedule.csv"

@app.route('/download', methods=['POST'])
def download_file():
    """
    API endpoint to handle file downloads.
    Expects a POST request. Returns the file for download.
    """
    try:
        # Serve the file directly as a downloadable attachment
        response = send_file(
            FILE_PATH,
            as_attachment=True,
            download_name="your_schedule.csv",  # Updated parameter for Flask >= 2.0
            mimetype='text/csv'  # MIME type for CSV files
        )
        return response
    except FileNotFoundError:
        return jsonify({"error": "File not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
