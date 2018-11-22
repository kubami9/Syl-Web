module.exports = function (grunt) {


    grunt.registerTask("pointless", "", function() {
        grunt.log.write("This grunt task is pointless. Just a test.");
    });

    // Project configuration.
    grunt.initConfig({
        concat: {
            options: {
                separator: ';',
            },
            dist: {
                src: ['features.js', 'main.js'],
                dest: 'dist/built.js',
            },
        },
    });

    // Loading plugin
    grunt.loadNpmTasks('grunt-contrib-concat');

    // Do the concat task as default
    grunt.registerTask("default", ["concat"]);

}