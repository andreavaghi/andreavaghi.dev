import Fetch from '@11ty/eleventy-fetch';

/**
 * Grabs the remote data for studio images and returns back
 * an array of objects
 *
 * @returns {Array} Empty or array of objects
 */
export default async () => {
  try {
    // Grabs either the fresh remote data or cached data (will always be fresh live)
    const records = await getRecords();

    return records;

  } catch (ex) {
    console.log(ex);

    // If failed, return back an empty array
    return [];
  }
};

async function getRecords(page = 1, itemsPerPage = 50) {
  const url = `https://api.discogs.com/users/andrea.vaghi/collection/folders/0/releases?page=${page}&per_page=${itemsPerPage}`

  const response = await Fetch(
    url,
    {
      duration: '1d',
      type: 'json',
      fetchOptions: {
        headers: {
          'User-Agent': 'AndreaVaghiDiscogsClient/1.0 +https://andreavaghi.dev',
          'Accept': 'application/json',
        }
      }
    }
  );

  await sleep(process.env.DISCOGS_API_SLEEP || 500);

  if (parseInt(response.pagination.items / response.pagination.per_page) >= page) {
    return response.releases.concat(await getRecords(page + 1));
  } else {
    return response.releases;
  }
}

function sleep(milliseconds) {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

