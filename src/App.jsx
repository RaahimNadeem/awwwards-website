import Hero from "./components/Hero";

const App = () => {
  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden">
      {/* 
        min-h-screen: 
          - Sets the minimum height of the <main> element to 100% of the viewport height.
          - Ensures the element covers the full screen even if the content is less.

        w-screen: 
          - Sets the width of the <main> element to exactly match the width of the viewport.

        overflow-x-hidden: 
          - Prevents horizontal scrolling if child elements extend beyond the viewport width.
      */}
      <Hero />
    </main>
  );
};

export default App;
