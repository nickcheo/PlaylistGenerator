import enum
import sys
from types import new_class
import spotipy
import numpy as np
from sklearn.cluster import KMeans
import json
from spotipy.oauth2 import SpotifyOAuth
import matplotlib.pyplot as plt


def main():

    if len(sys.argv) > 1 and str(sys.argv[1]).isnumeric():
        N_CLUSTERS = int(sys.argv[1])
        output_kmeans_clusters_list(N_CLUSTERS=N_CLUSTERS)
    else:
        print('run with integer cluster amount as argument')
        print('usage: python kmeans_top_songs.py [amount_of_clusters]')


def output_kmeans_clusters_list(N_CLUSTERS):

    # runs spotify login prompt on localhost port 6060
    sp = spotipy.Spotify(auth_manager=SpotifyOAuth(client_id="a1c0d6debc2c49038fb8a43eb5df637a",
                                                   client_secret="76669d3b28f94e8da7662d91cc39cc94",
                                                   redirect_uri="http://localhost:6060",
                                                   scope="user-library-read user-top-read"))

    user_top_50_track_response = sp.current_user_top_tracks(
        time_range='medium_term', limit=50)

    # map id to attribute dict
    track_attribute_dict = {}
    track_name_to_id_dict = {}
    track_id_to_index = {}
    track_index_to_id = []
    track_id_to_name = {}
    for i, item in enumerate(user_top_50_track_response['items']):

        track_id_to_index[item['id']] = i
        track_index_to_id.append(item['id'])
        track_attribute_dict[item['id']] = {}
        name_str = item['name'] + ' by ' + item['artists'][0]['name']
        track_id_to_name[item['id']] = name_str
        track_name_to_id_dict[name_str] = item['id']
        track_attribute_dict[item['id']] = sp.audio_features(item['id'])

    # for k, v in enumerate(track_name_to_id_dict):
    #     print('Attributes for Song #' + str((k+1)), v)
    #     id = track_name_to_id_dict[v]
    #     print(str(track_attribute_dict[id]))

    # for k, v in enumerate(track_index_to_id):
    #     print(k, track_id_to_name[v])

    attr_to_data_index = {}

    audio_feature_data = []

    # for k, v in enumerate(track_attribute_dict[track_index_to_id[0]][0]):
    #     print(k, v)
    #     attr_to_data_index[v] = k

    for i in range(len(track_attribute_dict)):
        audio_attrs = track_attribute_dict[track_index_to_id[i]][0]
        attr_array = []
        # print(audio_attrs)

        for key in audio_attrs:
            if (isinstance(audio_attrs[key], int) or isinstance(audio_attrs[key], float)) \
                    and key != 'duration_ms' and key != 'time_signature':
                attr_array.append(audio_attrs[key])

        # print(attr_array)
        audio_feature_data.append(attr_array)

    audio_feature_array = np.array(audio_feature_data)
    # print(numpy_audio_feature_array)

    kmeans = KMeans(n_clusters=N_CLUSTERS, random_state=0).fit(
        audio_feature_array)
    # print(kmeans.labels_)

    song_clusters = []
    for i in range(N_CLUSTERS):
        song_clusters.append([])

    for i, label in enumerate(kmeans.labels_):
        x = user_top_50_track_response['items'][i]['name'] + ' by ' + \
            user_top_50_track_response['items'][i]['artists'][0]['name']
        # print(x)
        song_clusters[label].append(x)

    for i, cluster in enumerate(song_clusters):
        print('--- CLUSTER', (i+1), ' ---')
        for song in cluster:
            print(song, ',')
        print()


if __name__ == "__main__":
    main()
