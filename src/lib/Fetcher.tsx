// This is a fetch wrapper used to pass credentials with every request
export const Fetcher = {
  get: get,
  post: post,
};

/**
 * Sends a GET request to the server
 *
 * @param path - the path to send the request to
 * @returns {Promise<Response>}
 */
async function get(path: string) {
  return await fetch(`${process.env.REACT_APP_API_BASE_URL}${path}`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

/**
 * Sends a POST request to the server
 *
 * @param path - the path to send the request to
 * @param body - the body of the request
 * @returns {Promise<Response>}
 */
async function post(path: string, body?: object) {
  return await fetch(`${process.env.REACT_APP_API_BASE_URL}${path}`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
}
