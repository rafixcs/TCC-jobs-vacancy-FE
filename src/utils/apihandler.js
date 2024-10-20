const URL = "http://localhost:8000/api/v1/" // process.env.BACKEND_URL

export const apiHandler = async(
    apiPath,
    method,
    contenyType,
    body
) => {
    const options = {
        method: method,
        headers: {
            Authorization: sessionStorage.getItem("token") || "",
            "Content-Type": contenyType
        },
    }

    if (method === "POST") {
        options.body = JSON.stringify(body)
    }

    const raw = await fetch(URL + apiPath, options)

    return raw
}