import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import * as L from "monocle-ts/Lens";
import { fn } from "./form";
import "./App.css";

export function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log(fn());
  }, []);

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
      </div>
      <h1>Vite Codesandbox Template</h1>

      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR.
        </p>

        <p>
          You're using esbuild in the browser! That means this website is doing
          all the cool things that Vite makes easy (like <b>real</b> HMR, or
          actually interpreting your TypeScript files <i>as TypeScript files</i>{" "}
          (!) right here in your browser (check the Sources tab in devtools).
          <br />
          <br />
          Tip: If you open{" "}
          <a href="https://m3d3ic-5173.preview.csb.app/" target="_blank">
            the preview
          </a>{" "}
          in a new tab and leave it open, any changes you make to this sandbox
          will update via web-socket (in the other tab) on save.
        </p>
        <h3 style={{}}>
          <i>
            🎶 Fork away, you can fork away... Stay all day, if you want to 🎶
          </i>
        </h3>
        <h6>
          This fork maintained poorly but with lots of 🖤 by{" "}
          <a href="https://github.com/ahrjarrett" target="_blank">
            @ahrjarrett
          </a>
        </h6>
      </div>
    </div>
  );
}

export default App;
