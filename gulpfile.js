var gulp = require('gulp'),
    nodemon = require('gulp-nodemon'),
    gulpMocha = require('gulp-mocha');

gulp.task('default', function() {
    // content
    nodemon({
        script: 'app.js',
        ext: 'js',
        env: {
            PORT: 8000
        },
        ignore: ['./node_modules/**']
    }).
    on('restart', function(){
        console.log('Restarting');
    });
});


gulp.task('test', function(){
    gulp.src('tests/*js', {read:false})
      .pipe(gulpMocha({reporter: 'nyan'}))
});
