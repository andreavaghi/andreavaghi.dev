const Cache = require('@11ty/eleventy-cache-assets');

/**
 * Grabs the remote data for studio images and returns back
 * an array of objects
 *
 * @returns {Array} Empty or array of objects
 */
module.exports = async () => {
  try {
    // Grabs either the fresh remote data or cached data (will always be fresh live)
    const {setlist} = await Cache(
      'https://api.setlist.fm/rest/1.0/user/urbando/attended',
      {
        duration: '10s', // 1 day
        type: 'json',
        fetchOptions: {
          headers: {
            'x-api-key': 'EyO8CPhFkMg8EutaMOGaDEL7FdksEo5apwtV',
            'Accept': 'application/json',
          }
        }
      }
    );

    return setlist;
  } catch (ex) {
    console.log(ex);

    // If failed, return back an empty array
    return [];
  }
};

