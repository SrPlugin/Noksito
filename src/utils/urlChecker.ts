export async function checkURL(url: string) {

    const start = performance.now();

    try {
        const response = await fetch(url, {
            method: 'GET',
            signal: AbortSignal.timeout(5000),
        });
        const end = performance.now();

        return {
            online: response.ok,
            status: response.status, 
            latency: Math.round( end - start)
        };

        
    } catch (error) {
        return {
            online: false,
            latency: `undefined`,
            status: 'not ok',
        };
    }
}