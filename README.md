Form Progress
===================

A React component to easily include an upload progress bar when a form is submitted.


How it works
------------
Specify a selector for which forms you want to use. It listens for a form submit, transforms it into a XHR object in 
JavaScript, submits the form, and tracks the upload progress. 
 
 
Requirements
------------
  * A modern browser with XHR2 features. There are no fallbacks besides regular ol' form submission if we can't 
  track upload progress.
  * `node` & `npm` to provider a runtime and install packages. 
  * `babel` to translate from ES2015 syntax to stuff that browsers can understand
  * `webpack` or `browserify` to pack up all your stuff. 

How to use
-----------
An example of setup:   

_setup.js_ 
```
import FormProgress from './form-progress';
import React from 'react';
import ReactDOM from 'react-dom';

let fp = document.getElementById('form-progress');
let ele = ReactDOM.render(<FormProgress formSelector="form.dynamic" contentContainerId="body-container"/>, fp);
ele.beforeSend = (xhr, formData) => {
  xhr.setRequestHeader('HeaderName', 'Header value');
};
```

_index.html_

```
<!html>
<html>
  <head>
    <title>Form Progress Example</title>
    <link rel="stylesheet" type="text/css" herf="progress-modal.css"> <!-- you need to compile the SASS stylesheet first -->
  </head>
  <body>
    <div id="body-container">
      <form method="POST" action="test" enctype="multipart/form-data" class="dynamic">
        <input type="file" name="file_upload">
        <button type="submit">Upload File!</button>
      </form>
    </div>
    <div id="form-progress"></div>
    <script src="./setup.build.js"></script> <!-- you need to build with webpack or another tool before use.
  </body>
</html>
```

The `formSelector` property is a CSS property to search on and attach the submit listeners.  

The `contentContainer` property (optional) is used to select the container to put the response text/HTML in. Since this 
library uses XHR to submit data, we have to manage the response from the server manually. 

Assigning a function `ele.beforeSend` allows you to change the XHR object (e.g., to add headers) and/or change the 
`FormData` object before the request is sent to the server. This enables you to tell your server to only send back a 
 partial response for the content container listed above.
 
Warnings and Caveats
--------------------
This component is a work in progress. Testing slow uploads is harder than most other scenarios so there aren't any 
tests yet. It may not work as designed. It may explode or call your grandmother horrific names. Maybe it will work just
fine and you'll receive accolades for being so awesome at making websites. I have not included a package.json file 
because I don't want this to be widely used yet. I am still learning how to navigate the Node.js and React worlds so 
some things may suck. Submit an issue or a pull request if you want to help me make things suck less.
 
 

