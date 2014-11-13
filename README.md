Recipe Box | A recipe storage and organization tool
======

######Built with:######

AngularJS
Bootstrap
Gulp
AWS S3 & Node AWS SDK
Firebase
Express server
Learning goals:

- Learn about JavaScript frameworks and the structuring of an Angular app.
- Gain a better understanding of JavaScript.
- Work with images and file storage via S3.
- Work with a NoSQL database.

######App overview:######

A user can:

_Upload personal recipe photos, with corresponding recipe._

- Images are stored to S3 and recipe information is pushed to Firebase.

_Users can tag recipes by type and view recipes by tag._

- Recipes are also stored by category in Firebase so that this information can easily be iterated through via Angular.
Users can click on an image to view the full recipe instructions and directions.

- Images are displayed in a modal with transitions adapted from [this demo](http://popdevelop.com/2014/07/sexy-splash-modal-using-bootstrap-css3-and-angularjs
Users can delete recipes).

Solo project developed in two and a half weeks as a MakerSquare final project.

######In the future, I'd like to:######
- Use Angular directives.
- Add social sharing via Pinterest.
- Try srcset for responsive images.
- Allow recipe updates and a "notes" section.
- Enable following/sharing and emailing of recipes among users.
- Order recipes newest to oldest.