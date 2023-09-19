export const fetchData = async (url, id, method = "GET", body = {}) => {
    try {
        const res = await fetch(id ? `${url}/${id}` : url, method === "GET" ? { method } : { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
        return await res.json();
    }
    catch (error) {
        console.error(error);
    }
}