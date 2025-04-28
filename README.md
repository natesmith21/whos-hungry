<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a id="readme-top"></a>

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

[![Stargazers][stars-shield]][stars-url]
[![LinkedIn][linkedin-shield]][linkedin-url]



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/natesmith21/whos-hungry">
    <!-- <img src="images/logo.png" alt="Logo" width="80" height="80"> -->
  </a>

<h3 align="center">Who's Hungry?</h3>

  <p align="center">
    A Small app to find and save recipes to make at home. Stay tuned for future enhancements.
    <br />
    <a href="https://github.com/natesmith21/whos-hungry"><strong>Explore the docs »</strong></a>
    <br />
    <br />
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Name Screen Shot][product-screenshot]](https://example.com)

This project was started as my final Capstone project in a Full-Stack Software Developent Certification I worked on through Springboard. 

Currently the App has several simple features: 

* View Recipes from the Spoonacular API
* Create a User Account to save recipes 
* Browse Recipes by cuisine-type 

I would love to continue to work on this project in my spare time. You will see in my DB schema files, that I have already created fields in DB to enact some further features to allow users to rate and track if they have made recipies. Other future features I'd like to build include: 

* Connect users as 'friends' 
* Allow user uploads 
* more robust browse/filter/sort features
* Comments on recipes
* I am curious if I could use regex to help me work with the information coming from API and improve some UI 


<!-- Here's a blank template to get started. To avoid retyping too much info, do a search and replace with your text editor for the following: `github_username`, `repo_name`, `twitter_handle`, `linkedin_username`, `email_client`, `email`, `project_title`, `project_description`, `project_license` -->

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

* [Node.js][Nodejs-url]
* [Express.js][Express-url]
* [React.js][React-url]
* [Bootstrap.com][Bootstrap-url]
* [Spoonacular.com][Spoonacular-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Instructions

1. Clone the Repository: 
   1. follow the instructions to cloneing a repository [here](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository)


2. Set-up backend
   1. enter the folder: `cd backend`
   2. intall the dependencies: `npm -i`
   3. set up .env 
      1. To set up your project, you will need to visit [Spoonacular][Spoonacular-url] and follw the signup instructions to get your API key 
        ```
          NODE_ENV=test
          SECRET_KEY=[your_secret_key]

          BASE_URL='https://api.spoonacular.com'
          API_KEY=[your_api_key] 
        ```
   4. start the server: npm run dev


3. Seed the database
   1. use can use the included whos_hungry.sql file `psql -i whos_hungry.sql`


4. Tests included in backend can be run with: `npm test`


5. Set-up frontend
   1. enter the folder: `cd ../frontend`
   2. install the dependencies: `npm -i`
   3. start the front end: `npm run dev`


6. visit the page at http://localhost:5173

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Nate Smith - nate.smith21.work@gmail.com

Project Link: [https://github.com/natesmith21/whos-hungry](https://github.com/natesmith21/whos-hungry)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[forks-shield]: https://img.shields.io/github/forks/natesmith21[/whos-hungry.svg?style=for-the-badge
[forks-url]: https://github.com/natesmith21/whos-hungry/network/members
[stars-shield]: https://img.shields.io/github/stars/natesmith21[/whos-hungry.svg?style=for-the-badge
[stars-url]: https://github.com/natesmith21/whos-hungry/stargazers
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/nathan-smith-08a805a4
[product-screenshot]: images/whos-hungry-home.png
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[Express-url]: https://expressjs.com
[Spoonacular-url]: https://spoonacular.com/
[Nodejs-url]: https://nodejs.org/en