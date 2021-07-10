<template>
  <body>

<div class="about-section">
  <h1>About Us</h1>
  <p><b>Our projects:</b>
    <br>
    <br>
    <a href="https://web-development-environments-2021.github.io/Assignment2_205890320_313326985/">
    Assignment 2 - HTML 5
    </a>
    <br>
    <a href="https://github.com/Web-Development-Environments-2021/assignment-3-1-205890320_313326985">
    Assignment 3.1 - Create Api Document
    </a>
    <br>
    <a href="https://github.com/Web-Development-Environments-2021/assignment-3-2-205890320_313326985">
    Assignment 3.2 - Create Server-Side
    </a>
    <br>
    <a href="https://github.com/Web-Development-Environments-2021/assignment-3-3-205890320_313326985">
    Assignment 3.3 - Create Client-Side
    </a>
  </p>
  <br>
  <br>
  <p>
    <b>This project was divided into three stages:</b>
    <br>
    <br>
  <a>
    - Writing an API document for the characterization document
  </a>
  <br>
  <a>
    - Backend implementation of the project 
  </a>
  <br>
    <a>
    (the server was implemented using node.js + express.js and the database was implemented using azure sql and in addition there was use of an external API)
  </a>
  <br>
  <a>
    - Frontend implementation (client side implemented using vue.js)
  </a>
  </p>
</div>

<h2 style="text-align:center">Our Team</h2>
<div class="row">
  <div class="column">
    <div class="card">
      <img src="../assets/liad.jpeg" style="width:50%">
      <div class="container">
        <h2>Liad Nachshon</h2>
        <p>liadnach@post.bgu.ac.il </p>
      </div>
    </div>
  </div>
  
  <div class="column">
    <div class="card">
      <img src="../assets/shahar.jpg" style="width:33.3%">
      <div class="container">
        <h2>Shahar Shcheranski</h2>
        <p>shcheran@post.bgu.ac.il </p>
      </div>
    </div>
  </div>
</div>

</body>
</template>

<script>
export default {

}
</script>

<style>
body {
  font-family: Arial, Helvetica, sans-serif;
  margin: 0;
}

html {
  box-sizing: border-box;
}

*, *:before, *:after {
  box-sizing: inherit;
}

.column {
  float: left;
  width: 50%;
  margin-bottom: 16px;
  padding: 0 8px;
}

.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  margin: 8px;
}

.about-section {
  padding: 50px;
  text-align: center;
  background-color: #474e5d;
  color: white;
}

.container {
  padding: 0 16px;
}

.container::after, .row::after {
  content: "";
  clear: both;
  display: table;
}

.title {
  color: grey;
}

.button {
  border: none;
  outline: 0;
  display: inline-block;
  padding: 8px;
  color: white;
  background-color: #000;
  text-align: center;
  cursor: pointer;
  width: 100%;
}

.button:hover {
  background-color: #555;
}

@media screen and (max-width: 650px) {
  .column {
    width: 100%;
    display: block;
  }
}

</style>