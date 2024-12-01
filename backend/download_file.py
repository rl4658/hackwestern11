<<<<<<< HEAD
from flask import Flask, send_file, request, jsonify

FILE_PATH = "user_schedule_csv/example_schedule.csv"

=======
from flask import Flask, send_file, request, jsonify, Response

app = Flask(__name__)

# Path to the file you want to allow downloading
FILE_PATH = "user_schedule_csv/example_schedule.csv"

@app.route('/download', methods=['POST'])
>>>>>>> 1d9649703bd48880f1a935cb40bdee0a74077d83
def download_file():
    """
    API endpoint to handle file downloads.
    Expects a POST request. Returns the file for download.
    """
    try:
<<<<<<< HEAD
        # Serve the file as an attachment
        return send_file(FILE_PATH, as_attachment=True)
=======
        # Serve the file directly as a downloadable attachment
        response = send_file(
            FILE_PATH,
            as_attachment=True,
            attachment_filename="your_schedule.csv",  # Suggest filename for the download
            mimetype='text/csv'  # MIME type for CSV files
        )
        return response
>>>>>>> 1d9649703bd48880f1a935cb40bdee0a74077d83
    except FileNotFoundError:
        return jsonify({"error": "File not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500
<<<<<<< HEAD


=======
>>>>>>> 1d9649703bd48880f1a935cb40bdee0a74077d83
