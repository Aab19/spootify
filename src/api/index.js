import axios from "axios";

const URL_TOKEN = "https://accounts.spotify.com/api/token";
const URL_API = "https://api.spotify.com/v1/browse";

const SpotifyAPI = {
  fetchToken: () =>
    axios.post(
      URL_TOKEN,
      `grant_type=client_credentials&client_id=${
        import.meta.env.VITE_REACT_APP_SPOTIFY_CLIENT_ID
      }&client_secret=${import.meta.env.VITE_REACT_APP_SPOTIFY_CLIENT_SECRET}`,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    ),
  getList: (payload) =>
    axios.get(`${URL_API}${payload.path}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${payload.token}`,
      },
    }),
};

export { SpotifyAPI };
