# Breaking Badify

A tribute to [Breaking Bad][breaking_bad_link] series, badify any two strings
[here][app_link].

[![dependencies](https://david-dm.org/nihey/breaking-badify.png)](https://david-dm.org/nihey/breaking-badify)

# Building

It is recommended to have the [`webpack`][webpack_link] module installed and up to date:
```
$ npm install -g webpack
```
Then, the project may be built by running:
```
$ npm install
$ bower install
$ webpack
```

# Running

Run any `http` server on the `dist` directory:
```
$ cd dist
$ python -m SimpleHTTPServer # visit the app on http://localhost:8000
```

# Developing

While developing, it is recommended to start `webpack` in `watch` mode, this
way, whenever a project file is modified, it automatically generate `dist`
files:
```
$ webpack --watch
```

# Contributing

If you feel something in this project could be improved, open an
[issue][issue_link] and we'll discuss it.


[breaking_bad_link]: https://en.wikipedia.org/wiki/Breaking_Bad
[app_link]: http://nihey.github.io/breaking-badify/
[webpack_link]: http://webpack.github.io/
[issue_link]: https://github.com/nihey/breaking-badify/issues
