import { useEffect, useState } from "react";
import DiscoverBlock from "./DiscoverBlock/components/DiscoverBlock";
import "../styles/_discover.scss";
import { SpotifyAPI } from "../../../api";
import cookies from "../../../modules/cookies";
import { decrypt, encrypt } from "../../../modules/encrypt";

const Discover = () => {
  const [newReleases, setNewReleases] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [categories, setCategories] = useState([]);
  const [accessToken, setAccessToken] = useState(null);

  const fetchToken = async () => {
    try {
      if (decrypt(cookies.getItem("token")) === undefined) {
        const response = await SpotifyAPI.fetchToken();
        if (response.status === 200) {
          console.log("RESPONSE", response.data.access_token);
          let token = encrypt(response.data.access_token);
          cookies.setItem("token", token);
          setAccessToken(token);
        }
      } else {
        let token = decrypt(cookies.getItem("token"));
        setAccessToken(token);
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  const getContentList = async (type) => {
    try {
      switch (type) {
        case "releases":
          const responseRelease = await SpotifyAPI.getList({
            path: "/new-releases",
            token: accessToken,
          });
          if (responseRelease.status === 200) {
            setNewReleases(responseRelease.data.albums.items);
          } else {
            console.log("Error", responseRelease.error.message);
          }
          break;
        case "playlists":
          const responsePlaylists = await SpotifyAPI.getList({
            path: "/featured-playlists",
            token: accessToken,
          });
          if (responsePlaylists.status === 200) {
            setPlaylists(responsePlaylists.data.playlists.items);
          } else {
            console.log("Error", responsePlaylists.error.message);
          }
          break;
        case "categories":
          const responseCategories = await SpotifyAPI.getList({
            path: "/categories",
            token: accessToken,
          });
          if (responseCategories.status === 200) {
            setCategories(responseCategories.data.categories.items);
          } else {
            console.log("Error", responseCategories.error.message);
          }
          break;
        default:
          return;
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  useEffect(() => {
    fetchToken();
    if (accessToken !== null) {
      getContentList("releases");
      getContentList("playlists");
      getContentList("categories");
    }
  }, [accessToken]);

  return (
    <div className="discover">
      <DiscoverBlock
        text="RELEASED THIS WEEK"
        id="released"
        data={newReleases}
      />
      <DiscoverBlock text="FEATURED PLAYLISTS" id="featured" data={playlists} />
      <DiscoverBlock
        text="BROWSE"
        id="browse"
        data={categories}
        imagesKey="icons"
      />
    </div>
  );
};

export default Discover;
