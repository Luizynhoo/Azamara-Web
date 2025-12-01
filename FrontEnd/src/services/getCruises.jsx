export async function getCruises() {
  const username = "Gabriel Marques";
  const appPassword = "Yerm ri9e Bo4J xpyB TD5g 548E";

  const token = btoa(`${username}:${appPassword}`.trim());

  const result = await fetch(
    "https://manualdoagente.com.br/wp-json/custom/v1/ofertas-azamara",
    {
      headers: {
        Authorization: `Basic ${token}`,
      },
    }
  );

  const data = await result.json();
  return data;
}
