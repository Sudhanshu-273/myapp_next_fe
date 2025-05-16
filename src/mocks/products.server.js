import axios from 'axios';

export async function fetchProductData(count = 24) {
  const accessKey = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY || 'YOUR_ACCESS_KEY';

  try {
    const response = await axios.get('https://api.unsplash.com/search/photos', {
      params: {
        query: 'gym equipment',
        per_page: count,
        orientation: 'squarish',
      },
      headers: {
        Authorization: `Client-ID ${accessKey}`,
      },
    });
    console.log(response.data.results);
    const data = response.data.results.map((item) => ({
      name: item.alt_description || 'Gym Equipment',
      image: item.urls.small,
    }));

    return data;
  } catch (error) {
    console.error('Error fetching images from Unsplash:', error.message);
    return Array.from({ length: count }, () => '/placeholder.jpg');
  }
}
