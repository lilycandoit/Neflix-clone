// this file is to set function for each path

import { fetchFromTMDB } from '../services/tmdb.service.js';


// This is a higher-order function that accepts type as an argument and returns an async function (the actual request handler), can be called GENERIC function
export const getTrending = (type) => async (req, res) => {
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/trending/${type}/day?language=en-US`
    );

    const randomItem =
      data.results[Math.floor(Math.random() * data.results.length)];

    res.status(200).json({ success: true, content: randomItem });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: 'Internal fetching movies' });
  }
}

export const getTrailers = (type) => async (req, res) => {
  const { id } = req.params; // to extract 'id' from route parameters (the id in URL path)

  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/${type}/${id}/videos?language=en-US`
    );

    res.status(200).json({ success: true, trailers: data.results });
  } catch (error) {
    console.error(error);
    if (error.message.includes('404')) {
      return res.status(404).send(null);
    }

    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}

// can use regular function too, but this time let try with arrow functio
export const getDetails = (type) => async (req, res) => {
  const { id } = req.params;

  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/${type}/${id}?language=en-US`
    );

    res.status(200).json({
      success: true,
      content: data,
    });
  } catch (error) {
    console.log(error);
    if (error.message.includes('404')) {
      return res.status(404).send(null);
    }

    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

export const getSimilar = (type) => async (req, res) => {
  const { id } = req.params;

  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/${type}/${id}/similar?language=en-US&page=1`
    );

    res.json({
      success: true,
      content: data.results,
    });
  } catch (error) {
    console.log(error);

    if (error.message.includes('404')) {
      return res.status(404).send(null);
    }
    // else statement
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

export const getCategory = (type) => async (req, res) => {
  const { category } = req.params;

  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/${type}/${category}?language=en-US&page=1`
    );

    res.status(200).json({
      success: true,
      content: data.results,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal Sever Error' });
  }
};
