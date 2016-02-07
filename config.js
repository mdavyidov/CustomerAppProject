module.exports = {
  src: {
    jade: 'src/html/*.jade',
    jadeComponents: 'src/components/**/*.jade',
    less: 'src/css/*.less',
    lessComponents: 'src/components/**/*.less',
    sprite: 'src/sprite-source/*.png',
    spriteLess: 'src/images/sprite/sprite.less'
  },

  dest: {
    less: '.',
    jade: '.',
    sprite: 'src/images/sprite'
  },

  less: {
    relativeUrls: true,
    pretty: true
  },

  autoprefixer: {
    browsers: ['last 2 versions'],
    cascade: false
  },

  jade: {
    pretty: true
  },

  spritesmith: {
    imgName: 'sprite.png',
    cssName: 'sprite.less'
  }
};
