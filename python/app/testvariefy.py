
import spotipy
import numpy as np
import json
from spotipy.oauth2 import SpotifyOAuth


def main():

    # runs spotify login prompt on localhost port 6060
    sp = spotipy.Spotify(auth_manager=SpotifyOAuth(client_id="a1c0d6debc2c49038fb8a43eb5df637a",
                                                   client_secret="76669d3b28f94e8da7662d91cc39cc94",
                                                   redirect_uri="http://localhost:6060",
                                                   scope="user-library-read user-top-read"))

    results = sp.current_user_saved_tracks()
    # print('saved tracks')
    # for idx, item in enumerate(results['items']):
    #     track = item['track']
    #     print(idx, track['artists'][0]['name'], " – ", track['name'])

    ranges = ['short_term', 'medium_term']
    med_range = ['medium_term']

    # for sp_range in med_range:
    #     print("range:", sp_range)
    #     results = sp.current_user_top_tracks(time_range=sp_range, limit=50)
    #     print(json.dumps(results, indent=4))
    #     for i, item in enumerate(results['items']):
    #         print(i, item['name'], 'by', item['artists'][0]['name'])
    #     print()

    user_top_50_track_response = sp.current_user_top_tracks(
        time_range=med_range[0], limit=50)

    # print(json.dumps(user_top_50_track_response, indent=4))

    # map id to attribute dict
    track_attribute_dict = {}
    track_name_to_id_dict = {}
    for i, item in enumerate(user_top_50_track_response['items']):

        # print(item['name'])
        # print(item['id'])
        # print(item['track']['name'])
        # print(item['added_at'])
        # initialize new dict for track
        track_attribute_dict[item['id']] = {}
        name_str = item['name'] + ' by ' + item['artists'][0]['name']
        track_name_to_id_dict[name_str] = item['id']
        track_attribute_dict[item['id']] = str(sp.audio_features(item['id']))
        # json.dumps(
        #     sp.audio_features, indent=4)

    # print(track_name_to_id_dict, len(track_name_to_id_dict))

    for k, v in enumerate(track_name_to_id_dict):
        print('Attributes for Song #' + str((k+1)), v)
        id = track_name_to_id_dict[v]
        print(str(track_attribute_dict[id]))

    # print(track_attribute_dict[track_name_to_id_dict['Forever by Drake']])


if __name__ == "__main__":
    main()
