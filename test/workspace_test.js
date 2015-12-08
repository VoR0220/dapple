var expect = require("chai").expect;
var assert = require("chai").assert;
var fs = require("../lib/file");
var tmp = require("tmp");
var Workspace = require("../lib/workspace");
var constants = require("../lib/constants");
var testenv = require("./testenv");
var path = require("path");
var dircompare = require("dir-compare");


describe("class Workspace", function() {
    it(" .initialize(emptydir) matches golden version", function() {
        var dir = fs.tmpdir();
        Workspace.initialize(dir)
        //fs.copySync(dir, testenv.golden.INIT_EMPTY_DIR); //  Create a new golden record
        var diff = dircompare.compareSync(dir, testenv.golden.INIT_EMPTY_DIR);
        assert( diff.same );
    });
    it("finds dappfile in subdirectory", function(done) {
        assert( Workspace.findWorkspaceRoot(path.join(testenv.golden_package_dir, "subdirectory")) );
        done();
    });
    it("initializes successfully in golden package", function(done) {
        var workspace = new Workspace(testenv.golden_package_dir);
        done();
    });
    it("loads local .sol source tree", function(done) {
        var workspace = new Workspace(testenv.golden_package_dir);
        var sources = workspace.loadWorkspaceSources();
        expect(sources).to.exist;
        assert.deepEqual( Object.keys(sources), [ 'example.sol','example_test.sol','subdirectory/example2.sol'] );
        done();
    });
    it("findWorkspaceRoot returns undefined if it hits root", function(done) {
        var dir = fs.tmpdir();
        assert.equal(undefined, Workspace.findWorkspaceRoot(dir));
        done();
    });
    it.skip("findWorkspaceRoot returns undefined if it hits .dapplerc", function(done) {
        var dir = "TODO";
        var workspace = new Workspace(testenv.golden_package_dir);
        assert.equal( undefined, workspace.findWorkspaceRoot(dir) );
        done();
    });
});
