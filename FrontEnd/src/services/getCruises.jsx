
export async function getCruises() {
    const result = await fetch(import.meta.env.VITE_URL_GET_CRUISE);
    const data = await result.json();
    return data
}

