import { redirect } from 'next/navigation'
import { ApiData } from '../models/ApiData';

// Interface pour les données REST Countries
interface RestCountry {
    name: {
        common: string;
        official: string;
    };
    capital?: string[];
    flags: {
        png: string;
        svg: string;
    };
    area: number;
    population: number;
    region: string;
    subregion?: string;
    latlng?: [number, number]; // [latitude, longitude]
}

// Fetch all countries from REST Countries API
export const getData = async ():Promise<ApiData> => {
    console.log('Fetching data from REST Countries API...');
    try {
        // Ajouter un timeout pour éviter les attentes infinies
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 secondes

        console.log('Making fetch request to https://restcountries.com/v3.1/all');
        // Essayer d'abord sans le paramètre fields, puis avec si nécessaire
        let apiUrl = 'https://restcountries.com/v3.1/all';
        let res = await fetch(apiUrl, {
            signal: controller.signal,
            next: { revalidate: 3600 }, // Cache pendant 1 heure
            headers: {
                'Accept': 'application/json',
            },
        });
        
        // Si erreur 400, essayer avec le paramètre fields
        if (!res.ok && res.status === 400) {
            console.log('Trying with fields parameter...');
            apiUrl = 'https://restcountries.com/v3.1/all?fields=name,capital,flags,area,population,region,subregion,latlng';
            res = await fetch(apiUrl, {
                signal: controller.signal,
                next: { revalidate: 3600 },
                headers: {
                    'Accept': 'application/json',
                },
            });
        }

        console.log('Fetch response status:', res.status, res.statusText);

        clearTimeout(timeoutId);
        
        if (!res.ok) {
            // Récupérer le message d'erreur pour le debug
            const errorText = await res.text();
            console.error('API Error Response:', {
                status: res.status,
                statusText: res.statusText,
                body: errorText
            });
            
            // Si erreur 429 (Too Many Requests) → limite atteinte
            if (res.status === 429) {
                redirect('/disclaimer/');
            }
            // Autres erreurs HTTP → problème avec l'API
            redirect('/error/');
        }
        
        const countries: RestCountry[] = await res.json();
        console.log('Received countries count:', countries?.length);
        
        // Vérifier que nous avons reçu des données
        if (!Array.isArray(countries) || countries.length === 0) {
            console.error('REST Countries API returned invalid data');
            redirect('/error/');
        }
        
        // Transformer le tableau en objet pour maintenir la compatibilité avec le code existant
        // Utiliser le nom commun comme clé
        const transformedData: ApiData = {};
        
        countries.forEach((country) => {
            try {
                // Vérifier que les propriétés essentielles existent
                if (!country.name || !country.name.common) {
                    console.warn('Country missing name.common:', country);
                    return; // Ignorer ce pays
                }
                
                const countryName = country.name.common;
                
                // Construire l'objet latLng si les coordonnées sont disponibles
                let latLng = undefined;
                if (country.latlng && Array.isArray(country.latlng) && country.latlng.length === 2) {
                    const [lat, lng] = country.latlng;
                    latLng = {
                        country: [lat, lng] as [number, number]
                    };
                    
                    // Ajouter les coordonnées de la capitale si disponible
                    // Note: REST Countries ne fournit pas les coordonnées de la capitale directement
                    // On utilise les coordonnées du pays pour la capitale aussi
                    if (country.capital && Array.isArray(country.capital) && country.capital.length > 0) {
                        latLng.capital = [lat, lng] as [number, number];
                    }
                }
                
                transformedData[countryName] = {
                    name: countryName,
                    capital: (country.capital && Array.isArray(country.capital) && country.capital.length > 0) ? country.capital[0] : '',
                    flag: {
                        small: country.flags?.png || '',
                        medium: country.flags?.png || '',
                        large: country.flags?.png || ''
                    },
                    area: country.area || 0,
                    population: country.population || 0,
                    region: country.region || '',
                    subregion: country.subregion || '',
                    latLng: latLng
                };
            } catch (countryError) {
                console.error('Error processing country:', country, countryError);
                // Continuer avec le pays suivant
            }
        });
        
        // Vérifier que nous avons transformé au moins quelques pays
        const countryCount = Object.keys(transformedData).length;
        if (countryCount === 0) {
            console.error('No countries were successfully transformed');
            redirect('/error/');
        }
        
        console.log(`Successfully loaded ${countryCount} countries from REST Countries API`);
        return transformedData;
    } catch (error: unknown) {
        // Gérer les erreurs réseau (ENOTFOUND, timeout, etc.)
        // Ces erreurs indiquent que l'API n'est pas accessible
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        const errorStack = error instanceof Error ? error.stack : undefined;
        console.error('Error fetching data from REST Countries:', {
            message: errorMessage,
            stack: errorStack,
            error: error
        });
        
        // Erreur réseau → API indisponible
        redirect('/error/');
    }
}