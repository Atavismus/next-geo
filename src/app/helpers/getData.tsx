import { redirect } from 'next/navigation'
import { ApiData } from '../models/ApiData';
import { API_CONFIG } from '../constants';
import { ApiError, DataTransformationError } from '../utils/errors';

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
    if (process.env.NODE_ENV === 'development') {
        console.log('Fetching data from REST Countries API...');
    }
    try {
        // Ajouter un timeout pour éviter les attentes infinies
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT_MS);

        // Essayer d'abord sans le paramètre fields, puis avec si nécessaire
        let apiUrl: string = API_CONFIG.BASE_URL;
        let res = await fetch(apiUrl, {
            signal: controller.signal,
            next: { revalidate: API_CONFIG.CACHE_REVALIDATE_SECONDS },
            headers: {
                'Accept': 'application/json',
            },
        });
        
        // Si erreur 400, essayer avec le paramètre fields
        if (!res.ok && res.status === 400) {
            apiUrl = `${API_CONFIG.BASE_URL}?fields=${API_CONFIG.FIELDS_PARAM}`;
            res = await fetch(apiUrl, {
                signal: controller.signal,
                next: { revalidate: API_CONFIG.CACHE_REVALIDATE_SECONDS },
                headers: {
                    'Accept': 'application/json',
                },
            });
        }

        clearTimeout(timeoutId);
        
        if (!res.ok) {
            // Récupérer le message d'erreur pour le debug
            const errorText = await res.text();
            if (process.env.NODE_ENV === 'development') {
                console.error('API Error Response:', {
                    status: res.status,
                    statusText: res.statusText,
                    body: errorText
                });
            }
            
            // Si erreur 429 (Too Many Requests) → limite atteinte
            if (res.status === 429) {
                redirect('/disclaimer/');
            }
            // Autres erreurs HTTP → problème avec l'API
            redirect('/error/');
        }
        
        const countries: RestCountry[] = await res.json();
        
        // Vérifier que nous avons reçu des données
        if (!Array.isArray(countries) || countries.length === 0) {
            throw new ApiError('REST Countries API returned invalid data', res.status);
        }
        
        // Transformer le tableau en objet pour maintenir la compatibilité avec le code existant
        // Utiliser le nom commun comme clé
        const transformedData: ApiData = {};
        
        countries.forEach((country) => {
            try {
                // Vérifier que les propriétés essentielles existent
                if (!country.name || !country.name.common) {
                    if (process.env.NODE_ENV === 'development') {
                        console.warn('Country missing name.common:', country);
                    }
                    return; // Ignorer ce pays
                }
                
                const countryName = country.name.common;
                
                // Construire l'objet latLng si les coordonnées sont disponibles
                let latLng: { country: [number, number]; capital?: [number, number] } | undefined = undefined;
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
                if (process.env.NODE_ENV === 'development') {
                    console.error('Error processing country:', country, countryError);
                }
                // Continuer avec le pays suivant - on ignore les pays invalides
                throw new DataTransformationError(
                    `Failed to transform country data: ${countryError instanceof Error ? countryError.message : 'Unknown error'}`,
                    country
                );
            }
        });
        
        // Vérifier que nous avons transformé au moins quelques pays
        const countryCount = Object.keys(transformedData).length;
        if (countryCount === 0) {
            throw new ApiError('No countries were successfully transformed', 500);
        }
        
        if (process.env.NODE_ENV === 'development') {
            console.log(`Successfully loaded ${countryCount} countries from REST Countries API`);
        }
        return transformedData;
    } catch (error: unknown) {
        // Gérer les erreurs réseau (ENOTFOUND, timeout, etc.)
        // Ces erreurs indiquent que l'API n'est pas accessible
        
        // Si c'est déjà une ApiError, on la laisse passer
        if (error instanceof ApiError || error instanceof DataTransformationError) {
            if (process.env.NODE_ENV === 'development') {
                console.error('API Error:', error.message, error);
            }
            redirect('/error/');
            return {} as ApiData; // Type assertion pour satisfaire TypeScript
        }
        
        // Autres erreurs (réseau, timeout, etc.)
        if (process.env.NODE_ENV === 'development') {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            const errorStack = error instanceof Error ? error.stack : undefined;
            console.error('Error fetching data from REST Countries:', {
                message: errorMessage,
                stack: errorStack,
                error: error
            });
        }
        
        // Erreur réseau → API indisponible
        redirect('/error/');
        return {} as ApiData; // Type assertion pour satisfaire TypeScript
    }
}