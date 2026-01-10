import { redirect } from 'next/navigation'
import { ApiData } from '../models/ApiData';

// Fetch all countries from the countryapi.io
export const getData = async ():Promise<ApiData> => {
    // Vérifier si la clé API est définie
    if (!process.env.API_KEY) {
        redirect('/error/');
    }

    try {
        // Ajouter un timeout pour éviter les attentes infinies
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 secondes

        const res = await fetch(`https://countryapi.io/api/all?apikey=${process.env.API_KEY}`, {
            signal: controller.signal,
            next: { revalidate: 3600 }, // Cache pendant 1 heure
        });

        clearTimeout(timeoutId);
        
        if (!res.ok) {
            // Si erreur 429 (Too Many Requests) ou 403 (Forbidden) → limite atteinte
            if (res.status === 429 || res.status === 403) {
                redirect('/disclaimer/');
            }
            // Autres erreurs HTTP → problème avec l'API
            redirect('/error/');
        }
        
        return res.json();
    } catch (error: unknown) {
        // Gérer les erreurs réseau (ENOTFOUND, timeout, etc.)
        // Ces erreurs indiquent que l'API n'est pas accessible
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        console.error('Error fetching data from countryapi.io:', errorMessage);
        
        // Erreur réseau → API indisponible
        redirect('/error/');
    }
}