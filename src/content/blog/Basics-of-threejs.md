---
title: Bascs of threejs
discerption: This blog post is a comprehensive introduction to THREE.js, a popular open-source JavaScript library used for creating 3D animations and visualizations in the web browser. The post provides a step-by-step guide on how to set up a scene, add objects to it, and animate it using THREE.js. The post is written in markdown format and includes lots of code snippets and examples wherever possible to help readers understand the concepts better. By the end of the post, readers will have a good understanding of the basics of THREE.js and how to create simple 3D scenes using it.

author: subrat gupta
draft: false
tags: ["3D", "threejs"]
date: 2023-05-03
---

THREE.js is a popular open-source JavaScript library used for creating 3D animations and visualizations in the web browser. It is built on top of WebGL, a low-level graphics API, and provides a high-level API for developers to create complex 3D scenes with ease. In this post, we will explore the basics of THREE.js and how to create simple 3D scenes using it.

# Setting up THREE.js

To get started with THREE.js, we first need to include it in our HTML file. We can do this by adding the following script tag:

```html
<script src="https://cdn.jsdelivr.net/npm/three@0.135.0/build/three.min.js"></script>
```

Once we have included THREE.js in our HTML file, we can start using it in our JavaScript code. The first thing we need to do is create a scene, a camera, and a renderer. We can do this as follows:

```javascript
// Create a scene
const scene = new THREE.Scene();

// Create a camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

// Create a renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
```

Here, we create a new scene, a camera with a field of view of 75 degrees, a renderer that uses WebGL, and append the renderer's canvas to the body of the HTML document.

# Adding objects to the scene

Once we have set up the scene, camera, and renderer, we can start adding objects to the scene. There are several types of objects that we can add to a THREE.js scene, including geometries, materials, and meshes. A geometry defines the shape and size of an object, a material defines its appearance, and a mesh combines the geometry and material into a visible object.

Let's create a simple cube and add it to the scene:

```javascript
// Create a cube geometry
const geometry = new THREE.BoxGeometry();

// Create a material
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

// Create a mesh
const cube = new THREE.Mesh(geometry, material);

// Add the cube to the scene
scene.add(cube);
```

Here, we create a cube geometry, a green material, and a mesh that combines them. We then add the mesh to the scene.

# Animating the scene

To make our scene more interesting, we can animate it. THREE.js provides a built-in animation loop that we can use to update the scene every frame. We can use this loop to change the position, rotation, or scale of objects in the scene.

Let's make the cube rotate around its Y-axis:

```javascript
function animate() {
  requestAnimationFrame(animate);

  cube.rotation.y += 0.01;

  renderer.render(scene, camera);
}
animate();
```

Here, we define an `animate` function that updates the rotation of the cube and renders the scene. We then call `requestAnimationFrame` to request the next animation frame and start the animation loop.

# Conclusion

In this post, we have explored the basics of THREE.js and how to create simple 3D scenes using it. We have seen how to set up a scene, add objects to it, and animate it. THREE.js provides a powerful and easy-to-use API for creating 3D graphics in the web browser. With some creativity and imagination, the possibilities are endless!
