import { useRef, useState } from "react";

const Hero = () => {
  // State hooks to track video-related states
  const [currentIndex, setCurrentIndex] = useState(1); // Tracks the current video index
  const [hasClicked, setHasClicked] = useState(false); // Tracks if the mini player was clicked
  const [isLoading, setIsLoading] = useState(true); // Tracks if the video is still loading
  const [loadedVideos, setLoadedVideos] = useState(0); // Tracks the number of videos loaded

  const totalVideos = 4; // Total number of videos available for the player (adjusted to 4)

  // useRef hook to target specific DOM elements (in this case, the next video player)
  const nextVideoRef = useRef(null); // Reference for the next video

  // Calculate the next video index (loops back to the first video after the last one)
  const upcomingVideoIndex = (currentIndex % totalVideos) + 1;

  // Handle mini video player click: switches to the next video
  const handleMiniVideoClick = () => {
    setHasClicked(true); // Marks the mini player as clicked
    setCurrentIndex(upcomingVideoIndex); // Increment the index to show the next video
  };

  // Increment the number of videos that have finished loading
  const handleVideoLoad = () => {
    setLoadedVideos((prev) => prev + 1); // Updates the loaded videos count
  };

  // Function to get the video source URL based on the index
  const getVideoSrc = (index) => `videos/hero-${index}.mp4`;

  return (
    <div className="relative h-dvh w-screen overflow-x-hidden">
      {/* Hero section container 
        - 'relative': Positions the child elements relative to this container.
        - 'h-dvh': Ensures the height is dynamic based on the viewport height.
        - 'w-screen': Ensures the container spans the full width of the screen.
        - 'overflow-x-hidden': Prevents horizontal scrolling by clipping content that overflows.
      */}
      <div id="video-frame" className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75">
        {/* Video frame container 
          - 'relative': Positions this container for its child elements (like videos and buttons).
          - 'z-10': Ensures this element appears above other elements in the stacking context.
          - 'h-dvh': Makes the height responsive to the viewport's height.
          - 'w-screen': Ensures the container spans the entire width of the screen.
          - 'overflow-hidden': Prevents any overflow content from being visible.
          - 'rounded-lg': Applies rounded corners to the video container.
          - 'bg-blue-75': Gives the container a light blue background color.
        */}
        <div>
          {/* Main video 
            - 'absolute': Positions the video absolutely within its parent container.
            - 'left-0 top-0': Ensures the video starts at the top-left corner of the container.
            - 'size-full': Stretches the video to take up the full size of the container.
            - 'object-cover': Ensures the video covers the entire container without distortion, clipping where necessary.
            - 'object-center': Keeps the video centered within the container, especially for `object-cover` behavior.
            - 'autoPlay': Automatically starts playing the video.
            - 'loop': Makes the video loop continuously.
            - 'muted': Mutes the video by default to prevent sound from starting automatically.
          */}
          <video
            src={getVideoSrc(currentIndex)} // Get the video source based on the current index
            autoPlay
            loop
            muted
            className="absolute left-0 top-0 size-full object-cover object-center"
            onLoadedData={handleVideoLoad} // Calls when the video has finished loading
          />
          {/* Mini video player button */}
          <div className="mask-clip-path absolute-center z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
            {/* 
              - 'absolute-center': Custom utility (likely a CSS class) to center the button both horizontally and vertically.
              - 'z-50': Ensures the mini video player appears above other content, with the highest stacking order.
              - 'size-64': Sets a fixed size for the mini player (64px by 64px).
              - 'cursor-pointer': Indicates the button is clickable (shows a pointer cursor on hover).
              - 'overflow-hidden': Ensures any overflowed content from the button is hidden.
              - 'rounded-lg': Gives the button rounded corners for a modern, clean look.
            */}
            <div
              onClick={handleMiniVideoClick} // Handles the click event to change to the next video
              className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100"
            >
              {/* Mini video 
                - 'size-64': Sets a fixed size for the mini player (64px by 64px).
                - 'origin-center': Defines the scaling origin at the center of the element.
                - 'scale-150': Initially scales the mini player to 150% of its size.
                - 'object-cover': Ensures the mini video fills the container and maintains the aspect ratio.
                - 'object-center': Centers the content within the mini video container.
                - 'onLoadedData': Calls `handleVideoLoad` when the mini video finishes loading.
              */}
              <video
                src={getVideoSrc(upcomingVideoIndex)} // Get the video source based on the upcoming index
                ref={nextVideoRef}
                loop
                muted
                id="current-video"
                className="size-64 origin-center scale-150 object-cover object-center"
                onLoadedData={handleVideoLoad} // Calls when the mini video finishes loading
              />
            </div>
          </div>

          {/* Invisible next video (to load it in advance) */}
          <video
            ref={nextVideoRef}
            src={getVideoSrc(currentIndex === totalVideos ? 1 : currentIndex)} // Load the next video (wrap around to 1 if last)
            loop
            muted
            id="next-video"
            className="absolute-center invisible absolute z-20 size-64 object-cover object-center"
            onLoadedData={handleVideoLoad} // Calls when the next video finishes loading
          />
        </div>
      </div>

      {/* Placeholder text for the Hero section */}
      Hero
    </div>
  );
};

export default Hero;
