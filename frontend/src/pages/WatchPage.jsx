import { useEffect, useState, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useContentStore } from '../store/content';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ReactPlayer from 'react-player';
import { ORIGINAL_IMG_BASE_URL, SMALL_IMG_BASE_URL } from '../utils/contants';
import { formatReleaseDate } from '../utils/dateFunction';

const WatchPage = () => {
  const { id } = useParams();
  const [trailers, setTrailers] = useState([]);
  const [currentTrailerIdx, setCurrentTrailerIdx] = useState(0); //the 1st trailer index would start from 0
  const [loading, setLoading] = useState(true); // as we want to load it immediately
  const [detailsContent, setDetailsContent] = useState({}); // or null
  const [similarContent, setSimilarContent] = useState([]);
  const { contentType } = useContentStore();

  const sliderRef = useRef(null);

  // TO GET TRAILERS
  useEffect(() => {
    const getTrailers = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/api/v1/${contentType}/${id}/trailers`);

        setTrailers(res.data.trailers);
      } catch (error) {
        console.error('Error fetching trailers:', error);
        setTrailers([]);
      } finally {
        setLoading(false);
      }
    };

    getTrailers(); // remember to call the function
  }, [contentType, id]);

  // TO GET SIMILAR CONTENT
  useEffect(() => {
    const getSimilarContent = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/api/v1/${contentType}/${id}/similar`);

        setSimilarContent(res.data.content);
      } catch (error) {
        console.error('Error fetching similar content:', error);
        setSimilarContent([]);
      } finally {
        setLoading(false);
      }
    };

    getSimilarContent();
  }, [contentType, id]);

  // GET DETAILS FOR MOVIES/ TV SHOWS
  useEffect(() => {
    const getContentDetails = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/api/v1/${contentType}/${id}/details`);

        setDetailsContent(res.data.content);
      } catch (error) {
        console.error('Error fetching details content:', error);
        setDetailsContent([]);
      } finally {
        setLoading(false);
      }
    };

    getContentDetails();
  }, [contentType, id]);

  const handleNext = () => {
    if (currentTrailerIdx < trailers.length - 1)
      setCurrentTrailerIdx(currentTrailerIdx + 1);
  };

  const handlePrev = () => {
    if (currentTrailerIdx > 0) setCurrentTrailerIdx(currentTrailerIdx - 1);
  };

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: -sliderRef.current.offsetWidth,
        behavior: 'smooth',
      });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: sliderRef.current.offsetWidth,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="bg-black min-h-screen text-white">
      <div className="mx-auto container px-4 py-8h h-full">
        <Navbar />

        {/* set up arrows button and make it functional */}
        {trailers.length > 0 && (
          <div className="flex justify-between items-center mb-4">
            <button
              className={`bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded ${
                currentTrailerIdx === 0 ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={currentTrailerIdx === 0}
              onClick={handlePrev}
            >
              <ChevronLeft size={24} />
            </button>

            <button
              className={`bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded ${
                currentTrailerIdx === trailers.length - 1
                  ? 'opacity-50 cursor-not-allowed'
                  : ''
              }`}
              disabled={currentTrailerIdx === trailers.length - 1}
              onClick={handleNext}
            >
              <ChevronRight size={24} />
            </button>
          </div>
        )}

        {/* set up video */}
        <div className="aspect-video mb-8 p-2 sm:px-10 md:px-32">
          {trailers.length > 0 && (
            <ReactPlayer
              controls={true}
              width={'100%'}
              height={'70vh'}
              className="mx-auto overflow-hidden rounded-lg"
              url={`https://www.youtube.com/watch?v=${trailers[currentTrailerIdx].key}`}
            />
          )}

          {trailers.length === 0 && (
            <h2 className="text-xl text-center mt-5">
              No trailers available for{' '}
              <span className="font-bold text-red-600">
                {detailsContent?.title || detailsContent?.name}
              </span>{' '}
              😥
            </h2>
          )}
        </div>

        {/* movie details */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-20 max-w-6xl mx-auto">
          <div className="mb-4 md:mb-0">
            <h2 className="text-5xl font-bold text-balance">
              {detailsContent?.title || detailsContent?.name}
            </h2>

            <p className="mt-2 text-lg">
              {formatReleaseDate(
                detailsContent?.release_date || detailsContent?.first_air_date
              )}{' '}
              |{' '}
              {detailsContent?.adult ? (
                <span className="text-red-600"> + 18 </span>
              ) : (
                <span className="text-green-600"> PG-13</span>
              )}{' '}
            </p>
            <p className="mt-4 text-lg">{detailsContent?.overview}</p>
          </div>
          <img
            src={ORIGINAL_IMG_BASE_URL + detailsContent.poster_path}
            alt="Poster image"
            className="max-h-[600px] rounded-md"
          />
        </div>

        {similarContent.length > 0 && (
          <div className="mt-12 max-w-5xl mx-auto relative">
            <h3 className="text-3xl font-bold mb-4">
              Similar Movies/ Tv Shows
            </h3>

            <div
              className="flex overflow-x-scroll gap-4 pb-4 group"
              ref={sliderRef}
            >
              {similarContent.map((item) => (
                <Link
                  key={item.id}
                  to={`/watch/${item.id}`}
                  className="w-52 flex-none"
                >
                  <img
                    src={SMALL_IMG_BASE_URL + item.poster_path}
                    alt="Poster Path"
                    className="w-full h-auto rounded-md"
                  />
                  <h4 className="mt-2 text-lg font-semibold">
                    {item.title || item.name}
                  </h4>
                </Link>
              ))}

              <ChevronRight
                className="absolute top-1/2 -translate-y-1/2 right-2 w-8 h-8
                opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer
                bg-red-600 text-white rounded-full"
                onClick={scrollRight}
              />

              <ChevronLeft
                className="absolute top-1/2 -translate-y-1/2 left-2 w-8 h-8 opacity-0
								group-hover:opacity-100 transition-all duration-300 cursor-pointer bg-red-600
								text-white rounded-full"
                onClick={scrollLeft}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WatchPage;
