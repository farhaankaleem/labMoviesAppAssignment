import { APIConfigPromise } from "../config";

export const getDynamoMovieReviews = async (id: string | number) => {
    const APIConfig = await APIConfigPromise;
    
    return fetch(`${APIConfig.API.endpoints[0].endpoint}/movies/${id}/reviews`)
        .then((res) => res.json())
        .then((json) => {
            console.log(json.results);
            return json;
        });
};

export const getDynamoToken = async (userName: string, password: string) => {
    const APIConfig = await APIConfigPromise;
    
    return fetch(`${APIConfig.API.endpoints[1].endpoint}/auth/signin`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ userName, password })
    })
    .then((res) => res.json())
    .then((json) => {
        console.log(json.results);
        return json;
    });
};
