import { TiLocationArrow } from "react-icons/ti";
import { useEffect, useRef, useState } from "react";
import Button from "./Button";

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(1); // Tracks the current video index
  const [hasClicked, setHasClicked] = useState(false); // Indicates if the mini video player was clicked

  const [loading, setLoading] = useState(true); // Tracks the loading state of videos
  const [loadedVideos, setLoadedVideos] = useState(0); // Counts the loaded videos

  const totalVideos = 4; // Total number of videos
  const nextVdRef = useRef(null); // Ref for the next video element

  // Updates the number of loaded videos
  const handleVideoLoad = () => {
    setLoadedVideos((prev) => prev + 1);
  };

  // Sets loading to false when all videos are loaded
  useEffect(() => {
    if (loadedVideos === totalVideos - 1) {
      setLoading(false);
    }
  }, [loadedVideos]);

  // Handles the click on mini video player, increments to the next video
  const handleMiniVdClick = () => {
    setHasClicked(true);
    setCurrentIndex((prevIndex) => (prevIndex % totalVideos) + 1);
  };

  // Helper function to get the video source URL based on index
  const getVideoSrc = (index) => `videos/hero-${index}.mp4`;

  return (
    <div className="relative h-dvh w-screen overflow-x-hidden">
      {/* Main video frame container */}
      <div
        id="video-frame"
        className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75"
      >
        <div>
          {/* Mini video player */}
          <div className="mask-clip-path absolute-center z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
            <div
              onClick={handleMiniVdClick} // Changes to the next video on click
              className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100"
            >
              <video
                ref={nextVdRef} // Ref to manage the next video element
                src={getVideoSrc((currentIndex % totalVideos) + 1)} // Source for the current video
                loop
                muted
                id="current-video"
                className="size-64 origin-center scale-150 object-cover object-center"
                onLoadedData={handleVideoLoad} // Increment loaded videos when video is ready
              />
            </div>
          </div>

          {/* Invisible next video (for preloading) */}
          <video
            ref={nextVdRef}
            src={getVideoSrc(currentIndex)} // Source for the next video to be played
            loop
            muted
            id="next-video"
            className="absolute-center invisible absolute z-20 size-64 object-cover object-center"
            onLoadedData={handleVideoLoad} // Increment loaded videos when video is ready
          />
          
          {/* Main visible video */}
          <video
            src={getVideoSrc(currentIndex === totalVideos ? 1 : currentIndex)} // Loops back to 1 after the last video
            autoPlay
            loop
            muted
            className="absolute left-0 top-0 size-full object-cover object-center"
            onLoadedData={handleVideoLoad} // Increment loaded videos when video is ready
          />
        </div>

        {/* Branding text */}
        <h1 className="special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75">
          G<b>A</b>MING
        </h1>

        {/* Content section */}
        <div className="absolute left-0 top-0 z-40 size-full">
          <div className="mt-24 px-5 sm:px-10">
            {/* Main heading */}
            <h1 className="special-font hero-heading text-blue-75">
              Redefi<b>n</b>e
            </h1>

            {/* Subheading text */}
            <p className="mb-5 max-w-64 font-robert-regular text-blue-75">
              Enter the Metagame layer <br />
              Unleash the Play Economy
            </p>

            {/* Call to action button */}
            <Button
              id="watch-trailer"
              title="Watch Trailer"
              leftIcon={<TiLocationArrow />}
              containerClass="!bg-yellow-300 flex-center gap-1"
            />
          </div>
        </div>
      </div>

      {/* Branding text (bottom right) */}
      <h1 className="special-font hero-heading absolute bottom-5 right-5 text-black">
        G<b>A</b>MING
      </h1>
    </div>
  );
};

export default Hero;
