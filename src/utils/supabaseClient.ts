import { createClient } from "@supabase/supabase-js";
import type { Database} from "@/types/database/databaseType"
import axios from 'axios';
// import {Pool} from 'pg';

const supabaseUrl:string = import.meta.env.VITE_SUPA_URL || import.meta.env.TAURI_SUPA_URL;
const supabasePrivateKey:string = import.meta.env.VITE_SUPA_API_PRIVATE_KEY;

export const supabase = createClient<Database>(supabaseUrl, supabasePrivateKey);

// const pool = new Pool({
//   user: 'votre_utilisateur',
//   host: 'votre_hôte',
//   database: 'votre_base_de_données',
//   password: 'votre_mot_de_passe',
//   port: votre_port,
// });

export const resetSqlTable = async(tableName:string) => {

//   try {
//     const response = await axios.post(import.meta.env.VITE_SUPABASE_SQL_URL, 'DELETE FROM products');
//     console.log('response:', response)
//     return response.data;
//   } catch (error) {
//     console.error('Erreur lors de l\'envoi de la commande SQL :', error);
//     throw error;
//   }
}
