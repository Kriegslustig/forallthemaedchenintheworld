/*
 * articleSwitcher.js
 *
 * This This toggles articles
 *
 * It should:
 * - Close an article if it's title isn't visible
 * - Hide all closed articles of canvas
 * - Show the title of the next article
 * - open the next article when the user scrolls to the bottom of the page or clicks it's title
 * - Put an animated line next to the article that is in focus
 *
 * ArticleSwitcher = {}
 * - config = {}
 *   - article = {}
 *     - class
 *     - openClass
 *     - focusClass
 *     - offsetTop
 *     - titleClass
 *   - focus
 *     - class
 *     - animationTime
 *
 * Article = {}
 * - _node = DOMNode
 * - state = {focus: bool, open: bool}
 * - titlePosition = (x: integer, y: integer)
 * - size = (height: integer, width: integer)
 * - close()
 * - open()
 * - focus()
 * - unFocus()
 * - updatePos()
 * - getHeight()
 * - appendChild()
 *
 * Focus = {}
 *   This should be the line which jumps from title to title
 * Should have
 * - flyingThingi = DOMNode
 * - _position = integer
 * - articleIndex = [Article, Article, ...]
 * - goto() uses scrollTo, sets position
 *
 * Controll
 *   When articleSwitcher is initialized Controll will create all Article's and create the index for Focus
 * Should have:
 * - switchPos = integer the position in pixels where the focus should switch
 * - setScrollListener()
 *   - updateSwitchPos()
 */

articleSwitcher = {
  config: {
    article: {
      class: 'article',
      openClass: 'article--open',
      focusClass: 'article--focus',
      offsetTop: '20',
      titleClass: 'article__title',
    },
    focus: {
      class = 'focusLine',
      animationTime: 200,
    },
  }
};

articleSwitcher.createArticle = (function (node) {
  var _node = node,
  _state = {
    focus: false,
    open: false
  },
  _titlePosition {
    x,
    y
  },
  _size = {
    height: _node.height,
    width: _node.width
  };
  function _getOffset () {
    var pos = {
      x: _node.offsetLeft,
      y: _node.offsetTop
    },
    child = _node;
    while(child = child.offsetParent) {
      pos.x += child.offsetLeft;
      pos.y += child.offsetTop;
    }
    return pos;
  };
  return {
    open: function () {
      _node.className += ' ' + this.config.openClass;
    },

    close: function () {
      _node.className = _node.className.replace('' + this.config.openClass, '');
    },

    focus: function () {
      _node.className += ' ' + this.config.focusClass;
    },

    unFocus: function () {
      _node.className = _node.className.replace('' + this.config.focusClass, '');
    },

    updatePos: function () {
     _titlePosition = _getOffset();
    },

    getHeight: function () {
      return _size.height;
    }

    appendElement: function (element) {
      _node.appendChild(element);
    }
  }
});

articleSwitcher.createFocus = (function () {
  var _position = 0,
  _flyingThingi = document.createElement('div'),

  _flyingThingi.className = this.config.focus.class;
  document.body.appendChild(flyingThingi);
  return {
    articleIndex,
    goto: function (index) {
      _flyingThingi.remove();
      articleIndex[index].appendElement(_flyingThingi);
      var moveBy = articleIndex[_position].getHeight() + this.config.article.offsetTop;
      _flyingThingi.css.transform = 'translateY: '+ moveBy + 'px';
      setTimeout(function () {
        _flyingThingi.remove();
        articleIndex[index].appendElement(_flyingThingi);
      }, this.config.focus.animationTime);
    }
  }
});