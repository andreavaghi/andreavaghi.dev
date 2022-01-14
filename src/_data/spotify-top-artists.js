const Cache = require('@11ty/eleventy-cache-assets');
const { getSecrets } = require('@netlify/functions');

/**
 * Grabs the remote data for studio images and returns back
 * an array of objects
 *
 * @returns {Array} Empty or array of objects
 */
module.exports = async () => {
  try {
    // Grabs either the fresh remote data or cached data (will always be fresh live)
    const artists = await getArtists();

    return artists;

  } catch (ex) {
    console.log(ex);

    // If failed, return back an empty array
    return [];
  }
};

async function getArtists(itemsPerPage = 10) {
  const secrets = await getSecrets();

  const url = `https://api.spotify.com/v1/me/top/artists?limit=${itemsPerPage}&time_range=long_term`

  const response = await Cache(
    url,
    {
      duration: '1d',
      type: 'json',
      fetchOptions: {
        headers: {
          Authorization: `Bearer ${secrets.spotify.bearerToken}`,
        }
      }
    }
  );
  
  const { items: artists } = response;

  return artists;
}

