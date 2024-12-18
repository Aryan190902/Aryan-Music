const fetch = require('node-fetch');

exports.handler = async (event) => {
  const { path, queryStringParameters, httpMethod, headers, body } = event;

  // Your backend base URL
  const backendURL = process.env.REACT_APP_API_URL;


  // Build the full URL (including query parameters)
  const queryParams = new URLSearchParams(queryStringParameters).toString();
  const fullURL = `${backendURL}${path}${queryParams ? '?' + queryParams : ''}`;

  try {
    // Forward the request to the backend
    const response = await fetch(fullURL, {
      method: httpMethod, // Forward the HTTP method (GET, POST, etc.)
      headers: {
        ...headers, // Forward all headers
        'host': undefined, // Remove host header to avoid conflicts
      },
      body: httpMethod === 'GET' || httpMethod === 'HEAD' ? null : body, // Attach the body for non-GET methods
    });

    const responseBody = await response.text(); // Read the backend response as text

    return {
      statusCode: response.status,
      body: responseBody,
      headers: {
        ...response.headers.raw(), // Forward backend headers
      },
    };
  } catch (error) {
    console.error('Error proxying request:', error);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Proxy error', details: error.message }),
    };
  }
};
