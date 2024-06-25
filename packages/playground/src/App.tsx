import type { Component } from "solid-js";
import { Uranus } from "@uranusjs/core";

const App: Component = () => {
    const app = new Uranus();
    app.run();
    return <div>123</div>;
};

export default App;
