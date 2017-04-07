# Project phase A prototype

![Screen Shot](app/resources/Prototype.jpg?raw=true "Optional Title")




# Zulip Desktop Client 
[![Build Status](https://travis-ci.org/zulip/zulip-electron.svg?branch=master)](https://travis-ci.org/zulip/zulip-electron)
[![Windows Build Status](https://ci.appveyor.com/api/projects/status/github/zulip/zulip-electron?branch=master&svg=true)](https://ci.appveyor.com/project/akashnimare/zulip-electron/branch/master)
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)

This is an experimental replacement for the [Zulip Desktop
app](https://github.com/zulip/zulip-desktop) implemented in
[Electron](http://electron.atom.io/).

The goal is to achieve feature-compatibility with the old desktop app
and then start adding cool features like easy support for
multi-account, auto-updates etc.

## Prerequisites
* node >= v6.3.1
* npm >= 3.10.3
* python (v2.7.x recommended)
* If you're on Debian or Ubuntu, you'll need to install following packages:
```sh
$ sudo apt-get install nodejs-legacy build-essential libxext-dev libxtst-dev libxkbfile-dev
```

## Installation

Clone the source locally:

```sh
$ git clone https://github.com/zulip/zulip-electron
$ cd zulip-electron
```

Install project dependencies:

```sh
$ npm install
```
Start the app:

```sh
$ npm start
```

Start and watch changes  

```sh
$ npm run dev
```
# Making a release

To package app into an installer use command:
```
npm run dist
```
It will start the packaging process for operating system you are running this command on. Ready for distribution file (e.g. dmg, windows installer, deb package) will be outputted to `dist` directory.

You can create Windows installer only when running on Windows, the same is true for Linux and OSX. So to generate all three installers you need all three operating systems.


## Features

- [x] Native Notifications
- [x] SpellChecker
- [x] OSX/Win/Linux installer
- [x] Automatic Updates (macOS/Windows)
- [x] Keyboard shortcuts

Description            | Keys
-----------------------| -----------------------
Default shortcuts      | <kbd>Cmd/Ctrl</kbd> <kbd>k</kbd>
Change Zulip Server    | <kbd>Cmd/Ctrl</kbd> <kbd>,</kbd>
Back                   | <kbd>Cmd/Ctrl</kbd> <kbd>[</kbd>
Forward                | <kbd>Cmd/Ctrl</kbd> <kbd>]</kbd>


## Contribute

If you want to contribute please make sure to read [our documentation about contributing](./CONTRIBUTING.md) first.

* [Issue Tracker](https://github.com/zulip/zulip-electron/issues)
* [Source Code](https://github.com/zulip/zulip-electron/)
