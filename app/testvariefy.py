
import spotipy
from spotipy.oauth2 import SpotifyOAuth


def main():
    print('Hello World')

    sp = spotipy.Spotify(auth_manager=SpotifyOAuth(client_id="a1c0d6debc2c49038fb8a43eb5df637a",
                                                   client_secret="76669d3b28f94e8da7662d91cc39cc94",
                                                   redirect_uri="http://localhost:6060",
                                                   scope="user-library-read"))

    results = sp.current_user_saved_tracks()
    for idx, item in enumerate(results['items']):
        track = item['track']
        print(idx, track['artists'][0]['name'], " – ", track['name'])


if __name__ == "__main__":
    main()
