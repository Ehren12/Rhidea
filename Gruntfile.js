module.exports = function(grunt) {

	//project configurations
	grunt.initConfig({

		uglify : {

			options : {
				banner : "/*! style.min.css file */\n"
			},
			build : {
				src : ["public/css/style.js"],
				dest : "dist/style.min.css"
			}

		}

	});

	//load uglify plugin
	grunt.loadNpmTasks('grunt-contrib-uglify');

	//create default task
	grunt.registerTask("default", ["uglify"]);

};