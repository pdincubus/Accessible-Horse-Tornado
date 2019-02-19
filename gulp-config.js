module.exports = {
    postcss: {
        src: 'src/css/style.css',
        dest: 'dist/css',
        watch: 'src/css/**/*',
    },
    html: {
        src: [
            'src/html/index.html',
        ],
        dest: 'dist',
        watch: 'src/html/**/*.html'
    }
};
