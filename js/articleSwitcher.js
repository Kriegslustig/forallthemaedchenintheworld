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
 * - articleIndex = [Article, Article, ...]
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
 *   - container
 *     - tolarance
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
 * - goto() uses scrollTo, sets position
 *
 * Controll
 *   When articleSwitcher is initialized Controll will create all Article's and create the index for Focus
 * Should have:
 * - _container
 * - switchPos = integer the position in pixels where the focus should switch
 * - init()
 *   - _createIndex
 *   - _setScrollListener()
 *     - _updateSwitchPos()
 *
 * getOffset(node)
 */

articleSwitcher = {
  articleIndex: [];
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
    container: {
      class: 'main',
      tolarance: 20,
    }
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
     _titlePosition = getOffset(_node);
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
    this.articleIndex,
    goto: function (index) {
      _flyingThingi.remove();
      this.articleIndex[index].appendElement(_flyingThingi);
      var moveBy = this.articleIndex[_position].getHeight() + this.config.article.offsetTop;
      _flyingThingi.css.transform = 'translateY: '+ moveBy + 'px';
      setTimeout(function () {
        _flyingThingi.remove();
        this.articleIndex[index].appendElement(_flyingThingi);
      }, this.config.focus.animationTime);
    }
  }
});

articleSwitcher.createControll = (function () {
  var _container = document.querySelector(this.config.container.class),
  _switchPos = _container.height + getOffset(_container) - this.config.container.tolarance - innerHeight;
  function _createIndex () {
    var allArticleNodes = document.querySelectorAll(this.config.config.article.class);
    for(var key in allArticleNodes) {
      if(allArticleNodes.hasOwnProperty(key)) {
        var thisNode = allArticleNodes[key];
        this.articleIndex.push(createArticle(thisNode));
      }
    }
  }

  function _setScrollListener () {
    window.addEventListener('scroll', function () {
      if(window.pageYOffset >= _switchPos ){
        ;
      }
    }, false);
  }

  function _updateSwitchPos () {
    ;
  }
  return {
    init: function () {
      _setScrollListener ();
    }
  }
});

function getOffset (thisNode) {
  var pos = {
    x: thisNode.offsetLeft,
    y: thisNode.offsetTop
  },
  child = thisNode;
  while(child = child.offsetParent) {
    pos.x += child.offsetLeft;
    pos.y += child.offsetTop;
  }
  return pos;
};