# linkshortner-springboot

# Project Overview:
The Link Shortener web application is a tool that allows users to convert long URLs into shorter ones for easy sharing and accessibility. It provides a user-friendly interface where users can input any valid URL and receive a unique, shortened URL in return. This shortened URL can be used to access the original URL. The application also ensures that the short URLs have a limited time validity, expiring after a specified duration.

# Functions and Features:

URL Shortening: Users can input any valid URL into the application, and it will generate a unique short URL for that link. For example, www.google.com will be converted to http://localhost:7070/3xerdsfs.

Short URL Redirection: By using the generated short URL, users can easily access the original URL. For instance, accessing http://localhost:7070/3xerdsfs will redirect them to www.google.com.

Duplicate URL Handling: The application validates if a given URL has already been shortened. If so, it returns the existing short URL instead of creating a new one for the same original URL.

URL Structure Validation: The application ensures that users provide valid URLs for shortening. It performs checks to ensure the input URL follows the correct structure.

Time Validity Limit: Each short URL has a time validity limit, usually set to 5 minutes from the time of generation. If a user tries to visit the short URL after this time period, the application notifies them that the URL has expired.

Error Handling: If a user enters a short URL that hasn't been generated or a non-existent URL, the application provides an error notification and guides them to create the URL.

# How to Run the Application:

Clone the Repository: Clone the Link Shortener repository from GitLab using the provided repository URL.

Install Dependencies: Ensure you have Node.js and npm installed on your system. Navigate to the project's root directory and run npm install to install the necessary dependencies.

Configuration: Open config.js in the project's root directory using a text editor. Set the desired configurations, such as the port number (e.g., 8085) and the time validity limit for short URLs (e.g., 5 minutes).

Run the Application: Start the web application by running npm start in the terminal. The server should be up and running, and you'll see a message indicating that it's listening on the specified port.

Access the Application: Open your web browser and go to http://localhost:8085 (replace 8085 with the port number you specified in config.js). You should see the Link Shortener user interface.

# How it Works:

User Interface: The user interacts with the Link Shortener through a user-friendly interface. They can input any valid URL they want to shorten.

URL Shortening: When the user submits a URL, the application checks if it's a valid URL. If valid, it looks for a previously generated short URL for the same original URL in the database. If found, it returns the existing short URL; otherwise, it generates a new one.

Short URL Creation: The application creates a short URL by compressing the original URL using a hashing algorithm. This ensures uniqueness and a fixed length for the short URL.

Short URL Redirection: When users access a short URL, the application decodes it to find the original URL and redirects them to the appropriate website.

Time Validity: The application keeps track of the creation time of each short URL. If a user tries to visit a short URL after its validity has expired, the application notifies them that the URL has expired.

Error Handling: If a user enters a short URL that hasn't been generated or provides an invalid URL, the application displays an error message and guides the user to create a new short URL.

The Link Shortener web application thus provides an efficient way for users to create and use short URLs, enhancing accessibility and ease of sharing.





