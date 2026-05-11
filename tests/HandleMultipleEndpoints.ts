

// Create the Generic Fetch Function 
// Use a generic type parameter T that is constrained to the keys of your ApiEndpoints interface. This ensures that the function only accepts valid endpoint strings. 

async function apiFetch<T extends keyof ApiEndpoints>(
    endpoint: T
): Promise<ApiEndpoints[T]> {
    const response = await fetch(`https://example.com${endpoint}`);

    if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
    }

    return response.json();
}