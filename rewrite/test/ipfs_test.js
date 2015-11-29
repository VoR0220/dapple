var assert = require('assert');
var IPFS = require('../lib/ipfs.js');

describe("dapple IPFS wrapper", function() {
    it("adds local flat files and gets a hash", function() {
    	var ipfs = new IPFS();
    	var file = ipfs.addFile('./example_package/dappfile');
    	assert.equal('QmerjJo5E9njDjLr7eyeAzXtnZ8Ao8Zdfr3KLra8NEiyF7', file[0].Hash);
    	assert.equal('dappfile', file[0].Name);
    });
    
    it("adds a local directory and gets a hash", function(){
    	var ipfs = new IPFS();
    	//var file = ipfs.addFile('./example_package/dappfile');
    	//assert.equal('QmerjJo5E9njDjLr7eyeAzXtnZ8Ao8Zdfr3KLra8NEiyF7', file[0].Hash);
    	//assert.equal('dappfile', file[0].Name);
    });
    
    it("gets a remote file from IPFS", function(){

    });

});
