import { APIConfigPromise } from "../config";
import { Review, signin, signupInterface } from "../types/interfaces";


let authToken: string = "";

const setToken = (token: string) => {
  authToken = token;
};

const getHeaders = () => {
    type Headers = {
        Accept: string;
        "Content-Type": string;
        "Set-Cookie"?: string;
        Authorization?: string
      };

    const headers: Headers = {
      Accept: "application/json",
      "Content-Type": "application/json"
    };
  
    if (authToken) {
      headers["Set-Cookie"] = `token=${authToken}`;
      headers.Authorization = `Bearer ${authToken}`;
    }
  
    return headers;
  };

export const getDynamoMovieReviews = async (id: string | number) => {
    const APIConfig = await APIConfigPromise;
    return fetch(`${APIConfig.API.endpoints[0].endpoint}/movies/${id}/reviews`)
        .then((res) => res.json())
        .then((json) => {
            console.log(json.results);
            return json;
        });
};

export const setDynamoMovieReviews = async (payload: Review) => {
    try {
        const APIConfig = await APIConfigPromise;
        const headers = getHeaders();
        const request = `${APIConfig.API.endpoints[0].endpoint}movies/reviews`;
        const options = {
            method: "POST",
            headers,
            body: JSON.stringify({ 
                "movieId": payload.movieId, 
                "rating": payload.rating, 
                "content": payload.content, 
                "reviewerName": payload.author, 
                "reviewDate": payload.reviewDate 
            })
        };
        const response = await fetch(request, options);

        
        if (!response.ok) {
            if (response.status === 403) {
                console.log("Error!!!!");
                throw new Error("Unauthorized");
            }
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const json = await response.json();
        console.log(json.results);
        return json;
    } catch (error) {
        console.error("Error occurred:", error);
        throw error; 
    }
};

export const getDynamoToken = async (payload: signin) => {
    try {
        const APIConfig = await APIConfigPromise;
        const response = await fetch(`${APIConfig.API.endpoints[1].endpoint}auth/signin`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username: payload.userName, password: payload.password })
        })

        if (!response.ok) {
            throw new Error(`Failed to fetch token. HTTP error! Status: ${response.status}`);
          }
        const json = await response.json();
        const { token } = json; 
        setToken(token);
        return token;
    }
    catch (error) {
        console.error("Error occurred while fetching token:", error);
        throw error;
      }
};

export const signup = async (payload: signupInterface) => {
    try {
        const APIConfig = await APIConfigPromise;
        const response = await fetch(`${APIConfig.API.endpoints[1].endpoint}auth/signup`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username: payload.userName, password: payload.password , email: payload.email})
        })

        if (!response.ok) {
            throw new Error(`Failed to fetch token. HTTP error! Status: ${response.status}`);
          }
        const json = await response.json();
        const { message } = json; 
        return message;
    }
    catch (error) {
        console.error("Error occurred while fetching token:", error);
        throw error;
      }
};

export const confirmEmail = async (payload: signin) => {
    try {
        const APIConfig = await APIConfigPromise;
        const response = await fetch(`${APIConfig.API.endpoints[1].endpoint}/auth/confirm_signup`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username: payload.userName, code: payload.password})
        })

        if (!response.ok) {
            throw new Error(`Failed to fetch token. HTTP error! Status: ${response.status}`);
          }
        const json = await response.json();
        const { confirmed } = json; 
        return confirmed;
    }
    catch (error) {
        console.error("Error occurred while fetching token:", error);
        throw error;
      }
};
