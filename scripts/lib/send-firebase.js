function encode(string) {
  return encodeURIComponent(btoa(string));
}

/* Sends the first and second words to firebase */
module.exports = function(first, second) {
  if (Environment.DEBUG) {
    // Do not send anything to firebase on debug mode
    return;
  }

  var url = Config.FIREBASE_URL + '/combinations/';
  url = url + encode(first) + ' ' + encode(second) + '.json';
  // Even though firebase is able to work with websocket, using the REST API is
  // a cheaper alternative - as it will not maintain a persistent connection,
  // therefore using as little concurrent connections as possible.
  $.ajax({
    url,
    type: 'GET',
    success: function(data) {
      // This might lead to some inconsistencies (e.g. a two users entering
      // with the same words at the same time) But as it is not a critical
      // feature of the project, we can sacrifice this little consistency for
      // the sake of simplicity.
      $.ajax({
        url,
        type: 'PUT',
        data: JSON.stringify({
          count: (data && (data.count + 1)) || 1,
        }),
      });
    },
  });
};
