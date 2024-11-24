import { useRef, useState } from "react";

const Hero = () => {
  // useState hooks to track video-related states
  const [currentIndex, setCurrentIndex] = useState(1); // Tracks the current video index
  const [hasClicked, setHasClicked] = useState(false); // Tracks whether the mini player was clicked
  const [isLoading, setIsLoading] = useState(true); // Tracks whether the video is still loading
  const [loadedVideos, setLoadedVideos] = useState(0); // Tracks how many videos have loaded

  const totalVideos = 4; // Total number of videos available for the player

  // useRef hook to target specific DOM elements (in this case, the next video player)
  const nextVideoRef = useRef(null); // Reference for the next video

  // Handle mini video player click: switches to the next video
  const handleMiniVideoClick = () => {
    setHasClicked(true); // Marks the mini player as clicked
    setCurrentIndex((prevIndex) => prevIndex + 1); // Increment the index to show the next video
  };

  // Increment the number of videos that have finished loading
  const handleVideoLoad = () => {
    setLoadedVideos((prev) => prev + 1); // Updates the loaded videos count
  };

  // Function to get the video source for the Mini Video Player
  const getVideoSrc = (index) => `videos/hero-${index}.mp4`; // Returns the video source URL based on the index

  return (
    <div className="relative h-dvh w-screen overflow-x-hidden">
      {/* 
        Hero section container:
        - relative: Positions the child elements relative to this container.
        - h-dvh: Height is responsive to the viewport, ensuring the content fits.
        - w-screen: Ensures the container spans the full width of the viewport.
        - overflow-x-hidden: Prevents horizontal scroll.
      */}
      <div
        id="video-frame"
        className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75"
      >
        {/* 
          Video frame container:
          - z-10: Ensures it is layered above other elements.
          - h-dvh: Height is dynamic and adjusts to the viewport height.
          - w-screen: Matches the width of the screen.
          - overflow-hidden: Prevents content overflow.
          - rounded-lg: Adds rounded corners to the video frame.
          - bg-blue-75: Adds a background color (light blue).
        */}
        <div>
          <div className="mask-clip-path absolute-center z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
            {/* 
              Mini video player button:
              - mask-clip-path: Custom clipping style (defined in CSS).
              - absolute-center: Centers the button within the container.
              - z-50: Makes sure this button is on top of everything else.
              - size-64: Sets the button to a fixed size (64 units).
              - cursor-pointer: Indicates the element is clickable.
              - overflow-hidden: Hides any overflowing content within the button.
              - rounded-lg: Gives rounded corners to the button.
            */}
            <div 
              onClick={handleMiniVideoClick} 
              className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100"
            >
              {/* 
                Video element in the mini player:
                - src: Sets the video source using the getVideoSrc function.
                - ref: Next video reference to control switching.
                - loop: Ensures the video loops continuously.
                - muted: Mutes the video by default.
                - id: Assigns an ID for easy targeting.
                - onLoadedData: Calls handleVideoLoad when the video is loaded.
              */}
              <video 
                src={getVideoSrc(currentIndex + 1)} // Get the video source based on the current index (the next video in the sequence)
                ref={nextVideoRef} 
                loop
                muted 
                id="current-video"
                className="size-64 origin-center scale-150 object-cover object-center"
                onLoadedData={handleVideoLoad} // Calls when video has finished loading
              />
            </div>
          </div>
        </div>
      </div>

      {/* Placeholder text for the Hero section */}
      Hero
    </div>
  );
};

export default Hero;
