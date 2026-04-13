export type Usuario = {
  id: string;
  nombre_usuario: string;
  url_avatar: string;
  nivel : number;
  experiencia : number;
  usuario_premium : boolean;
  logro : string;
};
export type Logro = {
  logro_id: number;
  nombre: string;
  descripcion: string;
  url_image: string;
  desbloqueado: boolean;
};


const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAPIKey =import.meta.env.VITE_SUPABASE_APIKEY


async function handleResponse<T>(response: Response, defaultMessage: string): Promise<T> {
  if (!response.ok) {
    console.log("Error response from DummyAPI: ", response);
    throw new Error(defaultMessage);
  }

  return response.json() as Promise<T>;
}

export async function fetchUsuarioByName(nombre: string): Promise<Usuario[]> {
  console.log(supabaseUrl, "FROm fetchUsuarioByName but apikey ", supabaseAPIKey)
  const response = await fetch(
    `${supabaseUrl}/rest/v1/rpc/get_user_with_logro`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: supabaseAPIKey,
      },
      body: JSON.stringify({ "user_name": nombre })
    }
  );

  return handleResponse<Usuario[]>(response, "No se pudo cargar el usuario");
}


export async function fetchUsuarioLogros(id: string): Promise<Logro[]> {
  console.log(supabaseUrl, "FROm fetchUsuarioByName but apikey ", supabaseAPIKey)
  const response = await fetch(
    `${supabaseUrl}/rest/v1/rpc/get_user_logros`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: supabaseAPIKey,
      },
      body: JSON.stringify({ "p_id": id })  
    }
  );

  return handleResponse<Logro[]>(response, "No se pudo cargar los logros del usuario");
}

// hacer la funcion de post
