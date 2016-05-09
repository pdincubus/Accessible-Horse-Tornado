# PROJECT TITLE

## Get started

###Prerequisites

* Gulp
* NPM
* Node
* (Webpack)[http://webpack.github.io/docs/installation.html] 

* Open terminal
* clone repo
* `cd /project/directory`
* `npm install`
* Edit `config.vm.hostname` in the Vagrantfile and change the site URL if you like, otherwise it will appear at `http://site.local` after the next step
* `vagrant up` and wait a while. You will likely be asked for your password.
* `gulp` or `gulp --production`
* Gulp runs the default task to create a dist/ straight away and then will sit running `watch`
* Open a separate terminal and run `webpack -dw` to pack JS and enter watch mode
* If you're doing a CMS build, edit `provisioning/vagrant/vhost.conf` and edit the `location /assets/templates/foldername` line to your required folder name

## Issues getting the Vagrant box working

* If the hostname http://site.local does not respond, check `/etc/hosts` (or `C:\Windows\System32\Drivers\etc\hosts` on Windows systems) to make sure you don't have multiple host entries with the same hostname

## Issues running gulp

Check node and npm are up to date

* `node -v` should be at least v5.4.1
* `npm -v` should be at least v3.5.3

If Gulp complains about node-sass being a mess, you may need to 're-bind' to the new version of node/npm you have installed:

* `npm rebuild node-sass`

## Keeping Gulp stuff up to date

You can bump packages using npm-check-updates:

`sudo npm install -g npm-check-updates`

Then do the following:

* `ncu` - and wait a while
* `ncu -u` to upgrade any packages in your package.json file
* `rm -fr node_modules` (if errors, sudo it)
* `npm install`

## Gulpfile stuff

* jQuery 2.x used by default as most clients we work with do not require browser support for < IE9. 2.x is also 11KB smaller than 1.x before Gzipping
* jQuery easing (previously plugins.js with a console.log checker) is commented out by default as I can't even remember the last time I used it - this is saving another 9KB
* Removed the console.log checker as all browsers on our current supported list have console support.
* Improved some error reporting as it was always a bit Janky. (Found this)[https://github.com/mikaelbr/gulp-notify/issues/81#issuecomment-100422179] of use and almost stole verbatim

## Production

run `gulp --production` to minify and uglify things. Will minify HTML and CSS, and uglify/minify Javascripts. You should see a console message to let you know if you're running Production Mode or Dev Mode.

## Font files

These should go into src/fonts - I only mention this because I can never remember if I set it to src/font or src/fonts

## Grid system - Lost

I included (Lost)[https://github.com/peterramsing/lost] grids as they sounded the least nasty grid system I've seen so far. As yet untested though to see if it is useful.

## SCSS

* style.scss pulls everything together
* All variables are now in global/_variables.scss
* Set webfonts in globals/_fonts.scss
* All third party partials should go in third-party/_file-name.scss
* Empty partials for _header and _footer are in the global folder

## PostCSS

* SCSS is compiled and then fed into a PostCSS function which does a bunch of sexy stuff:
    * Style lint
    * Autoprefixer
    * MQ Packer (Combines identical media queries together)
    * Some reportings

## Modernizr

Now includes a custom build of Modernizr 3.x, which includes the following:

* Animation
* CSS animation
* CSS filters
* CSS `position: sticky`
* CSS pseudo transitions
* CSS transforms
* CSS transforms3D
* CSS transitions
* Flexbox
* Input attributes
* Input types
* Ligatures
* Object fit
* Preserve 3D
* Supports
* Set classes (Adds classes to HTML element for usefulness)

### Get a list of what tests you need for your Modernizr custom build

Run the following after you've created your dist styles:

`./node_modules/css2modernizr/bin/css2modernizr dist/css/style.css`

This can provide you a URL to get a Modernizr download with only what you've specified in your CSS files. Winning.

## HTML

* Set page description as a variable in the chunk includer thing.
