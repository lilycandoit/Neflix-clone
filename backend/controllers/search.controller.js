import { User } from '../models/user.model.js';
import { fetchFromTMDB } from '../services/tmdb.service.js';

export const searchPerson = async (req, res) => {
  const { query } = req.params;

  try {
    const response = await fetchFromTMDB(
      `https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`
    );

    if (response.results.length === 0) {
      return res.status(404).send(null);
    }

    await User.findByIdAndUpdate(req.user._id, {
      $push: {
        searchHistory: {
          id: response.results[0].id,
          image: response.results[0].profile_path,
          title: response.results[0].name,
          searchType: 'person',
          createAt: new Date(),
        },
      },
    });

    res.status(200).json({
      success: true,
      content: response.results,
    });
  } catch (error) {
    console.log('Error is searchPerson controller: ', error.message);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};
export const searchMovie = async (req, res) => {
  const { query } = req.params;

  try {
    const response = await fetchFromTMDB(
      `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`
    );

    if (response.results.length === 0) {
      return res.status(404).send(null);
    }

    await User.findByIdAndUpdate(req.user._id, {
      $push: {
        searchHistory: {
          id: response.results[0].id,
          image: response.results[0].poster_path,
          title: response.results[0].name,
          searchType: 'movie',
          createAt: new Date(),
        },
      },
    });

    res.status(200).json({
      success: true,
      content: response.results,
    });
  } catch (error) {
    console.log('Error is searchPerson controller: ', error.message);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

export const searchTv = async (req, res) => {
  const { query } = req.params;

  try {
    const response = await fetchFromTMDB(
      `https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`
    );

    if (response.results.length === 0) {
      return res.status(404).send(null);
    }

    await User.findByIdAndUpdate(req.user._id, {
      $push: {
        searchHistory: {
          id: response.results[0].id,
          image: response.results[0].poster_path,
          title: response.results[0].name,
          searchType: 'tv',
          createAt: new Date(),
        },
      },
    });

    res.status(200).json({
      success: true,
      content: response.results,
    });
  } catch (error) {
    console.log('Error is searchPerson controller: ', error.message);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

export const getSearchHistory = async (req, res) => {
  try {
    res.status(200).json({ success: true, content: req.user.searchHistory });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

export const removeItemFromSearchHistory = async (req, res) => {
  let { id } = req.params; // here id is string, need to convert to Integer

  id = parseInt(id);

  try {
    await User.findByIdAndUpdate(req.user._id, {
      $pull: {
        searchHistory: { id: id },
      },
    });

    res
      .status(200)
      .json({ success: true, message: 'Item removed from search history' });
  } catch (error) {
    console.log('Error in removedItemFromSearchHistory: ', error.message);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};
