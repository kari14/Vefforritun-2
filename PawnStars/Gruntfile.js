module.exports = function ( grunt ) {

    var taskConfig = {
        jshint: {
            files: ['Gruntfile.js', 'index.js', 'src/js/App.js','src/js/*.js'],
            options: {
                curly:  true,
                immed:  true,
                newcap: true,
                noarg:  true,
                sub:    true,
                boss:   true,
                eqnull: true,
                node:   true,
                undef:  true,
                globals: {
                    _:       false,
                    jQuery:  false,
                    angular: false,
                    moment:  false,
                    console: false,
                    $:       false,
                    io:      false 
                }
            }
        },
		concat: {
			options: {
			// define a string to put between each file in the concatenated output
			separator: ';'
			},
			dist: {
			// the files to concatenate
			src: ['index.js', 'src/js/*js'],
			// the location of the resulting JS file
			dest: 'build/production.js'
			}
		},
		uglify: {
			build: {
				src: 'build/production.js',
				dest: 'build/production.min.js'
			}
		}

    };
    grunt.initConfig(taskConfig);

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    
    grunt.registerTask('build', ['concat', 'uglify']);
    grunt.registerTask('default', ['jshint']);
};
