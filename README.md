#A ccessible Horse Tornado

[See a demo](http://pdincubus.github.io/Accessible-Horse-Tornado/)

## TODO

* Full cross-browser testing (Latest versions of Firefox, Edge, IE11, Safari 9, mobile Safari 9, Android latest. So far tested in Chrome only).
* Check with OSX and iOS VoiceOver, NVDA, anything other screen reader I can get my hands on
* Make a vanilla Javascript version remove jQuery dependency?

## Issues

If you spot any accessibility/functionality issues, or have any awesome suggestios, please raise a [GitHub issue](https://github.com/pdincubus/Accessible-Horse-Tornado/issues) for this project.

## Prerequisites to build the thing

* Gulp
* NPM
* Node

## Actually build the thing

* Clone repo: `git clone https://github.com/pdincubus/Accessible-Horse-Tornado.git`
* `cd Accessible-Horse-Tornado`
* `npm i` to install dependencies
* Run `gulp` or `gulp --production` to build the assets and scripts
* In another window, run `npm run scripts` for dev mode, or `npm run script:prod` for a production build.
