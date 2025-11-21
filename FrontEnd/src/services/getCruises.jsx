
export async function getCruises() {
    const result = await fetch('https://manualdoagente.com.br/wp-content/uploads/ofertasAzamara.json');
    const data = await result.json();
    return data
}

