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
    const setlists = await getSetlists();

    return setlists;

  } catch (ex) {
    console.log(ex);

    // If failed, return back an empty array
    return [];
  }
};

async function getSetlists(page = 1) {
  const url = `https://api.setlist.fm/rest/1.0/user/urbando/attended?p=${page}`

  const response = await Cache(
    url,
    {
      duration: '1d',
      type: 'json',
      fetchOptions: {
        headers: {
          'x-api-key': process.env.SETLIST_FM_API_KEY,
          'Accept': 'application/json',
        }
      }
    }
  );

  sleep(2000);

  if (parseInt(response.total / response.itemsPerPage) >= page) {
    return response.setlist.concat(await getSetlists(page + 1));
  } else {
    return response.setlist;
  }
}

function sleep(milliseconds) {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

