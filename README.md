# node-drone-server-base

TCP server to control a drone.

Also, drone video stream.

This is some base code. Feel free to change or extend.


## Install

Download this repo:

```
$ git clone https://github.com/pgte/node-drone-server-base.git
$ cd node-drone-server-base
```

Install dependencies:

```
$ npm install
```

__Also, you need to have ffmgep installed to run the video server.__

https://www.ffmpeg.org/



## Run

```
$ npm start
```

### Environment variables:

* `DRONE`: IP Address for the drone. Defaults to "192.168.1.1".
* `COMMAND_PORT`: TCP command server port. Defaults to 3001.
* `VIDEO_PORT`: HTTP video server port. Defaults to 3002.
* `NOVIDEO`: Launch without the video server


## TCP Command Server

Besides an HTTP server running on port 3000, this also launches a TCP server running on port 3001.

You can accesss it from the command line by using, for instance telnet or (preferably) netcat:

```
$ nc localhost 3000
```

Now you can issue commands.

## Protocol

Each command is a JSON-encoded array terminated by a new-line character.

Each command has the following structure:

```js
[<command>, <arguments>, <id>]
```

The `command` is a string identifying the command ("takeoff", "land", "stop", "up", "down", "left", "right", etc..).

`arguments` is an array of arguments. Can be empty (`[]`), or contain the arguments required for that specific command (see the available commands and arguments in [the `ar-drone` API docs](https://github.com/felixge/node-ar-drone#client-api)).

`id` is a mandatory number that identifies the command


### The response

To each command, the server responds with a new-line terminated and JSON-encoded string like this:

```js
[<result>, <id>]
```

`result` is an array. The first position of that array is the error (`null` if no error, and the second is the result, if any).


### Example interaction

```
$ nc localhost 3001
["takeoff",[],1]
[[null],1]
["left",[0.1],2]
[[null],2]
```


## Video Server

There is a video server running on port 3002.

Go to [http://localhost:3002/nodecopter.mjpeg](http://localhost:3002/nodecopter.mjpeg) to check it out.

(if you want to launch without a video server, set the `NOVIDEO` environment variable to `true`).

If you need to change the server output format, change the `ffserver.conf` file.
# node-drone-server
