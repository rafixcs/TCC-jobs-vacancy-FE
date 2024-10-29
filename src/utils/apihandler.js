const URL = "http://localhost:8080/api/v1/" // process.env.BACKEND_URL

export const apiHandler = async (endpoint, method, contentType, body, isFormData = false) => {
    let headers = {};

    headers['Authorization'] = sessionStorage.getItem("token") || "";

    if (!isFormData && contentType) {
        headers['Content-Type'] = contentType;
    }

    const response = await fetch(`${URL}${endpoint}`, {
        method,
        headers,
        body: isFormData ? body : body ? JSON.stringify(body) : null,
    });

    return response;
};