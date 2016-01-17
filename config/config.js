module.exports = {
  wiredepConfig: {
    directory: 'bower_components', // default: '.bowerrc'.directory || bower_components
    bowerJson: require('../bower.json'),
    src: ['src/views/*.html','src/index.html']
  }
};
