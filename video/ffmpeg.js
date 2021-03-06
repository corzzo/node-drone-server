// swing a dead cat in the general direction of the latency issues:
module.exports = function (cb) {

    var port     = Number(process.env.VIDEO_PORT) || 3002
    ,   spawn    = require('child_process').spawn
    ,   ffserver = require('./ffserver')
    ,   url      = 'http://localhost:' + port + '/nodecopter.ffm'
    ,   opts     = ['-v'
                   ,'error'
                   ,'-analyzeduration'
                   ,0
                   ,'-i'
                   ,'-'
                   ,'-fflags'
                   ,'+genpts'
                   ,url
                   ]

    ffserver(function (err, server) {

        var ffmpeg = spawn('ffmpeg', opts)

        ffmpeg.stderr.on('data', function(d) {
            cb(d, null)
        })

        /*
        ffmpeg.stdout.on('data', function (ffmpegout) {
            console.log('ffmpeg out: ' + ffmpegout);
        })
        */

        ffmpeg.on('exit', function (code, signal) {
            // console.log('ffmpeg exit', code, signal);
            server.kill()
        })

        cb(null, ffmpeg)
    })
}
