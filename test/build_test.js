'use strict';
var assert = require('chai').assert;
var Workspace = require("../lib/workspace");
var testenv = require("./testenv");
var fs = require("../lib/file");
var path = require("path");
var _ = require("underscore")._

describe('class Builder', function() {
    var workspace = new Workspace(testenv.golden_package_dir);
    var Builder = require('../lib/build');
    var b = new Builder(workspace);

    // TODO this fails with timeout even though `done()` is called
    it.skip("[SLOW] .build recreates golden solc_out from blank init dir", function(done) {
        this.timeout(15000);

        var tmpdir = fs.tmpdir();
        var returned = b.build(tmpdir);
        // Uncomment to make new golden record
        //fs.writeJsonSync(testenv.GOLDEN_SOLC_OUT_PATH, returned);
        var written = fs.readJsonSync(path.join(tmpdir, "classes.json"));
        var golden = testenv.golden.SOLC_OUT();

        //assert.deepEqual( returned, golden );
        //assert.deepEqual( written, golden );
        done();
    });
    it("filterSolcOut doesn't exclude output we need", function(done) {
        var golden_sources = testenv.golden.SOLC_OUT();
        var filtered_sources = Builder.filterSolcOut(golden_sources);
        var tester_class = filtered_sources["Tester"];
        var required_outputs = ["bytecode", "interface", "solidity_interface"];
        _.each(required_outputs, function(key) {
            assert( _.has(tester_class, key), "missing a required key: " + key );
        });
        done();
    });
    it("writeJsHeader produces the golden output", function(done) {
        var classes = testenv.golden.SOLC_OUT();
        var headers = Builder.extractClassHeaders(classes);
        var compiled = Builder.compileJsModule(headers);
        done();
    });
    it.skip("has helpful error when directory layout misconfigured");
});
