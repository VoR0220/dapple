var fs = require('fs');
var ipfsAPI = require('ipfs-api');
var deasync = require('deasync');

// connect to ipfs daemon API server
var ipfs = ipfsAPI('localhost', '5001') // leaving out the arguments will default to these values

module.exports = class IPFS {
    
    addFile(file) {
        var hash = ipfs.add(file, function(err, res) {
            if(err || !res) return console.error(err)
            
            return res;
        });
        while(hash === undefined) {
            deasync.runLoopOnce();
        }
    }
    
    addDir(directory) {
        var files = fs.readdirSync(directory);
        var hashes = ipfs.add(files, function(err, res) {
            if(err || !res) return console.error(err)
            
            return res;
        });
        while(hashes === undefined) {
            deasync.runLoopOnce();
        }
    }
    
    getSync(hash, destination_path, recursive) {
        var file;
        if( recursive !== undefined ) {
        
        }

        file = ipfs.cat(hash, function(err, res) {
            if(err || !res) return console.error(err)

            return fs.writeFile(destination_path, res)
        });

        while(file === undefined) {
            deasync.runLoopOnce();
        }
    }

    addSync(hash, source_path, recursive) {
    }
}
