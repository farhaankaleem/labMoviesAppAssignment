export const APIConfigPromise = (async () => {
    const configResponse = await fetch("./config.json");
    const config = await configResponse.json();
    
    return {
        API: {
            endpoints: [
                {
                    name: "appApi",
                    endpoint: config.apiUrl
                },
                {
                    name: "authApi",
                    endpoint: config.authUrl
                }
            ]
        }
    };
})();
