
const scikitjs = require('scikitjs');
const tf = require('@tensorflow/tfjs');
const { mod } = require('@tensorflow/tfjs');
scikitjs.setBackend(tf);






/*
    Outputs k-means clusters given input k for amount of cluster groups
    and data, a 2D array / array of vectors to cluster

*/

let X = [
    [1, 2],
    [1, 4],
    [4, 4],
    [4, 0],
    [2, 2],
  ]

function computeKMeansClusters(k, data)
{
    const kmean = new scikitjs.KMeans({ nClusters: k })
    kmean.fit(data)

    return kmean.clusterCenters;
}



 function printKMeansCentroids(k, X)
 {
    // const clusterTensor = computeKMeansClusters(k, X);

    const kmean = new scikitjs.KMeans({ nClusters: k })
    kmean.fit(X)

    const clusterTensor = kmean.clusterCenters;
    const labelTensor = kmean.predict(X);


    

    // Returns the multi dimensional array of values.
    clusterTensor.array().then(array => console.log(array));
    // Returns the flattened data that backs the tensor.
    clusterTensor.data().then(data => console.log(data));
    console.log("LABELS")
    labelTensor.data().then(data => console.log)(data);
 }

// printKMeansCentroids(2, X);

 module.exports.printKMeansCentroids = function(k, X)
 {

    const kmean = new scikitjs.KMeans({ nClusters: k })
    kmean.fit(X)

    const clusterTensor = kmean.clusterCenters;
    const labelTensor = kmean.predict(X);


    // const clusterTensor = computeKMeansClusters(k, X);

    // Returns the multi dimensional array of values.
    clusterTensor.array().then(array => console.log(array));
    // Returns the flattened data that backs the tensor.
    clusterTensor.data().then(data => console.log(data));
    // console.log("LABELS")
    labelTensor.data().then(data => {console.log("LABELS"); console.log(data);});
    
 }

module.exports.songsToClusters = async function(songIdToName, songIdList, matrix, k)
{
    const kmean = new scikitjs.KMeans({ nClusters: k })
    kmean.fit(matrix);

    const clusterTensor = kmean.clusterCenters;
    const labelTensor = kmean.predict(matrix);

    const clusterArray = await clusterTensor.array();
    const labelArray = await labelTensor.array();
    let songIdToClusterLabelMap = {}
    // console.log(songIdToName);
    // console.log(songIdList);
    // console.log(labelArray);

    for(let i = 0; i < songIdList.length; i++)
        {
            var id = songIdList[i];
            songIdToClusterLabelMap[id] = labelArray[i];
            console.log(songIdToName[id], songIdToClusterLabelMap[id]);
        }

        return songIdToClusterLabelMap;

    // return dict with songId to Cluster Label mapping

}

