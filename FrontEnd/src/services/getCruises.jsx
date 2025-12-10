
export async function getCruises() {
    const result = await fetch(import.meta.env.VITE_URL_GET_CRUISE_SERVER);
    const data = await result.json();
    return data
}

