import { createClient } from 'pexels';

export const pexels = createClient(import.meta.env.VITE_PEXELS_API_KEY);