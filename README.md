# Step by Step implementation of WASM (RUST and REACT)

## create the react app 
    
    1. npx create-react-app react-wasm-tutorial
    2. cd react-wasm-tutorial
    3. npm start

## Create Rust library with cargo.

    1. cargo new wasm-lib --lib

## Implement a Rust function that you want to call from JavaScript.

//Copy and paste the below code into wasm-lib/lib.js

// lib.rs

fn add(a: i32, b: i32) -> i32 {
    a + b
}

#[test]
fn add_test() {
    assert_eq!(1 + 1, add(1, 1));
}

## How to test the RUST code

    1. cd wasm-lib
    2. cargo test


## To add wasm-bindgen dependency, you need to add it to Cargo.toml.

    [package]
    name = "wasm-lib"
    version = "0.1.0"
    edition = "2021"

    [lib]
    crate-type = ["cdylib"]

    [dependencies]
    wasm-bindgen = "0.2.78"


Then, Let's wrap the function with wasm-bindgen. Notice that only public function can be exported.

use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn add(a: i32, b: i32) -> i32 {
    a + b
}

#[test]
fn add_test() {
    assert_eq!(1 + 1, add(1, 1));
}

## If WASM is not installed locally run the below command

1. cargo install wasm-pack

2. wasm-pack --version 

## Add the below line to package.json

"build:wasm": "cd wasm-lib && wasm-pack build --target web --out-dir pkg",

## Now create a WASM build with the below command

npm run build:wasm

## Once done with all above steps run the below command 

1. npm install ./wasm-lib/pkg

2. Check the dependencies in package.json you should see "wasm-lib": "file:wasm-lib/pkg", added under dependencies list.

## Call the Wasm function from the React app.

The code which starts with "+" add to your code

import and call
import React, { useEffect, useState } from 'react';
+import init, { add } from "wasm-lib";
import logo from './logo.svg';
import './App.css';

function App() {
+  const [ans, setAns] = useState(0);
+  useEffect(() => {
+    init().then(() => {
+      setAns(add(1, 1));
+    })
+  }, [])
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
+        <p>1 + 1 = {ans}</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

You should be seeing the 1 + 1 = 2 on your browser





