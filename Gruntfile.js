'use strict';

module.exports = function(grunt) {

grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-contrib-concat');
grunt.loadNpmTasks('grunt-contrib-clean');
grunt.loadNpmTasks('grunt-contrib-cssmin');
grunt.loadNpmTasks('grunt-contrib-jshint');
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-todos');
grunt.loadNpmTasks('grunt-svg2png');

grunt.initConfig({
	pkg: grunt.file.readJSON('package.json'),
	meta: {
		banner:
		'/* \n'+
		' * Leaflet List Markers v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> \n'+
		' * \n'+
		' * Copyright <%= grunt.template.today("yyyy") %> <%= pkg.author.name %> \n'+
		' * <%= pkg.author.email %> \n'+
		' * <%= pkg.author.url %> \n'+
		' * \n'+
		' * Licensed under the <%= pkg.license %> license. \n'+
		' * \n'+
		' * Demo: \n'+
		' * <%= pkg.homepage %> \n'+
		' * \n'+
		' * Source: \n'+
		' * <%= pkg.repository.url %> \n'+
		' * \n'+
		' */\n'
	},
	clean: {
		dist: {
			src: ['dist/*']
		}
	},
	jshint: {
		options: {
			globals: {
				console: true,
				module: true
			},
			"-W099": true,	//ignora tabs e space warning
			"-W033": true,
			"-W044": true	//ignore regexp
		},
		files: ['src/*.js']
	},
	concat: {
		options: {
			banner: '<%= meta.banner %>'
		},
		dist: {
			files: {
				'dist/leaflet-list-markers.src.js': ['src/leaflet-list-markers.js'],			
				'dist/leaflet-list-markers.src.css': ['src/leaflet-list-markers.css']
				//,'dist/leaflet-list-markers.mobile.src.css': ['src/leaflet-list-markers.mobile.css']
			}
		}
	},
	uglify: {
		options: {
			banner: '<%= meta.banner %>'
		},
		dist: {
			files: {
				'dist/leaflet-list-markers.min.js': ['dist/leaflet-list-markers.src.js']
			}
		}
	},
	cssmin: {
		combine: {
			files: {
				'dist/leaflet-list-markers.min.css': ['src/leaflet-list-markers.css']
				//,'dist/leaflet-list-markers.mobile.min.css': ['src/leaflet-list-markers.mobile.css']
			}
		},
		options: {
			banner: '<%= meta.banner %>'
		},
		minify: {
			expand: true,
			cwd: 'dist/',
			files: {
				'dist/leaflet-list-markers.min.css': ['src/leaflet-list-markers.css']
				//,'dist/leaflet-list-markers.mobile.min.css': ['src/leaflet-list-markers.mobile.css']
			}
		}
	},
    svg2png: {
        all: {
            files: [
                { src: ['images/*.svg'], dest: 'images/' }
            ]
        }
    },	
	todos: {
		options: { verbose: false },
		TODO: ['src/*.js'],
	},	
	watch: {
		dist: {
			options: { livereload: true },
			files: ['src/*'],
			tasks: ['clean','concat','cssmin','jshint']
		}		
	}
});

grunt.registerTask('default', [
	'clean',
	'concat',	
	'cssmin',
	'jshint',
	'uglify',
	'svg2png',
	'todos'
]);

};